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
            v-model="location"
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
    SET_USER_LOCATION,
    SET_APP_SERVICE
} from '../mutation-types'

import {
    createNamespacedHelpers
} from 'vuex'

const {
    mapActions,
    mapState
} = createNamespacedHelpers('weather')

export default {
    name: 'weather-controller',
    computed: {
        ...mapState([
            'geolocation',
            'location',
            'currently',
            'status'
        ]),

        _location: {
            get () {
                return this.location
            },
            set (location) {
                this.store.commit(`weather/${SET_STATE_ON_PROP}`, {
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

        ...mapActions([
            'checkGeoSupport',
            'getClientGeolocation',
            'setCurrentWeather'
        ]),

        fetchWeather (type = 'local') {
            this.$store.commit(SET_APP_SERVICE, {
                primary: 'weather',
                secondary: type
            })

            this.checkGeoSupport()
                .then(() => this.getClientGeolocation())
                .then(() => this.$store.dispatch('requestApi', this.geolocation))
                .then((res) => this.setCurrentWeather(res.data))
                .catch(this.errorHandler)
        },

        errorHandler (error) {
           //  this.store.commit(`weather/${SET_STATE_ON_PROP}`, {
           //      prop: 'fetched',
           //      data: false
           //  })
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
