<template>
	<div class="left_nav">
		<div :class="['leftNavBox',apptyped]" >
			<div class="navbtn iconfont" @click="checkNav">&#xe8d1;</div>
			<div class="leftNavBg"></div>
			<div class="leftNav" >
				<!--<div class="let_title">{{navData.title}}</div>-->
				<el-menu :default-active="$route.fullPath.split('?')[0]" class="el-menu-vertical-demo" :router="true">
					<el-menu-item class="first_o" v-for="(el,index) in navData.list" :index="el.url" :key="index">
						{{el.title}}
					</el-menu-item>
					<el-submenu v-for="(el,index) in navData.children" :index="el.url" :key="index">
						<template slot="title">
							<i class="iconfont"  v-html="el.img" style="margin-left: 42px;color: rgba(31,46,77,1);"></i>
							<span class="title">{{el.title}}</span>
						</template>

						<el-menu-item-group v-if="el.list">
							<el-menu-item v-for="(elx,indexx) in el.list" :index="elx.url" :key="indexx"><span>{{elx.title}}</span></el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group v-if="el.children">
							<el-submenu v-for="(el2,index) in el.children" :index="el2.url" :key="index">
								<template slot="title">
									<span>{{el2.title}}</span>
								</template>
								<el-menu-item-group v-if="el2.list">
									<el-menu-item v-for="(elx,indexx) in el2.list" :index="elx.url" :key="indexx">{{elx.title}}</el-menu-item>
								</el-menu-item-group>
								<el-menu-item-group v-else-if="el2.children">
									<el-submenu v-for="(el3,index) in el2.children" :index="el3.url" :key="index">
										<template slot="title">
											<span>{{el3.title}}</span>
										</template>
										<el-menu-item-group v-if="el3.list">
											<el-menu-item v-for="(elx,indexx) in el3.list" :index="elx.url" :key="indexx">{{elx.title}}</el-menu-item>
										</el-menu-item-group>
									</el-submenu>
								</el-menu-item-group>

							</el-submenu>
						</el-menu-item-group>
						<el-menu-item v-else :index="el.url">
							<span >{{el.title}}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</div>
		</div>
	</div>

</template>
<script>
	import '../assets/icon/iconfont.css'
export default { 
    name: 'app', 
	props:['navData'],
    data(){
		return{
			apptyped:'',
			url:'',
		}
    },
    methods:{
		checkNav(){
			this.apptyped = this.apptyped==''?'oncheac':'';
		},

    }, 
}  			
</script>

<style>
.navbtn{
	display: none;
    position: fixed;
    top: -41px;
    left: 100%;
}
.leftNavBox{
	position: fixed;
	top: 66px;
	left: 0;
	bottom: 0;
	z-index: 9;
	width: 257px;
	transition: transform .5s;
}
.leftNavBg{
	width: 100%;
	height: 100%;
	box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.08);
}
.leftNav{
	position: absolute;
	overflow-y:auto;
	top: 0;
	left: -2px;
	width: 256px;
	height: 100%;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.08);
	scrollbar-width: none;
}
.leftNav::-webkit-scrollbar{
	display: none;
}

.let_title{
	margin-left: 47px;
	width:222px;
	height:54px;
	line-height: 54px;
	font-size:18px;
	margin-bottom: 28px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
	border-bottom:1px solid rgba(0,0,0,.2);

}
.el-submenu{
	width: 256px;
}
.leftNav .el-submenu__title{
	padding: 0 !important;
	height: 60px;
	margin-bottom: 10px;
	line-height: 60px;
	/*text-align: center;*/
}
.leftNav .el-submenu .el-menu-item{
	text-align: left!important;
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(122,135,161,1)!important;
}
.leftNav .el-submenu .el-menu-item span{
	margin-left: 72px;
}
.leftNav .el-submenu__title>.title{
	font-size:16px!important;
	font-family:PingFangSC-Medium;
	font-weight:bold!important;
	color:rgba(31,46,77,1);
	margin-left: 10px;
}
.el-menu-item-group__title{
	padding: 0!important;
}
.el-menu-item-group__title .el-menu-item{
	font-size:16px!important;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(122,135,161,1);
}
.leftNav .el-submenu__title:hover span{
	color:rgba(0,122,255,1)!important;
}
.leftNav .el-submenu__title:hover i{
	color:rgba(0,122,255,1)!important;
}
.el-submenu__title i{
	color:#1f2e4d!important;
}
.leftNav .el-submenu__title:hover{
	background:transparent!important;
	font-size:16px;
	font-family:PingFang-SC-Regular;
	color:rgba(19,159,248,1);
}
.el-submenu__title>span{
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:500;
	color:rgba(61,73,102,1);
	margin-left: 70px;
}
.el-submenu__title>span:hover{
	color:rgba(0,122,255,1)!important;
}
.el-submenu__title :hover i{
	color:rgba(0,122,255,1)!important;
}
.leftNav  .el-submenu .el-menu-item{
	padding: 0 !important;
	height: 60px;
	margin-bottom: 10px;
	line-height: 60px;
	text-align: center;
}

.leftNav .el-menu-item:focus, .el-menu-item:hover{
	background:transparent!important;
	font-size:16px;
	font-family:PingFang-SC-Regular;
	color:rgba(0,122,255,1);
}
.leftNav .el-menu-item:focus, .el-menu-item:hover span{
	color:rgba(0,122,255,1);
}
.leftNav .el-submenu__title.is-active{
	color:rgba(19,159,248,1)!important;
	background:rgba(19,159,248,0.1)!important;
}
.leftNav .el-submenu__title .active{
	font-size:16px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(19,159,248,1)!important;
	background:rgba(19,159,248,0.1)!important;
}
.leftNav .el-menu-item.is-active{
	width:256px;
	height:60px;
	border-right: 4px solid rgba(0,122,255,1);
	background:rgba(0,122,255,0.1)!important;
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(0,122,255,1)!important;
}
@media only screen  and (max-width: 720px) {
	.leftNavBox{transform: translateX(-100%);background: rgba(0,0,0,.5);    width: 100%;}
	.navbtn{display: block;transform: translateX(100%);}
	.oncheac{
		transform: translateX(0);
	}
	.oncheac .navbtn{display: block;transform: translateX(0);left: 20px;}
}
.leftNav .el-menu-item>span{
	margin-left: 27px;
}
 .el-menu-item{
	 font-size:16px;
	 font-family:PingFang-SC-Regular;
	 font-weight:400;
	 color:rgba(54,54,54,1);
}

.leftNav .el-submenu .el-submenu .el-submenu .el-submenu__title>span {
    margin-left: 50px;
}
.leftNav .el-submenu .el-submenu .el-menu-item{
    text-indent: 90px;
}
.leftNav .el-submenu .el-submenu .el-submenu .el-submenu__title>span {
    margin-left: 50px;
}    
.leftNav .el-submenu .el-submenu .el-submenu .el-menu-item{
    text-indent: 154px;
}
.first_o{
	text-indent: 22px !important;
}
.leftNav .el-menu{
	border-right: 0!important;
}
</style>