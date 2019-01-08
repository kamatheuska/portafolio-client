<template>
    <div class="Weather__controller">
        <button
            @click="fetchAndSetData">
            {{ fetched ? 'REFRESH' : 'GO' }}
        </button>
        <div v-if="fetched">
            <button
                v-for="(action, index) in actions"
                :key="`action#${index + 1}`"
                :class="action.className"
                @click="executeToggle(action.name, action.arg)">
                {{ action.text }}
            </button>

        </div>
        <div v-if="input">
            <input
                v-model="input.text"
                :class="input.className"
                :type="input.type"
                :placeholder="input.placeholder">
        </div>
        <span v-if="help">
            <em>
                <strong>
                    <small>{{ help }}</small>
                </strong>
            </em>
        </span>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex'

export default {
    name: 'controller-app',
    computed: {
    },
    methods: {
        ...mapActions('twitch', [
            'toggleStreams',
            'setStreams',
            'setError',
            'setStreamOnlineStatus',
            'fetchStreams'
        ]),

        fetchAndSetData () {
            this.fetchStreams('twitch/users')
                .then((res) => {
                    this.setStreams({ type: 'users', value: res.data.data })
                    this.toggleStreams('users')
                    return this.fetchStreams('twitch/recommended')
                })
                .then((res) => {
                    this.setStreams({ type: 'recommended', value: res.data.data })
                    this.setStreamOnlineStatus()
                })
                .catch(this.errorHandler)
        },

        errorHandler (error) {
            this.setError()
            console.error('Error on fetchWeather', error)
        },

        executeToggle (name, argument) {
            this[name](argument)
        }
    },
    props: [ 'actions', 'help', 'input', 'fetched' ]
}
</script>
