<template>
    <transition name="fade">
        <div class="IconsSvg">
            <component v-bind:is="iconName"></component>
        </div>
    </transition>
</template>

<script>
import Sun from '../icons/Sun'
import Moon from '../icons/Moon'
import Cloud from '../icons/Cloud'
import Rain from '../icons/Rain'
import Storm from '../icons/Storm'
import Snow from '../icons/Snow'
import Wind from '../icons/Wind'
import SunAndRain from '../icons/SunAndRain'
import MoonAndRain from '../icons/MoonAndRain'

export default {
    name: 'IconsToggler',
    data () {
        return {
        }
    },
    methods: {
        showWeatherIcon (responseIcon) {
            let iconNames = Object.keys(this.icons)

            iconNames.forEach((iconName, i) => {
                if (iconName === responseIcon) {
                    console.log(iconName, i)
                    this.showIconAndHideOthers().then(() => {
                        this.icons[iconName] = !this.icons[iconName]
                    })
                }
            })
        },

        showIconAndHideOthers () {
            let keys = Object.keys(this.icons)
            keys.forEach((key) => {
                this.icons[key] = false
            })
            return Promise.resolve()
        }

    },
    components: {
        'clear-day': Sun,
        'clear-night': Moon,
        'cloudy': Cloud,
        'fog': Cloud,
        'partly-cloudy-day': SunAndRain,
        'partly-cloudy-night': MoonAndRain,
        'rain': Rain,
        'sleet': SunAndRain,
        'snow': Snow,
        'wind': Wind,
        'thunder': Storm
    },
    props: ['iconName'],
    created () {
        console.log('Printing- - - - -:this.props', this.iconName)
    }
}
</script>
<style scoped>
.IconsSvg {

}
</style>
