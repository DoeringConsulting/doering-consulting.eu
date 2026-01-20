// Electron API client for the billing application
// This wraps the electronAPI exposed by the preload script

// Declare the window.electronAPI type
declare global {
  interface Window {
    electronAPI?: any;
  }
}

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
  customer?: {
    id: number;
    name: string;
    dailyRate: number;
    currency: string;
    billingModel: string;
  };
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
  customer?: {
    id: number;
    name: string;
  };
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

export interface DashboardData {
  currentMonth: {
    year: number;
    month: number;
    totalHours: number;
    totalDays: number;
    totalRevenue: number;
    totalExpenses: number;
    entriesCount: number;
    expensesCount: number;
  };
  activeCustomersCount: number;
  recentTimeEntries: any[];
  recentExpenses: any[];
}

export interface MonthlyReport {
  year: number;
  month: number;
  monthStart: string;
  monthEnd: string;
  summary: {
    totalHours: number;
    totalDays: number;
    totalRevenue: number;
    totalExpenses: number;
    totalFixedCosts: number;
    zusCost: number;
    healthInsuranceCost: number;
    incomeTax: number;
    netIncome: number;
  };
  customerBreakdown: any[];
  timeEntries: any[];
  expenses: any[];
  fixedCosts: any[];
  taxSettings: any[];
}

// Check if running in Electron
export const isElectron = (): boolean => {
  return typeof window !== 'undefined' && window.electronAPI !== undefined;
};

// API client class
class ElectronAPIClient {
  private async handleResponse<T>(promise: Promise<{ success: boolean; data?: T; error?: string }>): Promise<T> {
    const response = await promise;
    if (!response.success) {
      throw new Error(response.error || 'Unknown error');
    }
    return response.data as T;
  }

  // Customers
  customers = {
    list: async (): Promise<Customer[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.customers.list());
    },
    getById: async (id: number): Promise<Customer> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.customers.getById(id));
    },
    create: async (data: Partial<Customer>): Promise<Customer> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.customers.create(data));
    },
    update: async (id: number, data: Partial<Customer>): Promise<Customer> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.customers.update(id, data));
    },
    delete: async (id: number): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.customers.delete(id));
    },
    archive: async (id: number): Promise<Customer> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.customers.archive(id));
    },
    unarchive: async (id: number): Promise<Customer> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.customers.unarchive(id));
    }
  };

  // Time Entries
  timeEntries = {
    list: async (params?: { startDate?: string; endDate?: string; customerId?: number }): Promise<TimeEntry[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.timeEntries.list(params));
    },
    getById: async (id: number): Promise<TimeEntry> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.timeEntries.getById(id));
    },
    create: async (data: Partial<TimeEntry>): Promise<TimeEntry> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.timeEntries.create(data));
    },
    update: async (id: number, data: Partial<TimeEntry>): Promise<TimeEntry> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.timeEntries.update(id, data));
    },
    delete: async (id: number): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.timeEntries.delete(id));
    },
    bulkCreate: async (entries: Partial<TimeEntry>[]): Promise<TimeEntry[]> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.timeEntries.bulkCreate(entries));
    }
  };

  // Expenses
  expenses = {
    list: async (params?: { startDate?: string; endDate?: string; customerId?: number }): Promise<Expense[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.expenses.list(params));
    },
    getById: async (id: number): Promise<Expense> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.expenses.getById(id));
    },
    create: async (data: Partial<Expense>): Promise<Expense> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.expenses.create(data));
    },
    update: async (id: number, data: Partial<Expense>): Promise<Expense> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.expenses.update(id, data));
    },
    delete: async (id: number): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.expenses.delete(id));
    }
  };

  // Fixed Costs
  fixedCosts = {
    list: async (): Promise<FixedCost[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.fixedCosts.list());
    },
    getById: async (id: number): Promise<FixedCost> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.fixedCosts.getById(id));
    },
    create: async (data: Partial<FixedCost>): Promise<FixedCost> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.fixedCosts.create(data));
    },
    update: async (id: number, data: Partial<FixedCost>): Promise<FixedCost> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.fixedCosts.update(id, data));
    },
    delete: async (id: number): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.fixedCosts.delete(id));
    },
    getActiveForMonth: async (year: number, month: number): Promise<FixedCost[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.fixedCosts.getActiveForMonth(year, month));
    }
  };

  // Exchange Rates
  exchangeRates = {
    list: async (params?: { startDate?: string; endDate?: string }): Promise<ExchangeRate[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.exchangeRates.list(params));
    },
    getByDate: async (date: string, currencyPair: string): Promise<ExchangeRate> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.exchangeRates.getByDate(date, currencyPair));
    },
    create: async (data: Partial<ExchangeRate>): Promise<ExchangeRate> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.exchangeRates.create(data));
    },
    fetchFromNBP: async (date: string, currency: string): Promise<ExchangeRate> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.exchangeRates.fetchFromNBP(date, currency));
    }
  };

  // Tax Settings
  taxSettings = {
    list: async (): Promise<TaxSetting[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.taxSettings.list());
    },
    get: async (taxType: string): Promise<TaxSetting> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.taxSettings.get(taxType));
    },
    upsert: async (data: Partial<TaxSetting>): Promise<TaxSetting> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.taxSettings.upsert(data));
    }
  };

  // Reports
  reports = {
    getDashboardData: async (): Promise<DashboardData> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.reports.getDashboardData());
    },
    generateMonthlyReport: async (year: number, month: number): Promise<MonthlyReport> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.reports.generateMonthlyReport(year, month));
    },
    generateCustomerReport: async (customerId: number, startDate: string, endDate: string): Promise<any> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.reports.generateCustomerReport(customerId, startDate, endDate));
    },
    getYearlySummary: async (year: number): Promise<any> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.reports.getYearlySummary(year));
    }
  };

  // Settings
  settings = {
    get: async (key: string): Promise<any> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.settings.get(key));
    },
    set: async (key: string, value: any): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.settings.set(key, value));
    },
    getDataPath: async (): Promise<string> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.settings.getDataPath());
    }
  };

  // Backup
  backup = {
    create: async (): Promise<string> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.backup.create());
    },
    list: async (): Promise<{ name: string; date: Date; size: number }[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.backup.list());
    },
    restore: async (backupPath: string): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.backup.restore(backupPath));
    },
    exportData: async (): Promise<string> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.backup.exportData());
    }
  };

  // Files
  files = {
    save: async (data: { category: string; filename: string; data: ArrayBuffer; year: number; month: number }): Promise<string> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.files.save(data));
    },
    listFiles: async (params: { year: number; month: number; category: string }): Promise<string[]> => {
      if (!isElectron()) return [];
      return this.handleResponse(window.electronAPI.files.listFiles(params));
    },
    openFolder: async (folderPath: string): Promise<boolean> => {
      if (!isElectron()) throw new Error('Not in Electron');
      return this.handleResponse(window.electronAPI.files.openFolder(folderPath));
    }
  };
}

export const api = new ElectronAPIClient();
