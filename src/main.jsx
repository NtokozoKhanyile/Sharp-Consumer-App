import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppShell from './components/AppShell'
import { SharpProvider } from './context/SharpContext'
import './styles/global.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SharpProvider>
        <AppShell />
      </SharpProvider>
    </BrowserRouter>
  </StrictMode>,
)
