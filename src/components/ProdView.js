import React, { useContext, useEffect, useState } from "react"
import like from "../img/like.svg"
import liked from "../img/liked.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"
import * as api from "../api"
import { Context } from "../Context"
import SearchLink from "./links/SearchLink"
import del from "../img/del.svg"
import upd from "../img/upd.svg"
import { currency, weight_ } from "../consts"
import { useNavigate, Link } from "react-router-dom"


export default function ProdView(props) {

	const navigate = useNavigate()

	const { user, userUpdate, prodsUpdate } = useContext(Context)

	const isAdmin = true // todo

	const { title, cats, text, imgUrl, price, weight, _id } = props.obj
	const { mode } = props

	const [totalPrice, totalPriceSet] = useState(props.totalPrice)
	const [totalWeight, totalWeightSet] = useState(props.totalWeight)

	// ! isLiked, isCarted
	const [isLiked, isLikedSet] = useState(user?.liked.includes(_id))
	const [isCarted, isCartedSet] = useState(user?.carted.includes(_id))

	// recheck liked, carted throughout all app
	useEffect(() => {
		isLikedSet(user?.liked.includes(_id))
		isCartedSet(user?.carted.includes(_id))
	}, [user])
	// ? isLiked, isCarted

	// ! ICONS
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

	const updIcon = () => {
		return isAdmin
			&& <img className="prod__icon" src={upd} onClick={(e) => updProd(e, _id)} />
	}

	const delIcon = () => {
		return isAdmin
			&& <img className="prod__icon" src={del} onClick={(e) => delProd(e, _id)} />
	}
	// ? ICONS

	// ! FUNCTIONS
	function prevent(e) {
		e.stopPropagation()
		e.preventDefault()
	}

	async function likeProd(e, _id) {
		prevent(e)
		isLikedSet(prev => !prev) // rerender icon
		await api.liked(_id) // add/remove from db
		userUpdate()
	}

	async function cartProd(e, _id) {
		prevent(e)
		isCartedSet(prev => !prev) // rerender icon
		await api.carted(_id) // add/remove from db
		userUpdate()
	}

	async function delProd(e, _id) {
		prevent(e)
		await api.delProd(_id)
		prodsUpdate()
	}

	async function updProd(e, _id) {
		// not act. upd just "go to upd page..."
		prevent(e)
		navigate(`/upd/${_id}`)
	}
	// ? FUNCTIONS

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
							{likeIcon()}
							{updIcon()}
							{delIcon()}
							{cartIcon()}
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


						<img src={del} onClick={(e) => cartProd(e, _id)} />
					</>
				}
			</div>
		</Link>
	)
}