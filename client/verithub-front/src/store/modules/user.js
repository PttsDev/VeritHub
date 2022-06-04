const state = () => ({
  userName: null,
  photoURL: null,
  email: null,
  fullName: null,
  password: null,
  isLogged: false,
  isAdmin: false,
})

const getters = {
  userName: state => state.userName,
  photoURL: state => state.photoURL,
  email: state => state.email,
  fullName: state => state.fullName,
  password: state => state.password,
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

  setFullName(state, fullName) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.fullName = fullName;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.fullName = fullName
  },
  setPassword(state, password) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.password = password;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.password = password
  },
  setIsAdmin(state, isAdmin) {
    let userStore = JSON.parse(localStorage.getItem('userStore'))
    userStore.isAdmin = isAdmin;
    localStorage.setItem('userStore', JSON.stringify(userStore))
    state.isAdmin = isAdmin
  },

  initializeStore(state) {
    if (localStorage.getItem('userStore')) {
      let userStore = JSON.parse(localStorage.getItem('userStore'))
      state.userName = userStore.userName
      state.photoURL = userStore.photoURL
      state.email = userStore.email
      state.isLogged = userStore.isLogged
      state.fullName = userStore.fullName
      state.password = userStore.password
      state.isAdmin = userStore.isAdmin
    } else {
      let userStore = {
        userName: null,
        photoURL: null,
        email: null,
        isLogged: false,
        fullName: null,
        password: null,
        isAdmin: false,
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
    userStore.fullName = null;
    userStore.password = null;
    userStore.isAdmin = false;
    localStorage.setItem('userStore', JSON.stringify(userStore));
    state.userName = null;
    state.photoURL = null;
    state.email = null;
    state.isLogged = false;
    state.fullName = null;
    state.password = null;
    state.isAdmin = false;
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

  setFullName({ commit }, fullName) {
    commit('setFullName', fullName)
  },
  setPassword({ commit }, password) {
    commit('setPassword', password)
  },
  setIsAdmin({ commit }, isAdmin) {
    commit('setIsAdmin', isAdmin)
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