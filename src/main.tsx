import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import BillingApp from './BillingApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BillingApp />
  </StrictMode>
);
