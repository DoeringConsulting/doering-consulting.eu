import { ipcMain } from 'electron';
import { getDatabase } from '../database/connection';
import { timeEntries } from '../database/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export function registerTimeEntriesHandlers() {
  const db = getDatabase();

  ipcMain.handle('timeEntries:list', async (event, params) => {
    try {
      let query = db.select().from(timeEntries);
      
      const conditions = [];
      if (params?.startDate) {
        conditions.push(gte(timeEntries.date, params.startDate));
      }
      if (params?.endDate) {
        conditions.push(lte(timeEntries.date, params.endDate));
      }
      if (params?.customerId) {
        conditions.push(eq(timeEntries.customerId, params.customerId));
      }

      const result = conditions.length > 0 
        ? query.where(and(...conditions)).all()
        : query.all();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error listing time entries:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('timeEntries:create', async (event, data) => {
    try {
      const result = db.insert(timeEntries).values({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }).returning().get();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error creating time entry:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('timeEntries:update', async (event, id, data) => {
    try {
      const result = db.update(timeEntries)
        .set({
          ...data,
          updatedAt: new Date().toISOString()
        })
        .where(eq(timeEntries.id, id))
        .returning()
        .get();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error updating time entry:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('timeEntries:delete', async (event, id) => {
    try {
      const result = db.delete(timeEntries).where(eq(timeEntries.id, id)).returning().get();
      return { success: true, data: !!result };
    } catch (error: any) {
      console.error('Error deleting time entry:', error);
      return { success: false, error: error.message };
    }
  });
}
