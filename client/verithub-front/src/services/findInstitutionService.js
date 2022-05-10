import api from '@/services/api'


export default {

  find (credentials) {
    return api().post('/institution/find', credentials);
  }, 
}
