import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  openId: text('openId').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  loginMethod: text('loginMethod').notNull().default('local'),
  role: text('role').notNull().default('admin'),
  createdAt: text('createdAt').notNull().default(new Date().toISOString()),
  updatedAt: text('updatedAt').notNull().default(new Date().toISOString()),
  lastSignedIn: text('lastSignedIn')
});

// Customers table
export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  address: text('address'),
  taxId: text('taxId'),
  billingModel: text('billingModel').notNull().default('exclusive'), // 'exclusive' or 'inclusive'
  dailyRate: real('dailyRate').notNull(),
  currency: text('currency').notNull().default('EUR'),
  isArchived: integer('isArchived').notNull().default(0),
  createdAt: text('createdAt').notNull().default(new Date().toISOString()),
  updatedAt: text('updatedAt').notNull().default(new Date().toISOString())
});

// Time entries table
export const timeEntries = sqliteTable('time_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().references(() => users.id),
  customerId: integer('customerId').notNull().references(() => customers.id),
  date: text('date').notNull(), // YYYY-MM-DD
  projectName: text('projectName').notNull(),
  entryType: text('entryType').notNull(), // 'onsite', 'remote', 'off_duty', 'business_trip'
  hours: integer('hours').notNull(),
  minutes: integer('minutes').notNull().default(0),
  notes: text('notes'),
  createdAt: text('createdAt').notNull().default(new Date().toISOString()),
  updatedAt: text('updatedAt').notNull().default(new Date().toISOString())
});

// Expenses table
export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().references(() => users.id),
  customerId: integer('customerId').notNull().references(() => customers.id),
  date: text('date').notNull(), // YYYY-MM-DD
  category: text('category').notNull(), // 'transport', 'accommodation', 'meals', 'fuel', 'other'
  subcategory: text('subcategory'), // 'car', 'train', 'flight', 'hotel', 'restaurant', etc.
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('EUR'),
  distance: real('distance'), // in km (for travel expenses)
  description: text('description'),
  receiptPath: text('receiptPath'),
  createdAt: text('createdAt').notNull().default(new Date().toISOString()),
  updatedAt: text('updatedAt').notNull().default(new Date().toISOString())
});

// Fixed costs table
export const fixedCosts = sqliteTable('fixed_costs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().references(() => users.id),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'auto', 'phone', 'software', 'accounting', 'other'
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('EUR'),
  startDate: text('startDate').notNull(), // YYYY-MM-DD
  endDate: text('endDate'), // NULL = unlimited
  notes: text('notes'),
  createdAt: text('createdAt').notNull().default(new Date().toISOString()),
  updatedAt: text('updatedAt').notNull().default(new Date().toISOString())
});

// Exchange rates table
export const exchangeRates = sqliteTable('exchange_rates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(), // YYYY-MM-DD
  currencyPair: text('currencyPair').notNull(), // e.g., 'EUR/PLN'
  rate: real('rate').notNull(),
  source: text('source').notNull(), // 'NBP' or 'Manual'
  createdAt: text('createdAt').notNull().default(new Date().toISOString())
});

// Tax settings table
export const taxSettings = sqliteTable('tax_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().references(() => users.id),
  taxType: text('taxType').notNull(), // 'zus', 'health_insurance', 'income_tax'
  calculationType: text('calculationType').notNull(), // 'percentage' or 'fixed'
  value: real('value').notNull(),
  createdAt: text('createdAt').notNull().default(new Date().toISOString()),
  updatedAt: text('updatedAt').notNull().default(new Date().toISOString())
});

// Invoice numbers table
export const invoiceNumbers = sqliteTable('invoice_numbers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().references(() => users.id),
  invoiceNumber: text('invoiceNumber').notNull().unique(),
  year: integer('year').notNull(),
  sequence: integer('sequence').notNull(),
  customerId: integer('customerId').references(() => customers.id),
  createdAt: text('createdAt').notNull().default(new Date().toISOString())
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type TimeEntry = typeof timeEntries.$inferSelect;
export type NewTimeEntry = typeof timeEntries.$inferInsert;

export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

export type FixedCost = typeof fixedCosts.$inferSelect;
export type NewFixedCost = typeof fixedCosts.$inferInsert;

export type ExchangeRate = typeof exchangeRates.$inferSelect;
export type NewExchangeRate = typeof exchangeRates.$inferInsert;

export type TaxSetting = typeof taxSettings.$inferSelect;
export type NewTaxSetting = typeof taxSettings.$inferInsert;

export type InvoiceNumber = typeof invoiceNumbers.$inferSelect;
export type NewInvoiceNumber = typeof invoiceNumbers.$inferInsert;
