<template>
	<div class="sler" v-if="sxDatas.length>0">
		<div  v-for="el in sxDatas" :key="el.title"> 
			<span>{{el.title}}</span>
			<template>
				<el-select v-if="el.type=='select'" v-model="bind[el.value]" filterable placeholder="请选择">
					<el-option v-for="item in el.list" :key="item.value" :label="item.label" :value="item.value" >
					</el-option>
				</el-select>
				<el-date-picker v-if="el.type=='times'" v-model="bind[el.value]" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
				<el-input class="sxtext" v-if="el.type=='text'"  v-model="bind[el.value]" placeholder="请输入内容"></el-input>
			</template>					
		</div>
		<el-button round @click="sx()" class="sxbtnd">筛选</el-button>
	</div>	
</template>

<script>
	export default {
		props:['sxDatas','sxFn'],
		data(){
			return {
				bind:{},
			}
		},
		methods: {
			sx(){		
				this.$emit("sxFn",this.bind);  
			},
		}		
	}
</script>

<style>
.sler{
	position: relative;
	margin-bottom: 30px;
	width: 100%;
	padding: 46px 38px 0;
	box-sizing: border-box;
min-height: 120px;
background:rgba(255,255,255,1);
box-shadow:0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.sler .el-select{
	width: 185px;
}
.sler>div{
	height: 30px;
	line-height: 30px;
	display: inline-block;
	font-size:14px;
	margin-bottom: 46px;
font-family:PingFang-SC-Light;
font-weight:300;
color:rgba(0,0,0,1);
opacity:0.65;
vertical-align: middle;
margin-right: 75px;
}
.sler>div:last-child{
	margin-right: 0;
}
.sler>div input{
    margin-left: 7px;
}
.sxtext{
	width: 70% !important;
}
.sler .el-range-editor.el-input__inner{
	margin-left: 7px;
}
</style>
