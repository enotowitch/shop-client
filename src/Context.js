import React, { useEffect, useState } from "react"
import * as api from "./api"

const Context = React.createContext()

function ContextProvider(props) {

	// ! user
	const [user, userSet] = useState()
	const [userUpd, userUpdSet] = useState(0) // counter

	useEffect(() => {
		async function auth() {
			const userData = await api.auth()
			userSet(userData)
		}

		auth()
	}, [userUpd])

	function userUpdate() {
		userUpdSet(prev => prev + 1)
	}
	// ? user

	// ! prods
	const [prods, prodsSet] = useState()
	const [prodsUpd, prodsUpdSet] = useState(0) // counter

	useEffect(() => {
		async function getProds() {
			const prodData = await api.getAllProd()
			console.log(prodData)
			prodsSet(prodData)
		}

		getProds()
	}, [prodsUpd])

	function prodsUpdate() {
		prodsUpdSet(prev => prev + 1)
	}
	// ? prods


	return (
		<Context.Provider value={{
			user, // get full user info
			userSet, // used for null user (e.g: logout)
			userUpdate, // redraw user info (e.g: cart, likes...)
			prods, // get all prods
			prodsUpdate // redraw prods info (e.g: delProd)
		}}>
			{props.children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }