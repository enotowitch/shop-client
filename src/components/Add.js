import React, { useEffect, useState } from "react"
import * as api from "../api"

export default function Add() {

	const [form, formSet] = useState() // todo real form

	useEffect(() => {
		async function addProd() { // todo real form
			for (let i = 1; i <= 9; i++) {
				await api.addProd({
					title: `Title ${i}`,
					cats: `Cat ${i}, Cat ${i + 1}`,
					text: `Text ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
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