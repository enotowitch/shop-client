import React, { useEffect, useState, useRef } from "react"
import * as api from "../api"
import { useNavigate, useParams } from "react-router-dom"
import imgDummy from "../img/img.svg"

export default function Add() {

	const navigate = useNavigate()

	const [form, formSet] = useState(
		JSON.parse(localStorage.getItem("addForm"))
		||
		{
			title: `title ${Math.random()}`,
			weight: `weight ${Math.random()}`,
			cats: `cats ${Math.random()}`,
			text: `text ${Math.random()}`,
			imgUrl: `imgUrl ${Math.random()}`,
			price: `${Math.random()}`,
		}
	)

	// ! TODO - TEST REMOVE LATER
	useEffect(() => {
		async function test() {
			api.addProd({ title: "Арахис", weight: "100", cats: "Орехи", text: "Важная сельскохозяйственная культура, возделываемая в промышленных масштабах ради плодов — арахисовых «орехов».", imgUrl: "https://static.1000.menu/img/content/35448/araxis-s-solu-na-skovorode_1560078001_1_max.jpg", price: "10" })
			api.addProd({ title: "Финики", weight: "100", cats: "Сухофрукты", text: "С давних времён используется человеком как высокоценный продукт питания. В продажу обычно поступают как сухофрукты. Популярнейшие сорта финиковой пальмы — «деглет нур» и «меджул» — культивируются в промышленных масштабах в странах с жарким климатом.", imgUrl: "https://cdn.lifehacker.ru/wp-content/uploads/2017/03/7-veskih-prichin-vklyuchit-finiki-v-svoj-racion_1622833900.jpg", price: "8" })
			api.addProd({ title: "Миндаль", weight: "50", cats: "Орехи", text: "Широко культивируется вид Миндаль обыкновенный. Более 80 % миндаля на мировом рынке происходит из США, главным образом из Калифорнии[2][3].", imgUrl: "https://nuts.org.ua/wp-content/uploads/2020/05/mindal-s-skorlupe.jpg", price: "20" })
			api.addProd({ title: "Фундук", weight: "50", cats: "Орехи", text: "Лесно́й оре́х — орех любого из 20 видов кустарника (реже дерева) рода Лещина (Corylus) семейства Берёзовые (Betulaceae), в том числе лещины обыкновенной (Corylus avellana) и лещины крупной (Corylus maxima). Орехи крупноплодных форм лещины, в основном лещины обыкновенной, лещины крупной и лещины понтийской, называют фундуком[1][2] (тур. findik[3]).", imgUrl: "https://gradinamax.com.ua/uploads/catalog_products/funduk-shedevr_1.jpg", price: "22" })
			api.addProd({ title: "Корица", weight: "30", cats: "Cпеции", text: "Кори́ца, или Кори́чник цейло́нский (лат. Cinnamomum verum) — вечнозелёное дерево, вид рода Коричник (Cinnamomum) семейства Лавровые (Lauraceae). Корицей также называется и высушенная кора дерева, которая используется в качестве пряности.", imgUrl: "https://n1s1.hsmedia.ru/51/6b/33/516b33298166748b65afd852b3ee75ea/1000x745_0xac120003_19273727461562657802.jpg", price: "16" })
		}

		!localStorage.getItem("test") && test() // run test once
		localStorage.setItem("test", true)
	}, [])
	// ? TODO - TEST REMOVE LATER

	// !handleChange
	function handleChange(e) {
		formSet(prev => ({ ...prev, [e.target.name]: e.target.value }))
		localStorage.setItem("addForm", JSON.stringify(form))
	}


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
			navigate("/")
		}
	}

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
				name="weight"
				value={form.weight}
				onChange={handleChange}
				placeholder="weight"
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
				hidden
				ref={fileRef}
				type="file"
				name="imgUrl"
				onChange={handleChangeFile}
			/>

			<img src={imgLoaded || imgDummy} onClick={() => fileRef.current.click()} />

			<input
				type="text"
				name="price"
				value={form.price}
				onChange={handleChange}
				placeholder="price"
			/>

			<button className="brandBtn">{!updateId ? "add" : "update"} product</button>

			<button onClick={() => (localStorage.removeItem("test"), window.location.href = "/")}>test</button>

		</form>
	)
}