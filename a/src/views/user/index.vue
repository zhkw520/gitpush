<template>
	<div>
		<topNav :config="topConfig"></topNav>
		<leftNav :navData="letNav"></leftNav>
		<div class="xqList">		
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
</template>
<script>
import topNav from '../../components/topNav';
import leftNav from '../../components/leftNav';	
export default {
	data() {
		return{
			topConfig:{showL:1},
			letNav:'',
		}
	},
	components: {
		topNav,
		leftNav
	},
	mounted: function () {
	    if(JSON.parse(localStorage.getItem('letNav'))[1].children.length<=0){
            this.$message({
                type: 'error',
                message: `您沒有该权限`
            });
		}else{
            this.letNav = JSON.parse(localStorage.getItem('letNav'))[1]
		}

	 },
}
</script>
<style>
</style>
