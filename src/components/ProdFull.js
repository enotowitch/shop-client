import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as api from "../api"
import { currency, weight_ } from "../consts"
import { Context } from "../Context"
import Icons from "./icons/Icons"

export default function ProdFull() {

	const { userUpdate } = useContext(Context)

	const { id } = useParams()

	const [prod, prodSet] = useState()

	useEffect(() => {
		async function getProd() {
			const res = await api.getOneProd(id)
			prodSet(res)
		}

		async function viewed() {
			const res = await api.viewed(id)
			console.log(res)
			userUpdate()
		}

		getProd()
		viewed()
	}, [id])

	return (
		prod &&
		<div className="prodFull">

			<div>
				<div className="prodFull__top">
					<Icons _id={prod._id} />
				</div>
				<img src={prod.imgUrl} />
			</div>

			<div>
				<div className="title">{prod.title}</div>
				<div className="tac">{currency}{prod.price}/{prod.weight}{weight_}</div>
				<button className="brandBtn mb2">add to cart</button>
				<div>{prod.text}</div>
			</div>

		</div>
	)
}