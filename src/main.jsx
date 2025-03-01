import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👈 Import BrowserRouter
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/excel-to-gmap"> {/* 👈 Set basename for GitHub Pages */}
      <App />
    </BrowserRouter>
  </StrictMode>
)
