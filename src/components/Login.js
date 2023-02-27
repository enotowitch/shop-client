import React, { useContext, useState } from "react"
import * as api from "../api"
import { Context } from "../Context"
import { useNavigate } from "react-router-dom"

export default function Login() {

	const { user, userSet, userUpdate } = useContext(Context)
	const navigate = useNavigate()

	const [form, formSet] = useState({ email: "", password: "" })
	const [type, typeSet] = useState("Login")

	function handleChange(e) {
		formSet(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		let res // userData
		type === "Register" && (res = await api.authType("register", form))
		type === "Login" && (res = await api.authType("login", form))
		res && navigate("/")
		userUpdate()
	}

	function logout() {
		userSet()
		localStorage.removeItem("token")
	}


	return (
		<>
			<form className="login zi3" onSubmit={handleSubmit}>

				{!user ?
					<>
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

						<button className="brandBtn">{type.toUpperCase()}</button>

						<div className="tac mt2 cp">
							or&nbsp;
							<span onClick={() => typeSet(prev => prev === "Register" ? "Login" : "Register")}>
								{type === "Register" ? "Login" : "Register"}
							</span>
						</div>
					</>

					:

					<>
						<span className="title">Email:</span>
						<div className="mb">{user.email}</div>
						<span className="title">Member Since:</span>
						<div className="mb">{user.createdAt.match(/\d+-\d+-\d+/)[0]} / {user.createdAt.match(/(?:T)(\d+:\d+:\d+)/)[1]}</div>
						<span className="title">Carted:</span>
						<div className="mb">{user.carted.length}</div>
						<span className="title">Liked:</span>
						<div className="mb">{user.liked.length}</div>
						<span className="title">Viewed:</span>
						<div className="mb">{user.viewed.length}</div>

						<button className="logoutBtn" onClick={logout}>LOG OUT</button>
					</>
				}


			</form>
		</>
	)
}