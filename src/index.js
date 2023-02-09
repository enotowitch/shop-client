import style from "./style.scss"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextProvider } from './Context'
import { BrowserRouter as Router } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<ContextProvider>
		<Router>
			<App />
		</Router>
	</ContextProvider>
)