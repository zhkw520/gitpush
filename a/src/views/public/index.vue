<template>
	<div>
		<topNav :config="topConfig"></topNav>
		<leftNav :navData="letNav"></leftNav>
		<div class="xqList">
			<div class="xqListbox">
				<router-view/>
				<div class="footerBox_2">
				<span>© 2015-2020 深圳掌酷软件有限公司</span>
				<a target="_blank" href="http://beian.miit.gov.cn">粤ICP备15039011号</a>
				<a target="_blank" href="http://www.beian.gov.cn">
				<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/footer_ga.png" class="footer_ga">
				粤公网安备 44030502004296号</a>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import topNav from '../../components/topNav';
	import leftNav from '../../components/leftNav';
	import userMessage from './userMessage';
	export default {
		components:{topNav,leftNav,userMessage},
		data() {
			
			return {
				topConfig:{showL:-1},
				letNav:{title:'锁屏壁纸平台',
					list:[
						{title:'公司信息',url:'/indexs/message'},
						{title:'锁屏壁纸列表',url:'/indexs/list'},
					],
				}
				
			};
		},
		mounted: function (){
			
		},
		methods:{
			
		}

	}
</script>

<style>

</style>
