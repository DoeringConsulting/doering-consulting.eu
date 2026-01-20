import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/theme-context';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/billing/Dashboard';
import Customers from './pages/billing/Customers';
import TimeTracking from './pages/billing/TimeTracking';
import Expenses from './pages/billing/Expenses';
import Reports from './pages/billing/Reports';
import DirectorySetup from './pages/billing/DirectorySetup';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/setup" element={<DirectorySetup />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
