<template>
	<div>
		<sxBox v-if="screenConfig && screenConfig.length>0" @sxFn="sxFn" :sxDatas="screenConfig" ref="sxBox" ></sxBox>
		<tjBox v-if="tjData && tjData.length>0"  :tjData="tjData"></tjBox>
		<scTable :tableConfig="tableConfig" :tableDatas="tableDatas"  ref="Table"></scTable>	
	</div>		
</template>
<script>
import sxBox from '../../components/sxBox';
import tjBox from '../../components/tjcom';
import scTable from '../../components/newTable';
export default {
	components:{sxBox,tjBox,scTable},
	props:['screenConfig','tableConfig','tableDatas','screenFn','tjData'],
    data() {
		return {
			onSxData:{p:10,page:1,},
		}
    },
	mounted: function () {	
	
	}, 
	methods: {	
		qhTables(){				
			this.$refs.Table.checkSt();				
		},
		setLoding(type){
			this.$refs.Table.setLoding(type);	
		},
		lodingfalse(){
			this.$refs.Table.lodingfalse();	
		},
		initpage(){
			this.$refs.Table.initPage();
		},
		sxFn(d){	
			this.$refs.Table.initPage();
			d.p = 10;
			d.page =1;
			this.$emit("screenFn",d); 
		},				
		setCurrentPage(num){
			this.onSxData.p = num;	
			this.onSxData.page = 1;	
			this.$emit("screenFn",this.onSxData); 
		},
		setPage(num){
			this.onSxData.page = num;
			this.$emit("screenFn",{page:num}); 
		},
		xzFn(data){
			this.$parent.xzFn(data); 
		},
		clickfn(name,cs){
			this.$parent[name](cs); 
		},
    },
  }	
	
</script>
<style>
</style>