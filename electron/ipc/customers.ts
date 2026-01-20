import { ipcMain } from 'electron';
import { getDatabase } from '../database/connection';
import { customers } from '../database/schema';
import { eq } from 'drizzle-orm';

export function registerCustomersHandlers() {
  const db = getDatabase();

  ipcMain.handle('customers:list', async () => {
    try {
      const result = db.select().from(customers).all();
      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error listing customers:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('customers:getById', async (event, id) => {
    try {
      const result = db.select().from(customers).where(eq(customers.id, id)).get();
      if (!result) {
        return { success: false, error: 'Customer not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error getting customer:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('customers:create', async (event, data) => {
    try {
      if (!data.name || !data.dailyRate) {
        return { success: false, error: 'Name and daily rate are required' };
      }

      const result = db.insert(customers).values({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }).returning().get();

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error creating customer:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('customers:update', async (event, id, data) => {
    try {
      const result = db.update(customers)
        .set({
          ...data,
          updatedAt: new Date().toISOString()
        })
        .where(eq(customers.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Customer not found' };
      }

      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error updating customer:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('customers:delete', async (event, id) => {
    try {
      const result = db.delete(customers).where(eq(customers.id, id)).returning().get();
      
      if (!result) {
        return { success: false, error: 'Customer not found' };
      }

      return { success: true, data: true };
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      return { success: false, error: error.message };
    }
  });
}
