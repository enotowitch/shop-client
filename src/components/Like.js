import React, { useContext } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"

export default function Like() {

	const { prods, user } = useContext(Context)

	const userLike = prods?.map(prod => {
		return user?.liked.map(id => id === prod._id && <ProdView key={id} obj={prod}></ProdView>)
	})

	return (
		<>
			{userLike}
		</>
	)
}