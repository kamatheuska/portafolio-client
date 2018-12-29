import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import weather from '@/projects/Weather/module'

import {
    truthyArguments
} from '../helpers/index'

import {
    SET_APP_SERVICE
} from './mutation-types'

// import * as Cookies from 'js-cookie';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)
/* const hideElementsExcept = (menu, bool, arr) => {
    arr.forEach(el => {
        el.hidden = bool
    })
    // eslint-disable-next-line
    menu.active ? null : menu.hidden = !bool
    console.log(menu.hidden)
}
*/

export default new Vuex.Store({
    state: {
        baseURL: {
            api: '/api/'
        },
        service: '',
        wikipediaApiUrl: 'https://en.wikipedia.org/w/api.php',
        homepage: {
            navigation: [
                { id: 'nav-bio', name: 'bio', hidden: false, active: false },
                { id: 'nav-projects', name: 'projects', hidden: false, active: false },
                { id: 'nav-music', name: 'music', hidden: false, active: false },
                { id: 'nav-contact', name: 'contact', hidden: false, active: false }
            ]
        }
    },
    getters: {
        getApiPayload: ({ service }, rootGetters) => (value) => {
            switch (service) {
                case 'weather/local': {
                    let { units, exclude } = rootGetters['weather/getConfig']
                    return Object.assign({}, { units, exclude }, {
                        lat: value.latitude.toString(),
                        lng: value.longitude.toString()
                    })
                }

                case 'weather/other': {
                    let { units, exclude } = rootGetters['weather/getConfig']
                    console.log('Printing- - - - -:value', value)
                    return Object.assign({}, { units, exclude }, { address: value })
                }
            }
        },
        getApiUrl: ({ baseURL }) => (service) => `${baseURL.api}${service}`
    },
    mutations: {
        [SET_APP_SERVICE] (state, serviceName) {
            state.service = serviceName
        }
    },
    actions: {
        showSubmenu ({ commit, state }, name) {
            let menu = state.homepage.navigation
                .filter(el => el.name === name)[0]
            commit('HANDLE_NAVIGATION_STATUS', menu)
            commit('TOGGLE_HOME_CONNECTORS', menu)
        },

        hideSubmenu ({ commit, state }) {
            commit('SET_NAVIGATION_TO_HOME')
        },

        requestApi ({ state, rootGetters, getters }, payload) {
            console.log('Printing- - - - -:payload', payload)
            let config = getters.getApiPayload(payload)
            let url = getters.getApiUrl(state.service)
            console.log('Printing- - - - -:payload', payload)
            console.log('Printing- - - - -:config', config)
            if (!truthyArguments([ url, config ])) {
                throw new Error('No URL or config on requestApi.')
            }
            switch (state.service) {
                case 'weather/local':
                case 'weather/other':
                    return axios
                        .create()
                        .post(url, config)
                case 'quote':
                    return axios
                        .create()
                        .get('/api/quote')

                case 'tweet':
                    return axios
                        .create()
                        .get('/api/quote')

                case 'wiki':
                    return axios
                        .create()
                        .get(state.wikipediaApiUrl, config)

                case 'twitch/users':
                    return axios
                        .create()
                        .get('/api/twitch/users')

                case 'twitch/recommended':
                    return axios
                        .create()
                        .get('/api/twitch/streams/recommended')

                case 'cv':
                    return axios
                        .create()
                        .get('/files/cv')
            }
        }
    },
    modules: {
        weather
    }
})
