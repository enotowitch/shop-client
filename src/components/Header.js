import React, { useContext, useEffect, useState } from "react"
import search from "../img/search.svg"
import logo from "../img/logo.png"
import { Context } from "../Context"
import Burger from "./Burger"
import SearchLink from "./links/SearchLink"
import { useNavigate } from "react-router-dom"
import { mobileWidth } from "../consts"
import profile from "../img/profile.svg"
import profiled from "../img/profiled.svg"
import like from "../img/lik.svg"
import liked from "../img/liked.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"
import add from "../img/add.svg"
import HeaderLink from "../components/links/HeaderLink"



export default function Header() {

	const { user, prods } = useContext(Context)

	const isAdmin = user?.email?.match(/admin/i)?.[0] // TODO

	const searchIcon = () => (
		value // if smth in search input
			? <SearchLink searchValue={value} field="text"><img className="header__icon" src={search} /></SearchLink>
			: <img className="header__icon" src={search} />
	)

	const logoIcon = () => (
		<div className="header__wrap">
			<HeaderLink to="/"><img className="header__logo" src={logo} /></HeaderLink>
		</div>
	)

	const profileIcon = () => (
		user
			? <HeaderLink to="/profile"><img className="header__icon" src={profiled} /></HeaderLink>
			: <HeaderLink to="/profile"><img className="header__icon" src={profile} /></HeaderLink>
	)

	const likeIcon = () => (
		user?.liked?.length > 0
			? <HeaderLink to="/like"><img className="header__icon" src={liked} />
				<b className="cart__num ml3">{user?.liked?.length}</b>
			</HeaderLink>
			: <HeaderLink to="/like"><img className="header__icon" src={like} /></HeaderLink>
	)

	const cartIcon = () => {
		const uniqId = []
		user?.carted.map(id => !uniqId.includes(id) && (uniqId.push(id)))

		return user?.carted?.length > 0
			? <HeaderLink to="/cart">
				<img className="header__icon" src={carted} />
				<b className="cart__num">{uniqId?.length}</b>
			</HeaderLink>
			: <HeaderLink to="/cart"><img className="header__icon" src={cart} /></HeaderLink>
	}

	const addIcon = () => (
		isAdmin
		&& <HeaderLink to="/add"><img className="header__icon" src={add} /></HeaderLink>
	)

	// !! categories
	const [showCategories, showCategoriesSet] = useState(true)

	useEffect(() => {
		// show categories for DESKTOP, else user has to click BURGER to see categories
		window.innerWidth > mobileWidth ? showCategoriesSet(true) : showCategoriesSet(false)
	}, [])

	function toggleCategories() {
		showCategoriesSet(prev => !prev)
	}

	const categories = []
	prods?.map(prod => {
		// todo .split(", ") => adding new prod admin must write: prodCat1, prodCat2, prodCat3... (,<space>)
		prod?.categories?.split(", ").map(cat => !categories.includes(cat) && categories.push(cat))
	})

	function catFn(e) {
		// * for MOBILE
		document?.querySelector(".menu__btn")?.click()
		// all devices
		// * active cat
		// document.querySelectorAll(".cat").forEach(each => each.classList.remove("cat_active"))
		// e.currentTarget.classList.add("cat_active")
		// * thank you googTrans
		document.querySelector(".googTransT1").innerText = e.currentTarget.innerText
	}

	const categories_ = categories.map(cat => <SearchLink key={cat} searchValue={cat} field="categories"><span className="cat" onClick={catFn}>{cat}</span></SearchLink>)
	// ?? categories

	// search input value
	const [value, valueSet] = useState("")

	// compute !FIXED! header height for marginBottom
	const [hh, hhSet] = useState()
	useEffect(() => {
		// set marginBottom from `header div` everywhere (+30px) but `HOME PAGE`(0px)
		if (window.location.pathname !== "/") {
			hhSet(document?.querySelector(".header")?.clientHeight + 30)
		} else {
			hhSet(document?.querySelector(".header")?.clientHeight)
		}
	}, [window.location.pathname])

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

				{window.innerWidth <= mobileWidth && <Burger onClick={toggleCategories} />}

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

				<div className="header__wrap header__nav" onClick={redirect} translate="no">

					<span id="google_translate_element"></span>
					{profileIcon()}
					{likeIcon()}
					{cartIcon()}
					{addIcon()}
				</div>

				{showCategories &&
					<div className="categories zi2">
						{categories_}
					</div>}

			</div>

			<div style={{ marginBottom: hh }}></div>
		</>
	)
}