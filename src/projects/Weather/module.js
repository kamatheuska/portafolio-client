import {
    FETCHED_STATUS,
    BIND_STORE_PROPERTY,
    SET_CURRENT_ERROR,
    SET_STATE_ON_PROP
} from '@/store/mutation-types'

import errors from './errors'

const state = {
    errors,
    axiosPayload: {
        units: 'si',
        exclude: 'minutely,hourly,daily,alerts,flags'
    },
    location: 'Bangkok',
    msgSuccess: 'Everything good!',
    currentWeather: {},
    geolocation: {},
    unit: 'ºC',
    fetched: false
}

const getters = {

    currentError: ({ errors }, getters) => getters.errorByCode(errors.current) || null,

    errorByCode: ({ errors }) => (code = 5001) => errors.all.find(error => error.code === code),

    geolocationStatus: () => !!navigator.geolocation,

    getConfig: ({ axiosPayload: { units, exclude } }) => ({ units, exclude }),

    convertTemperature: ({ currentWeather, unit }) => {
        let temp = currentWeather.temperature
        console.log('Printing- - - - -:temp', temp)
        return unit === 'ºC'
            ? temp
            : (temp * 9 / 5) + 32
    }
}

const mutations = {
    [SET_CURRENT_ERROR] ({ errors }, errorCode = null) {
        errors.current = errorCode
    },
    [SET_STATE_ON_PROP] (state, { prop, data }) {
        state[prop] = Object.assign({}, data)
    },
    [BIND_STORE_PROPERTY] (state, { prop, data }) {
        state[prop] = data
    },
    [FETCHED_STATUS] (state, status) {
        state.fetched = status
    }
}

const actions = {
    changeUnits ({ commit }) {
        commit(BIND_STORE_PROPERTY, {
            prop: 'unit',
            data: state.unit === 'ºC' ? 'ºF' : 'ºC'
        })
    },

    checkGeoSupport ({ state, commit, getters }) {
        return new Promise((resolve, reject) => {
            if (getters.geolocationStatus) {
                commit('SET_CURRENT_ERROR', null)
                resolve()
            } else {
                commit('SET_CURRENT_ERROR', 5002)
                reject(new Error())
            }
        })
    },

    getClientGeolocation ({ state, commit }) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                let { latitude, longitude } = pos.coords
                commit('SET_STATE_ON_PROP', {
                    prop: 'geolocation',
                    data: { latitude, longitude }
                })
                commit('SET_CURRENT_ERROR', null)
                resolve({ latitude, longitude })
            }, () => {
                commit('SET_CURRENT_ERROR', 5003)
                reject(new Error())
            })
        })
    },

    setCurrentWeather ({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            try {
                commit('SET_CURRENT_ERROR', null)
                commit('SET_STATE_ON_PROP', { prop: 'currentWeather', data: data.currently })
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
