import React from "react"
import { Link } from "react-router-dom"

export default function SearchLink(props) {
	return (
		<Link to={`search/searchValue=${props.searchValue}&field=${props.field}&`}>
			{props.children}
		</Link>
	)
}