const state = () => ({
    foundInstitutions: [],
})

const mutations = {
    setFoundInstitutions(state, foundInstitutions) {
        state.foundInstitutions = foundInstitutions
        sessionStorage.setItem('foundInstitutions', JSON.stringify(foundInstitutions))
    }
}

const actions = {
    setFoundInstitutions({ commit }, foundInstitutions) { 
        commit('setFoundInstitutions', foundInstitutions)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }