import {
    SET_CURRENT_ERROR,
    SET_STATE_ON_PROP,
    SET_USER_LOCATION
} from './mutation-types'

import errors from './errors'

const state = {
    errors,
    axiosPayload: {
        units: 'si',
        exclude: 'minutely,hourly,daily,alerts,flags'
    },
    location: 'Bangkok',
    baseURL: '/api/weather/',
    service: 'other',
    msgSuccess: 'Everything good!',
    currentWeather: {},
    geolocation: {},
    fetched: false
}

const getters = {

    currentError: ({ errors }, getters) => getters.errorByCode(errors.current),

    errorByCode: ({ errors }) => (code = 5001) => errors.all.find(error => error.code === code),

    geolocationStatus: () => !!navigator.geolocation,
    
    getApiUrl: ({ baseURL, service }) =>
        `${baseURL}${service}`,

    getConfig: ({ axiosPayload: { units, exclude } }) => ({ units, exclude })
}

const mutations = {
    [SET_CURRENT_ERROR] ({ errors }, errorCode = null) {
        errors.current = errorCode
    },
    [SET_STATE_ON_PROP] (state, payload) {
        state[payload.prop] = Object.assign({}, payload.data)
    }
}

const actions = {

    checkGeoSupport ({ state, commit, getters }) {
        return new Promise((resolve, reject) => {
            if (getters.geolocationStatus) {
                commit('SET_CURRENT_ERROR', null)
                resolve()
            } else {
                commit('SET_CURRENT_ERROR', 5002)
                reject()
            }
        })
    },

    getClientGeolocation ({ state, commit }) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                commit('SET_STATE_ON_PROP', {
                    prop: 'geolocation',
                    data: pos.coords
                })
                commit('SET_CURRENT_ERROR', null)
                resolve()
            }, () => {
                commit('SET_CURRENT_ERROR', 5003)
                reject()
            })
        })
    },

    setCurrentWeather ({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            try {
                commit('SET_CURRENT_ERROR', null)
                commit('SET_STATE_ON_PROP', { prop: 'currentWeather', data }) 
                commit('SET_STATE_ON_PROP', { prop: 'fetched', data: true })
            } catch (error) {
                commit('SET_CURRENT_ERROR', error)
            }
        }) 
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
