import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { TransectionProvider } from './context/TransectionsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransectionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransectionProvider> 
)

