import React, { useContext, useState } from "react"
import like from "../img/like.svg"
import liked from "../img/liked.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"
import * as api from "../api"
import { Context } from "../Context"
import SearchLink from "./links/SearchLink"
import del from "../img/del.svg"
import { currency } from "../consts"


export default function ProdView(props) {
	const { user, userSet } = useContext(Context)

	const { title, cats, text, imgUrl, price, _id } = props.obj
	const { mode } = props

	const [isLiked, isLikedSet] = useState(user?.liked.includes(_id))
	const [isCarted, isCartedSet] = useState(user?.carted.includes(_id))

	const likeIcon = () => {
		return isLiked
			? <img className="prod__icon" src={liked} onClick={(e) => likeProd(e, _id)} />
			: <img className="prod__icon" src={like} onClick={(e) => likeProd(e, _id)} />
	}

	const cartIcon = () => {
		return isCarted
			? <img className="prod__icon" src={carted} onClick={(e) => cartProd(e, _id)} />
			: <img className="prod__icon" src={cart} onClick={(e) => cartProd(e, _id)} />
	}

	async function likeProd(e, _id) {
		e.stopPropagation()
		e.preventDefault()
		isLikedSet(prev => !prev)
		await api.liked(_id)
	}

	async function cartProd(e, _id) {
		e.stopPropagation()
		e.preventDefault()
		isCartedSet(prev => !prev) // rerender icon
		await api.carted(_id) // add/remove from db
		userSet(prev => ({ ...prev, carted: prev?.carted.filter(id => id !== _id) })) // add/remove from Context (state)
	}

	const cats_ = cats?.split(",").map(cat => <SearchLink searchValue={cat} field="cats"><span className="prod__cat">{cat}</span></SearchLink>)

	// ! counter
	const quantity = user?.carted.filter(id => id === _id).length // user carted same prod (pieces)

	const [counter, counterSet] = useState(quantity)

	async function handleCounter(act) {
		if (act === "-") {
			counterSet(prev => prev > 1 ? prev - 1 : 1)
			await api.carted(_id, "many-")
		}
		if (act === "+") {
			counterSet(prev => prev + 1)
			await api.carted(_id, "many+")
		}

	}
	// ? counter


	// ! RETURN
	return (
		<div className={`prod prod_${mode}`}>
			<div className="fsb mb">
				{mode !== "cart" && likeIcon()}
				{mode !== "cart" && cartIcon()}
			</div>
			<img className="prod__photo" src={imgUrl} />

			<div>
				<div className="prod__title">{title}</div>

				{props.children}

				<div className="prod__price">{currency}{price}</div>
			</div>

			{mode !== "cart" && cats_}

			{/* CART */}
			{mode === "cart" &&
				<>
					<div className="prod__counter">
						<span onClick={() => handleCounter("-")}>-</span>
						{counter}
						<span onClick={() => handleCounter("+")}>+</span>
					</div>

					<img src={del} onClick={(e) => cartProd(e, _id)} />
				</>
			}
		</div>
	)
}