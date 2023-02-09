import axios from "axios"
import { baseURL } from "./consts"

const instance = axios.create({
	baseURL: baseURL
})

// ! user
// type = login or register
export const authType = async (type, form) => {
	try {
		const { data } = await instance.post(type, form)
		data?.token && localStorage.setItem("token", data.token)
		alert(`SUCCESS ${type}`)
		return data // userData
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
// ? user

// !! prod
// ! add
export const add = async (form) => {
	try {
		// const token = localStorage.getItem("token") // todo
		const { data: prodData } = await instance.post(`prod`, form)
		return prodData
	} catch (err) {
		console.log(err)
		alert("FAIL TO add product")
	}
}

// ! get
export const get = async (form) => {
	try {
		const { data: prodData } = await instance.get(`prod`, form)
		return prodData
	} catch (err) {
		console.log(err)
		alert("FAIL TO get products")
	}
}
// ?? prod