import { createStore } from 'vuex'
import user from './modules/user'
import institutions from './modules/institutions'

export default createStore({
  modules: {
    user,
    institutions,
  },
})
