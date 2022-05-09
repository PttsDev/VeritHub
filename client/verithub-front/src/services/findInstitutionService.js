import api from '@/services/api'


export default {

  find (credentials) {
    return api().post('/find', credentials);
  }, 
}
