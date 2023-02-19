import React, { useContext, useEffect, useState } from "react"
import * as api from "../api"
import ProdView from "./ProdView"
import { Context } from "../Context"
import { useLocation } from "react-router-dom"

export default function Recently(props) {

	const { prods, user } = useContext(Context)
	const { type } = props

	const [prod, prodSet] = useState() // recent prods

	useEffect(() => {
		if (type === "new") {
			async function recently() {
				const res = await api.recently()
				prodSet(res)
			}
			recently() // todo add LIMIT
		}
		if (type === "viewed") {
			let viewed = user?.viewed.map(id => prods?.filter(prod => prod._id === id))
			viewed = viewed?.flat().reverse()
			prodSet(viewed)
		}

	}, [prods, user])

	const title = type === "new" ? "New Products" : "Recently viewed"
	const prod_ = prod?.map(prod => <ProdView key={prod?._id} obj={prod} mode={type} />)

	// ! notShow
	let { pathname } = useLocation()
	pathname = pathname !== "/" && pathname?.match(/(?:)(\w+)/)[1]

	const notShow = ["add", "profile", "upd"]
	// ? notShow


	// ! RETURN
	return (
		<>
			{!notShow.includes(pathname) &&
				<>
					{prod_?.length > 0 && <div className="title">{title}:</div>}
					<div className="prods recently">
						{prod_}
					</div>
				</>
			}
		</>
	)
}