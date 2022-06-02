import api from '@/services/api'


export default {

  findAll (credentials) {
    return api().post('/course/findAll', credentials);
  }, 
}
