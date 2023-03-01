import { curLang } from "../consts"

export default function useTranslate() {
	// * when google translates crap ;)

	const translations = {
		"check it out": { uk: "заціни", ru: "зацени" },
		"new": { uk: "новинка", ru: "новинка" },
		"total": { ru: "всего" },
		"email or password is incorrect": { uk: "email або пароль вказано невірно", ru: "email или пароль указан неверно" },
		"user already exists": { uk: "користувач вже існує", ru: "пользователь уже существует" },
		"login": { uk: "увійти", ru: "войти" },
		"register": { ru: "регистрация" },
		"delete product": { uk: "видалити товар", ru: "удалить товар" },
		"thank you for the order, we will contact you soon": { uk: "дякуємо за замовлення, ми зв'яжемося з вами найближчим часом", ru: "спасибо за заказ, мы свяжемся с вами в ближайшее время" },
	}

	function t(word) {
		const result = translations?.[word?.toLowerCase()]?.[curLang] || word
		return result?.[0].toUpperCase() + result?.slice(1)
	}

	return (
		[t]
	)
}