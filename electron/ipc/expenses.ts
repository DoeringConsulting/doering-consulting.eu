import { ipcMain } from 'electron';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { expenses, customers } = schema;

interface ListParams {
  startDate?: string;
  endDate?: string;
  customerId?: number;
}

export function registerExpensesHandlers(): void {
  // List expenses with optional filters
  ipcMain.handle('expenses:list', async (_event, params?: ListParams) => {
    try {
      const db = getDatabase();
      
      let query = db.select({
        id: expenses.id,
        userId: expenses.userId,
        customerId: expenses.customerId,
        date: expenses.date,
        category: expenses.category,
        subcategory: expenses.subcategory,
        amount: expenses.amount,
        currency: expenses.currency,
        distance: expenses.distance,
        description: expenses.description,
        receiptPath: expenses.receiptPath,
        createdAt: expenses.createdAt,
        updatedAt: expenses.updatedAt,
        customer: {
          id: customers.id,
          name: customers.name
        }
      })
      .from(expenses)
      .leftJoin(customers, eq(expenses.customerId, customers.id))
      .orderBy(desc(expenses.date));
      
      let result = query.all();

      // Apply filters
      if (params) {
        if (params.startDate) {
          result = result.filter(r => r.date >= params.startDate!);
        }
        if (params.endDate) {
          result = result.filter(r => r.date <= params.endDate!);
        }
        if (params.customerId) {
          result = result.filter(r => r.customerId === params.customerId);
        }
      }

      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error listing expenses:', error);
      return { success: false, error: error.message };
    }
  });

  // Get expense by ID
  ipcMain.handle('expenses:getById', async (_event, id: number) => {
    try {
      const db = getDatabase();
      const result = db.select({
        id: expenses.id,
        userId: expenses.userId,
        customerId: expenses.customerId,
        date: expenses.date,
        category: expenses.category,
        subcategory: expenses.subcategory,
        amount: expenses.amount,
        currency: expenses.currency,
        distance: expenses.distance,
        description: expenses.description,
        receiptPath: expenses.receiptPath,
        createdAt: expenses.createdAt,
        updatedAt: expenses.updatedAt,
        customer: {
          id: customers.id,
          name: customers.name
        }
      })
      .from(expenses)
      .leftJoin(customers, eq(expenses.customerId, customers.id))
      .where(eq(expenses.id, id))
      .get();

      if (!result) {
        return { success: false, error: 'Expense not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting expense:', error);
      return { success: false, error: error.message };
    }
  });

  // Create expense
  ipcMain.handle('expenses:create', async (_event, data: Partial<typeof expenses.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      // Validation
      if (!data.customerId || !data.date || !data.category || data.amount === undefined) {
        return { success: false, error: 'Kunde, Datum, Kategorie und Betrag sind erforderlich' };
      }

      const now = new Date().toISOString();
      const result = db.insert(expenses).values({
        userId: data.userId || 1,
        customerId: data.customerId,
        date: data.date,
        category: data.category,
        subcategory: data.subcategory || null,
        amount: data.amount,
        currency: data.currency || 'EUR',
        distance: data.distance || null,
        description: data.description || null,
        receiptPath: data.receiptPath || null,
        createdAt: now,
        updatedAt: now
      }).returning().get();

      log.info('Expense created:', { id: result.id, amount: result.amount });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error creating expense:', error);
      return { success: false, error: error.message };
    }
  });

  // Update expense
  ipcMain.handle('expenses:update', async (_event, id: number, data: Partial<typeof expenses.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      const result = db.update(expenses)
        .set({
          ...data,
          updatedAt: new Date().toISOString()
        })
        .where(eq(expenses.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Expense not found' };
      }

      log.info('Expense updated:', { id: result.id });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error updating expense:', error);
      return { success: false, error: error.message };
    }
  });

  // Delete expense
  ipcMain.handle('expenses:delete', async (_event, id: number) => {
    try {
      const db = getDatabase();
      
      const result = db.delete(expenses)
        .where(eq(expenses.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Expense not found' };
      }

      log.info('Expense deleted:', { id });
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error deleting expense:', error);
      return { success: false, error: error.message };
    }
  });
}
