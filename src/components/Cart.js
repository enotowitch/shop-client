import React, { useContext, useEffect } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"
import { weight_, currency } from "../consts"
import useTranslate from "../hooks/useTranslate"

export default function Cart() {

	const { prods, user, userUpdate } = useContext(Context)
	const [t] = useTranslate()

	const userCarted = prods?.filter(prod => user?.carted.includes(prod._id))

	useEffect(() => {
		userUpdate()
	}, [])

	let total = 0

	const userCart = userCarted?.map(prod => {

		const thisProdQuantity = user?.carted.filter(id => id === prod._id).length
		const totalPrice = prod.price * thisProdQuantity
		const totalWeight = prod.weight * thisProdQuantity
		total += prod.price * thisProdQuantity

		return <ProdView key={prod._id} obj={prod} mode="cart" totalPrice={totalPrice} totalWeight={totalWeight}>
			<div>{prod.weight}{weight_}</div>
		</ProdView>
	})


	// ! RETURN
	return (
		<>
			<div className="title">Cart:</div>

			<div className="cart__wrap">

				<div className="cart__prods">
					{userCart}
				</div>

				{userCarted?.length > 0
					?
					<div className="total p">
						<div className="fsb mb">
							<span className="title m0">{t("Total")}</span>
							<span className="title m0" translate="no">{currency}{total.toFixed(2)}</span>
						</div>

						<div>Your wishes regarding the order</div>
						<textarea
							type="textarea"
						/>

						<div>Please check the details of your order carefully, by continuing you acknowledge that your order cannot be changed once submitted.</div>

						<button className="brandBtn">Checkout</button>
					</div>
					:
					<div className="title danger w100">Your cart is empty</div>
				}
			</div>
		</>
	)
}