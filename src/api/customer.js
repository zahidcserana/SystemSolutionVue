import request from '@/utils/request'
import { config } from '../utils/config'

const url = config.api_url

export function view (id) {
  return request({
    url: `${url}customers/${id}`,
    method: 'get'
  })
}

export function update (data) {
  return request({
    url: `${url}customers/${data.id}`,
    method: 'put',
    data
  })
}

export function index (query = null) {
  return request({
    url: `${url}customers?page=${query.page}&limit=${query.limit}&search=${query.search}`,
    method: 'get'
  })
}

export function customerList (search) {
  return request({
    url: `${url}customers`,
    method: 'get',
    search
  })
}

export function create (data) {
  return request({
    url: `${url}customers`,
    method: 'post',
    data
  })
}
