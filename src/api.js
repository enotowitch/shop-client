import axios from "axios"
import { baseURL } from "./consts"

const instance = axios.create({
	baseURL: baseURL
})

instance.interceptors.request.use(config => {
	config.headers.Authorization = localStorage.getItem("token")
	return config
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
		// alert("FAIL TO AUTH")
	}
}

export const liked = async (_id) => {
	const { data } = await instance.patch("user/liked", { _id })
	console.log(data)
}

export const carted = async (_id) => {
	const { data } = await instance.patch("user/carted", { _id })
	console.log(data)
}
// ? user

// !! prod
// ! addProd
export const addProd = async (form) => {
	try {
		// const token = localStorage.getItem("token") // todo
		const { data: prodData } = await instance.post(`prod`, form)
		return prodData
	} catch (err) {
		console.log(err)
		alert("FAIL TO add product")
	}
}

// ! getAllProd
export const getAllProd = async (form) => {
	try {
		const { data: prodData } = await instance.get(`prod`, form)
		return prodData
	} catch (err) {
		console.log(err)
		// alert("FAIL TO get products")
	}
}

// ! getOneProd
export const getOneProd = async (_id) => {
	const { data } = await instance.post(`prod/${_id}`)
	return data
}
// ?? prod

// ! search
export const search = async (query) => {
	const { data } = await instance.get(`search/${query}`)
	return data
}
// ? search