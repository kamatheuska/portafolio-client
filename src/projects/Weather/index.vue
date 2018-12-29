<template>
    <section class="Weather container" :class="setBackground">
        <ProjectHeader
            class="grid__row"
            :title="title"
            :subtitle="subtitle"
            :error="currentError"
            :vendor="vendor"
            />
        <IconsToggler
            :icon-name="currentWeather.icon"
            v-if="fetched"
            />
        <WeatherDataRenderer
            v-if="fetched"
            :data="currentWeather"
            :unit="unit"
            :temperature="convertTemperature"
            />
        <Controller />
    </section>
</template>

<script>
import Controller from './components/Controller'
import IconsToggler from './components/IconsToggler'
import WeatherDataRenderer from './components/WeatherDataRenderer'
import ProjectHeader from '@/components/ProjectHeader'

import { mapState, mapGetters } from 'vuex'

export default {
    name: 'weather-app',
    data () {
        return {
            title: 'WEATHERZILLA',
            currentIcon: 'clear-day',
            subtitle: 'An app to check your Weather',
            vendor: {
                href: 'https://darksky.net/poweredby/',
                message: 'Powered by Dark Sky',
                altText: 'Go to darksky.net'
            },
            curWeather: {},
            currentTime: new Date().getHours(),
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
        ...mapState('weather', [
            'fetched',
            'currentWeather',
            'unit'
        ]),

        ...mapGetters('weather', [
            'currentError',
            'convertTemperature'
        ]),

        setBackground () {
            return {
                'Weather__night': this.currentTime < 6 ||
                this.currentTime > 19
            }
        }
    }
}
</script>
