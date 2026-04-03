import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // Removing strict mode to prevent double API calls in development, can be re-enabled later
  // <StrictMode>
    <App />
  // </StrictMode>,
)
