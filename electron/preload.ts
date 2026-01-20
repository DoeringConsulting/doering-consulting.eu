import { contextBridge, ipcRenderer } from 'electron';

// Type definitions for the API
export interface Customer {
  id: number;
  name: string;
  address?: string;
  taxId?: string;
  billingModel: 'exclusive' | 'inclusive';
  dailyRate: number;
  currency: string;
  isArchived: number;
  createdAt: string;
  updatedAt: string;
}

export interface TimeEntry {
  id: number;
  userId: number;
  customerId: number;
  date: string;
  projectName: string;
  entryType: 'onsite' | 'remote' | 'off_duty' | 'business_trip';
  hours: number;
  minutes: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
}

export interface Expense {
  id: number;
  userId: number;
  customerId: number;
  date: string;
  category: string;
  subcategory?: string;
  amount: number;
  currency: string;
  distance?: number;
  description?: string;
  receiptPath?: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
}

export interface FixedCost {
  id: number;
  userId: number;
  name: string;
  category: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeRate {
  id: number;
  date: string;
  currencyPair: string;
  rate: number;
  source: string;
  createdAt: string;
}

export interface TaxSetting {
  id: number;
  userId: number;
  taxType: string;
  calculationType: 'percentage' | 'fixed';
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceNumber {
  id: number;
  userId: number;
  invoiceNumber: string;
  year: number;
  sequence: number;
  customerId?: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Expose API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Customers
  customers: {
    list: (): Promise<ApiResponse<Customer[]>> => 
      ipcRenderer.invoke('customers:list'),
    getById: (id: number): Promise<ApiResponse<Customer>> => 
      ipcRenderer.invoke('customers:getById', id),
    create: (data: Partial<Customer>): Promise<ApiResponse<Customer>> => 
      ipcRenderer.invoke('customers:create', data),
    update: (id: number, data: Partial<Customer>): Promise<ApiResponse<Customer>> => 
      ipcRenderer.invoke('customers:update', id, data),
    delete: (id: number): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('customers:delete', id),
    archive: (id: number): Promise<ApiResponse<Customer>> => 
      ipcRenderer.invoke('customers:archive', id),
    unarchive: (id: number): Promise<ApiResponse<Customer>> => 
      ipcRenderer.invoke('customers:unarchive', id)
  },

  // Time Entries
  timeEntries: {
    list: (params?: { startDate?: string; endDate?: string; customerId?: number }): Promise<ApiResponse<TimeEntry[]>> => 
      ipcRenderer.invoke('timeEntries:list', params),
    getById: (id: number): Promise<ApiResponse<TimeEntry>> => 
      ipcRenderer.invoke('timeEntries:getById', id),
    create: (data: Partial<TimeEntry>): Promise<ApiResponse<TimeEntry>> => 
      ipcRenderer.invoke('timeEntries:create', data),
    update: (id: number, data: Partial<TimeEntry>): Promise<ApiResponse<TimeEntry>> => 
      ipcRenderer.invoke('timeEntries:update', id, data),
    delete: (id: number): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('timeEntries:delete', id),
    bulkCreate: (entries: Partial<TimeEntry>[]): Promise<ApiResponse<TimeEntry[]>> => 
      ipcRenderer.invoke('timeEntries:bulkCreate', entries),
    getByDateRange: (startDate: string, endDate: string): Promise<ApiResponse<TimeEntry[]>> => 
      ipcRenderer.invoke('timeEntries:getByDateRange', startDate, endDate)
  },

  // Expenses
  expenses: {
    list: (params?: { startDate?: string; endDate?: string; customerId?: number }): Promise<ApiResponse<Expense[]>> => 
      ipcRenderer.invoke('expenses:list', params),
    getById: (id: number): Promise<ApiResponse<Expense>> => 
      ipcRenderer.invoke('expenses:getById', id),
    create: (data: Partial<Expense>): Promise<ApiResponse<Expense>> => 
      ipcRenderer.invoke('expenses:create', data),
    update: (id: number, data: Partial<Expense>): Promise<ApiResponse<Expense>> => 
      ipcRenderer.invoke('expenses:update', id, data),
    delete: (id: number): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('expenses:delete', id)
  },

  // Fixed Costs
  fixedCosts: {
    list: (): Promise<ApiResponse<FixedCost[]>> => 
      ipcRenderer.invoke('fixedCosts:list'),
    getById: (id: number): Promise<ApiResponse<FixedCost>> => 
      ipcRenderer.invoke('fixedCosts:getById', id),
    create: (data: Partial<FixedCost>): Promise<ApiResponse<FixedCost>> => 
      ipcRenderer.invoke('fixedCosts:create', data),
    update: (id: number, data: Partial<FixedCost>): Promise<ApiResponse<FixedCost>> => 
      ipcRenderer.invoke('fixedCosts:update', id, data),
    delete: (id: number): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('fixedCosts:delete', id),
    getActiveForMonth: (year: number, month: number): Promise<ApiResponse<FixedCost[]>> => 
      ipcRenderer.invoke('fixedCosts:getActiveForMonth', year, month)
  },

  // Exchange Rates
  exchangeRates: {
    list: (params?: { startDate?: string; endDate?: string }): Promise<ApiResponse<ExchangeRate[]>> => 
      ipcRenderer.invoke('exchangeRates:list', params),
    getByDate: (date: string, currencyPair: string): Promise<ApiResponse<ExchangeRate>> => 
      ipcRenderer.invoke('exchangeRates:getByDate', date, currencyPair),
    create: (data: Partial<ExchangeRate>): Promise<ApiResponse<ExchangeRate>> => 
      ipcRenderer.invoke('exchangeRates:create', data),
    fetchFromNBP: (date: string, currency: string): Promise<ApiResponse<ExchangeRate>> => 
      ipcRenderer.invoke('exchangeRates:fetchFromNBP', date, currency),
    update: (id: number, data: Partial<ExchangeRate>): Promise<ApiResponse<ExchangeRate>> => 
      ipcRenderer.invoke('exchangeRates:update', id, data)
  },

  // Tax Settings
  taxSettings: {
    list: (): Promise<ApiResponse<TaxSetting[]>> => 
      ipcRenderer.invoke('taxSettings:list'),
    get: (taxType: string): Promise<ApiResponse<TaxSetting>> => 
      ipcRenderer.invoke('taxSettings:get', taxType),
    upsert: (data: Partial<TaxSetting>): Promise<ApiResponse<TaxSetting>> => 
      ipcRenderer.invoke('taxSettings:upsert', data)
  },

  // Invoice Numbers
  invoiceNumbers: {
    list: (year?: number): Promise<ApiResponse<InvoiceNumber[]>> => 
      ipcRenderer.invoke('invoiceNumbers:list', year),
    generate: (year: number, customerId?: number): Promise<ApiResponse<InvoiceNumber>> => 
      ipcRenderer.invoke('invoiceNumbers:generate', year, customerId),
    getNext: (year: number): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('invoiceNumbers:getNext', year)
  },

  // Reports
  reports: {
    generateMonthlyReport: (year: number, month: number): Promise<ApiResponse<any>> => 
      ipcRenderer.invoke('reports:generateMonthlyReport', year, month),
    generateCustomerReport: (customerId: number, startDate: string, endDate: string): Promise<ApiResponse<any>> => 
      ipcRenderer.invoke('reports:generateCustomerReport', customerId, startDate, endDate),
    getDashboardData: (): Promise<ApiResponse<any>> => 
      ipcRenderer.invoke('reports:getDashboardData'),
    getYearlySummary: (year: number): Promise<ApiResponse<any>> => 
      ipcRenderer.invoke('reports:getYearlySummary', year)
  },

  // Files
  files: {
    selectFolder: (): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('files:selectFolder'),
    save: (data: { category: string; filename: string; data: ArrayBuffer; year: number; month: number }): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('files:save', data),
    read: (filePath: string): Promise<ApiResponse<ArrayBuffer>> => 
      ipcRenderer.invoke('files:read', filePath),
    exists: (filePath: string): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('files:exists', filePath),
    createDirectory: (dirPath: string): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('files:createDirectory', dirPath),
    listFiles: (params: { year: number; month: number; category: string }): Promise<ApiResponse<string[]>> => 
      ipcRenderer.invoke('files:listFiles', params),
    openFolder: (folderPath: string): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('files:openFolder', folderPath),
    saveReceipt: (data: ArrayBuffer, filename: string): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('files:saveReceipt', data, filename)
  },

  // Settings
  settings: {
    get: (key: string): Promise<ApiResponse<any>> => 
      ipcRenderer.invoke('settings:get', key),
    set: (key: string, value: any): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('settings:set', key, value),
    getAll: (): Promise<ApiResponse<Record<string, any>>> => 
      ipcRenderer.invoke('settings:getAll'),
    getDataPath: (): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('settings:getDataPath'),
    setDataPath: (path: string): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('settings:setDataPath', path)
  },

  // Backup
  backup: {
    create: (): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('backup:create'),
    restore: (backupPath: string): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('backup:restore', backupPath),
    list: (): Promise<ApiResponse<{ name: string; date: Date; size: number }[]>> => 
      ipcRenderer.invoke('backup:list'),
    exportData: (): Promise<ApiResponse<string>> => 
      ipcRenderer.invoke('backup:exportData'),
    importData: (data: string): Promise<ApiResponse<boolean>> => 
      ipcRenderer.invoke('backup:importData', data)
  },

  // System
  platform: process.platform,
  isOnline: (): boolean => true, // Will be determined in renderer process

  // Event listeners
  on: (channel: string, callback: (...args: any[]) => void): void => {
    const validChannels = ['update:available', 'update:downloaded', 'backup:progress', 'settings:changed'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event, ...args) => callback(...args));
    }
  },

