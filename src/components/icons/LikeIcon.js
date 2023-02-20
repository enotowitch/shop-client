import React, { useContext, useEffect, useState } from "react"
import like from "../../img/lik.svg"
import liked from "../../img/liked.svg"
import { Context } from "../../Context"
import * as api from "../../api"
import { useNavigate } from "react-router-dom"


export default function LikeIcon({ _id }) {

	const { user, userUpdate } = useContext(Context)
	const navigate = useNavigate()

	// ! isLiked
	const [isLiked, isLikedSet] = useState(user?.liked.includes(_id))

	// recheck liked throughout all app
	useEffect(() => {
		isLikedSet(user?.liked.includes(_id))
	}, [user])
	// ? isLiked

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
	// ! likeProd
	async function likeProd(e, _id) {
		prevent(e)
		isLikedSet(prev => !prev) // rerender icon
		await api.liked(_id) // add/remove from db
		userUpdate()
	}

	const likeIcon = () => {
		return isLiked
			? <img className="prod__icon" src={liked} onClick={(e) => likeProd(e, _id)} />
			: <img className="prod__icon" src={like} onClick={(e) => likeProd(e, _id)} />
	}

	return (
		<>
			{likeIcon()}
		</>
	)
}