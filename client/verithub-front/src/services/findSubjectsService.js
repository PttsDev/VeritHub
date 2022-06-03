import api from '@/services/api'


export default {

  findAll (credentials) {
    return api().post('/subject/findAll', credentials);
  },
  
  find (credentials) {
    return api().post('/subject/find', credentials);
  },
}
