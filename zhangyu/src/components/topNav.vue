<template>
	<div class="topNav">
		<div @click="goindex" class="log" v-if="this.role_type==0"><img  src="../../public/img/logo.png"/></div>
		<div @click="goindex" class="log1" v-if="this.role_type==1"><img  src="../../public/img/logo2.png"/></div>
		<!--<el-dropdown trigger="click" class="user-ci">-->
			<!--<span class="el-dropdown-link iconfont">&#xe686;</span>-->
			<!--<el-dropdown-menu slot="dropdown">-->
				<!--<el-dropdown-item ><span @click="gouser()">个人信息</span></el-dropdown-item>-->
				<!--<el-dropdown-item ><span @click="loginout()">退出</span></el-dropdown-item>-->
			<!--</el-dropdown-menu>-->
		<!--</el-dropdown>-->
		<ul class="navd" v-if="config.showL!=-1&&this.type!=1">
			<!-- <router-link  v-for="(el,index) in navList" :key="index" :to="el.to">
				<li>
					<span>{{el.name}}</span>
				</li>
			</router-link> -->
			<span class="iconfont  messgeH1 right3" v-on:mouseover="go">
				<span class="pend" @click="showisXXNav">
					<img class="head_top2" :src="img1"/>
				    <div @click="showisXXNav" v-if="messgNum && messgNum.count>0" :class="['messgeH2',messgNum.count>9?'messgeH2x':'']">{{backXXnUM(messgNum.count)}}</div>
				</span>
				<div v-if="isXXNav" class="messgeH3" v-on:mouseout="stop">
					<div class="messgeH3_1">
						<span @click="getNotice('notify')" :class="{'active_1':active_1}">未读
							<!-- <div v-if="messgNum && messgNum.count>0" :class="['messgeH5',messgNum.count>9?'messgeH5x':'']">{{backXXnUM(messgNum.count)}}</div> -->
						</span>
						<span @click="getNotice('comment')" :class="{'active_1':active_2}">最近</span>
						
					</div>
					<div class="messgeH3_2">
						<div class="messgeH3_2_x1">
							<ul class="xxBox_1">
								<li v-for="(el,index) in mData" :key="index">
									<div @click="goMssg(el)">{{el.name}}</div>	
									<div>{{el.newsContent.created_at}}</div>							
								</li>	
													
							</ul>
							
							<div v-if="mData.length==0" class="messgeH3_2_1"><img  src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/wxx.png" alt="">暂无新的消息</div>
						</div>
						<span v-if="mData.length!=0" @click="getNotice('read')" :class="{'active_1':active_3}" style="position: absolute;bottom: 0px;width: 100%;text-align: center;height: 30px;">全部标为已读</span>
						
					</div>
					<!-- <div @click="goMssg(1)" class="messgeH3_3 pend">查看全部</div> -->
				</div>
				
			</span>
			<router-link  to="/login" class="right1"><li @click="loginout()"><span>退出登录</span></li></router-link>
			<router-link  to="/userinfo" class="right0"><li><img :src="img" class="imgs_user"/>{{name}}</li></router-link>
			<router-link  to="/workbench"  v-if='top2'><li><span>工作台</span></li></router-link>
			<router-link  to="/data"   v-if='top3'><li><span>数据中心</span></li></router-link>
			<router-link  to="/income"   v-if='top4'><li><span>收益中心</span></li></router-link>
			<router-link  to="/admin"   v-if='top1'><li> <span>素材中心</span></li></router-link>
			<router-link  to="/ThemeCenter"  v-if='top5'><li><span>主题中心</span></li></router-link>

		</ul>
		<ul class="navd" v-if="config.showL!=-1&&this.type==1">
			<router-link  to="/workbench"><li><span>工作台</span></li></router-link>
			<!-- <router-link  to="/admin"><li> <span>素材中心</span></li></router-link> -->
			<span class="iconfont  messgeH1 right2" v-on:mouseover="go">
				<span class="pend" @click="showisXXNav">
					<img class="head_top2" :src="img1"/>
				    <div @click="showisXXNav" v-if="messgNum && messgNum.count>0" :class="['messgeH2',messgNum.count>9?'messgeH2x':'']">{{backXXnUM(messgNum.count)}}</div>
				</span>
				<div v-if="isXXNav" class="messgeH3" v-on:mouseout="stop" style="top:34px;">
					<div class="messgeH3_1">
						<span @click="getNotice('notify')" :class="{'active_1':active_1}">未读
							<!-- <div v-if="messgNum && messgNum.count>0" :class="['messgeH5',messgNum.count>9?'messgeH5x':'']">{{backXXnUM(messgNum.count)}}</div> -->
						</span>
						<span @click="getNotice('comment')" :class="{'active_1':active_2}">最近</span>
					</div>
					<div class="messgeH3_2">
						<div class="messgeH3_2_x1">
							<ul class="xxBox_1">
								<li v-for="(el,index) in mData" :key="index">
									<div @click="goMssg(el)">{{el.name}}</div>	
									<div>{{el.newsContent.created_at}}</div>							
								</li>
														
							</ul>
							
							<div v-if="mData.length==0" class="messgeH3_2_1"><img  src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/wxx.png" alt="">暂无新的消息</div>
						</div>
						
						<span v-if="mData.length!=0" @click="getNotice('read')" :class="{'active_1':active_3}" style="position: absolute;bottom: 0px;width: 100%;text-align: center;height: 30px;">全部标为已读</span>
					</div>
					
				
					<!-- <div @click="goMssg(1)" class="messgeH3_3 pend">查看全部</div> -->
				</div>
				
			</span>
			<router-link class="right2" to="/userinfo"><li ><img :src="img" class="imgs_user"/>{{name}}</li></router-link>
			<router-link class="right2" to="/login"><li  @click="loginout()"><span>退出登录</span></li></router-link>
		</ul>
		<el-menu v-if="config.showL!=-1&&this.type==0"  class="el-menu-demo appTopNav" mode="horizontal" @select="handleSelect">
			<el-submenu index="2">
				<template slot="title">{{topNacd}}</template>
				<el-menu-item index="0">工作台</el-menu-item>
				<el-menu-item index="1">数据中心</el-menu-item>
				<el-menu-item index="2">收益中心</el-menu-item>
				<el-menu-item index="3">素材中心</el-menu-item>
				<el-menu-item index="4">主题中心</el-menu-item>
				<!--<el-menu-item index="4">产品中心</el-menu-item>-->
				<el-menu-item @click="loginout" index="5">退出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div> 
