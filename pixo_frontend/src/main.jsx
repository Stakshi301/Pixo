import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider  } from './context/AuthContext.jsx';
import { SearchProvider } from "./context/SearchContext";
import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <SearchProvider>
    <AuthProvider > 
    <BrowserRouter>
        <App />
    </BrowserRouter>
      </AuthProvider >
      </SearchProvider>

  </StrictMode>,
)
