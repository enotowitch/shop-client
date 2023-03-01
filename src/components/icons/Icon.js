import React, { useContext, useEffect, useState } from "react"
import { Context } from "../../Context"
import * as api from "../../api"
import { useNavigate } from "react-router-dom"
import usePrevent from "../../hooks/usePrevent"
import useTranslate from "../../hooks/useTranslate"

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
	const [prevent] = usePrevent()
	const [t] = useTranslate()

	// ! iconState
	const [iconState, iconStateSet] = useState(user?.[name]?.includes(_id))

	// recheck iconState throughout all app
	useEffect(() => {
		iconStateSet(user?.[name]?.includes(_id))
	}, [user])
	// ? iconState

	// !! FUNCTIONS
	// ! delAnim
	function delAnim(e, callback) {
		prevent(e)
		e.target.closest(".prod")?.classList.add("delAnim")

		setTimeout(() => {
			callback()

			e.target.closest(".prod").remove() // * for `Prods.js` where prods come NOT from `Context`, but from `api.filter`
		}, 500);
	}
	// ? delAnim
	// ! cartProd
	async function carted(e, _id) {
		if (e.target.closest(".prod_cart")) {
			// prod is in cart ? => use delAnim
			delAnim(e, async () => {
				iconStateSet(prev => !prev) // rerender icon
				await api.carted(_id) // add/remove from db
				userUpdate()
			})
		} else {
			// prod is NOT in cart ? => NOT use delAnim
			prevent(e)
			iconStateSet(prev => !prev) // rerender icon
			await api.carted(_id) // add/remove from db
			userUpdate()
		}
	}
	// ? cartProd
	// ! delProd
	async function del(e, _id) {
		prevent(e)
		if (window.confirm(t("delete product") + "?")) {
			delAnim(e, async () => {
				await api.delProd(_id)
				prodsUpdate()
				// * if in ProdFull
				if (window.location.pathname.includes("/prod/")) {
					window.location.reload()
				}
			})
		}
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

	const isAdmin = user?.email?.match(/admin/i)?.[0] // TODO
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