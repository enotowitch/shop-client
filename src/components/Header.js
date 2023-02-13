import React, { useContext, useState } from "react"
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
			? <Link to="/profile"><img className="header__icon" src={profiled} /></Link>
			: <Link to="/profile"><img className="header__icon" src={profile} /></Link>
	)

	const likeIcon = () => (
		user?.liked?.length > 0
			? <Link to="/like"><img className="header__icon" src={liked} /></Link>
			: <Link to="/like"><img className="header__icon" src={like} /></Link>
	)

	const cartIcon = () => (
		user?.carted?.length > 0
			? <Link to="/cart"><img className="header__icon" src={carted} /></Link>
			: <Link to="/cart"><img className="header__icon" src={cart} /></Link>
	)

	const addIcon = () => (
		isAdmin
		&& <Link to="/add"><img className="header__icon" src={add} /></Link>
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

	const cats_ = cats.map(cat => <SearchLink searchValue={cat} field="cats"><span>{cat}</span></SearchLink>)
	// ? cats

	// search input value
	const [value, valueSet] = useState("")


	// ! RETURN
	return (
		<div className="header zi9">

			<Burger onClick={toggleCats} />

			{logoIcon()}

			<div className="header__wrap">
				<input
					type="text"
					value={value}
					onChange={(e) => valueSet(e.target.value)}
				/>
				{searchIcon()}

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
	)
}