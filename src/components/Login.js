import React, { useState } from "react"
import * as api from "../api"

export default function Login() {

	const [form, formSet] = useState({ email: "", password: "" })
	const [type, typeSet] = useState("Login")

	function handleChange(e) {
		formSet(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		type === "Register" && await api.authType("register", form)
		type === "Login" && await api.authType("login", form)
	}

	return (
		<>
			<form className="login zi2" onSubmit={handleSubmit}>

				<h3 className="login__title">{type}</h3>

				<label>
					Email
					<img src="img/email.svg" />
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="type your email"
						autoFocus
					/>
				</label>

				<label>
					Password
					<img src="img/password.svg" />
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						placeholder="type your password"
					/>
				</label>

				<button>{type.toUpperCase()}</button>

				<div className="tac mt">
					or&nbsp;
					<span onClick={() => typeSet(prev => prev === "Register" ? "Login" : "Register")}>
						{type === "Register" ? "Login" : "Register"}
					</span>
				</div>

			</form>

			<img className="bg" src="img/bg.webp" />
		</>
	)
}