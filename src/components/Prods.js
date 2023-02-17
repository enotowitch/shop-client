import React, { useContext, useEffect } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"

export default function Prods() {

	const { prods, prodsUpdate } = useContext(Context)

	useEffect(() => {
		prodsUpdate()
	}, [])

	const prods_ = prods?.map(prod => <ProdView key={prod._id} obj={prod} />)

	return (
		<>
			{prods_}
		</>
	)
}