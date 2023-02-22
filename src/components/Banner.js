import React from "react"

export default function Banner() {

	let img0, img1, img2, img3
	try {
		img0 = require(`../img/banner0.jpg`)
		img1 = require(`../img/banner1.jpg`)
		img2 = require(`../img/banner2.jpg`)
		img3 = require(`../img/banner0.jpg`)
	} catch (err) { console.log(err) }

	return (
		<div className="f banner">
			<img src={img0} />
			<img src={img1} />
			<img src={img2} />
			<img src={img3} />
		</div>
	)
}