import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import fs from 'fs';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;
let sqlite: Database.Database | null = null;

export function initDatabase(dataPath: string) {
  const dbPath = path.join(dataPath, 'database', 'app.db');
  
  // Ensure directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  // Initialize SQLite
  sqlite = new Database(dbPath);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  
  // Initialize Drizzle ORM
  db = drizzle(sqlite, { schema });
  
  // Run migrations
  // In a real app, you would run migrations here.
  // For now, we'll assume schema push or manual migration management.
  // const migrationsPath = path.join(__dirname, 'migrations');
  // migrate(db, { migrationsFolder: migrationsPath });
  
  // Auto-create tables if they don't exist (simple approach for now)
  // detailed migration management is recommended for production updates
  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      open_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      login_method TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      last_signed_in TEXT
    );
  `).run();

  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      tax_id TEXT,
      billing_model TEXT NOT NULL,
      daily_rate REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'EUR',
      is_archived INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

   sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS time_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      customer_id INTEGER NOT NULL REFERENCES customers(id),
      date TEXT NOT NULL,
      project_name TEXT NOT NULL,
      entry_type TEXT NOT NULL,
      hours INTEGER NOT NULL,
      minutes INTEGER NOT NULL DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      customer_id INTEGER NOT NULL REFERENCES customers(id),
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      subcategory TEXT,
      amount REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'EUR',
      distance REAL,
      description TEXT,
      receipt_path TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS fixed_costs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'EUR',
      start_date TEXT NOT NULL,
      end_date TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS exchange_rates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      currency_pair TEXT NOT NULL,
      rate REAL NOT NULL,
      source TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(date, currency_pair)
    );
  `).run();

  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS tax_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      tax_type TEXT NOT NULL,
      calculation_type TEXT NOT NULL,
      value REAL NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, tax_type)
    );
  `).run();

  sqlite.prepare(`
    CREATE TABLE IF NOT EXISTS invoice_numbers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      invoice_number TEXT UNIQUE NOT NULL,
      year INTEGER NOT NULL,
      sequence INTEGER NOT NULL,
      customer_id INTEGER REFERENCES customers(id),
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `).run();
  
  console.log('Database initialized at:', dbPath);
  
  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function closeDatabase() {
  if (sqlite) {
    sqlite.close();
    sqlite = null;
    db = null;
  }
}
