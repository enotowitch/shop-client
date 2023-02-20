import React from "react"
import Icon from "./Icon"

export default function Icons({ _id }) {
	return (
		<>
			<Icon _id={_id} name="liked" />
			<Icon _id={_id} name="upd" />
			<Icon _id={_id} name="del" />
			<Icon _id={_id} name="carted" />
		</>
	)
}