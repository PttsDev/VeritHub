const state = () => ({
    foundInstitutions: [],
})

const mutations = {
    setFoundInstitutions(state, foundInstitutions) {
        state.foundInstitutions = foundInstitutions
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