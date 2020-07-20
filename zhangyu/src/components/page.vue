<template>
<ul v-if="typeOnde==1" class="tbalcp">
	<li v-for="(el,index) in tableDatas">
				<img preview="1" :preview-text="el.id" :src="el.preview_url" alt="">
				<p>{{el.id}}</p>
				<p>{{el.material_type}}</p>
				<p>{{el.material_status}}</p>
				<p>{{el.created_at}}</p>
				<p>{{el.link}}</p>
			</li>			
</ul>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
