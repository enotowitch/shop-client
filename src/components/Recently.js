import React, { useContext, useEffect, useState } from "react"
import * as api from "../api"
import ProdView from "./ProdView"
import { Context } from "../Context"

export default function Recently(props) {

	const { prods, user } = useContext(Context)
	const { type } = props

	const [prod, prodSet] = useState() // recent prods

	useEffect(() => {
		if (type === "added") {
			async function recently() {
				const res = await api.recently()
				prodSet(res)
			}
			recently() // todo add LIMIT
		}
		if (type === "viewed") {
			let viewed = user?.viewed.map(id => prods?.filter(prod => prod._id === id))
			viewed = viewed?.flat().reverse()
			prodSet(viewed)
		}

	}, [prods, user])

	const title = type === "added" ? "New Products" : "Recently viewed"
	const prod_ = prod?.map(prod => <ProdView key={prod._id} obj={prod} mode="new" />)

	return (
		<>
			<div className="title">{title}:</div>
			<div className="recently">
				{prod_}
			</div>
		</>
	)
}