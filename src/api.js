import axios from "axios"
import { baseURL } from "./consts"

const instance = axios.create({
	baseURL: baseURL
})

// type = login or register
export const authType = async (type, form) => {
	try {
		const { data } = await instance.post(type, form)
		data?.token && localStorage.setItem("token", data.token)
		alert(`SUCCESS ${type}`)
	} catch (err) {
		console.log(err)
		alert(`FAIL TO ${type}`)
	}
}

export const auth = async () => {
	try {
		const token = localStorage.getItem("token")
		const { data: userData } = await instance.post(`auth/${token}`)
		return userData
	} catch (err) {
		console.log(err)
		alert("FAIL TO AUTH")
	}
}