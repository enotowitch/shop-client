import React, { useEffect, useState } from "react"
import * as api from "./api"

const Context = React.createContext()

function ContextProvider(props) {

	const [user, userSet] = useState()
	const [prods, prodsSet] = useState()

	// ! user
	useEffect(() => {
		async function auth() {
			const userData = await api.auth()
			userSet(userData)
		}

		auth()
	}, [])
	// ? user

	// ! prods
	useEffect(() => {
		async function getProds() {
			const prodData = await api.get()
			console.log(prodData)
			prodsSet(prodData)
		}

		getProds()
	}, [])
	// ? prods


	return (
		<Context.Provider value={{ user, userSet, prods }}>
			{props.children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }