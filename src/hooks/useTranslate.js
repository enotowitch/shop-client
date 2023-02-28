export default function useTranslate() {
	// * when google translates crap ;)

	const selectedLang = document.cookie.match(/(?:googtrans=\/)(\w+)/)[1]

	const translations = {
		"check it out": { uk: "заціни", ru: "зацени" },
		"new": { uk: "новинка", ru: "новинка" },
		"total": { ru: "всего" },
	}

	function t(word) {
		return translations?.[word?.toLowerCase()]?.[selectedLang] || word
	}

	return (
		[t]
	)
}