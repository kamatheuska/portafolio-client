<template>
    <div class="ProjectsDash">
        <h1>ProjectsDash</h1>
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
                    href: '/projects/RQMachine',
                    title: 'RQMachine'
                }
            ]
        }
    },
    components: {
        Nav
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped>
/* .ProjectsDash {} */
</style>
