import React, { useContext } from "react"
import Prod from "./Prod"
import { Context } from "../Context"

export default function Prods() {

	const { prods } = useContext(Context)

	const prods_ = prods?.map(prod => <Prod obj={prod} />)

	return (
		<>
			{prods_}
		</>
	)
}