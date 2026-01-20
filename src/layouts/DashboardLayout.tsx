import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Receipt, 
  FileText, 
  Settings,
  FolderOpen
} from 'lucide-react';

const DashboardLayout = () => {
  const [dataPath, setDataPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if data path is set
    const checkSettings = async () => {
        if (window.api) {
            try {
                const path = await window.api.settings.getDataPath();
                if (!path) {
                    navigate('/setup');
                } else {
                    setDataPath(path);
                }
            } catch (e) {
                console.error("Failed to get data path", e);
            }
        }
    };
    checkSettings();
  }, [navigate]);

  if (!dataPath && location.pathname !== '/setup') {
      return null; // Or a loading spinner
  }

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/customers', icon: <Users size={20} />, label: 'Kunden' },
    { path: '/time-tracking', icon: <Clock size={20} />, label: 'Zeiterfassung' },
    { path: '/expenses', icon: <Receipt size={20} />, label: 'Ausgaben' },
    { path: '/reports', icon: <FileText size={20} />, label: 'Berichte' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Döring Consulting</h1>
          <p className="text-xs text-gray-500 mt-1">Billing & Project Mgmt</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center px-4 py-2 text-sm text-gray-500">
            <FolderOpen size={16} className="mr-2" />
            <span className="truncate" title={dataPath || ''}>
              {dataPath ? 'Daten geladen' : 'Kein Datenordner'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
