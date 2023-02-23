import React, { useContext } from "react"
import ProdView from "../components/ProdView"
import { Context } from "../Context"

export default function useViewed(arrayOfProds) {

	const { user } = useContext(Context)

	const result = arrayOfProds?.map(prod => {
		if (user?.viewed.includes(prod._id)) {
			return <ProdView key={prod._id} obj={prod} mode="viewed" />
		} else {
			return <ProdView key={prod._id} obj={prod} />
		}
	})

	return (
		result
	)
}