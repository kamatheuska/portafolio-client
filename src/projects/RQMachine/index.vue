<template>
    <transition name="fade">
    <div class="RQMachine grid" :class="newBackground">
        <div class="RQMachine__container box grid">
            <ProjectHeader
                :title="title"
                :subtitle="subtitle"
            />
            <div class="box grid__row">
                <h1 class="RQMachine__quote">{{ text }}</h1><br>
                <h3 class="RQMachine__author">{{ author }}</h3>
            </div>
            <div class="RQMachine__icons">
                <a
                    :href="encodedQuote"
                    target="_blank"
                    title="Wanna tweet?">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>
            <button
                class="button"
                @click="getRandomQuote()">
                Get a new quote
            </button>
        </div>
    </div>
    </transition>
</template>

<script>
import ProjectHeader from '@/components/ProjectHeader'
import {
    SET_APP_SERVICE
} from '@/store/mutation-types'
import {
    mapActions
} from 'vuex'

export default {
    name: 'rqmachine-app',
    data () {
        return {
            darker: false,
            title: 'Random Movie Quotes',
            subtitle: 'An app to get cool movie quotes',
            text: '',
            author: '',
            tweetURL: 'https://twitter.com/intent/tweet?text='
        }
    },
    computed: {
        newBackground () {
            return {
                'RQMachine--darker': this.darker
            }
        },

        encodedQuote () {
            return encodeURI(`${this.tweetURL}${this.text} ${this.author}`)
        }
    },
    methods: {
        ...mapActions([
            'requestApi'
        ]),

        getRandomQuote () {
            this.$store.commit(SET_APP_SERVICE, 'quote')
            this.requestApi({ service: 'quote' })
                .then((res) => {
                    console.log(res)
                    this.text = res.data.text
                    this.author = res.data.author
                    this.darker = !this.darker
                })
                .catch(this.errorHandler)
        },

        errorHandler (error) {
            console.error('Error on fetchWeather', error)
        }
    },
    components: {
        ProjectHeader
    },
    created () {
        this.getRandomQuote()
    }
}
</script>

<style scoped>
</style>
