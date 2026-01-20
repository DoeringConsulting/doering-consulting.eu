import { ipcMain, dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import { getDatabase, schema, getSQLite } from '../database/connection';
import { ensureDirectoryStructure, POLISH_MONTHS } from '../filesystem/manager';
import log from '../utils/logger';

let dataPath: string = '';

export function registerBackupHandlers(basePath: string): void {
  dataPath = basePath;

  // Create backup
  ipcMain.handle('backup:create', async () => {
    try {
      const dbPath = path.join(dataPath, 'database', 'app.db');
      const backupDir = path.join(dataPath, 'database', 'backups');

      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(backupDir, `app_backup_${timestamp}.db`);

      // Use SQLite backup command for safe backup
      const sqlite = getSQLite();
      sqlite.backup(backupFile).then(() => {
        log.info(`Backup created: ${backupFile}`);
      });

      // For now, just copy the file
      fs.copyFileSync(dbPath, backupFile);
      
      log.info(`Backup created: ${backupFile}`);
      return { success: true, data: backupFile };
    } catch (error: any) {
      log.error('Error creating backup:', error);
      return { success: false, error: error.message };
    }
  });

  // Restore backup
  ipcMain.handle('backup:restore', async (_event, backupPath: string) => {
    try {
      const dbPath = path.join(dataPath, 'database', 'app.db');
      
      // Verify backup file exists
      if (!fs.existsSync(backupPath)) {
        return { success: false, error: 'Backup file not found' };
      }

      // Create safety backup before restore
      const safetyBackupDir = path.join(dataPath, 'database', 'backups');
      if (!fs.existsSync(safetyBackupDir)) {
        fs.mkdirSync(safetyBackupDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const safetyBackup = path.join(safetyBackupDir, `pre_restore_backup_${timestamp}.db`);
      
      if (fs.existsSync(dbPath)) {
        fs.copyFileSync(dbPath, safetyBackup);
        log.info(`Safety backup created: ${safetyBackup}`);
      }

      // Copy backup to database location
      fs.copyFileSync(backupPath, dbPath);
      
      log.info(`Backup restored from: ${backupPath}`);
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error restoring backup:', error);
      return { success: false, error: error.message };
    }
  });

  // List backups
  ipcMain.handle('backup:list', async () => {
    try {
      const backupDir = path.join(dataPath, 'database', 'backups');
      
      if (!fs.existsSync(backupDir)) {
        return { success: true, data: [] };
      }

      const files = fs.readdirSync(backupDir)
        .filter(f => f.endsWith('.db'))
        .map(f => {
          const filePath = path.join(backupDir, f);
          const stats = fs.statSync(filePath);
          return {
            name: f,
            path: filePath,
            date: stats.mtime,
            size: stats.size
          };
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      return { success: true, data: files };
    } catch (error: any) {
      log.error('Error listing backups:', error);
      return { success: false, error: error.message };
    }
  });

  // Export data as JSON
  ipcMain.handle('backup:exportData', async () => {
    try {
      const db = getDatabase();
      
      // Export all tables
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        users: db.select().from(schema.users).all(),
        customers: db.select().from(schema.customers).all(),
        timeEntries: db.select().from(schema.timeEntries).all(),
        expenses: db.select().from(schema.expenses).all(),
        fixedCosts: db.select().from(schema.fixedCosts).all(),
        exchangeRates: db.select().from(schema.exchangeRates).all(),
        taxSettings: db.select().from(schema.taxSettings).all(),
        invoiceNumbers: db.select().from(schema.invoiceNumbers).all()
      };

      // Save to file
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      
      await ensureDirectoryStructure(dataPath, year, month);
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const monthFolder = `${String(month).padStart(2, '0')}-${POLISH_MONTHS[month - 1]}`;
      const exportPath = path.join(
        dataPath, 
        String(year), 
        monthFolder, 
        'Kopie_zapasowe', 
        `DoringConsulting_${year}_${monthFolder}_Kopie_zapasowe_Export-${timestamp}.json`
      );

      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
      
      log.info(`Data exported to: ${exportPath}`);
      return { success: true, data: exportPath };
    } catch (error: any) {
      log.error('Error exporting data:', error);
      return { success: false, error: error.message };
    }
  });

  // Import data from JSON
  ipcMain.handle('backup:importData', async (_event, jsonData: string) => {
    try {
      const db = getDatabase();
      const data = JSON.parse(jsonData);

      // Validate data structure
      if (!data.version || !data.exportDate) {
        return { success: false, error: 'Invalid backup format' };
      }

      // Import customers
      if (data.customers && Array.isArray(data.customers)) {
        for (const customer of data.customers) {
          try {
            db.insert(schema.customers).values({
              ...customer,
              createdAt: customer.createdAt || new Date().toISOString(),
              updatedAt: customer.updatedAt || new Date().toISOString()
            }).run();
          } catch {
            // Skip duplicates
          }
        }
      }

      // Import time entries
      if (data.timeEntries && Array.isArray(data.timeEntries)) {
        for (const entry of data.timeEntries) {
          try {
            db.insert(schema.timeEntries).values({
              ...entry,
              userId: entry.userId || 1,
              createdAt: entry.createdAt || new Date().toISOString(),
              updatedAt: entry.updatedAt || new Date().toISOString()
            }).run();
          } catch {
            // Skip duplicates
          }
        }
      }

      // Import expenses
      if (data.expenses && Array.isArray(data.expenses)) {
        for (const expense of data.expenses) {
          try {
            db.insert(schema.expenses).values({
              ...expense,
              userId: expense.userId || 1,
              createdAt: expense.createdAt || new Date().toISOString(),
              updatedAt: expense.updatedAt || new Date().toISOString()
            }).run();
          } catch {
            // Skip duplicates
          }
        }
      }

      // Import fixed costs
      if (data.fixedCosts && Array.isArray(data.fixedCosts)) {
        for (const cost of data.fixedCosts) {
          try {
            db.insert(schema.fixedCosts).values({
              ...cost,
              userId: cost.userId || 1,
              createdAt: cost.createdAt || new Date().toISOString(),
              updatedAt: cost.updatedAt || new Date().toISOString()
            }).run();
          } catch {
            // Skip duplicates
          }
        }
      }

      // Import exchange rates
      if (data.exchangeRates && Array.isArray(data.exchangeRates)) {
        for (const rate of data.exchangeRates) {
          try {
            db.insert(schema.exchangeRates).values({
              ...rate,
              createdAt: rate.createdAt || new Date().toISOString()
            }).run();
          } catch {
            // Skip duplicates
          }
        }
      }

      // Import tax settings
      if (data.taxSettings && Array.isArray(data.taxSettings)) {
        for (const setting of data.taxSettings) {
          try {
            db.insert(schema.taxSettings).values({
              ...setting,
              userId: setting.userId || 1,
              createdAt: setting.createdAt || new Date().toISOString(),
              updatedAt: setting.updatedAt || new Date().toISOString()
            }).run();
          } catch {
            // Skip duplicates
          }
        }
      }

      log.info('Data imported successfully');
      return { success: true, data: true };
    } catch (error: any) {
      log.error('Error importing data:', error);
      return { success: false, error: error.message };
    }
  });
}
