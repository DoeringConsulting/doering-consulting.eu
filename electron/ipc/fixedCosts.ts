import { ipcMain } from 'electron';
import { eq, and, lte, or, isNull, gte } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { fixedCosts } = schema;

export function registerFixedCostsHandlers(): void {
  // List all fixed costs
  ipcMain.handle('fixedCosts:list', async () => {
    try {
      const db = getDatabase();
      const result = db.select().from(fixedCosts).all();
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error listing fixed costs:', error);
      return { success: false, error: error.message };
    }
  });

  // Get fixed cost by ID
  ipcMain.handle('fixedCosts:getById', async (_event, id: number) => {
    try {
      const db = getDatabase();
      const result = db.select().from(fixedCosts).where(eq(fixedCosts.id, id)).get();
      if (!result) {
        return { success: false, error: 'Fixed cost not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting fixed cost:', error);
      return { success: false, error: error.message };
    }
  });

  // Create fixed cost
  ipcMain.handle('fixedCosts:create', async (_event, data: Partial<typeof fixedCosts.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      // Validation
      if (!data.name || !data.category || data.amount === undefined || !data.startDate) {
        return { success: false, error: 'Name, Kategorie, Betrag und Startdatum sind erforderlich' };
      }

      const now = new Date().toISOString();
      const result = db.insert(fixedCosts).values({
        userId: data.userId || 1,
        name: data.name,
        category: data.category,
        amount: data.amount,
        currency: data.currency || 'EUR',
        startDate: data.startDate,
        endDate: data.endDate || null,
        notes: data.notes || null,
        createdAt: now,
        updatedAt: now
      }).returning().get();

      log.info('Fixed cost created:', { id: result.id, name: result.name });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error creating fixed cost:', error);
      return { success: false, error: error.message };
    }
  });

  // Update fixed cost
  ipcMain.handle('fixedCosts:update', async (_event, id: number, data: Partial<typeof fixedCosts.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      const result = db.update(fixedCosts)
        .set({
          ...data,
          updatedAt: new Date().toISOString()
        })
        .where(eq(fixedCosts.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Fixed cost not found' };
      }

      log.info('Fixed cost updated:', { id: result.id });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error updating fixed cost:', error);
      return { success: false, error: error.message };
    }
  });

  // Delete fixed cost
  ipcMain.handle('fixedCosts:delete', async (_event, id: number) => {
    try {
      const db = getDatabase();
      
      const result = db.delete(fixedCosts)
        .where(eq(fixedCosts.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Fixed cost not found' };
      }

      log.info('Fixed cost deleted:', { id });
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error deleting fixed cost:', error);
      return { success: false, error: error.message };
    }
  });

  // Get active fixed costs for a specific month
  ipcMain.handle('fixedCosts:getActiveForMonth', async (_event, year: number, month: number) => {
    try {
      const db = getDatabase();
      
      // Calculate month boundaries
      const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const monthEnd = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
      
      // Get all fixed costs and filter in JS
      const allCosts = db.select().from(fixedCosts).all();
      
      // Filter: startDate <= monthEnd AND (endDate IS NULL OR endDate >= monthStart)
      const activeCosts = allCosts.filter(cost => {
        const startBeforeMonthEnd = cost.startDate <= monthEnd;
        const endAfterMonthStart = !cost.endDate || cost.endDate >= monthStart;
        return startBeforeMonthEnd && endAfterMonthStart;
      });

      return { success: true, data: activeCosts };
    } catch (error: any) {
      log.error('Error getting active fixed costs:', error);
      return { success: false, error: error.message };
    }
  });
}
