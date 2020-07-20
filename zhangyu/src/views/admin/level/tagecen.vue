<template>
	<div class="tcVbox" >
		<div class="tcVboxBg" @click="hindAdd"></div>
		
			<slot></slot>
		
	</div>
</template>

<script>
export default {
	props:['hind'],
    data() {
		return{
			
		}
	},
	 methods: {
		hindAdd(){
			this.$emit("hind"); 
		},
	}
}
</script>

<style>
</style>
