import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  customers: {
    list: () => ipcRenderer.invoke('customers:list'),
    getById: (id: number) => ipcRenderer.invoke('customers:getById', id),
    create: (data: any) => ipcRenderer.invoke('customers:create', data),
    update: (id: number, data: any) => ipcRenderer.invoke('customers:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('customers:delete', id)
  },
  
  timeEntries: {
    list: (params: any) => ipcRenderer.invoke('timeEntries:list', params),
    create: (data: any) => ipcRenderer.invoke('timeEntries:create', data),
    update: (id: number, data: any) => ipcRenderer.invoke('timeEntries:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('timeEntries:delete', id)
  },
  
  expenses: {
    list: (params: any) => ipcRenderer.invoke('expenses:list', params),
    create: (data: any) => ipcRenderer.invoke('expenses:create', data),
    update: (id: number, data: any) => ipcRenderer.invoke('expenses:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('expenses:delete', id)
  },
  
  files: {
    selectFolder: () => ipcRenderer.invoke('files:selectFolder'),
    save: (data: any) => ipcRenderer.invoke('files:save', data),
    read: (path: string) => ipcRenderer.invoke('files:read', path)
  },

  settings: {
      getDataPath: () => ipcRenderer.invoke('settings:getDataPath'),
      setDataPath: (path: string) => ipcRenderer.invoke('settings:setDataPath', path),
      get: (key: string) => ipcRenderer.invoke('settings:get', key),
      set: (key: string, value: any) => ipcRenderer.invoke('settings:set', key, value)
  },
  
  reports: {
      generate: (params: any) => ipcRenderer.invoke('reports:generate', params)
  }
});
