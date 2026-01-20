import { ipcMain } from 'electron';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { timeEntries, customers } = schema;

interface ListParams {
  startDate?: string;
  endDate?: string;
  customerId?: number;
}

export function registerTimeEntriesHandlers(): void {
  // List time entries with optional filters
  ipcMain.handle('timeEntries:list', async (_event, params?: ListParams) => {
    try {
      const db = getDatabase();
      
      let query = db.select({
        id: timeEntries.id,
        userId: timeEntries.userId,
        customerId: timeEntries.customerId,
        date: timeEntries.date,
        projectName: timeEntries.projectName,
        entryType: timeEntries.entryType,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        notes: timeEntries.notes,
        createdAt: timeEntries.createdAt,
        updatedAt: timeEntries.updatedAt,
        customer: {
          id: customers.id,
          name: customers.name,
          dailyRate: customers.dailyRate,
          currency: customers.currency,
          billingModel: customers.billingModel
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .orderBy(desc(timeEntries.date));
      
      let result = query.all();

      // Apply filters in JavaScript (Drizzle's dynamic where is limited)
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
      log.error('Error listing time entries:', error);
      return { success: false, error: error.message };
    }
  });

  // Get time entry by ID
  ipcMain.handle('timeEntries:getById', async (_event, id: number) => {
    try {
      const db = getDatabase();
      const result = db.select({
        id: timeEntries.id,
        userId: timeEntries.userId,
        customerId: timeEntries.customerId,
        date: timeEntries.date,
        projectName: timeEntries.projectName,
        entryType: timeEntries.entryType,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        notes: timeEntries.notes,
        createdAt: timeEntries.createdAt,
        updatedAt: timeEntries.updatedAt,
        customer: {
          id: customers.id,
          name: customers.name,
          dailyRate: customers.dailyRate,
          currency: customers.currency,
          billingModel: customers.billingModel
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .where(eq(timeEntries.id, id))
      .get();

      if (!result) {
        return { success: false, error: 'Time entry not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting time entry:', error);
      return { success: false, error: error.message };
    }
  });

  // Create time entry
  ipcMain.handle('timeEntries:create', async (_event, data: Partial<typeof timeEntries.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      // Validation
      if (!data.customerId || !data.date || !data.projectName || data.hours === undefined) {
        return { success: false, error: 'Kunde, Datum, Projektname und Stunden sind erforderlich' };
      }

      const now = new Date().toISOString();
      const result = db.insert(timeEntries).values({
        userId: data.userId || 1, // Default to admin user
        customerId: data.customerId,
        date: data.date,
        projectName: data.projectName,
        entryType: data.entryType || 'onsite',
        hours: data.hours,
        minutes: data.minutes || 0,
        notes: data.notes || null,
        createdAt: now,
        updatedAt: now
      }).returning().get();

      log.info('Time entry created:', { id: result.id, date: result.date });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error creating time entry:', error);
      return { success: false, error: error.message };
    }
  });

  // Update time entry
  ipcMain.handle('timeEntries:update', async (_event, id: number, data: Partial<typeof timeEntries.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      const result = db.update(timeEntries)
        .set({
          ...data,
          updatedAt: new Date().toISOString()
        })
        .where(eq(timeEntries.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Time entry not found' };
      }

      log.info('Time entry updated:', { id: result.id });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error updating time entry:', error);
      return { success: false, error: error.message };
    }
  });

  // Delete time entry
  ipcMain.handle('timeEntries:delete', async (_event, id: number) => {
    try {
      const db = getDatabase();
      
      const result = db.delete(timeEntries)
        .where(eq(timeEntries.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Time entry not found' };
      }

      log.info('Time entry deleted:', { id });
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error deleting time entry:', error);
      return { success: false, error: error.message };
    }
  });

  // Bulk create time entries
  ipcMain.handle('timeEntries:bulkCreate', async (_event, entries: Partial<typeof timeEntries.$inferInsert>[]) => {
    try {
      const db = getDatabase();
      const now = new Date().toISOString();
      
      const results = [];
      for (const entry of entries) {
        if (!entry.customerId || !entry.date || !entry.projectName || entry.hours === undefined) {
          continue; // Skip invalid entries
        }

        const result = db.insert(timeEntries).values({
          userId: entry.userId || 1,
          customerId: entry.customerId,
          date: entry.date,
          projectName: entry.projectName,
          entryType: entry.entryType || 'onsite',
          hours: entry.hours,
          minutes: entry.minutes || 0,
          notes: entry.notes || null,
          createdAt: now,
          updatedAt: now
        }).returning().get();
        
        results.push(result);
      }

      log.info('Bulk time entries created:', { count: results.length });
      return { success: true, data: results };
    } catch (error: any) {
      log.error('Error bulk creating time entries:', error);
      return { success: false, error: error.message };
    }
  });

  // Get time entries by date range
  ipcMain.handle('timeEntries:getByDateRange', async (_event, startDate: string, endDate: string) => {
    try {
      const db = getDatabase();
      
      const result = db.select({
        id: timeEntries.id,
        userId: timeEntries.userId,
        customerId: timeEntries.customerId,
        date: timeEntries.date,
        projectName: timeEntries.projectName,
        entryType: timeEntries.entryType,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        notes: timeEntries.notes,
        createdAt: timeEntries.createdAt,
        updatedAt: timeEntries.updatedAt,
        customer: {
          id: customers.id,
          name: customers.name,
          dailyRate: customers.dailyRate,
          currency: customers.currency,
          billingModel: customers.billingModel
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .where(and(
        gte(timeEntries.date, startDate),
        lte(timeEntries.date, endDate)
      ))
      .orderBy(desc(timeEntries.date))
      .all();

      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting time entries by date range:', error);
      return { success: false, error: error.message };
    }
  });
}
