import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Projects from '@/views/Projects'
import ProjectsDash from '@/views/ProjectsDash'

import Weather from '@/projects/Weather'
import RQMachine from '@/projects/RQMachine'
import WikiViewer from '@/projects/WikiViewer'
import Twitch from '@/projects/Twitch'
import Matiz from '@/projects/Matiz'
import Earthbnb from '@/projects/Earthbnb'

Vue.use(Router)

function checkForMobile (to, from, next) {
    let queryPortrait = 'only screen and (min-device-width: 300px) and (max-device-width: 900px) and (orientation: portrait)'
    let queryLandscape = 'only screen and (min-device-width: 540px) and (max-device-width: 820px) and (orientation: landscape)'
    // eslint-disable-next-line
    if (Modernizr.mq(queryPortrait) || Modernizr.mq(queryLandscape)) {
        next('/m')
    } else {
        next()
    }
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter: checkForMobile
        },
        {
            path: '/m',
            component: Home
        },
        {
            path: '/projects',
            component: Projects,
            children: [
                {
                    path: '',
                    component: ProjectsDash,
                    children: [
                        {
                            path: 'weather',
                            component: Weather
                        },
                        {
                            path: 'rqmachine',
                            component: RQMachine
                        },
                        {
                            path: 'wikiviewer',
                            component: WikiViewer
                        },
                        {
                            path: 'twitchtv',
                            component: Twitch
                        },
                        {
                            path: 'matiz',
                            component: Matiz
                        },
                        {
                            path: 'earthbnb',
                            component: Earthbnb
                        }

                    ]
                }
            ]
        }
    ]
})
