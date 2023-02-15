import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as api from "../api"
import ProdView from "./ProdView"
import { weight } from "../consts"

export default function ProdFull() {

	const { id } = useParams()

	const [prod, prodSet] = useState()

	useEffect(() => {
		async function getProd() {
			const prod = await api.getOneProd(id)
			prodSet(prod)
		}

		getProd()
	}, [])

	return (
		prod &&
		<ProdView obj={prod} mode="big">
			<div>{prod.weight}{weight}</div>
			<div>{prod.text}</div>
		</ProdView>
	)
}