  removeListener: (channel: string, callback: (...args: any[]) => void): void => {
    ipcRenderer.removeListener(channel, callback);
  }
});

// Type declarations for window.electronAPI
declare global {
  interface Window {
    electronAPI: {
      customers: {
        list: () => Promise<ApiResponse<Customer[]>>;
        getById: (id: number) => Promise<ApiResponse<Customer>>;
        create: (data: Partial<Customer>) => Promise<ApiResponse<Customer>>;
        update: (id: number, data: Partial<Customer>) => Promise<ApiResponse<Customer>>;
        delete: (id: number) => Promise<ApiResponse<boolean>>;
        archive: (id: number) => Promise<ApiResponse<Customer>>;
        unarchive: (id: number) => Promise<ApiResponse<Customer>>;
      };
      timeEntries: {
        list: (params?: { startDate?: string; endDate?: string; customerId?: number }) => Promise<ApiResponse<TimeEntry[]>>;
        getById: (id: number) => Promise<ApiResponse<TimeEntry>>;
        create: (data: Partial<TimeEntry>) => Promise<ApiResponse<TimeEntry>>;
        update: (id: number, data: Partial<TimeEntry>) => Promise<ApiResponse<TimeEntry>>;
        delete: (id: number) => Promise<ApiResponse<boolean>>;
        bulkCreate: (entries: Partial<TimeEntry>[]) => Promise<ApiResponse<TimeEntry[]>>;
        getByDateRange: (startDate: string, endDate: string) => Promise<ApiResponse<TimeEntry[]>>;
      };
      expenses: {
        list: (params?: { startDate?: string; endDate?: string; customerId?: number }) => Promise<ApiResponse<Expense[]>>;
        getById: (id: number) => Promise<ApiResponse<Expense>>;
        create: (data: Partial<Expense>) => Promise<ApiResponse<Expense>>;
        update: (id: number, data: Partial<Expense>) => Promise<ApiResponse<Expense>>;
        delete: (id: number) => Promise<ApiResponse<boolean>>;
      };
      fixedCosts: {
        list: () => Promise<ApiResponse<FixedCost[]>>;
        getById: (id: number) => Promise<ApiResponse<FixedCost>>;
        create: (data: Partial<FixedCost>) => Promise<ApiResponse<FixedCost>>;
        update: (id: number, data: Partial<FixedCost>) => Promise<ApiResponse<FixedCost>>;
        delete: (id: number) => Promise<ApiResponse<boolean>>;
        getActiveForMonth: (year: number, month: number) => Promise<ApiResponse<FixedCost[]>>;
      };
      exchangeRates: {
        list: (params?: { startDate?: string; endDate?: string }) => Promise<ApiResponse<ExchangeRate[]>>;
        getByDate: (date: string, currencyPair: string) => Promise<ApiResponse<ExchangeRate>>;
        create: (data: Partial<ExchangeRate>) => Promise<ApiResponse<ExchangeRate>>;
        fetchFromNBP: (date: string, currency: string) => Promise<ApiResponse<ExchangeRate>>;
        update: (id: number, data: Partial<ExchangeRate>) => Promise<ApiResponse<ExchangeRate>>;
      };
      taxSettings: {
        list: () => Promise<ApiResponse<TaxSetting[]>>;
        get: (taxType: string) => Promise<ApiResponse<TaxSetting>>;
        upsert: (data: Partial<TaxSetting>) => Promise<ApiResponse<TaxSetting>>;
      };
      invoiceNumbers: {
        list: (year?: number) => Promise<ApiResponse<InvoiceNumber[]>>;
        generate: (year: number, customerId?: number) => Promise<ApiResponse<InvoiceNumber>>;
        getNext: (year: number) => Promise<ApiResponse<string>>;
      };
      reports: {
        generateMonthlyReport: (year: number, month: number) => Promise<ApiResponse<any>>;
        generateCustomerReport: (customerId: number, startDate: string, endDate: string) => Promise<ApiResponse<any>>;
        getDashboardData: () => Promise<ApiResponse<any>>;
        getYearlySummary: (year: number) => Promise<ApiResponse<any>>;
      };
      files: {
        selectFolder: () => Promise<ApiResponse<string>>;
        save: (data: { category: string; filename: string; data: ArrayBuffer; year: number; month: number }) => Promise<ApiResponse<string>>;
        read: (filePath: string) => Promise<ApiResponse<ArrayBuffer>>;
        exists: (filePath: string) => Promise<ApiResponse<boolean>>;
        createDirectory: (dirPath: string) => Promise<ApiResponse<boolean>>;
        listFiles: (params: { year: number; month: number; category: string }) => Promise<ApiResponse<string[]>>;
        openFolder: (folderPath: string) => Promise<ApiResponse<boolean>>;
        saveReceipt: (data: ArrayBuffer, filename: string) => Promise<ApiResponse<string>>;
      };
      settings: {
        get: (key: string) => Promise<ApiResponse<any>>;
        set: (key: string, value: any) => Promise<ApiResponse<boolean>>;
        getAll: () => Promise<ApiResponse<Record<string, any>>>;
        getDataPath: () => Promise<ApiResponse<string>>;
        setDataPath: (path: string) => Promise<ApiResponse<boolean>>;
      };
      backup: {
        create: () => Promise<ApiResponse<string>>;
        restore: (backupPath: string) => Promise<ApiResponse<boolean>>;
        list: () => Promise<ApiResponse<{ name: string; date: Date; size: number }[]>>;
        exportData: () => Promise<ApiResponse<string>>;
        importData: (data: string) => Promise<ApiResponse<boolean>>;
      };
      platform: string;
      isOnline: () => boolean;
      on: (channel: string, callback: (...args: any[]) => void) => void;
      removeListener: (channel: string, callback: (...args: any[]) => void) => void;
    };
  }
}
