import api from '@/services/api'

export default {

  createComment (credentials) {
    return api().post('/comment/create', credentials);
  },

  findComments (credentials) {
    return api().post('/comment/find', credentials);
  }
}
