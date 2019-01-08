import {
    TOGGLE_STREAMS,
    FETCHED_STATUS,
    BIND_STORE_PROPERTY,
    SET_ONLINE_USERS,
    SET_APP_SERVICE,
    HIDE_STREAMS
} from '@/store/mutation-types'

const state = {
    show: {
        online: false,
        offline: false,
        users: false
    },
    actions: [
        {
            className: 'button--state-alert',
            name: 'toggleStreams',
            arg: 'users',
            text: 'ALL'
        },
        {
            className: 'button--primary',
            name: 'toggleStreams',
            arg: 'online',
            text: 'ONLINE'
        },
        {
            className: 'button--state-alert',
            name: 'toggleStreams',
            arg: 'offline',
            text: 'OFFLINE'
        }
    ],
    online: [],
    offline: [],
    users: [],
    recommended: [],
    fetched: false

}

const getters = {
    onlineUsers: ({ users, recommended }) => {
        return users
    }
}

const mutations = {
    [TOGGLE_STREAMS]: ({ show }, payload) => {
        show[payload] = !show[payload]
    },
    [HIDE_STREAMS]: ({ show }) => {
        for (let category in show) {
            show[category] = false
        }
    },
    [SET_ONLINE_USERS] ({ online }, userIds) {
        online = userIds
    },
    [BIND_STORE_PROPERTY]: (state, payload) => {
        state[payload.type] = payload.value
    },
    [FETCHED_STATUS] (state, status) {
        state.fetched = status
    }
}

const actions = {
    toggleStreams ({ commit }, payload) {
        commit(HIDE_STREAMS)
        commit(TOGGLE_STREAMS, payload)
    },

    fetchStreams ({ commit, dispatch }, service) {
        commit(SET_APP_SERVICE, service, { root: true })
        return dispatch('requestApi', null, { root: true })
    },

    setStreams ({ commit, dispatch }, payload) {
        commit(BIND_STORE_PROPERTY, payload)
        commit(SET_APP_SERVICE, null, { root: true })
        commit(FETCHED_STATUS, true)
    },

    setStreamOnlineStatus ({ commit, state }) {
        let onlineUserIds = getters.onlineUsers()
        commit(SET_ONLINE_USERS, onlineUserIds)
    },

    setError ({ commit }) {
        commit(FETCHED_STATUS, false)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
