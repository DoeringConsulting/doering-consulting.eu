import { ipcMain } from 'electron';
import { eq } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { customers } = schema;

export function registerCustomersHandlers(): void {
  // List all customers
  ipcMain.handle('customers:list', async () => {
    try {
      const db = getDatabase();
      const result = db.select().from(customers).all();
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error listing customers:', error);
      return { success: false, error: error.message };
    }
  });

  // Get customer by ID
  ipcMain.handle('customers:getById', async (_event, id: number) => {
    try {
      const db = getDatabase();
      const result = db.select().from(customers).where(eq(customers.id, id)).get();
      if (!result) {
        return { success: false, error: 'Customer not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting customer:', error);
      return { success: false, error: error.message };
    }
  });

  // Create new customer
  ipcMain.handle('customers:create', async (_event, data: Partial<typeof customers.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      // Validation
      if (!data.name || data.dailyRate === undefined) {
        return { success: false, error: 'Name und Tagessatz sind erforderlich' };
      }

      const now = new Date().toISOString();
      const result = db.insert(customers).values({
        name: data.name,
        address: data.address || null,
        taxId: data.taxId || null,
        billingModel: data.billingModel || 'exclusive',
        dailyRate: data.dailyRate,
        currency: data.currency || 'EUR',
        isArchived: 0,
        createdAt: now,
        updatedAt: now
      }).returning().get();

      log.info('Customer created:', { id: result.id, name: result.name });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error creating customer:', error);
      return { success: false, error: error.message };
    }
  });

  // Update customer
  ipcMain.handle('customers:update', async (_event, id: number, data: Partial<typeof customers.$inferInsert>) => {
    try {
      const db = getDatabase();
      
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

      log.info('Customer updated:', { id: result.id, name: result.name });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error updating customer:', error);
      return { success: false, error: error.message };
    }
  });

  // Delete customer
  ipcMain.handle('customers:delete', async (_event, id: number) => {
    try {
      const db = getDatabase();
      
      const result = db.delete(customers)
        .where(eq(customers.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Customer not found' };
      }

      log.info('Customer deleted:', { id });
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error deleting customer:', error);
      return { success: false, error: error.message };
    }
  });

  // Archive customer
  ipcMain.handle('customers:archive', async (_event, id: number) => {
    try {
      const db = getDatabase();
      
      const result = db.update(customers)
        .set({
          isArchived: 1,
          updatedAt: new Date().toISOString()
        })
        .where(eq(customers.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Customer not found' };
      }

      log.info('Customer archived:', { id });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error archiving customer:', error);
      return { success: false, error: error.message };
    }
  });

  // Unarchive customer
  ipcMain.handle('customers:unarchive', async (_event, id: number) => {
    try {
      const db = getDatabase();
      
      const result = db.update(customers)
        .set({
          isArchived: 0,
          updatedAt: new Date().toISOString()
        })
        .where(eq(customers.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Customer not found' };
      }

      log.info('Customer unarchived:', { id });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error unarchiving customer:', error);
      return { success: false, error: error.message };
    }
  });
}
