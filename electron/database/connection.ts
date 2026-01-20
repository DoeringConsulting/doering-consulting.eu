import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import path from 'path';
import fs from 'fs';
import * as schema from './schema';
import log from '../utils/logger';

let db: BetterSQLite3Database<typeof schema> | null = null;
let sqlite: Database.Database | null = null;

// Initial schema SQL
const initialSchema = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  openId TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  loginMethod TEXT NOT NULL DEFAULT 'local',
  role TEXT NOT NULL DEFAULT 'admin',
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  lastSignedIn TEXT
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  taxId TEXT,
  billingModel TEXT NOT NULL DEFAULT 'exclusive',
  dailyRate REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  isArchived INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Time entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  customerId INTEGER NOT NULL,
  date TEXT NOT NULL,
  projectName TEXT NOT NULL,
  entryType TEXT NOT NULL,
  hours INTEGER NOT NULL,
  minutes INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (customerId) REFERENCES customers(id)
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  customerId INTEGER NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  distance REAL,
  description TEXT,
  receiptPath TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (customerId) REFERENCES customers(id)
);

-- Fixed costs table
CREATE TABLE IF NOT EXISTS fixed_costs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  startDate TEXT NOT NULL,
  endDate TEXT,
  notes TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Exchange rates table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  currencyPair TEXT NOT NULL,
  rate REAL NOT NULL,
  source TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(date, currencyPair)
);

-- Tax settings table
CREATE TABLE IF NOT EXISTS tax_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  taxType TEXT NOT NULL,
  calculationType TEXT NOT NULL,
  value REAL NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (userId) REFERENCES users(id),
  UNIQUE(userId, taxType)
);

-- Invoice numbers table
CREATE TABLE IF NOT EXISTS invoice_numbers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  invoiceNumber TEXT NOT NULL UNIQUE,
  year INTEGER NOT NULL,
  sequence INTEGER NOT NULL,
  customerId INTEGER,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (customerId) REFERENCES customers(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(date);
CREATE INDEX IF NOT EXISTS idx_time_entries_customer ON time_entries(customerId);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_customer ON expenses(customerId);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_date ON exchange_rates(date);
CREATE INDEX IF NOT EXISTS idx_invoice_numbers_year ON invoice_numbers(year);
`;

// Default user creation
const defaultUserSql = `
INSERT OR IGNORE INTO users (openId, name, email, loginMethod, role)
VALUES ('local-admin', 'Administrator', 'admin@local', 'local', 'admin');
`;

// Default tax settings
const defaultTaxSettingsSql = `
INSERT OR IGNORE INTO tax_settings (userId, taxType, calculationType, value)
VALUES 
  (1, 'zus', 'fixed', 1600.32),
  (1, 'health_insurance', 'fixed', 381.78),
  (1, 'income_tax', 'percentage', 12);
`;

export async function initDatabase(dataPath: string): Promise<BetterSQLite3Database<typeof schema>> {
  const dbPath = path.join(dataPath, 'database', 'app.db');
  const dbDir = path.dirname(dbPath);

  // Ensure directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  log.info(`Initializing database at: ${dbPath}`);

  // Initialize SQLite
  sqlite = new Database(dbPath);
  
  // Enable WAL mode for better performance
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.pragma('cache_size = -10000'); // 10 MB cache
  sqlite.pragma('synchronous = NORMAL');

  // Run initial schema
  sqlite.exec(initialSchema);
  
  // Create default user
  sqlite.exec(defaultUserSql);
  
  // Create default tax settings
  sqlite.exec(defaultTaxSettingsSql);

  // Initialize Drizzle ORM
  db = drizzle(sqlite, { schema });

  log.info('Database initialized successfully');

  // Create automatic backup
  createAutoBackup(dataPath);

  return db;
}

export function getDatabase(): BetterSQLite3Database<typeof schema> {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function getSQLite(): Database.Database {
  if (!sqlite) {
    throw new Error('SQLite not initialized. Call initDatabase() first.');
  }
  return sqlite;
}

export function closeDatabase(): void {
  if (sqlite) {
    log.info('Closing database connection');
    sqlite.close();
    sqlite = null;
    db = null;
  }
}

function createAutoBackup(dataPath: string): void {
  try {
    const dbPath = path.join(dataPath, 'database', 'app.db');
    const backupDir = path.join(dataPath, 'database', 'backups');

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const backupFile = path.join(backupDir, `app_backup_${timestamp}.db`);

    // Only create backup if it doesn't exist for today
    if (!fs.existsSync(backupFile) && fs.existsSync(dbPath)) {
      fs.copyFileSync(dbPath, backupFile);
      log.info(`Auto backup created: ${backupFile}`);

      // Clean old backups (keep last 30)
      const files = fs.readdirSync(backupDir)
        .filter(f => f.startsWith('app_backup_'))
        .sort()
        .reverse();

      if (files.length > 30) {
        files.slice(30).forEach(f => {
          fs.unlinkSync(path.join(backupDir, f));
          log.info(`Deleted old backup: ${f}`);
        });
      }
    }
  } catch (error) {
    log.error('Failed to create auto backup:', error);
  }
}

export { schema };
