import request from './request'

export function getUser (queryString) {
  return request({
    url: `/user?${queryString}`,
    method: 'GET'
  })
}

export function updateUser (edit) {
  return request({
    url: `/user`,
    method: 'PUT',
    data: {
      id: edit.id,
      password: edit.password,
      email: edit.email
    }
  })
}

export function addUser (user) {
  return request({
    url: '/user/register',
    method: 'post',
    data: user
  })
}

export function login (user) {
  return request({
    // url: `/user/login`,
    url: `/api/User/Login?LoginID=` + user.username + '&PassWord=' + user.password,
    method: 'post'
    // data: user
  })
}
