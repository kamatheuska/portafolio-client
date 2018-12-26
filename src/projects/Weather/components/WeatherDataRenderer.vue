<template>
    <transition name="fade">
    <div class="Weather__data">
        <div>
            <span class="Weather__data--temp h--bold">
                {{ temperature | toFixedDecimal(0) }}
                <span>{{ unit.current }}</span>
            </span>
        </div>
        <div>
            <button class="button__tiny" @click="changeUnits()">
                Change to {{ unit.other }}
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

export default {
    name: 'WeatherDataRenderer',
    data () {
        return {
            unit: {
                current: 'ºC',
                other: 'ºF'
            },
            temperature: 23.2
        }
    },
    methods: {
        changeUnits () {
            let u = this.unit.current
            this.temperature = this.convertTemperature(this.temperature, u)
            ;[this.unit.current, this.unit.other] = [this.unit.other, this.unit.current]
        },

        convertTemperature (temperature, unit) {
            console.log('Printing- - - - -:temperature, unit', temperature, unit)
            return unit === 'ºC'
                ? (temperature * 9 / 5) + 32
                : (temperature - 32) * 5 / 9
        }
    },
    props: [ 'data' ],
    filters: {
        toFixedDecimal (num) {
            return Number.parseFloat(num).toFixed(1)
        }
    }
}
</script>
<style scoped>
</style>
