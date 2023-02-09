import React, { useEffect, useState } from "react"
import { add } from "../api"

export default function Add() {

	const [form, formSet] = useState() // todo real form

	useEffect(() => {
		async function addProd() { // todo real form
			for (let i = 1; i <= 9; i++) {
				await add({
					title: `Title ${i}`,
					cats: `Cat ${i}`,
					text: `Text ${i}`,
					imgUrl: "https://img.freepik.com/premium-photo/paper-bag-with-healthy-food-healthy-food-background-supermarket-food-concept-shopping-supermarket-home-delivery_167368-269.jpg",
					price: `$${i}00`
				})
			}
		}

		addProd()
	}, [])

	return (
		"ADD PRODUCT"
	)
}