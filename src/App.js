import React from "react"
import Prods from "./components/Prods"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Add from "./components/Add"
import Cart from "./components/Cart"
import ProdFull from "./components/ProdFull"
import Search from "./components/Search"
import Like from "./components/Like"
import Recently from "./components/Recently"

export default function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route exact path="/" element={<Prods />} />
				<Route exact path="/profile" element={<Login />} />
				<Route exact path="/add" element={<Add />} />
				<Route exact path="/upd/:id" element={<Add />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route exact path="/like" element={<Like />} />

				<Route exact path="prod/:id" element={<ProdFull />} />
				<Route exact path="search/:query" element={<Search />} />
			</Routes>

			<Recently type="viewed" />
			<Recently type="new" />
		</>
	)
}