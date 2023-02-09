import React, { useEffect, useState } from "react"
import * as api from "./api"

const Context = React.createContext()

function ContextProvider(props) {

	const [user, userSet] = useState()

	useEffect(() => {
		async function auth() {
			const userData = await api.auth()
			userSet(userData)
		}

		auth()
	}, [])

	console.log(user)

	return (
		<Context.Provider value={{ user, userSet }}>
			{props.children}
		</Context.Provider>
	)
}

export { ContextProvider, Context }