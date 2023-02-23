import React from "react"
import { Link } from "react-router-dom"

export default function SearchLink(props) {

	// for MOBILE
	function closeMenu() {
		document?.querySelector(".menu__btn")?.click()
	}

	return (
		<Link to={`/search/searchValue=${props.searchValue}&field=${props.field}&`} onClick={closeMenu}>
			{props.children}
		</Link>
	)
}