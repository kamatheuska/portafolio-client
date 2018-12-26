<template>
    <div class="ProjectHeader">
        <h1>{{ title }}</h1>
        <h3>{{ subtitle }}</h3>
        <h6 v-if="error">{{ error.message || defaultError }}</h6>
        <h5 v-if="vendor">
            <a :href="vendor.href" target="_blank">
                {{ vendor.message }}
            </a>
        </h5>
    </div>
</template>

<script>

export default {
    name: 'ProjectHeader',
    data () {
        return {
           defaultError: 'Some Error ocurred.' 
        }
    },
    props: [ 'title', 'subtitle', 'vendor', 'error' ]
    
}
</script>

