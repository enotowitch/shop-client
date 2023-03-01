import React, { useEffect, useState } from "react"

export default function Banner() {

	const [num, numSet] = useState(0)

	useEffect(() => {

		setTimeout(() => {
			numSet(prev => prev < 2 ? prev + 1 : 0)
		}, 5000); // must = to .banImgAnim

		document.querySelectorAll(".banImg").forEach(each => each.classList.remove("banImgAnim"))
		document.querySelectorAll(".banImg")[num].classList.add("banImgAnim")

	}, [num])

	let img0, img1, img2
	try {
		img0 = require(`../img/banner0.jpg`)
		img1 = require(`../img/banner1.jpg`)
		img2 = require(`../img/banner2.jpg`)
	} catch (err) { console.log(err) }

	return (
		<div className="banner">
			<img className="banImg" src={img0} />
			<img className="banImg" src={img1} />
			<img className="banImg" src={img2} />
		</div>
	)
}