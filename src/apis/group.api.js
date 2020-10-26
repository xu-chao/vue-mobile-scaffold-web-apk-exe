import request from './request'

export function getAllGroup () {
  return request.post(`/api/LampControl/GetGroupList`)
}

export function groupTurnLook (id) {
  return request({
    method: 'post',
    url: '/api/LampControl/GetLampList?GroupID=' + id
  })
}

export function groupTurnOn (id) {
  return request({
    method: 'post',
    url: '/api/LampControl/GroupTurnOn?GroupID=' + id
  })
}

export function groupTurnOff (id) {
  return request({
    method: 'post',
    url: '/api/LampControl/GroupTurnOff?GroupID=' + id
  })
}

export function getGroupById (id) {
  return request.post(`/api/Timing/GetTiming?GroupID=${id}`)
}

export function updateGroupStatus (id, status) {
  return request.patch('/group', {
    id: id,
    status: status
  })
}

export function updateGroup (id, title, content) {
  return request.put('/group', {
    id: id,
    title: title,
    content: content
  })
}

export function publishGroup (title, content) {
  return request.post('/group', {
    title: title,
    content: content
  })
}

export function deleteGroup (id) {
  return request({
    method: 'DELETE',
    url: '/group',
    data: {
      id: id
    }
  })
}
