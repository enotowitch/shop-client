import React from "react"
import { Link } from "react-router-dom"
import ProdView from "./ProdView"

export default function Prod(props) {

	const { _id } = props.obj

	return (
		<Link to={`/prod/${_id}`} >
			<ProdView obj={props.obj} mode="small" />
		</Link>
	)
}