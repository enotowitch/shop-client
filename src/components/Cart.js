import React, { useContext } from "react"
import { Context } from "../Context"
import Prod from "./Prod"

export default function Cart() {

	const { prods, user } = useContext(Context)
	const userCarted = prods?.filter(prod => user.carted.includes(prod._id))
	const userProds = userCarted?.map(prod => <Prod obj={prod} />)

	return (
		<>
			{userProds}
		</>
	)
}