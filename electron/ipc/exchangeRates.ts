import { ipcMain } from 'electron';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { exchangeRates } = schema;

// NBP API base URL
const NBP_API_BASE = 'https://api.nbp.pl/api/exchangerates/rates/a';

export function registerExchangeRatesHandlers(): void {
  // List exchange rates with optional date range
  ipcMain.handle('exchangeRates:list', async (_event, params?: { startDate?: string; endDate?: string }) => {
    try {
      const db = getDatabase();
      
      let result = db.select()
        .from(exchangeRates)
        .orderBy(desc(exchangeRates.date))
        .all();

      // Apply filters
      if (params) {
        if (params.startDate) {
          result = result.filter(r => r.date >= params.startDate!);
        }
        if (params.endDate) {
          result = result.filter(r => r.date <= params.endDate!);
        }
      }

      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error listing exchange rates:', error);
      return { success: false, error: error.message };
    }
  });

  // Get exchange rate by date and currency pair
  ipcMain.handle('exchangeRates:getByDate', async (_event, date: string, currencyPair: string) => {
    try {
      const db = getDatabase();
      const result = db.select()
        .from(exchangeRates)
        .where(and(
          eq(exchangeRates.date, date),
          eq(exchangeRates.currencyPair, currencyPair)
        ))
        .get();

      if (!result) {
        return { success: false, error: 'Exchange rate not found' };
      }
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error getting exchange rate:', error);
      return { success: false, error: error.message };
    }
  });

  // Create manual exchange rate
  ipcMain.handle('exchangeRates:create', async (_event, data: Partial<typeof exchangeRates.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      // Validation
      if (!data.date || !data.currencyPair || data.rate === undefined) {
        return { success: false, error: 'Datum, Währungspaar und Kurs sind erforderlich' };
      }

      // Check if rate already exists
      const existing = db.select()
        .from(exchangeRates)
        .where(and(
          eq(exchangeRates.date, data.date),
          eq(exchangeRates.currencyPair, data.currencyPair)
        ))
        .get();

      if (existing) {
        // Update existing
        const result = db.update(exchangeRates)
          .set({
            rate: data.rate,
            source: data.source || 'Manual'
          })
          .where(eq(exchangeRates.id, existing.id))
          .returning()
          .get();
        return { success: true, data: result };
      }

      const now = new Date().toISOString();
      const result = db.insert(exchangeRates).values({
        date: data.date,
        currencyPair: data.currencyPair,
        rate: data.rate,
        source: data.source || 'Manual',
        createdAt: now
      }).returning().get();

      log.info('Exchange rate created:', { date: result.date, pair: result.currencyPair });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error creating exchange rate:', error);
      return { success: false, error: error.message };
    }
  });

  // Fetch exchange rate from NBP API
  ipcMain.handle('exchangeRates:fetchFromNBP', async (_event, date: string, currency: string) => {
    try {
      const db = getDatabase();
      const currencyPair = `${currency}/PLN`;
      
      // Check cache first
      const cached = db.select()
        .from(exchangeRates)
        .where(and(
          eq(exchangeRates.date, date),
          eq(exchangeRates.currencyPair, currencyPair)
        ))
        .get();

      if (cached && cached.source === 'NBP') {
        return { success: true, data: cached };
      }

      // Try to fetch from NBP
      let fetchedRate: number | null = null;
      let effectiveDate: string = date;

      // Try exact date first, then fallback to previous days
      for (let i = 0; i <= 7; i++) {
        const targetDate = new Date(date);
        targetDate.setDate(targetDate.getDate() - i);
        const dateStr = targetDate.toISOString().split('T')[0];

        try {
          const url = `${NBP_API_BASE}/${currency.toLowerCase()}/${dateStr}/?format=json`;
          const response = await fetch(url);
          
          if (response.ok) {
            const data = await response.json() as { rates?: Array<{ mid: number; effectiveDate: string }> };
            if (data.rates && data.rates[0]) {
              fetchedRate = data.rates[0].mid;
              effectiveDate = data.rates[0].effectiveDate;
              break;
            }
          }
        } catch {
          continue; // Try previous day
        }
      }

      if (fetchedRate === null) {
        return { success: false, error: 'Kein Wechselkurs verfügbar für das angegebene Datum' };
      }

      // Save to database
      const now = new Date().toISOString();
      
      // Use upsert logic
      const existing = db.select()
        .from(exchangeRates)
        .where(and(
          eq(exchangeRates.date, date),
          eq(exchangeRates.currencyPair, currencyPair)
        ))
        .get();

      let result;
      if (existing) {
        result = db.update(exchangeRates)
          .set({
            rate: fetchedRate,
            source: 'NBP'
          })
          .where(eq(exchangeRates.id, existing.id))
          .returning()
          .get();
      } else {
        result = db.insert(exchangeRates).values({
          date: date,
          currencyPair: currencyPair,
          rate: fetchedRate,
          source: 'NBP',
          createdAt: now
        }).returning().get();
      }

      log.info('Exchange rate fetched from NBP:', { date, pair: currencyPair, rate: fetchedRate });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error fetching exchange rate from NBP:', error);
      return { success: false, error: error.message };
    }
  });

  // Update exchange rate
  ipcMain.handle('exchangeRates:update', async (_event, id: number, data: Partial<typeof exchangeRates.$inferInsert>) => {
    try {
      const db = getDatabase();
      
      const result = db.update(exchangeRates)
        .set({
          rate: data.rate,
          source: data.source || 'Manual'
        })
        .where(eq(exchangeRates.id, id))
        .returning()
        .get();

      if (!result) {
        return { success: false, error: 'Exchange rate not found' };
      }

      log.info('Exchange rate updated:', { id: result.id });
      return { success: true, data: result };
    } catch (error: any) {
      log.error('Error updating exchange rate:', error);
      return { success: false, error: error.message };
    }
  });
}
