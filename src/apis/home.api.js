import request from './request'

export function getHomeSum () {
  return request.post('/api/LampControl/GetLampInfor')
}
