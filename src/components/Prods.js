import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import ProdView from "./ProdView"
import Banner from "./../components/Banner"
import * as api from "../api"


export default function Prods() {

	const { user } = useContext(Context) // todo: nothing on 1 launch
	const [stateProds, stateProdsSet] = useState()
	const [addInfo, addInfoSet] = useState() // add e.g calories/proteins/fats/carbohydrates to the prod_small
	const [value, valueSet] = useState()

	useEffect(() => {
		handleChange(null, "price&asc")
	}, [])

	const prods_ = stateProds?.map(prod => {
		if (user?.viewed.includes(prod._id)) {
			return <ProdView key={prod._id} obj={prod} mode="viewed" addInfo={addInfo} />
		}
		return <ProdView key={prod._id} obj={prod} addInfo={addInfo} />
	})

	// ! handleChange
	async function handleChange(e, onLoadQuery) {
		const query = onLoadQuery || e.target.value
		valueSet(query) // set select value

		const res = await api.filter(query)
		stateProdsSet(res)

		const additionalInfo = query.match(/(.+)(?:&)/)[1] // add e.g calories/proteins/fats/carbohydrates to the prod_small
		addInfoSet(additionalInfo)
	}


	// ! RETURN
	return (
		<>

			<Banner />

			<div className="fcc">
				<div className="title">All Products:</div>

				<select
					className="ml"
					value={value}
					onChange={handleChange}
				>
					<option value="calories&asc">Calories: Low to High</option>
					<option value="calories&desc">Calories: High to Low</option>
					<option value="proteins&asc">Proteins: Low to High</option>
					<option value="proteins&desc">Proteins: High to Low</option>
					<option value="fats&asc">Fats: Low to High</option>
					<option value="fats&desc">Fats: High to Low</option>
					<option value="carbohydrates&asc">Carbohydrates: Low to High</option>
					<option value="carbohydrates&desc">Carbohydrates: High to Low</option>
					<option value="expiration&asc">Expiration: Low to High</option>
					<option value="expiration&desc">Expiration: High to Low</option>
					<option value="createdAt&desc">Newest Items</option>
					<option value="createdAt&asc">Oldest Items</option>
					<option value="title&asc">A to Z</option>
					<option value="title&desc">Z to A</option>
					<option value="price&asc">Price: Low to High</option>
					<option value="price&desc">Price: High to Low</option>
				</select>
			</div>


			<div className="prods">
				{prods_}
			</div>
		</>
	)
}