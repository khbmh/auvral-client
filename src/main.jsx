import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './components/router/Router.jsx';
import AuthContextProvider from './components/contexts/AuthContext.jsx';
import DataContextProvider from './components/contexts/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <RouterProvider router={Router} />
      </DataContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
