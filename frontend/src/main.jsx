import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageProvider>
                <ContentProvider>
                    <App />
                </ContentProvider>
            </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
