<!-- THE NAV COMPONENT:
    1. props: {
        data: [
            {
                href: <PATH TO ROUTE>,
                title: <TEXT TO DISPLAY>
            },
            {
                ...
            },
            ...
        ]
    }

    2. Call it like:

    <Nav :data="<DATA-ARRAY>">
-->

<template>
<nav>
    <ul class="Nav__ul">
        <li class="Nav__li" v-for="(link, index) in data" :key="`link#${ index }`">
            <a :href="`${link.href}`">{{link.title}}</a>
        </li>
    </ul>
</nav>
</template>

<script>
let timeout = 3

export default {
    name: 'app-nav',
    data () {
        return {

        }
    },
    methods: {
        scrollTo (hashtag) {
            console.log('---->>  logging...\n', location.href)
            setTimeout(() => { location.href = hashtag }, timeout)
        }
    },
    mounted () {
        if (this.$route.hash) {
            setTimeout(() => this.scrollTo(this.$route.hash), timeout)
        }
    },
    props: ['data']
}
</script>

<style scoped>
.Nav__ul {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.Nav__li {
    font-size: 1.8rem;
    font-weight: bold;
    transition-property: all;
    transition-duration: 0.6s;
    transition-timing-function: ease;
}
.Nav__li:hover {
    color: #d232c5;
    transform: scale(1.1)
}
</style>
