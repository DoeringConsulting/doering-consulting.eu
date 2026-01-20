import React, { useEffect, useState } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    // Example of using the API
    if (window.api) {
        window.api.customers.list().then((res) => {
            if (res.success && res.data) {
                setCustomers(res.data);
            }
        });
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Kunden</h1>
      <div className="grid gap-4">
        {customers.map((c) => (
          <div key={c.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p>Tagessatz: {c.dailyRate} {c.currency}</p>
          </div>
        ))}
        {customers.length === 0 && <p>Keine Kunden gefunden.</p>}
      </div>
    </div>
  );
};

export default Customers;
