const state = () => ({
  userName: null,
  photoURL: null,
  email: null,
  isLogged: false,
})

const getters = {
  userName: state => state.userName,
  photoURL: state => state.photoURL,
  email: state => state.email
}

// Llamarlas a través de actions !!
const mutations = {
  setUserName(state, userName) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.userName  = userName;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.userName = userName
  },

  setPhotoURL(state, photoURL) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.photoURL = photoURL;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.photoURL = photoURL
  },

  setEmail(state, email) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.email = email;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.email = email
  },

  setLoggedIn(state, loggedIn) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.isLogged = loggedIn;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.isLogged = loggedIn

  },

  initializeStore(state) {
    if (localStorage.getItem('userStore')) {
      let userStore = JSON.parse(localStorage.getItem('userStore'))
      state.userName = userStore.userName
      state.photoURL = userStore.photoURL
      state.email = userStore.email
      state.isLogged = userStore.isLogged
    } else {
      let userStore = {
        userName: null,
        photoURL: null,
        email: null,
        isLogged: false
      }
      localStorage.setItem('userStore', JSON.stringify(userStore))
    }
  },

  logout(state) {
    let userStore = JSON.parse(localStorage.getItem('userStore'));
    userStore.userName = null;
    userStore.photoURL = null;
    userStore.email = null;
    userStore.isLogged = false;
    localStorage.setItem('userStore', JSON.stringify(userStore));
    state.userName = null;
    state.photoURL = null;
    state.email = null;
    state.isLogged = false;
  }
}

const actions = {
  // {commit} es igual a poner context como atributo y hacer context.commit
  // funcion equivalente
  // setUserName(context, userName) {
  //   context.commit('setUserName', userName)
  // }

  setUserName({ commit }, userName) { 
    commit('setUserName', userName)
  },

  setPhotoURL({ commit }, photoURL) {
    commit('setPhotoURL', photoURL)
  },

  setEmail({ commit }, email) {
    commit('setEmail', email)
  },

  setLoggedIn({ commit }, loggedIn) {
    commit('setLoggedIn', loggedIn)
  },

  initializeStore({ commit }) {
    commit('initializeStore')
  },

  logout({ commit }) {
    commit('logout')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}