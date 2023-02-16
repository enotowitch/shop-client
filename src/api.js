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

export const carted = async (_id, type = "one") => {
	const { data } = await instance.patch("user/carted", { _id, type })
	return data
}
// ? user

// !! prod
// ! addProd
export const addProd = async (form) => {
	try {
		const { data } = await instance.post(`prod`, form)
		return data
	} catch (err) {
		console.log(err)
		alert("FAIL TO add product")
	}
}
// ! uploadProdImg
export const uploadProdImg = async (formData) => {
	try {
		const { data } = await instance.post(`upload`, formData)
		return data
	} catch (err) { console.log(err) }
}

// ! getAllProd
export const getAllProd = async (form) => {
	try {
		const { data } = await instance.get(`prod`, form)
		return data
	} catch (err) {
		console.log(err)
		// alert("FAIL TO get products")
	}
}

// ! getOneProd
export const getOneProd = async (_id) => {
	const { data } = await instance.get(`prod/${_id}`)
	return data
}
// ! delProd
export const delProd = async (_id) => {
	const { data } = await instance.delete(`prod/${_id}`)
	return data
}
// ! updProd
export const updProd = async (_id, form) => {
	const { data } = await instance.patch(`prod/${_id}`, form)
	return data
}

// ?? prod

// ! search
export const search = async (query) => {
	const { data } = await instance.get(`search/${query}`)
	return data
}
// ? search