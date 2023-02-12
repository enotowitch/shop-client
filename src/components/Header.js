import React, { useContext } from "react"
import { Link } from "react-router-dom"
import profile from "../img/profile.svg"
import profiled from "../img/profiled.svg"
import cart from "../img/cart.svg"
import carted from "../img/carted.svg"
import add from "../img/add.svg"
import logo from "../img/logo.svg"
import { Context } from "../Context"


export default function Header() {

	const { user } = useContext(Context)

	const isAdmin = true // todo

	const profileIcon = () => (
		user
			? <Link to="/profile"><img className="header__icon" src={profiled} /></Link>
			: <Link to="/profile"><img className="header__icon" src={profile} /></Link>
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

	const logoIcon = () => (
		<Link to="/"><img className="header__icon" src={logo} /></Link>
	)


	return (
		<div className="header zi9">
			{logoIcon()}
			{profileIcon()}
			{cartIcon()}
			{addIcon()}
		</div>
	)
}