// constants

export const API_ROOT = import.meta.env.DEV
  ? 'http://localhost:3150/api/v1'
  : 'https://music-app-api-umber.vercel.app/api/v1'

export const padStart = (value, length) => {
  return String(value).padStart(length, '0')
}