</template>

<script>
export default { 
    name: 'topNav', 
	props:['config'],
    data(){
		return{
			navList:[],
		    type:'',
			role_type:localStorage.getItem('role'),
		    name:'',
            email:"",
			input:'',
            top1:false,
            top2:false,
            top3:false,
            top4:false,
            top5:false,
			topNacd:'首页',
			img:"./img/user.png",
			img1: "./img/top2.svg",
			isXXNav:false,
			messgNum:{},
			mData:[],
			active_1:false,
			active_2:false,
			active_3:false,
			todata:[{name:'首页',url:'/index'},{name:'工作台',url:'/workbench/workbenchPadding'},{name:'数据',url:'/data/Material_data'},{name:'收益中心',url:'/income/earnings'},{name:'素材中心',url:'/admin/advertising'},{name:'主题中心',url:'/ThemeCenter'},{name:'用户',url:'/userinfo/user_info'}],
		}
    },

	mounted(){
		this.getMessgNumber();
		this.name=localStorage.getItem('userName');
		this.getLefNav();
        this.authority();
        this.type=localStorage.getItem('role');
        if(localStorage.getItem('icon')!=''){
            this.img=localStorage.getItem('icon')
		};
		this.getNotice('notify');
	},
	methods:{
		stop(){
			this.isXXNav = false;
		},
		go(){
			this.isXXNav = true;
		},
		backXXnUM(n){
			if(n>999){
				return 999;
			}
			return n;
		},
		showisXXNav(){
			this.$router.push({
				path:"/userinfo/message",
			})
		},
		getMessgNumber(){
			this.api.pushlib_message_unread().then((da)=>{
				if(da=='error'){
					return
				}
				this.messgNum = da;
		
			})
		},
		getNotice(type){	
			// if(!window.userInfo){
			// 	return
			// }
			//全部消息
			if(type == 'all'){
				this.api.pushlib_message_all().then((da)=>{
					if(da=='error'){return}
					this.mData= da.data;
				});
			}	
			//未读消息
			if(type == 'notify'){
				this.api.pushlib_message().then((da) => {
					if(da=='error'){return}
					this.mData= da.unread;
					this.active_1 = true;
					this.active_2 = false;
					this.active_3 = false;
				})
			}
			//最近消息
			if(type == 'comment'){
				this.api.pushlib_message().then((da) => {
					if(da=='error'){return}
					this.mData= da.recent;
					this.active_1 = false;
					this.active_2 = true;
					this.active_3 = false;
				})
			}
			//全部标记已读
			if(type == 'read'){
				this.api.pushlib_message_all_handled().then((da) => {
					if(da=='error'){return}
					// this.mData= da;
					this.active_1 = false;
					this.active_2 = false;
					this.active_3 = true;
					this.getMessgNumber();
				})
			}
		},
		goMssg(on){
			console.log(on)
			this.$router.push({
				path:"/userinfo/messageDetails",
				query:{
					id:on.id,      
				}
			})
			// if(!window.userInfo){
			// 	this.$router.push({path:'/login'});	
			// 	return
			// }
			// setTimeout(()=>{
			// 	this.getMessgNumber();
			// },500);
			// if(on || on==0){				
			// 	this.$router.push({path:this.navType,query:{id:this.mData[on].chat_id}})	
			// 	return
			// }			
				
		},
		handleSelect(key){				
			this.topNacd = this.todata[key].name;
			this.$router.push(this.todata[key].url);
		},
        authority(){
		    this.api.perm_role_uri({}).then((res)=>{
		        localStorage.setItem('control',JSON.stringify(res));
			})
		},
        getLefNav(){
            this.api.perm_leftnav().then((res)=>{
                let navs = [];
                for(var i=0;i<res.length;i++){

                    if(res[i].title=='工作台'&&res[i].children!=0){
                        navs.push({
                            to:'/workbench',
							name:'工作台'
                        });
                        this.top2=true
                    }
                    if(res[i].title=='数据中心'&&res[i].children!=0){
                        navs.push({
                            to:'/data',
                            name:'数据中心'
                        });
                        this.top3=true
                    }
                    if(res[i].title=='素材中心'&&res[i].children!=0){
                        navs.push({
                            to:'/admin',
                            name:'素材中心'
                        });
                        this.top1=true
                    }
                    if(res[i].title=='收益中心'&&res[i].children!=0){
                        navs.push({
                            to:'/income',
                            name:'收益中心'
                        });
                        this.top4=true
                    }
                    if(res[i].title=='主题中心'&&res[i].children!=0){
                        navs.push({
                            to:'/ThemeCenter',
                            name:'主题中心'
                        });
                        this.top5=true
                    }
				}
				this.navList = navs;
                localStorage.setItem('letNav',JSON.stringify(res));

            })
        },
		goindex(){
			window.location.href= '#/index';
		},
        // gouser(){
        //     window.location.href= '#/userinfo/user_info';
        // },
		loginout(){
			let urld = 'http://ts-i.idatachain.cn',
			accountUrl = "http://ts-account.idatachain.cn/auth/logout?from=";
			if(window.location.host=='c.zookingsoft.com'){
				urld = 'https://c.zookingsoft.com';
				accountUrl = "http://account.zookingsoft.com/auth/logout?from=";
			}
            if(window.location.host=='c2.zookingsoft.com'){
				urld = 'https://c2.zookingsoft.com';
				accountUrl = "http://account.zookingsoft.com/auth/logout?from=";
			}
			this.$ajax({
				method: 'get',
				timeout: 10000,
				url:urld+'/api/logout',			     
			}).then((msg)=>{
				console.log(msg)
				if(msg.data.code==0){
					localStorage.setItem('token','');
                    localStorage.removeItem('letNav');
					let cent = 'center';
					if(window.location.host=='ts-centerweb.idatachain.cn'){
						cent = 'center_dev';
					}else
					if(window.location.host=='localhost:8080'){
						cent = 'center_local';
					}else if(window.location.host=='c2.zookingsoft.com'){
                        cent = 'center_dev2';
					}
					
					window.location.href= accountUrl + cent;
				}	
			})						
			// }).catch(()=>{
			// 	localStorage.setItem('token','');
            //     let cent = 'center';
            //     if(window.location.host=='ts-centerweb.idatachain.cn'){
            //         cent = 'center_dev';
            //     }else
            //     if(window.location.host=='localhost:8080'){
            //         cent = 'center_local';
            //     }else if(window.location.host=='c2.zookingsoft.com'){
            //         cent = 'center_dev2';
			// 	}
			// 	return
            //     window.location.href="http://account.zookingsoft.com/auth/logout?from="+cent;
			// })
		},

	}
}    
</script>

