import api from '@/services/api'


export default {

  find (credentials) {
    return api().post('/institution/find', credentials);
  },
  
  findCointains (credentials) {
    return api().post('/institution/findCointains', credentials);
  }, 
}
