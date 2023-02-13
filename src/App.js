import React from "react"
import Prods from "./components/Prods"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Add from "./components/Add"
import Cart from "./components/Cart"
import ProdFull from "./components/ProdFull"
import Search from "./components/Search"


export default function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<Prods />} />
				<Route path="/profile" element={<Login />} />
				<Route path="/add" element={<Add />} />
				<Route path="/cart" element={<Cart />} />

				<Route path="prod/:id" element={<ProdFull />} />
				<Route path="search/:query" element={<Search />} />
			</Routes>
		</>
	)
}