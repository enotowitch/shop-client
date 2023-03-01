import React, { useContext, useEffect } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"
import { weight_, currency } from "../consts"
import useTranslate from "../hooks/useTranslate"
import Input from "./Input"
import * as api from "../api"

export default function Cart() {

	const { prods, user, userUpdate } = useContext(Context)
	const [t] = useTranslate()

	const userCarted = prods?.filter(prod => user?.carted.includes(prod._id))

	useEffect(() => {
		userUpdate()
		window.scrollTo(0, 0) // !! MANDATORY 
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

	async function handleSubmit() {
		alert(t("thank you for the order, we will contact you soon"))
		await api.ordered() // todo alert after ordered
	}


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
					<form className="total p" onSubmit={handleSubmit}>
						<div className="fsb mb">
							<span className="title m0">{t("Total")}</span>
							<span className="title m0" translate="no">{currency}{total.toFixed(2)}</span>
						</div>

						<Input type="tel" name="phone" placeholder="e.g: 0950123456" className="mb2" />

						<div className="fsi">Your wishes regarding the order</div>

						<Input type="textarea" />

						<div>Please check the details of your order carefully, by continuing you acknowledge that your order cannot be changed once submitted.</div>

						<button className="brandBtn">make an order</button>
					</form>
					:
					<div className="title danger w100">Your cart is empty</div>
				}
			</div>
		</>
	)
}