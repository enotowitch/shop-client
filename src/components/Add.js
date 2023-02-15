import React, { useEffect, useState } from "react"
import * as api from "../api"

export default function Add() {

	const [form, formSet] = useState(
		{
			title: "",
			cats: "",
			text: "",
			imgUrl: "",
			price: "",
		}
	)

	// !handleChange
	function handleChange(e) {
		formSet(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	// ! handleSubmit
	async function handleSubmit(e) {
		e.preventDefault()

		const res = await api.addProd(form)
		console.log(res) // todo
	}

	// ! handleChangeFile
	const handleChangeFile = async (e) => {
		const formData = new FormData()
		formData.append("image", e.target.files[0])

		const img = await api.uploadProdImg(formData)
		formSet(prev => ({ ...prev, imgUrl: img.url }))
	};


	// ! RETURN
	return (
		<form className="add__form" onSubmit={handleSubmit}>

			<input
				type="text"
				name="title"
				value={form.title}
				onChange={handleChange}
				placeholder="title"
			/>

			<input
				type="text"
				name="cats"
				value={form.cats}
				onChange={handleChange}
				placeholder="cats"
			/>

			<textarea
				type="textarea"
				name="text"
				value={form.text}
				onChange={handleChange}
				placeholder="text"
			/>

			<input
				type="file"
				name="imgUrl"
				onChange={handleChangeFile}
			/>

			<input
				type="text"
				name="price"
				value={form.price}
				onChange={handleChange}
				placeholder="price"
			/>

			<button>add product</button>

		</form>
	)
}