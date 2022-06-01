import api from '@/services/api'

export default {

  modifyData (credentials) {
    return api().post('/user/modify', credentials);
  }
}
