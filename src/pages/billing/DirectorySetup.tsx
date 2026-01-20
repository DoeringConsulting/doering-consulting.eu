import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DirectorySetup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectFolder = async () => {
    setLoading(true);
    try {
      if (window.api) {
          const result = await window.api.files.selectFolder();
          if (result.success && result.data) {
              const saveResult = await window.api.settings.setDataPath(result.data);
              if (saveResult) {
                  navigate('/');
              }
          }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Willkommen</h1>
        <p className="mb-6 text-gray-600">
          Bitte wählen Sie einen Ordner, in dem alle Daten gespeichert werden sollen (z.B. OneDrive/DoringConsulting).
        </p>
        <button
          onClick={handleSelectFolder}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Wird geladen...' : 'Ordner wählen'}
        </button>
      </div>
    </div>
  );
};

export default DirectorySetup;
