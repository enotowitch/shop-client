import React, { useContext, useEffect, useState } from "react"
import cart from "../../img/cart.svg"
import carted from "../../img/carted.svg"
import { Context } from "../../Context"
import * as api from "../../api"
import { useNavigate } from "react-router-dom"

export default function CartIcon({ _id, src }) {

	let img
	try {
		img = require(`../../img/${src}.svg`)
	} catch (err) { console.log(err) }

	const { user, userUpdate } = useContext(Context)
	const navigate = useNavigate()

	// ! isCarted
	const [isCarted, isCartedSet] = useState(user?.carted.includes(_id))

	// recheck carted throughout all app
	useEffect(() => {
		isCartedSet(user?.carted.includes(_id))
	}, [user])
	// ? isCarted

	const cartIcon = () => {
		return isCarted
			? <img className="prod__icon" src={img || carted} onClick={(e) => cartProd(e, _id)} />
			: <img className="prod__icon" src={img || cart} onClick={(e) => cartProd(e, _id)} />
	}

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
	// ! cartProd
	async function cartProd(e, _id) {
		prevent(e)
		isCartedSet(prev => !prev) // rerender icon
		await api.carted(_id) // add/remove from db
		userUpdate()
	}

	return (
		<>
			{cartIcon()}
		</>
	)
}