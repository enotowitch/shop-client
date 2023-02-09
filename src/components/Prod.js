import React, { useState } from "react"
import like from "../img/like.svg"
import liked from "../img/liked.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"

export default function Prod(props) {

	const { title, cats, text, imgUrl, price } = props.obj

	const [isLiked, isLikedSet] = useState(false)
	const [isCarted, isCartedSet] = useState(false)

	const likeIcon = () => {
		return isLiked
			? <img className="prod__icon" src={liked} onClick={() => isLikedSet(prev => !prev)} />
			: <img className="prod__icon" src={like} onClick={() => isLikedSet(prev => !prev)} />
	}

	const cartIcon = () => {
		return isCarted
			? <img className="prod__icon" src={carted} onClick={() => isCartedSet(prev => !prev)} />
			: <img className="prod__icon" src={cart} onClick={() => isCartedSet(prev => !prev)} />
	}


	return (
		<div className="prod">
			<div className="fsb mb">
				{likeIcon()}
				{cartIcon()}
			</div>
			<img className="prod__photo" src={imgUrl} />

			<div className="prod__title">{title}</div>
			<div className="prod__price">{price}</div>
		</div>
	)
}