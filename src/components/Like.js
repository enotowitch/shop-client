import React, { useContext } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"

export default function Like() {

	const { prods, user } = useContext(Context)

	let userLike = prods?.map(prod => {
		return user?.liked.map(id => id === prod._id && <ProdView key={id} obj={prod}></ProdView>)
	})
	userLike = userLike?.flat()


	// ! RETURN
	return (
		<>
			{userLike?.length === 0 && <div className="title danger mb">You have no liked products</div>}
			<div className="prods">
				{userLike}
			</div>
		</>
	)
}