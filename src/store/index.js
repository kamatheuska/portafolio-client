import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import weather from '@/projects/Weather/module'

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
        baseURL: 'http://localhost:5000/',
        service: {
            primary: '',
            secondary: ''
        },
        wikipediaApiUrl: 'https://en.wikipedia.org/w/api.php',
        homepage: {
            svgConnectors: [
                { id: 'Connectors__welcome', hidden: false },
                { id: 'Connectors__bio', hidden: true },
                { id: 'Connectors__projects', hidden: true },
                { id: 'Connectors__music', hidden: true },
                { id: 'Connectors__contacts', hidden: true }
            ],
            navigation: [
                { id: 'nav-bio', name: 'bio', hidden: false, active: false },
                { id: 'nav-projects', name: 'projects', hidden: false, active: false },
                { id: 'nav-music', name: 'music', hidden: false, active: false },
                { id: 'nav-contact', name: 'contact', hidden: false, active: false }
            ]
        }
    },
    getters: {
        getAxiosConfig: ({ baseURL, data, service }, rootGetters) =>
            (value) => {
                let config = { baseURL }
                let data
                console.log(`Printing- - - - service2:`, service)
                switch (service.primary) {
                    case 'weather':
                        let { units, exclude } = rootGetters['weather/getConfig']
                        if (service.secondary === 'local') {
                            data = Object.assign({}, { units, exclude }, value)
                        } else {
                            let coords = { lat: value.lat, lng: value.lng }
                            data = Object.assign({}, units, exclude, coords)
                        }
                }

                return Object.assign({}, config, { data })
            },
        getCurrentService: ({ service }) => service
    },
    mutations: {
        /*   HANDLE_NAVIGATION_STATUS: ({ homepage }, menu) => {
            let navs = homepage.navigation
            let isNavActive = homepage.navigation.reduce((bool, el, i) => {
                // eslint-disable-next-line
                el.active ? bool = true : null
                return bool
            }, false)
            if (menu.name === 'projects' && !isNavActive) {
                hideElementsExcept(menu, true, navs)
                menu.active = true
            } else if (menu.name !== 'projects' && !isNavActive) {
                // Set hidden to true to every element except current
                hideElementsExcept(menu, true, navs)
                menu.active = true
            } else {
                // Return to main
                hideElementsExcept(menu, false, navs)
                menu.active = false
            }
        },
        TOGGLE_HOME_CONNECTORS: ({ homepage }, menu) => {
            console.log(menu)
            homepage.svgConnectors[0].hidden = !!menu.active
        },
        SET_NAVIGATION_TO_HOME: ({ homepage }) => {
            homepage.navigation.map(el => {
                el.active = false
                el.hidden = false
                return el
            })
            homepage.svgConnectors.map(el => {
                if (el.id !== 'Connectors__welcome') {
                    el.hidden = true
                }
                el.hidden = false
            })
        }, */
        [SET_APP_SERVICE] ({ service }, { primary, secondary }) {
            service.primary = primary
            service.secondary = secondary
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

        requestApi ({ rootGetters }, payload) {
            // let service = rootGetters.getCurrentService
            let config = rootGetters.getAxiosConfig(payload)
            let url = rootGetters['weather/getApiUrl']
            console.log(`Printing- - - - config:`, config)
            if (!url) {
                throw new Error('No URL on requestApi.')
            } else if (!config) {
                throw new Error('No config on requestApi.')
            } else {
                return axios
                    .create()
                    .post(url, config)
            }
            /*
            switch (service) {
                case 'weather':
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
            } */
        }
    },
    modules: {
        weather
    }
})
