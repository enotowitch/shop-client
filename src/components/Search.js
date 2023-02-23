import React, { useEffect, useState } from "react"
import * as api from "../api"
import { useParams } from "react-router-dom"
import useViewed from "../hooks/useViewed"

export default function Search() {

	const { query } = useParams()
	const searchValue = query?.match(/(?:searchValue=)(.+?)(?:&)/)[1]
	const field = query?.match(/(?:field=)(.+?)(?:&)/)[1]
	const [searched, searchedSet] = useState()

	useEffect(() => {
		async function search() {
			const res = await api.search(query)
			searchedSet(res)
		}

		search()
		window.scrollTo(0, 0)
	}, [query])

	const prods_ = useViewed(searched)

	return (
		<>
			{searched?.length > 0 && <div className="title pt">{field === "text" && "Search: "}{searchValue}</div>}
			{searched?.length === 0 && <div className="title pt danger">No results for search: {searchValue}</div>}
			<div className="prods">
				{prods_}
			</div>
		</>
	)
}