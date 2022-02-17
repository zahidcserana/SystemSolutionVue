import axios from 'axios'

const TokenKey = 'token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  console.log(removeToken)
  return localStorage.removeItem(TokenKey)
}

export function getUserInfo () {
  return JSON.parse(localStorage.getItem('user_info'))
}

export const env = {
  production: false,
  api_url: 'http://ss.aj/api/',
  domain: 'http://ss.aj/',
  protocal: 'http://',
  storeHoshName: 'ss.aj0',
  patnerHoshName: 'ss.aj',
  partner: 'localhost'
}

export const headers = {
  Authorization: 'Bearer ' + localStorage.getItem('token')
}

export const instance = axios.create({
  baseURL: env.api_url,
  timeout: 1000,
  headers: headers
})

export class Helpers {
  static setLoading (enable) {
    if (enable) {
    }
  }
}
