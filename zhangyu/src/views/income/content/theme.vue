<template>
        <home :type='type'></home>
</template>

<script>
import home from './theme_payment'
export default {
    components:{home},
    data(){
        return{
            type:1
        }
    },
}
</script>

<style>

</style>