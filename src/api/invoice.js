import request from '@/utils/request'
import { env } from '@/utils/auth'

export function storeInvoice (data) {
  return request({
    url: `${env.api_url}invoice`,
    method: 'post',
    data
  })
}

export function updateInvoice (data) {
  return request({
    url: `${env.api_url}invoice/${data.id}`,
    method: 'put',
    data
  })
}

export function invoices (data) {
  return request({
    url: `${env.api_url}invoice`,
    method: 'get',
    params: data
  })
}

export function removeInvoice (data) {
  return request({
    url: `${env.api_url}invoice/${data.id}`,
    method: 'delete'
  })
}

export function invoice (dataId) {
  return request({
    url: `${env.api_url}invoice/${dataId}`,
    method: 'get'
  })
}

// usused
export function invoiceList () {
  return request({
    url: `${env.api_url}/invoices/list`,
    method: 'get'
  })
}

export function requestSchedule (data) {
  return request({
    url: `${env.api_url}/invoice-schedule/request`,
    method: 'post',
    data
  })
}

export function appointmentList (data) {
  return request({
    url: `${env.api_url}/appointments`,
    method: 'get',
    params: data
  })
}

export function scheduleList (invoiceId) {
  return request({
    url: `${env.api_url}/invoice-schedule-list/${invoiceId}`,
    method: 'get'
  })
}

export function invoiceSlot (invoiceId) {
  return request({
    url: `${env.api_url}/invoice-slot/${invoiceId}`,
    method: 'get'
  })
}
