<template>
    <div class="ProjectsDash">
        <h1 @click="goHome">ProjectsDash</h1>
        <Nav :data="links" />
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
    padding: 2rem
}
.ProjectsDash h1 {
    padding: 3rem;
}
</style>
