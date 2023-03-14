import React from "react"
import * as api from "../api"

export default function TestLogin() {

	async function admin() {
		const res = await api.authType("register", { email: `admin${Math.random()}@gmail.com`.replace(/0./, ""), password: "123" })
		window.location.reload()
	}
	async function user() {
		const res = await api.authType("register", { email: `user${Math.random()}@gmail.com`.replace(/0./, ""), password: "123" })
		window.location.reload()
	}

	return (
		<div className="testLogin c mt2">
			<div>TEST LOGIN</div>
			<button onClick={admin} className="testBtn">admin</button>
			<button onClick={user} className="ml testBtn">user</button>
		</div>
	)
}