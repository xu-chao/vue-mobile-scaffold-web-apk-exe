import request from './request'

export function getLamp (queryString) {
  return request({
    url: `/lamp?${queryString}`,
    method: 'GET'
  })
}

export function turnOn (id, ip, number, name) {
  return request({
    method: 'post',
    url: '/api/LampControl/TurnOnLamp?LampID=' + id + '&IP=' + ip + '&number=' + number + '&Name=' + name
  })
}

export function turnOff (id, ip, number, name) {
  return request({
    method: 'post',
    url: '/api/LampControl/TurnOffLamp?LampID=' + id + '&IP=' + ip + '&number=' + number + '&Name=' + name
  })
}

export function getAllLamp (bzId) {
  return request({
    url: '/api/LampControl/GetLampList?GroupID=' + bzId,
    method: 'post'
  })
}

export function updateLamp (lamp) {
  return request({
    method: 'PATCH',
    url: '/lamp',
    data: lamp
  })
}

export function createLamp (lampForm) {
  return request({
    url: '/lamp',
    method: 'post',
    data: lampForm
  })
}

export function addLamp (id, value) {
  return request({
    url: `/lamp/add`,
    method: 'POST',
    data: {
      id: id,
      lamp: parseFloat(value)
    }
  })
}

export function deleteLamp (id) {
  return request({
    url: '/lamp',
    method: 'DELETE',
    data: {
      id: id
    }
  })
}
