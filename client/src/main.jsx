import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/app.css'
import './assets/index.css'
import './assets/dashboard.css'
import App from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
