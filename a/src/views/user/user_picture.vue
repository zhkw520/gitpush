<template>
	<comd :tableConfig="tableConfig" :getType="getType"></comd>
</template>
<script>
import comd from './m_com.vue';
export default {
	components:{comd},
	data(){
		return{
			getType:'',
			tableConfig:{
				total:0,
				ischeck:false,
				list:[
					{prop:'work_id',lable:'素材Id'},
                    {prop:'need_id',lable:'需求Id'},
					{prop:'preview_url',lable:'预览图',type:'imgs'},
					{prop:'material_type',lable:'素材类型'},
					{prop:'position',lable:'广告位类型'},
					{prop:'size',lable:'素材尺寸'},
					{prop:'material_status',lable:'状态'},
					{prop:'created_at',lable:'最近更新时间'},
					{prop:'attachment.url',lable:'作品附件下载',
						temps:[{cls:'bjysdicon iconfont',type:'text',value:'&#xe61a;',fnName:'downlod'}]
					},
					{prop:'attachment.url',lable:'操作',widht:210,
						temps:[
							{type:'primary',size:'mini',cls:'xqshticon',value:'通过',fnName:'opentg',round:'round'},
							{type:'primary',size:'mini',cls:'xqshjicon',value:'拒绝',fnName:'openjj',round:'round'},
							// {type:'primary',size:'mini',value:'转审',fnName:'open4',round:'round'},
						]							
					}
				],
                expand:[

				]
			},
			
		}
	},
}
</script>

<style>
</style>
