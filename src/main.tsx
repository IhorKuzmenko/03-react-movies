import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "modern-normalize";
import App from './component/App/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
