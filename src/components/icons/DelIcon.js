import React, { useContext, useEffect, useState } from "react"
import del from "../../img/del.svg"
import { Context } from "../../Context"
import * as api from "../../api"
import { useNavigate } from "react-router-dom"

export default function DelIcon({_id}) {

	const { user, prodsUpdate } = useContext(Context)
	const navigate = useNavigate()

	const isAdmin = true // todo

	const delIcon = () => {
		return isAdmin
			&& <img className="prod__icon" src={del} onClick={(e) => delProd(e, _id)} />
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
	// ! delProd
	async function delProd(e, _id) {
		prevent(e)
		await api.delProd(_id)
		prodsUpdate()
	}

	return (
		<>
			{delIcon()}
		</>
	)
}