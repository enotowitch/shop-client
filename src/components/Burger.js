import React from "react"

export default function Burger(props) {
	return (
		<div className="menu">
			<input id="menu__toggle" type="checkbox" onClick={() => props.onClick()} />
			<label className="menu__btn" htmlFor="menu__toggle">
				<span></span>
			</label>
		</div>
	)
}