import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import profile from "../img/profile.svg"
import profiled from "../img/profiled.svg"
import like from "../img/like_black.svg"
import liked from "../img/liked_black.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"
import add from "../img/add.svg"
import search from "../img/search.svg"
import logo from "../img/logo.png"
import { Context } from "../Context"
import Burger from "./Burger"
import SearchLink from "./links/SearchLink"
import { useNavigate } from "react-router-dom"



export default function Header() {

	const { user, prods } = useContext(Context)

	const isAdmin = true // todo

	const searchIcon = () => (
		<SearchLink searchValue={value} field="text"><img className="header__icon" src={search} /></SearchLink>
	)

	const logoIcon = () => (
		<div className="header__wrap">
			<Link to="/"><img className="header__logo" src={logo} /></Link>
		</div>
	)

	const profileIcon = () => (
		user
			? <Link to="/profile"><span className="brand">PROFILE</span></Link>
			: <Link to="/profile"><span>PROFILE</span></Link>
	)

	const likeIcon = () => (
		user?.liked?.length > 0
			? <Link to="/like"><span className="brand">LIKED ({user?.liked?.length})</span></Link>
			: <Link to="/like"><span>LIKED</span></Link>
	)

	const cartIcon = () => {
		const uniqId = []
		user?.carted.map(id => !uniqId.includes(id) && (uniqId.push(id)))

		return user?.carted?.length > 0
			? <Link to="/cart">
				<span className="brand">CART ({uniqId?.length})</span>
			</Link>
			: <Link to="/cart"><span>CART</span></Link>
	}

	const addIcon = () => (
		isAdmin
		&& <Link to="/add"><span className="brand">ADD</span></Link>
	)

	// ! cats
	const [showCats, showCatsSet] = useState(true)

	function toggleCats() {
		showCatsSet(prev => !prev)
	}

	const cats = []
	prods?.map(prod => {
		// todo .split(", ") => adding new prod admin must write: prodCat1, prodCat2, prodCat3... (,<space>)
		prod.cats.split(", ").map(cat => !cats.includes(cat) && cats.push(cat))
	})

	const cats_ = cats.map(cat => <SearchLink key={cat} searchValue={cat} field="cats"><span>{cat}</span></SearchLink>)
	// ? cats

	// search input value
	const [value, valueSet] = useState("")

	// compute !FIXED! header height for marginBottom
	const [hh, hhSet] = useState()
	useEffect(() => {
		hhSet(document?.querySelector(".header")?.clientHeight + 30)
	}, [])

	// ! redirect
	const navigate = useNavigate()

	function redirect(e) {
		const href = e.target.closest("a").href.match(/(?:\/)(\w+)$/)[1]
		const noUserNoGo = ["like", "cart", "add"]
		noUserNoGo.includes(href) && !user && navigate("/profile")
	}
	// ? redirect


	// ! RETURN
	return (
		<>
			<div className="header zi9">

				<Burger onClick={toggleCats} />

				{logoIcon()}

				<div className="header__wrap">
					<input
						type="text"
						value={value}
						onChange={(e) => valueSet(e.target.value)}
						placeholder="search"
					/>
					{searchIcon()}
				</div>

				<div className="header__wrap header__nav" onClick={redirect}>

					{profileIcon()}
					{likeIcon()}
					{cartIcon()}
					{addIcon()}
				</div>

				{showCats &&
					<div className="cats zi2">
						{cats_}
					</div>}

			</div>

			<div style={{ marginBottom: hh }}></div>
		</>
	)
}