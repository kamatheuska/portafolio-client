<template>
    <transition name="fade">
    <div class="Weather__data">
        <div>
            <span class="Weather__data--temp h--bold">
                {{ temperature | toFixedDecimal(0) }}
                <span>{{ unit }}</span>
            </span>
        </div>
        <div>
            <button class="button__tiny" @click="changeUnits()">
                Change to {{ unit }}
            </button>
        </div>
        <div class="Weather__data--sum">
            <span>{{ data.summary }}</span>
        </div>
        <div class="Weather__data--other">
            <span>Wind <strong>{{ data.windSpeed | toFixedDecimal(1) }}km/h</strong></span>
            <br>
            <span>Precip. <strong>{{ data.precipProbability }}</strong></span>
            <br>
        </div>
    </div>
    </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'WeatherDataRenderer',
    methods: {
        ...mapActions('weather', [
            'changeUnits'
        ])
    },
    props: [ 'data', 'unit', 'temperature' ],
    filters: {
        toFixedDecimal (num) {
            return Number.parseFloat(num).toFixed(1)
        }
    }
}
</script>
<style scoped>
</style>
