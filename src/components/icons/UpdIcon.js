import React, { useContext } from "react"
import upd from "../../img/upd.svg"
import { Context } from "../../Context"
import { useNavigate } from "react-router-dom"

export default function UpdIcon({ _id }) {

	const { user } = useContext(Context)
	const navigate = useNavigate()

	const isAdmin = true // todo

	const updIcon = () => {
		return isAdmin
			&& <img className="prod__icon" src={upd} onClick={(e) => updProd(e, _id)} />
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
	// ! updProd
	async function updProd(e, _id) {
		// not act. upd just "go to upd page..."
		prevent(e)
		navigate(`/upd/${_id}`)
	}

	return (
		<>
			{updIcon()}
		</>
	)
}