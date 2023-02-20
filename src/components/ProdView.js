import React, { useContext, useState } from "react"

import * as api from "../api"
import { Context } from "../Context"
import SearchLink from "./links/SearchLink"
import { currency, weight_ } from "../consts"
import { useNavigate, Link } from "react-router-dom"
import Icon from "./icons/Icon"
import Icons from "./icons/Icons"


export default function ProdView(props) {

	const navigate = useNavigate()

	const { user, userUpdate } = useContext(Context)

	const { title, cats, imgUrl, price, weight, _id } = props.obj
	const { mode } = props

	const [totalPrice, totalPriceSet] = useState(props.totalPrice)
	const [totalWeight, totalWeightSet] = useState(props.totalWeight)



	// !! FUNCTIONS
	// todo HAS DUP
	// ! redirect
	function redirect(e) {
		!user && navigate("/profile")
	}
	// todo HAS DUP
	// ! prevent
	function prevent(e) {
		e.stopPropagation()
		e.preventDefault()
		redirect()
	}
	// ?? FUNCTIONS

	const cats_ = cats?.split(",").map(cat => <SearchLink key={cat} searchValue={cat} field="cats"><span className="prod__cat">{cat}</span></SearchLink>)

	// ! COUNTER
	const quantity = user?.carted.filter(id => id === _id).length // user carted same prod (pieces)

	const [counter, counterSet] = useState(quantity)

	async function handleCounter(e, act) {
		prevent(e)
		if (act === "-") {
			if (counter > 1) {
				const res = await api.carted(_id, "many-")
				if (res.success) {
					counterSet(prev => prev > 1 ? prev - 1 : 1)
					totalPriceSet(prev => prev > price ? prev - price : price)
					totalWeightSet(prev => prev > weight ? prev - weight : weight)
				}
			}
		}
		if (act === "+") {
			const res = await api.carted(_id, "many+")
			if (res.success) {
				counterSet(prev => prev + 1)
				totalPriceSet(prev => prev + price)
				totalWeightSet(prev => prev + weight)
			}
		}
		userUpdate()
	}
	// ? COUNTER


	// ! RETURN
	return (
		<Link to={`/prod/${_id}`} >
			<div className={`prod prod_${mode}`}>


				{mode !== "cart" &&
					<>
						<span className="prod__status">{mode === "new" && mode}</span>

						<div className="prod__icons">
							<Icons _id={_id} />
						</div>
					</>
				}

				<img className="prod__photo" src={imgUrl} />

				<div className="prod__info">
					<div className="prod__title">{title}</div>

					{props.children}

					<div className="prod__price">{currency}{price}</div>
				</div>

				{mode !== "cart" &&
					<div className="prod__cats">{cats_}</div>
				}

				{/* CART */}
				{mode === "cart" &&
					<>
						<div className="prod__counter">
							<span onClick={(e) => handleCounter(e, "-")}>-</span>
							{counter}
							<span onClick={(e) => handleCounter(e, "+")}>+</span>
							<div>{totalWeight}{weight_}</div>
							<div>{currency}{totalPrice}</div>
						</div>


						<Icon _id={_id} name="carted2" />
					</>
				}
			</div>
		</Link>
	)
}