import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { BillingLayout } from './billing-components/BillingLayout';
import Dashboard from './billing-pages/Dashboard';
import Customers from './billing-pages/Customers';
import TimeTracking from './billing-pages/TimeTracking';
import Expenses from './billing-pages/Expenses';
import FixedCosts from './billing-pages/FixedCosts';
import ExchangeRates from './billing-pages/ExchangeRates';
import TaxSettings from './billing-pages/TaxSettings';
import Reports from './billing-pages/Reports';
import Backup from './billing-pages/Backup';
import { isElectron } from './lib/electron-api';

// Not in Electron warning component
function NotElectronWarning() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md text-center space-y-4">
        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto">
          <span className="text-primary-foreground font-bold text-2xl">DC</span>
        </div>
        <h1 className="text-2xl font-bold">Döring Consulting Billing</h1>
        <p className="text-muted-foreground">
          Diese Anwendung ist als Electron Desktop-App konzipiert und funktioniert nur innerhalb 
          der Desktop-Anwendung. Bitte starten Sie die App über die portable .exe Datei.
        </p>
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
          <p>Entwicklermodus: Die App wird im Browser angezeigt, aber IPC-Funktionen sind nicht verfügbar.</p>
        </div>
      </div>
    </div>
  );
}

function BillingApp() {
  // Show warning if not running in Electron (but allow for development)
  const isDev = import.meta.env.DEV;
  const inElectron = isElectron();

  if (!inElectron && !isDev) {
    return <NotElectronWarning />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <BillingLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/fixed-costs" element={<FixedCosts />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/tax-settings" element={<TaxSettings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/backup" element={<Backup />} />
          </Routes>
        </BillingLayout>
        <Toaster position="bottom-right" richColors />
      </div>
    </BrowserRouter>
  );
}

export default BillingApp;
