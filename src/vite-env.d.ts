/// <reference types="vite/client" />

interface Window {
  api: {
    customers: {
      list: () => Promise<{ success: boolean; data?: any[]; error?: string }>;
      getById: (id: number) => Promise<{ success: boolean; data?: any; error?: string }>;
      create: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      update: (id: number, data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      delete: (id: number) => Promise<{ success: boolean; data?: boolean; error?: string }>;
    };
    timeEntries: {
      list: (params: any) => Promise<{ success: boolean; data?: any[]; error?: string }>;
      create: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      update: (id: number, data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      delete: (id: number) => Promise<{ success: boolean; data?: boolean; error?: string }>;
    };
    expenses: {
      list: (params: any) => Promise<{ success: boolean; data?: any[]; error?: string }>;
      create: (data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      update: (id: number, data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      delete: (id: number) => Promise<{ success: boolean; data?: boolean; error?: string }>;
    };
    files: {
      selectFolder: () => Promise<{ success: boolean; data?: string; error?: string }>;
      save: (data: any) => Promise<{ success: boolean; data?: string; error?: string }>;
      read: (path: string) => Promise<{ success: boolean; data?: Buffer; error?: string }>;
    };
    settings: {
        getDataPath: () => Promise<string>;
        setDataPath: (path: string) => Promise<boolean>;
        get: (key: string) => Promise<any>;
        set: (key: string, value: any) => Promise<boolean>;
    };
    reports: {
        generate: (params: any) => Promise<{ success: boolean; data?: any; error?: string }>;
    };
  };
}
