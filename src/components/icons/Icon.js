import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../Context"
import * as api from "../../api"
import { useNavigate } from "react-router-dom"

export default function Icon({ _id, name }) {
	// *** name must match 1. img src 2. db table name 3. function name (e.g. "liked, carted", ...) 

	// ! img
	let img, img2
	try {
		img = require(`../../img/${name}.svg`)
		// * TO WORK OK: all images must have names: e.g "lik" & "liked", "cart" & "carted" 
		img2 = require(`../../img/${name.replace("ed", "")}.svg`)
	} catch (err) {
		console.log(err)
		img2 = require(`../../img/${name}.svg`) // for imgs which have one "state"
	}
	// ? img

	// *** after img is done: replace digit from name, so db & function could work OK
	// *** USE CASE: same functional, but other img. e.g: img name = "carted2", db & function name = "carted"
	name = name.replace(/\d+/, "")

	const { user, userUpdate, prodsUpdate } = useContext(Context)
	const navigate = useNavigate()

	// ! iconState
	const [iconState, iconStateSet] = useState(user?.[name]?.includes(_id))

	// recheck iconState throughout all app
	useEffect(() => {
		iconStateSet(user?.[name]?.includes(_id))
	}, [user])
	// ? iconState

	// !! FUNCTIONS
	// ! redirect
	function redirect(e) {
		!user && navigate("/profile")
	}
	// ! prevent
	function prevent(e) {
		e.stopPropagation()
		e.preventDefault()
		redirect()
	}
	// ! cartProd
	async function carted(e, _id) {
		prevent(e)
		iconStateSet(prev => !prev) // rerender icon
		await api.carted(_id) // add/remove from db
		userUpdate()
	}
	// ! delProd
	async function del(e, _id) {
		prevent(e)
		await api.delProd(_id)
		prodsUpdate()
	}
	// ! likeProd
	async function liked(e, _id) {
		prevent(e)
		iconStateSet(prev => !prev) // rerender icon
		await api.liked(_id) // add/remove from db
		userUpdate()
	}
	// ! updProd
	async function upd(e, _id) {
		// not act. upd just "go to upd page..."
		prevent(e)
		navigate(`/upd/${_id}`)
	}
	// ?? FUNCTIONS

	// ! icon
	const Icon = () => {
		return iconState
			? <img className="prod__icon" src={img} onClick={(e) => eval(name)(e, _id)} />
			: <img className="prod__icon" src={img2} onClick={(e) => eval(name)(e, _id)} />
	}
	// ? icon

	const isAdmin = true
	const forAdmin = ["upd", "del"]

	// ! for ADMIN
	if (forAdmin.includes(name) && isAdmin) {
		return (
			<>
				{Icon()}
			</>
		)
	}
	// ! for USER
	if (!forAdmin.includes(name)) {
		return (
			<>
				{Icon()}
			</>
		)
	}
}