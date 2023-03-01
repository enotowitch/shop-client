import React from "react"


export default function Input({ type, name, value, onChange, placeholder, className }) {

	const pattern = type === "tel" && "[0-9]{3}[0-9]{7}"
	// const required = type === "tel" && true

	// type = text / textarea
	return (
		<>
			{(type === "text" || type === "number" || type === "tel" || !type) &&
				<label>
					{name}
					<input
						type={type || "text"}
						name={name}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						className={className}
						required={true}
						pattern={pattern}
					/>
				</label>
			}

			{type === "textarea" &&
				<label>
					{name}
					<textarea
						type="textarea"
						name={name}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
					/>
				</label>
			}
		</>
	)
}

// TODO ???
// export default function Input({ what, type, name, value, onChange, placeholder }) {

// 	function createInput({ what, type, name, value, onChange, placeholder }) {
// 		return createElement(
// 			`${what}`,
// 			{ what, type, name, value, onChange, placeholder }
// 		);
// 	}

// 	return createElement(
// 		createInput,
// 		{ what, type, name, value, onChange, placeholder }
// 	);
// }