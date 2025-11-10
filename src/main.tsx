import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { UserProvider } from './state/UserProvider'

createRoot(document.getElementById('root')!).render(
	<UserProvider>
		<App />
	</UserProvider>
)
