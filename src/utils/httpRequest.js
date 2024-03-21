import axios from 'axios'
import { API_ROOT } from './constants'

const httpRequest = axios.create({
  baseURL: API_ROOT
})

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options)
  return response.data
}

export const post = async (path, data, options) => {
  const response = await httpRequest.post(path, data, options)
  return response.data
}

export const put = async (path, data, options) => {
  const response = await httpRequest.put(path, data, options)
  return response.data
}

export const patch = async (path, data, options) => {
  const response = await httpRequest.patch(path, data, options)
  return response.data
}

export const remove = async (path, options) => {
  const response = await httpRequest.delete(path, options)
  return response.data
}

export default httpRequest
