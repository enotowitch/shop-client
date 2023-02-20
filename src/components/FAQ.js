import React, { useState } from "react"

export default function FAQ({ title, text }) {

	const [on, onSet] = useState(false)

	function onToggle() {
		onSet(prev => !prev)
	}

	return (
		<div className="FAQ" onClick={onToggle}>
			<div className="FAQ__title">
				{title}
				<span className="FAQ__toggle">{on ? "—" : "+"}</span>
			</div>

			{on &&
				<div className="FAQ__text">{text}</div>
			}
		</div>
	)
}