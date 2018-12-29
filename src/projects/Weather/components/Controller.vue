<template>
    <div class="Weather__controller">
        <button
            class="button__small"
            @click="fetchWeather()">
                weather on my location
        </button>
        <br>
        <button
            class="button__small"
            @click="fetchWeather('other')">
                weather on other places
        </button>
        <input
            v-model="_location"
            class="input__text--large"
            type="text"
            style="margin-bottom: 0.5rem; text-align: center"
            placeholder="New York">
        <br>
        <span>
            <em>
                <strong>
                    <small>Try typing the name of a city</small>
                </strong>
            </em>
        </span>
    </div>
</template>

<script>
import {
    FETCHED_STATUS,
    SET_APP_SERVICE,
    BIND_STORE_PROPERTY
} from '@/store/mutation-types'

import {
    mapActions,
    mapState
} from 'vuex'

export default {
    name: 'weather-controller',
    computed: {
        ...mapState('weather', [
            'geolocation',
            'location',
            'status'
        ]),

        _location: {
            get () {
                return this.location
            },
            set (location) {
                this.$store.commit(`weather/${BIND_STORE_PROPERTY}`, {
                    prop: 'location',
                    data: location
                })
            }
        },

        setBackground () {
            return {
                'Weather__night': this.currentTime < 6 ||
                    this.currentTime > 19
            }
        }
    },
    methods: {

        ...mapActions('weather', [
            'checkGeoSupport',
            'getClientGeolocation',
            'setCurrentWeather'
        ]),

        ...mapActions([
            'requestApi'
        ]),

        fetchWeather (type = 'local') {
            this.$store.commit(SET_APP_SERVICE, `weather/${type}`)
            if (type === 'local') {
                this.checkGeoSupport()
                    .then(() => this.getClientGeolocation())
                    .then((geolocation) => this.requestApi(geolocation))
                    .then((res) => this.setCurrentWeather(res.data))
                    .then(() => { this.$store.commit(`weather/${FETCHED_STATUS}`, true) })
                    .catch(this.errorHandler)
            } else {
                this.requestApi(this.location)
                    .then((res) => this.setCurrentWeather(res.data))
                    .then(() => { this.$store.commit(`weather/${FETCHED_STATUS}`, true) })
                    .catch(this.errorHandler)
            }
        },

        errorHandler (error) {
            this.$store.commit(`weather/${FETCHED_STATUS}`, false)
            console.error('Error on fetchWeather', error)
        }

    }
}
</script>

<style>
.Weather__controller {
    width: 100%;
    grid-column: 4 / -1;
    grid-row: 3;
}

@media only screen
and (min-device-width: 320px)
and (orientation: portrait) {

    .Weather__controller {
        grid-column: 1 / -1;
        grid-row: 4 / span 1;
    }
}
@media only screen
and (min-device-width: 320px)
and (max-device-width: 812px)
and (orientation: landscape) {

    .Weather__controller {
        grid-column: 1 / span 1;
        grid-row: 3 / span 1;
    }
}
</style>
