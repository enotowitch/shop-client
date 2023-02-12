import React, { useContext, useState } from "react"
import like from "../img/like.svg"
import liked from "../img/liked.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"
import * as api from "../api"
import { Context } from "../Context"


export default function ProdView(props) {
	const { user } = useContext(Context)

	const { title, cats, text, imgUrl, price, _id } = props.obj
	const { size } = props

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
		isCartedSet(prev => !prev)
		await api.carted(_id)
	}


	return (
		<div className={`prod prod_${size} `}>
			<div className="fsb mb">
				{likeIcon()}
				{cartIcon()}
			</div>
			<img className="prod__photo" src={imgUrl} />

			<div className="prod__title">{title}</div>

			{props.children}

			<div className="prod__price">{price}</div>
		</div>
	)
}