import React, { useContext } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"
import { weight } from "../consts"
import { currency } from "../consts"

export default function Cart() {

	const { prods, user } = useContext(Context)
	const userCarted = prods?.filter(prod => user?.carted.includes(prod._id))

	let total = 0

	const userProds = userCarted?.map(prod => {

		const thisProdQuantity = user?.carted.filter(id => id === prod._id).length
		total += prod.price * thisProdQuantity

		return <ProdView obj={prod} mode="cart">
			<div>{prod.weight}{weight}</div>
		</ProdView>
	})


	// ! RETURN
	return (
		<div className="cart__wrap">

			<div className="cart__prods">
				{userProds}
			</div>

			<div className="total p">
				<div className="fsb mb">
					<span>Total</span>
					<span>{currency}{total}</span>
				</div>

				<div>Order instructions</div>
				<textarea
					type="textarea"
				/>

				<button className="checkoutBtn">Checkout</button>
			</div>
		</div>
	)
}