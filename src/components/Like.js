import React, { useContext } from "react"
import { Context } from "../Context"
import useViewed from "../hooks/useViewed"

export default function Like() {

	const { prods, user } = useContext(Context)

	let userLike = prods?.filter(prod => {
		return user?.liked.includes(prod._id)
	})

	userLike = useViewed(userLike)


	// ! RETURN
	return (
		<>
			<div className="title pt">Liked:</div>

			{userLike?.length === 0 && <div className="title danger pt">You have no liked products</div>}
			<div className="prods">
				{userLike}
			</div>
		</>
	)
}