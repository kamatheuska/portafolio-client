<template>
    <div class="Thumbnail">
        <div class="container__image">
            <h4>{{ stream.display_name || stream.user_name}}</h4>
            <img :src="(stream.profile_image_url || stream.thumbnail_url) | modifyUrl"
                :alt="stream.login"
                class="Thumbnail__image">
        </div>

        <a :href="`https://www.twitch.tv/${stream.login}`"
                title="go to stream"
                v-if="stream.description"
                target="_blank"
                class="Thumbnail__title">
            {{ stream.description | sliceString }}
        </a>
        <a :href="`https://www.twitch.tv/${stream.login}`"
                title="go to stream"
                v-if="stream.title"
                target="_blank"
                class="Thumbnail__title">
            {{ stream.title | sliceString }}
        </a>
        <div>
            <h4>TOTAL VIEWS: {{ stream.view_count || stream.viewer_count}}</h4>
            <h4 v-if="stream.language">LANGUAGE: {{ stream.language | checkLanguage }}</h4>
        </div>
    </div>
</template>

<script>

export default {
    name: 'thumbnail-twitch',
    data () {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    props: [ 'stream' ],
    filters: {
        checkLanguage (str) {
            return str === 'fr'
                ? 'French'
                : str === 'en'
                    ? 'English'
                    : str
        },

        modifyUrl (url) {
            const h = 300
            const w = 300
            return url.replace(/{height}/, h).replace(/{width}/, w)
        }
    }
}
</script>

<style scoped>
.Thumbnail {

}
</style>
