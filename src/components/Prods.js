import React, { useContext, useEffect } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"

export default function Prods() {

	const { prods, prodsUpdate, user } = useContext(Context)

	useEffect(() => {
		prodsUpdate()
	}, [])

	const prods_ = prods?.map(prod => {
		if(user?.viewed.includes(prod._id)){
			return <ProdView key={prod._id} obj={prod} mode="viewed" />
		}
		return <ProdView key={prod._id} obj={prod} />
	})


	// ! RETURN
	return (
		<div className="prods">
			{prods_}
		</div>
	)
}