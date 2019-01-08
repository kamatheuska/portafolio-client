<template>
    <div class="Browser grid">
        <div class="Browser__container grid">
            <ProjectHeader
                :title="title"
                :subtitle="subtitle"
                />
            <Controller
                :actions="actions"
                :fetched="fetched"
                />
            <div v-if="show.offline">
                <Thumbnail
                    v-for="(stream, i) in offline"
                    :key="`stream-offline#${i}`"
                    :stream="stream"
                    />
            </div>
            <div v-if="show.users">
                <Thumbnail
                    v-for="(stream, i) in users"
                    :key="`stream-users#${i}`"
                    :stream="stream"
                    />
            </div>
            <div v-if="show.online">
                <Thumbnail
                    v-for="(stream, i) in online"
                    :key="`stream-online#${i}`"
                    :stream="stream"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import ProjectHeader from '@/components/ProjectHeader'
import Controller from '@/components/Controller'
import Thumbnail from './components/Thumbnail'

import {
    mapState
} from 'vuex'

export default {
    name: 'twitch-app',
    data () {
        return {
            title: 'TWITCH STREAMERS',
            subtitle: 'An app to get twitch streams'
        }
    },
    components: {
        ProjectHeader,
        Controller,
        Thumbnail
    },
    computed: {
        ...mapState('twitch', [
            'online',
            'offline',
            'users',
            'show',
            'fetched',
            'actions'
        ])
    }
}
</script>

<style>
.Browser {
    grid-template-columns: auto 400px auto;
    background: #5F5F5E;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    color: white;
    font-family: 'Oswald', sans-serif;
}

.Browser__container {
    overflow: visible;
    grid-template-rows: auto repeat(5, 1fr);
    grid-auto-rows: auto;
    grid-column: 2 / span 1;
    height: 100%;
    width: 100%;
}

/*............BUTTON CONTROLS............*/
.Browser__controls .button--primary {
    color: #09EAAE;
    background: none;
}

.Browser__controls .button--danger {
    color: #FF8B8B;
    background: none;
}

.Browser__controls .button--danger:hover {
    background: #FF8B8B;
    color: #FFF;
}

.Browser__controls .button--danger:focus {
    background: #FF8B8B
}

.Browser__controls .button--primary:hover {
    background: #06B083
}

.Browser__controls .button--primary:focus {
    background: #09EAAE
}

.Browser__controls .button--state-alert:focus {
    background: #DBD3B8
}

.Browser__controls .button--state-submit:focus {
    background: #C2DCE2
}

.Browser__controls .button--danger:focus,
.Browser__controls .button--primary:focus,
.Browser__controls .button--state-alert:focus,
.Browser__controls .button--state-submit:focus {
    color: #3C3C3B
}

.Browser__controls button {
    width: 100%
}

.Browser__controls {
    display: flex
}

/*............HEADER............*/
.Browser__header a {
    display: inline-block
}

.Browser__header a:hover {
    color: #C2DCE2
}

.Browser__header h1 {
    font-size: 3.3rem
}

.Browser__header {
    text-align: center;
    padding-top: 2rem;
}

/*............STREAMS............*/
.Browser .Browser__stream {
    display: grid;
    grid-template-columns: 160px auto;
    padding: 0.5rem;
    border: none;
    background-color: #3C3C3B;
    box-shadow: 1px 1px 5px #070607 inset;
    align-items: center;
    text-align: center;
}

.Stream__title {
    height: max-content;
}

.Stream__thumbnail {
    text-align: center;
    grid-column: span 1;
}

.Stream__thumbnail-img {
    max-width: 8vh;
    max-height: 8vh;
    margin-top: 5px;
    border: 2px #DDD solid;
    border-radius: 50%;
}

/*............MEDIA QUERIES............*/
@media only screen and (min-device-width: 320px) and (orientation: portrait) {
    .Browser {
        display: block;
        padding: 1rem 0.8rem;
    }

    .Browser__header {
        padding-top: 0
    }

}

@media only screen and (min-device-width: 320px) and (max-device-width: 812px) and (orientation: landscape) {
    .Browser {
        display: block;
        padding: 1rem 0.8rem;
    }

    .Browser__header {
        padding-top: 0
    }
}
</style>
