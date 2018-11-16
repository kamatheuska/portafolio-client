<template>
<div id="app">
    <transition name=fade>
        <router-view />
    </transition>
</div>
</template>

<script>
import './assets/css/resetStyles.css'
import './assets/css/stylesheet.css'
export default {
    name: 'App'
}
</script>

<style>
</style>
