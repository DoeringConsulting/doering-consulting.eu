import { ipcMain } from 'electron';
import { getDatabase } from '../database/connection';
import { expenses } from '../database/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export function registerExpensesHandlers() {
  const db = getDatabase();

  ipcMain.handle('expenses:list', async (event, params) => {
    try {
      let query = db.select().from(expenses);
      
      const conditions = [];
      if (params?.startDate) {
        conditions.push(gte(expenses.date, params.startDate));
      }
      if (params?.endDate) {
        conditions.push(lte(expenses.date, params.endDate));
      }
      if (params?.customerId) {
        conditions.push(eq(expenses.customerId, params.customerId));
      }

      const result = conditions.length > 0 
        ? query.where(and(...conditions)).all()
        : query.all();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error listing expenses:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('expenses:create', async (event, data) => {
    try {
      const result = db.insert(expenses).values({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }).returning().get();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error creating expense:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('expenses:update', async (event, id, data) => {
    try {
      const result = db.update(expenses)
        .set({
          ...data,
          updatedAt: new Date().toISOString()
        })
        .where(eq(expenses.id, id))
        .returning()
        .get();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error updating expense:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('expenses:delete', async (event, id) => {
    try {
      const result = db.delete(expenses).where(eq(expenses.id, id)).returning().get();
      return { success: true, data: !!result };
    } catch (error: any) {
      console.error('Error deleting expense:', error);
      return { success: false, error: error.message };
    }
  });
}
