import { ipcMain } from 'electron';
import { eq, and, desc, max } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { invoiceNumbers } = schema;

export function registerInvoiceNumbersHandlers(): void {
  // List invoice numbers
  ipcMain.handle('invoiceNumbers:list', async (_event, year?: number) => {
    try {
      const db = getDatabase();
      
      let result = db.select()
        .from(invoiceNumbers)
        .orderBy(desc(invoiceNumbers.createdAt))
        .all();

      if (year) {
        result = result.filter(r => r.year === year);
      }

      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error listing invoice numbers:', error);
      return { success: false, error: error.message };
    }
  });

  // Generate next invoice number
  ipcMain.handle('invoiceNumbers:generate', async (_event, year: number, customerId?: number) => {
    try {
      const db = getDatabase();
      
      // Get the highest sequence number for the year
      const existing = db.select()
        .from(invoiceNumbers)
        .where(eq(invoiceNumbers.year, year))
        .orderBy(desc(invoiceNumbers.sequence))
        .get();

      const nextSequence = existing ? existing.sequence + 1 : 1;
      const invoiceNumber = `${year}-${String(nextSequence).padStart(3, '0')}`;

      const now = new Date().toISOString();
      const result = db.insert(invoiceNumbers).values({
        userId: 1,
        invoiceNumber: invoiceNumber,
        year: year,
        sequence: nextSequence,
        customerId: customerId || null,
        createdAt: now
      }).returning().get();

      log.info('Invoice number generated:', { invoiceNumber });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error generating invoice number:', error);
      return { success: false, error: error.message };
    }
  });

  // Get next invoice number (preview without creating)
  ipcMain.handle('invoiceNumbers:getNext', async (_event, year: number) => {
    try {
      const db = getDatabase();
      
      // Get the highest sequence number for the year
      const existing = db.select()
        .from(invoiceNumbers)
        .where(eq(invoiceNumbers.year, year))
        .orderBy(desc(invoiceNumbers.sequence))
        .get();

      const nextSequence = existing ? existing.sequence + 1 : 1;
      const invoiceNumber = `${year}-${String(nextSequence).padStart(3, '0')}`;

      return { success: true, data: invoiceNumber };
    } catch (error: any) {
      log.error('Error getting next invoice number:', error);
      return { success: false, error: error.message };
    }
  });
}
