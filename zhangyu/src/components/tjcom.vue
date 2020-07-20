<template>
	<ul class="tjboxd">
		<li v-for="(el,index) in tjDatas" :key="index"><div><div>{{el.name}}</div></div><div>{{el.num}}</div></li>		
	</ul>
</template>
<script>
	export default {
		props:['tjData'],
		data(){
			return {
				tjDatas:'',
			}
		},
		mounted: function () {	
			
			this.setTjData();	
		}, 
		methods: {
			setTjData(){
				console.log(this.tjDatas)
				this.tjDatas = this.tjData;
			},
		}
		
	}
</script>

<style>
.tjboxd li{
	position: relative;
	display: inline-block;
	width:312px;
	height:110px;
	background:rgba(255,255,255,1);
	box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
	vertical-align: middle;
	margin:0 70px 30px 0;
}
.tjboxd li:last-child{
	margin-right: 0;
}
.tjboxd li>div:nth-child(1){
	position: absolute;
	top: 47px;
	left: 40px;
	font-size:14px;
	font-family:PingFang-SC-Light;
	font-weight:300;
	color:rgba(0,0,0,1);
	opacity:0.85;
}
.tjboxd li>div:nth-child(2){
	position: absolute;
	top: 38px;
	right: 40px;
	font-size:28px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(255,120,117,1);
}
</style>
