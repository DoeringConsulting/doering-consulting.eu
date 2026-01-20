import { ipcMain } from 'electron';
import { eq, and } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { taxSettings } = schema;

export function registerTaxSettingsHandlers(): void {
  // List all tax settings
  ipcMain.handle('taxSettings:list', async () => {
    try {
      const db = getDatabase();
      const result = db.select().from(taxSettings).all();
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error listing tax settings:', error);
      return { success: false, error: error.message };
    }
  });

  // Get tax setting by type
  ipcMain.handle('taxSettings:get', async (_event, taxType: string) => {
    try {
      const db = getDatabase();
      const result = db.select()
        .from(taxSettings)
        .where(eq(taxSettings.taxType, taxType))
        .get();

      if (!result) {
        return { success: false, error: 'Tax setting not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting tax setting:', error);
      return { success: false, error: error.message };
    }
  });

  // Upsert tax setting
  ipcMain.handle('taxSettings:upsert', async (_event, data: Partial<typeof taxSettings.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      // Validation
      if (!data.taxType || !data.calculationType || data.value === undefined) {
        return { success: false, error: 'Steuertyp, Berechnungsart und Wert sind erforderlich' };
      }

      const userId = data.userId || 1;
      const now = new Date().toISOString();

      // Check if exists
      const existing = db.select()
        .from(taxSettings)
        .where(and(
          eq(taxSettings.userId, userId),
          eq(taxSettings.taxType, data.taxType)
        ))
        .get();

      let result;
      if (existing) {
        result = db.update(taxSettings)
          .set({
            calculationType: data.calculationType,
            value: data.value,
            updatedAt: now
          })
          .where(eq(taxSettings.id, existing.id))
          .returning()
          .get();
        log.info('Tax setting updated:', { id: result.id, type: result.taxType });
      } else {
        result = db.insert(taxSettings).values({
          userId: userId,
          taxType: data.taxType,
          calculationType: data.calculationType,
          value: data.value,
          createdAt: now,
          updatedAt: now
        }).returning().get();
        log.info('Tax setting created:', { id: result.id, type: result.taxType });
      }

      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error upserting tax setting:', error);
      return { success: false, error: error.message };
    }
  });
}
