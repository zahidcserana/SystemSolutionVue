import request from '@/utils/request'
import { env } from '@/utils'

export function view (id) {
  return request({
    url: `${env.api_url}/customers/${id}`,
    method: 'get'
  })
}

export function update (data) {
  return request({
    url: `${env.api_url}/customers/${data.id}`,
    method: 'put',
    data
  })
}

export function index (query = null) {
  return request({
    url: `${env.api_url}/customers?page=${query.page}&limit=${query.limit}&search=${query.search}`,
    method: 'get'
  })
}

export function customerList (search) {
  return request({
    url: `${env.api_url}/customers`,
    method: 'get',
    search
  })
}

export function create (data) {
  return request({
    url: `${env.api_url}/customers`,
    method: 'post',
    data
  })
}
