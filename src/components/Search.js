import React, { useEffect, useState } from "react"
import * as api from "../api"
import { useParams } from "react-router-dom"
import Prod from "./Prod"

export default function Search() {

	const { query } = useParams()
	const [searched, searchedSet] = useState()

	useEffect(() => {
		async function search() {
			const res = await api.search(query)
			searchedSet(res)
		}

		search()
	}, [query])

	const prods_ = searched?.map(prod => <Prod key={prod._id} obj={prod} />)

	return (
		<>
			{prods_}
		</>
	)
}