import { http } from './config'

export default {
  all: () => {
    return http.get('/all')
  },
 
  byEmail: (email = '') => {
    return http.get(`/${email}`)
  },

  create: (user = {}) => {
    return http.post('', user)
  },

  update: (id = '', data = {}) => {
    return http.put(`/${id}`, data)
  },

  delete: (id = '') => {
    return http.delete(`/${id}`)
  }

}