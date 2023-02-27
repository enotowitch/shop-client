import React, { useEffect, useState, useRef } from "react"
import * as api from "../api"
import { useNavigate, useParams } from "react-router-dom"
import imgDummy from "../img/img.svg"
import Input from "./Input"
import test from "../test"

export default function Add() {

	const navigate = useNavigate()

	const [form, formSet] = useState(
		JSON.parse(localStorage.getItem("addForm"))
		||
		{
			// ! MAIN
			title: ``, // ${Math.random()}
			weight: ``, // ${Math.random()}
			categories: ``, // ${Math.random()}
			text: ``, // ${Math.random()}
			imgUrl: ``,
			price: ``, // ${Math.random()}
			// ! SECONDARY
			composition: ``, // ${Math.random()}
			calories: ``, // ${Math.random()}
			proteins: ``, // ${Math.random()}
			fats: ``, // ${Math.random()}
			carbohydrates: ``, // ${Math.random()}
			expiration: ``, // ${Math.random()}
			temperature: ``, // ${Math.random()}
			// ! OTHER
			delivery: ``, // ${JSON.parse(localStorage.getItem("delivery"))}
			payment: ``, // ${JSON.parse(localStorage.getItem("payment"))}
			warranty: ``, // ${JSON.parse(localStorage.getItem("warranty"))}
		}
	)

	// ! TODO - TEST REMOVE LATER
	async function test_() {
		test.map(prod => api.addProd(prod))
	}
	// ? TODO - TEST REMOVE LATER

	// ! handleChange
	function handleChange(e) {
		formSet(prev => ({ ...prev, [e.target.name]: e.target.value }))
		localStorage.setItem("addForm", JSON.stringify(form))
		// save "OTHER" section as it's almost always the same
		localStorage.setItem("delivery", JSON.stringify(form.delivery))
		localStorage.setItem("payment", JSON.stringify(form.payment))
		localStorage.setItem("warranty", JSON.stringify(form.warranty))
	}
	// ? handleChange


	// ! handleChangeFile
	const fileRef = useRef(null)
	const [imgLoaded, imgLoadedSet] = useState(false)

	const handleChangeFile = async (e) => {
		const formData = new FormData()
		formData.append("image", e.target.files[0])

		const img = await api.uploadProdImg(formData)
		formSet(prev => ({ ...prev, imgUrl: img.url }))
		imgLoadedSet(img.url)
	}
	// ? handleChangeFile

	// ! UPDATE
	const { id: updateId } = useParams()

	useEffect(() => {
		if (updateId) {
			async function getProdInfo() {
				const res = await api.getOneProd(updateId)
				formSet(res) // fill prod form 
				imgLoadedSet(res.imgUrl)
			}

			getProdInfo()
		}
	}, [updateId])
	// ? UPDATE

	// ! handleSubmit
	async function handleSubmit(e) {
		e.preventDefault()

		let res
		if (!updateId) {
			res = await api.addProd(form)
		} else {
			res = await api.updProd(updateId, form)
		}

		if (res) {
			localStorage.removeItem("addForm")
			navigate(`/prod/${res._id}`)
		}
	}

	const title = (!updateId ? "Add " : "Update ") + "Product"


	// ! RETURN
	return (
		<>

			<div className="title pt">{title}</div>

			<form className="add__form" onSubmit={handleSubmit}>


				{/* // !! SECONDARY INFO */}
				<div className="f1">

					<div className="title2">composition</div>

					<Input type="textarea" name="composition" value={form.composition} onChange={handleChange} placeholder="composition: text" />
					<Input type="number" name="calories" value={form.calories} onChange={handleChange} placeholder="calories: number" />
					<Input type="number" name="proteins" value={form.proteins} onChange={handleChange} placeholder="proteins: number" />
					<Input type="number" name="fats" value={form.fats} onChange={handleChange} placeholder="fats: number" />
					<Input type="number" name="carbohydrates" value={form.carbohydrates} onChange={handleChange} placeholder="carbohydrates: number" />
					<Input type="number" name="expiration" value={form.expiration} onChange={handleChange} placeholder="expiration: number" />
					<Input name="temperature" value={form.temperature} onChange={handleChange} placeholder="temperature: text" />
				</div>
				{/* // ?? SECONDARY INFO */}

				{/* // !! MAIN INFO */}
				<div className="f2">

					<div className="title2">Main Info</div>

					<Input name="title" value={form.title} onChange={handleChange} placeholder="title: text" />
					<Input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="weight: number" />
					<Input name="categories" value={form.categories} onChange={handleChange} placeholder="categories: text separated by commas" />

					<Input type="textarea" name="text" value={form.text} onChange={handleChange} placeholder="text: text" />

					{/* // ! FILE */}
					<input
						hidden
						ref={fileRef}
						type="file"
						name="imgUrl"
						onChange={handleChangeFile}
					/>

					<img src={imgLoaded || imgDummy} onClick={() => fileRef.current.click()} />
					{/* // ? FILE */}

					<Input type="number" name="price" value={form.price} onChange={handleChange} placeholder="price: number" />

				</div>
				{/* // ?? MAIN INFO */}

				{/* // !! OTHER */}
				<div className="f3">

					<div className="title2">Delivery</div>

					<Input type="textarea" name="delivery" value={form.delivery} onChange={handleChange} placeholder="delivery: text" />
					<Input type="textarea" name="payment" value={form.payment} onChange={handleChange} placeholder="payment: text" />
					<Input type="textarea" name="warranty" value={form.warranty} onChange={handleChange} placeholder="warranty: text" />
				</div>
				{/* // ?? OTHER */}

				<p className="f4">
					<button className="brandBtn">{title}</button>
				</p>

				{/* // todo DELETE LATER */}
				<p className="f5">
					<button onClick={() => (test_())}>test</button>
				</p>
				{/* // todo DELETE LATER */}
			</form>

		</>
	)
}