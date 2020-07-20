<template>
	<comd :tableConfig="tableConfig" :getType="getType" :activeOn="activeOn" :screensd="screensd" :tjType="tjType" :tjset="tjset"></comd>
</template>
<script>
import comd from './m_com.vue';
export default {
	components:{comd},
	data(){
		return{
			activeOn:"3",
			tjType:'wallpaper',
			tjset:[
				{name:'待审核数（个）',num:0},
				{name:'入库数（个）',num:0},
				{name:'上线数（个）',num:0},
				{name:'下线数（个）',num:0},
			],
			getType:['m_wallpaper'],
			screensd:[{label:'全部',value:''},{label:'锁屏壁纸脚本图',value:'m_wallpaper'}],
			tableConfig:{
				total:0,
				ischeck:true,
				list:[
					{prop:'id',lable:'素材Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'picture_style',lable:'风格分类'},
					{prop:'space_num',lable:'广告位数量'},
					{prop:'size',lable:'素材尺寸'},				
					{prop:'price',lable:'价格'},			
					{prop:'material_status',lable:'状态'},
					{prop:'finish_at',lable:'入库时间',sor:true},
					{prop:'attachment.url',lable:'附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]							
					},
				],
				btns:[
					{fnName:'need_work',cls:'pldc',value:'批量导出',check:'1'},
				],
			},
			
		}
	},
}
</script>

<style>
</style>
