import React, { useContext, useEffect, useState } from "react"
import * as api from "../api"
import ProdView from "./ProdView"
import { Context } from "../Context"
import { useLocation } from "react-router-dom"
import arrow from "../img/arrow.svg"
import { useRef } from "react"

export default function Recently(props) {

	const recentlyRef = useRef(null)

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

	const notShow = ["add", "profile", "upd", "ordered"]
	// ? notShow

	function scroll(e, direction) {
		direction === "left" && recentlyRef.current.scrollBy(-150, 0)
		direction === "right" && recentlyRef.current.scrollBy(150, 0)
	}

	// ! RETURN
	return (
		<>
			{prod_?.length > 0 && !notShow.includes(pathname) &&
				<div className="recently__wrap">
					<div className="title">{title}:</div>
					<img className="recently__left zi9 opAnim" src={arrow} onClick={(e) => scroll(e, "left")} />
					<div className="prods recently" ref={recentlyRef}>
						{prod_}
					</div>
					<img className="recently__right zi9 opAnim" src={arrow} onClick={(e) => scroll(e, "right")} />
				</div>
			}
		</>
	)
}