<template>
<div id="app">
    <transition name=fade>
        <router-view />
    </transition>
</div>
</template>

<script>
import './assets/css/styles.css'
export default {
    name: 'App'
}
</script>

<style>
</style>
