import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as api from "../api"
import ProdView from "./ProdView"
import { weight } from "../consts"
import { Context } from "../Context"

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
		<ProdView obj={prod} mode="big">
			<div>{prod.weight}{weight}</div>
			<div>{prod.text}</div>
		</ProdView>
	)
}