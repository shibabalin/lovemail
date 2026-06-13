import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// GitHub Pages SPA redirect handler
function getInitialPath() {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const redirect = params.get('p')
  if (redirect) {
    // Replace the mangled URL with the real path
    window.history.replaceState(
      null, '',
      '/lovemail' + decodeURIComponent(redirect)
    )
  }
}
getInitialPath()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/lovemail">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
