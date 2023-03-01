import React, { useContext } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"

export default function Ordered() {

	const { user, prods } = useContext(Context)

	const ordered = user?.ordered.map(order => {

		const time = order.time.match(/(.+)(?:\sGMT)/)[1]
		const ordered = prods.filter(prod => order.prods.includes(prod._id))

		return <div>
			<div className="title">{time}</div>
			<div className="prods recently">
				{ordered.map(prod => <ProdView obj={prod} mode="ordered" />)}
			</div>
		</div>
	})

	return (
		<>
		<div className="title">Ordered:</div>
			{ordered}
		</>
	)
}