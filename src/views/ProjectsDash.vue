<template>
    <div class="ProjectsDash">
        <div>
            <h1>
                <span @click="goHome">ProjectsDash</span>
            </h1>
        </div>
        <Nav :data="links" />
        <router-view />
    </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
    name: 'app-projects-dash',
    data () {
        return {
            links: [
                {
                    href: '/projects/rqmachine',
                    title: 'Random Movie Quotes'
                },
                {
                    href: '/projects/twitchtv',
                    title: 'Twich TV Streams'
                },
                {
                    href: '/projects/weather',
                    title: 'Weather App'
                },
                {
                    href: '/projects/matiz',
                    title: 'Matiz App'
                },
                {
                    href: '/projects/earthbnb',
                    title: 'Earthbnb App'
                }
            ]
        }
    },
    components: {
        Nav
    },
    methods: {
        goHome () {
            this.$router.push('/')
        }

    },
    computed: {

    }
}
</script>

<style scoped>
.ProjectsDash {
    padding: 5px
}
.ProjectsDash h1 {
    padding: 3rem;
    cursor: pointer;
}
</style>
