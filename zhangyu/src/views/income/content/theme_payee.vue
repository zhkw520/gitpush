<template>
 <div>
     <payee :type='type'></payee>
 </div>
</template>

<script>
import payee from './payee'
 export default {
     components: {payee},
   data () {
     return {
            type:1
     }
   },
  
 }
</script>

<style>

 
</style>
