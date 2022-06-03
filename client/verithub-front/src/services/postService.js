import api from '@/services/api'

export default {

  createPost (credentials) {
    return api().post('/post/create', credentials);
  },

  findPosts (credentials) {
    return api().post('/post/find', credentials);
  }
}
