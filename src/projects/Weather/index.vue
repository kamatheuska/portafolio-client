<template>
    <section class="Weather container" :class="setBackground">
        <ProjectHeader
            class="grid__row"
            :title="title"
            :subtitle="subtitle"
            :error="renderError"
            :vendor="vendor"
            />
        <IconsToggler
            :icon-name="currentIcon"
            />
        <WeatherDataRenderer
            v-if="currently"
            :data="currentWeather"
            />
        <Controller />
    </section>
</template>

<script>
import Controller from './components/Controller'
import IconsToggler from './components/IconsToggler'
import WeatherDataRenderer from './components/WeatherDataRenderer'
import ProjectHeader from '@/components/ProjectHeader'

import { mapState } from 'vuex'
import {
    SET_APP_SERVICE,
    SET_USER_LOCATION
} from './mutation-types'

export default {
    name: 'weather-app',
    data () {
        return {
            title: 'WEATHERZILLA',
            error: {
                message: 'AJA!!!',
                status: false
            },
            currentIcon: 'clear-day',
            subtitle: 'An app to check your Weather',
            vendor: {
                href: 'https://darksky.net/poweredby/',
                message: 'Powered by Dark Sky',
                altText: 'Go to darksky.net'
            },
            curWeather: {},
            currentTime: new Date().getHours(),
            unitTemp: {
                current: 'ºC',
                other: 'ºF'
            },
            /*
            currently: {
                temperature: 22,
                summary: 'Hello FooBar',
                windSpeed: 2.2312,
                precipProbability: 1000
            },
            */
            show: false
        }
    },
    components: {
        IconsToggler,
        ProjectHeader,
        WeatherDataRenderer,
        Controller
    },
    computed: {
        ...mapState('weather', ['currently']),

        renderError () {
            return this.error || null
        },

        setBackground () {
            return {
                'Weather__night': this.currentTime < 6 ||
                this.currentTime > 19
            }
        }
    }
}
</script>

<style scoped src="./styles/index.css">
</style>
