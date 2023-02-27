import React, { useState } from "react"

export default function ProdMenu(props) {
	const [on, onSet] = useState({ 0: true, 1: false, 2: false, 3: false })

	function onToggle(e) {
		onSet({ 0: false, 1: false, 2: false, 3: false, [e.currentTarget.id]: true })
		document.querySelectorAll(".section").forEach(each => each.classList.remove("section_active"))
		e.currentTarget.classList.add("section_active")
	}

	return (
		<div>

			<div className="fse">
				<div className="section section_active" id="0" onClick={onToggle}>Characteristics</div>
				<div className="section" id="1" onClick={onToggle}>Delivery & Payment</div>
			</div>

			{on[0] && <div>{props.children[0]}</div>}
			{on[1] && <div>{props.children[1]}</div>}
			{on[2] && <div>{props.children[2]}</div>}
			{on[3] && <div>{props.children[3]}</div>}

		</div>
	)
}