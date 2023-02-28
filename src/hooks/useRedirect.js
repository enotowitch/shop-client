import { useContext } from "react"
import { Context } from "../Context"
import { useNavigate } from "react-router-dom"

export default function useRedirect() {

	const { user } = useContext(Context)
	const navigate = useNavigate()

	function redirect() {
		if (!user) {
			return navigate("/profile")
		}
	}

	return [redirect]
}