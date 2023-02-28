import useRedirect from "./useRedirect"

export default function usePrevent() {

	const [redirect] = useRedirect()

	function prevent(e) {
		e.stopPropagation()
		e.preventDefault()
		redirect()
	}

	return [prevent]
}