<style>
@font-face {
	font-family: 'iconfont';
	src: url('/font/iconfont.eot');
	src: url('/font/iconfont.eot?#iefix') format('embedded-opentype'),
	url('/font/iconfont.woff') format('woff'),
	url('/font/iconfont.ttf') format('truetype'),
	url('/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.right2{
	position: relative;
	left:57%;
}
.topNav{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	width: 100%;
	height:63px;
	background:rgba(255,255,255,1);
	border-bottom: 2px solid #f3f9fc;
	box-shadow:0px 6px 12px 0px rgba(230,233,240,0.3);
}
.log,.log1{
	cursor: pointer;
	float: left;
	width:256px;
	height:64px;
	background:linear-gradient(270deg,#0052ff 0%,#0584ff 100%);
	/*margin-top: 22px;*/
	/*border-right:1px solid rgba(0,0,0,.2);*/
	font-size:14px;
	line-height: 23px;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(0,0,0,1);
	opacity:0.85;
	text-align: center;
}
.log1{
	background:#fff!important;
}
.log>img,.log1>img{
	vertical-align:top;
	display: inline-block;
	max-width: 256px;
	max-height: 64px;
	position: relative;
	top:50%;
	transform: translateY(-50%);
}

.sszj{
	float: left;
}
.ssicon{
	cursor: pointer;
	display: inline-block;
	margin: 0 17px 0 16px;
	line-height: 63px;
}
.sskzd{	
	width: 220px !important;
	border: none;
}
.sskzd>input{
	border: none;
}
.navd{
	height: 100%;
}
.navd li{
	display: inline-block;
	width: 100%;
	height: 100%;
}
.navd a{
	display: inline-block;
	height: 100%;
	width:143px;
	text-align: center;
	font-size:16px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(143,155,179,1);
	line-height: 65px;
}
.right1{
	float: right;
	margin-right: 50px;
}
.right0{
	float: right;
}
.right3{
	position: absolute;
	left: 78%;
}
.navd a.router-link-active{	
	display: inline-block;
	height: 100%;
	font-size:16px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(51,119,255,1);
	/*border-bottom: 2px solid rgba(51,119,255,1);*/
}
.imgs_size{
	width: 20px;
	height: 18px;
	vertical-align: middle;
	margin-right: 10px;
}
.imgs_user{
	width: 32px;
	height: 32px;
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 10px;
}
.tableBuee .el-button{
	background:rgba(255,120,117,1);
	color:rgba(255,255,255,1);
}
.tableBuee .el-button:hover{
	background:rgba(255,120,117,1);
	color:rgba(255,255,255,1);
	opacity: .7;
}
.tableBuee .el-button:nth-child(2){
	background:rgba(105,192,255,1);
}
.tableBuee .el-button:nth-child(2):hover{
	background:rgba(105,192,255,1);
}
.user-ci{
	cursor: pointer;
	float: right;
	margin-right: 96px;
	height: 100%;
    width: 80px;
    text-align: center;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(0,0,0,85);
    line-height: 65px;
    margin: 0 20px;
}
.appTopNav{
	display: none !important;
	position: absolute !important;
    right: 0;
    top: 2px;
}
.appTopNav .el-submenu__title{
	border: none !important;
}
@media only screen  and (max-width:1040px) {
	.appTopNav{display: block !important;}
	.sszj{display: none;}
	.log{width: 230px;}
}
@media only screen  and (max-width: 1040px) {
	.appTopNav{display: block !important;}
	.navd{display: none;}
}
@media only screen  and (max-width: 720px) {
	.tcVbox{left: 0 !important;}
    .tjzsd{padding: 20px 85px;}
}
.navd a.router-link-active span{
	display: inline-block;
	line-height: 60px;
	border-bottom: 4px solid rgba(51,119,255,1);
	vertical-align: top;
}
.messgeH1{
	top: 4px;
	cursor: pointer;
}
.messgeH2{
	display: block;
	position: absolute;
	top: 10px;
	left: 7px;
	background: #F4523B;
	min-width: 18px;
	height: 18px;
	line-height: 18px;
	font-size: 12px;
	color: #fff;
	letter-spacing: 0;
	text-align: center;
	
	border-radius: 9px;
}
.messgeH5{
	display: block;
	position: absolute;
	top: -4px;
	left: 39px;
	min-width: 18px;
	height: 18px;
	line-height: 18px;
	font-size: 12px;
	color: #F4523B;
	letter-spacing: 0;
	text-align: center;
	
	border-radius: 9px;
}
.messgeH3{
    position: absolute;
    top: 60px;
    left: -240px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    width: 269px;
    height: 320px;
	z-index: 999;
}
.messgeH3_1{
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
	border-radius: 5px 5px 0 0;
	width: 100%;
	height: 60px;
	position: relative;
}
/* .messgeH3_1>span:before{
	content: "";
	position: absolute;
	right: 30px;
	top: 0;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #F4523B;
} */
.messgeH3_1>span:nth-child(1),.messgeH3_1>span:nth-child(2){
	position: relative;
	margin-top: 16px;
	display: inline-block;
	width: 30%;
	height: 40px;
	text-align: center;
	cursor: pointer;
	margin-left: 5px;
}

.messgeH3_1>span:last-child{
	border: none;
}
.messgeH3_1>span>img{
	display: block;
	margin: 6px auto;
	width: 19px;
}
.messgeH3_1 .active_1{
    border-bottom: 4px solid rgba(51,119,255,1) !important;
    vertical-align: top;
}
.messgeH3_2{
	width: 100%;
	height: 210px;
	overflow: hidden;
	overflow-y: auto;
}
.messgeH3_2_1{
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: 14px;
	color: #999999;
	text-align: center;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.messgeH3_2_1>img{
	display: block;
	width: 100px;
	margin: 30px auto 0;
}
.messgeH3_3{
	background: #FFFFFF;
	box-shadow: 2px 0 4px 0 rgba(0,0,0,0.05);
	border-radius:0 0 5px 5px;
	font-size: 14px;
	color: #1E1E1E;
	line-height: 50px;
	text-align: center;
	width: 100%;
	height: 50px;
}
.xxBox_1>li{
	position: relative;
	border-bottom: 1px solid #E6E6E6;
	width: 100%;
	height: 37px;
	font-size: 14px;
	color: #1E1E1E;
}
.xxBox_1>li>div:nth-child(1){
	position: absolute;
	top: 50%;
	left: 32%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 145px;
	line-height: 18px;
    text-align: left;
	height: 15px;
    overflow: hidden;
}
.xxBox_1>li>div:nth-child(2){
	position: absolute;
	top: 50%;
	right: -15%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 90px;
	line-height: 18px;
    text-align: right;
	height: 15px;
    overflow: hidden;
}
.xxBox_1>li:last-child{
	border: none;
}
.messgeH3_2_x1{
	overflow: hidden;
	overflow-y: auto;
}
.messgeH3Boxf1{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 997;

}
.searcBox5_2imf{
	display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: top;
	margin-top: 10px;
    margin-right: 4px;
    border-radius: 50%;
}
.searcBox5_2xv>div:first-child{
	margin-top: 8px;
}
.pdxf{
	display: inline-block;
}
.svgImg2{
	display: inline-block;
	vertical-align: top;
    margin-right: 10px;
    margin-top: 10px;
    width: 16px;
}
.svgImg2_1{
	margin-top: 12px;
	width: 17px;
}
.svgImg2_2{
	margin-top: 12px;
	width: 18px;
}
.ts_svg_img{
	margin-top: 11px;
}
.messgeH2x{
	padding:0 5px;
}
.head_top1{
	width: 20px;
  	margin-top: 20px;
}
.head_top2{
	width: 16px;
    margin-top: 20px;
}
.head_top3{
	width: 24px;
    margin-top: 20px;
}
.searcBox6{
	opacity: 0;
	position: absolute;
	top: 24px;
	right: -218px;
	width: 10px;
	
	-webkit-animation: xs .5s .3s forwards;
	animation: xs .5s .3s forwards;
}
</style>