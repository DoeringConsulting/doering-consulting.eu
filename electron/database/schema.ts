import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  openId: text('open_id').unique().notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  loginMethod: text('login_method').notNull(),
  role: text('role').notNull().default('admin'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  lastSignedIn: text('last_signed_in'),
});

export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  address: text('address'),
  taxId: text('tax_id'),
  billingModel: text('billing_model').notNull(), // 'exclusive' or 'inclusive'
  dailyRate: real('daily_rate').notNull(),
  currency: text('currency').notNull().default('EUR'),
  isArchived: integer('is_archived').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const timeEntries = sqliteTable('time_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  customerId: integer('customer_id').references(() => customers.id).notNull(),
  date: text('date').notNull(),
  projectName: text('project_name').notNull(),
  entryType: text('entry_type').notNull(), // 'onsite', 'remote', 'off_duty', 'business_trip'
  hours: integer('hours').notNull(),
  minutes: integer('minutes').notNull().default(0),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  customerId: integer('customer_id').references(() => customers.id).notNull(),
  date: text('date').notNull(),
  category: text('category').notNull(), // 'transport', 'accommodation', 'meals', 'fuel', 'other'
  subcategory: text('subcategory'),
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('EUR'),
  distance: real('distance'),
  description: text('description'),
  receiptPath: text('receipt_path'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const fixedCosts = sqliteTable('fixed_costs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('EUR'),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const exchangeRates = sqliteTable('exchange_rates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),
  currencyPair: text('currency_pair').notNull(),
  rate: real('rate').notNull(),
  source: text('source').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const taxSettings = sqliteTable('tax_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  taxType: text('tax_type').notNull(),
  calculationType: text('calculation_type').notNull(),
  value: real('value').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const invoiceNumbers = sqliteTable('invoice_numbers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  invoiceNumber: text('invoice_number').unique().notNull(),
  year: integer('year').notNull(),
  sequence: integer('sequence').notNull(),
  customerId: integer('customer_id').references(() => customers.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
