import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as api from "../api"
import { currency, weight_ } from "../consts"
import { Context } from "../Context"
import FAQ from "./FAQ"
import Icons from "./icons/Icons"
import ProdMenu from "./ProdMenu"

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
				<img className="prodFull__photo" src={prod.imgUrl} />

				<ProdMenu>
					<>
						<FAQ title="compound" text={prod.compound} />
						<FAQ title="calories" text={prod.calories} />
						<FAQ title="proteins" text={prod.proteins} />
						<FAQ title="fats" text={prod.fats} />
						<FAQ title="carbohydrates" text={prod.carbohydrates} />
						<FAQ title="expiration" text={prod.expiration} />
						<FAQ title="temperature" text={prod.temperature} />
					</>

					<>
						<FAQ title="delivery" text={prod.delivery} />
						<FAQ title="warranty" text={prod.warranty} />
						<FAQ title="payment" text={prod.payment} />
					</>
				</ProdMenu>
			</div>

			<div className="prodFull__info">
				<div className="title">{prod.title}</div>
				<div className="tac">{currency}{prod.price}/{prod.weight}{weight_}</div>
				<button className="brandBtn mb2">add to cart</button>
				<div>{prod.text}</div>
			</div>

		</div>
	)
}