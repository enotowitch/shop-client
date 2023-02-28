import React from "react"
import { Link } from "react-router-dom"

export default function HeaderLink({ to, children }) {

	return (
		<Link to={to} onClick={() => window.scrollTo(0, 0)}>
			{children}
		</Link>
	)
}