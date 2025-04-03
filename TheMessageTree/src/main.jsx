import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import { StyleProvider } from './context/styleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </StyleProvider>
  </StrictMode>,
)
