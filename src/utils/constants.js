// constants

export const API_ROOT = import.meta.env.DEV
  ? 'http://localhost:3150/api/v1'
  : 'https://music-app-api-umber.vercel.app/api/v1'

export const padStart = (value, length) => {
  return String(value).padStart(length, '0')
}

export const validateEmail = (email) => {
  const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
  return regexEmail.test(email)
}
