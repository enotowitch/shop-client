import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as api from "../api"
import { currency, weight_ } from "../consts"
import { Context } from "../Context"
import useRedirect from "../hooks/useRedirect"
import FAQ from "./FAQ"
import Icons from "./icons/Icons"
import ProdMenu from "./ProdMenu"

export default function ProdFull() {

	const { userUpdate, prodsUpdate } = useContext(Context)

	const { id } = useParams()
	const navigate = useNavigate()
	const [redirect] = useRedirect()

	const [prod, prodSet] = useState()

	useEffect(() => {
		async function getProd() {
			const res = await api.getOneProd(id)
			prodSet(res)
		}

		async function viewed() {
			const res = await api.viewed(id)
			// console.log(res)
			userUpdate()
		}

		getProd()
		viewed()
		prodsUpdate()
		window.scrollTo(0, 0)
	}, [id])

	async function buy() {
		redirect()
		const res = await api.carted(id, "many+")
		res && navigate("/cart")
	}


	// ! RETURN
	return (
		prod ?
			<div className="prodFull">

				<div>
					<div className="prodFull__top">
						<Icons _id={prod._id} />
					</div>
					<img className="prodFull__photo" src={prod.imgUrl} />

					<ProdMenu>
						<>
							<FAQ title="composition" text={prod.composition} />
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
					<div className="tac">{currency}{prod.price} / {prod.weight}{weight_}</div>
					<button className="brandBtn mb2 c" onClick={buy}>Buy</button>
					<div>{prod.text}</div>
				</div>

			</div>

			:

			<div hidden className="title danger pt">Product not found</div>
	)
}