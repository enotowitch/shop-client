const lang = document.cookie.match(/(?:googtrans=\/)(\w+)/)?.[1]

export const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
export const weight_ = lang === "uk" || lang === "ru" ? " гр" : "g"
export const currency = "$"
export const exp = lang === "uk" || lang === "ru" ? " дн." : " d"
export const mobileWidth = 700
export const curLang = lang