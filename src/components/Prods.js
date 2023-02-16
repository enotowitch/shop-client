import React, { useContext, useEffect } from "react"
import Prod from "./Prod"
import { Context } from "../Context"

export default function Prods() {

	const { prods, prodsUpdate } = useContext(Context)

	useEffect(() => {
		prodsUpdate()
	}, [])

	const prods_ = prods?.map(prod => <Prod key={prod._id} obj={prod} />)

	return (
		<>
			{prods_}
		</>
	)
}