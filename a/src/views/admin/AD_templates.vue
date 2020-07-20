<template>
	<div>
		<div class="top_name">
			<span class="inner">|</span>
			<span class="top_txt">素材库>广告模板</span>
		</div>
		<div class="content">
			<div class="Search">
				<input type="text" placeholder="输入素材id快速查询" v-model="search" @input="getList()"/>
				<img src="../../../public/img/ss.png" @click="getList()"/>
				<span style="font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(31,46,77,1);margin-right: 20px">状态</span>
				<select v-model="status" @click="getList()">
					<option value="" selected>全部</option>
					<option value="1101">使用中</option>
					<option value="1001">未使用</option>
					<option value="1201">禁用</option>
				</select>
				<span class="Search_tit" @click="getCon" :class="{activeHeid:this.controlBtn}"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-right: 14px" >添加本地素材</span>
			</div>
			<div class="contentImg">
				<div class="label">
					<span class="label_txt">预置标签:</span>
					<span class="labelName" @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
					<div class="tags" :class="{ALLtags:this.class==true}">
						<span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
					</div>
					<span class="tagsAll" v-if="this.class==false" @click="getTag">查看更多</span>
					<span class="tagsAll" v-if="this.class==true" @click="heidTag">收起</span>
				</div>
				<div class="label">
					<span class="label_txt" >个性标签:</span>
					<span class="labelName" @click="getListTags()" :class="{active:listTagData.length==0}">全部</span>
					<div class="tags" :class="{ALLtags:this.class1==true}">
						<span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.name,index)" :class="{active:listTagData.indexOf(item.name)!=-1}">{{item.name}}</span>
					</div>
					<span class="tagsAll" v-if="this.class1==false" @click="getTag1">查看更多</span>
					<span class="tagsAll" v-if="this.class1==true" @click="heidTag1">收起</span>
				</div>
			</div>
			<rel v-if="getRe" :num="num" :material="material" ></rel>
			<con v-if="sc" :message="message" :hqUrl="hqUrl" :bindMid="bindMid" :material="material" :types="type" :lx="this.lx" @dataUpdating="dataUpdating"></con>
			<hin v-if='hint' ></hin>
			<tag v-if="tags" :message="message" :typeSC='type' :material="material" @updata="updata"></tag>
			<set v-if="sets" :typeSC='type'  @listenToChildEvent="listen" :material="material"></set>
		</div>
		<div class="box">
			<div class="boxImg" v-for="(DL,index) in IMGList">
				<div class="img_box">
					<img :src="DL.prev_uri" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.')).length-1]!='mp4'&&(DL.prev_uri.split('.'))[(DL.prev_uri.split('.').length-1)]!='MP4'"/>
					<video :src="DL.prev_uri" controls="controls" v-if="(DL.prev_uri.split('.'))[(DL.prev_uri.split('.').length-1)]=='mp4'||(DL.prev_uri.split('.'))[(DL.prev_uri.split('.').length-1)]=='MP4'"></video>
				</div>
				<div class="boxImg_right" >
					<div class="boxImg_right_1">
						<div>
							<span class="boxImg_text">素材ID:</span>
							<span class="boxImg_content">{{DL.mid}}</span>
						</div>
						<div>
							<span class="boxImg_text boxImg_bq">标签:</span>
							<div class="boxImg_xz">
								<div class="boxImg_xz_yz">
									<span class="box_box" v-for="(tag,index2) in DL.tags" v-if="tag!=''">{{tag}}</span>
									<span class="box_box"  v-for="(ta,index3) in DL.self_tags" v-if="ta!=''">{{ta}}</span>
								</div>
								<span class="img"  @click="XStag(index)">+ 标签</span>
							</div>
						</div>
						<div>
							<span class="boxImg_text">尺寸:</span>
							<span class="boxImg_content">{{DL.size}}</span>
						</div>
						<!-- <div>
							<span class="boxImg_text">相关素材:</span>
							<span class="ck" @click="getRel(index)">查看详情</span>
						</div>
						<div>
							<span class="boxImg_text">相关物料:</span>
							<span class="ck">查看详情</span>
						</div> -->
                         <div>
                            <span class="boxImg_text">其他信息:</span>
                            <span class="ck" @click="ckDetails(DL.mid)">查看详情</span>
                        </div>
						<div>
							<span class="boxImg_text">素材使用记录:</span>
							<span class="ck" >查看详情</span>
						</div>
						<div>
							<span class="boxImg_text">素材状态:</span>
							<span class="boxImg_content">{{DL.status}}</span>
						</div>
						<div>
							<span class="boxImg_text">更新时间:</span>
							<span class="boxImg_content">{{DL.updated_at}}</span>
						</div>
						<div>
							<span class="boxImg_text">附件:</span>
							<span class="boxImg_content" v-if="(DL.attach.size/1024).toFixed(0)<1">1kb</span>
							<span class="boxImg_content" v-if="DL.attach.size>1024&&DL.attach.size<1024*1024">{{(DL.attach.size/1024).toFixed(0)}}kb</span>
							<span class="boxImg_content" v-if="DL.attach.size>1024*1024&&DL.attach.size<1024*1024*1024">{{(DL.attach.size/1024/1024).toFixed(1)}}MB</span>
							<span class="boxImg_content" v-if="DL.attach.size>1024*1024*1024">{{(DL.attach.size/1024/1024/1024).toFixed(2)}}GB</span>
							<a class="dowload" :href="DL.attach.url">下载</a>
						</div>
					</div>
				</div>
				<div class="bjImg" @click="getLt(index)">
					<span>编辑素材</span>
				</div>
			</div>
		</div>
		<div class="block">
			<el-pagination
					@size-change="handleSizeChange1"
					@current-change="handleCurrentChange1"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="prev, pager, next,total, jumper"
					:total="total">
			</el-pagination>
		</div>
	</div>

</template>
<script>
    import rel from './relevant_matreial'
    import con from './content_component'
    import hin from './hintMessage'
    import tag from './tag'
    import set from './Select_material'
    export default {
        components:{con,hin,tag,set,rel},
        data() {
            return {
                sc:false,
                hint:false,
                tags:false,
                sets:false,
                IMGList:[],
                search:'',
                pageSize: 4,
                total: 0,
                currentPage: 1,
                type:'ad_template',
				lx:'广告模板',
                message:{},
                preset_tags:[],
                self_tags:[],
                bindMid:'',
                hqUrl:'',
                material:1,
                inx:null,
                inde:null,
                getRe:false,
                num:'',
                status:null,
				userData:{},
                class:false,
                class1:false,
                listTag:[],
                listTagData:[],
                search_tags:[],
                controlBtn:true,
                control:[]
            }
        },
        created(){
            this.control=JSON.parse(localStorage.getItem('control'));
            if(this.control.length==0){
                this.controlBtn=true;
            }else{
                for(var i=0;i<this.control.length;i++){
                    if(this.control[i].uri_key=='uri.material.add'){
                        this.controlBtn=false;
                    }
                }
            }

        },
        mounted() {
            this.getList()
			this.getData()
        },
        methods: {
            ckDetails(id){
                this.$router.push({
                    path:"Other_details",
                    query:{
                        type:this.type,
                        mid:id,
                        material:this.material
                    }
                })
            },
            getData(){
                let params = {
                    email:localStorage.getItem('userAd'),
                };
                this.api.get_account({params}).then((datas)=>{
                    this.userData = datas;

                });
            },
            getTag(){
                this.class=true;
            },
            heidTag(){
                this.class=false;
            },
            getTag1(){
                this.class1=true;
            },
            heidTag1(){
                this.class1=false;
            },
            getCon(){
                this.sc = true;
                this.message='';
                this.stop();
            },
            SCsc(){
                this.sc = true;
                this.stop();
            },
            heidSc(){
                this.sc = false;
                this.hqUrl='';
                this.bindMid='';
                this.move();
            },
            ShowHint(){
                this.hint = true;
                // this.sc = false
                this.stop();
            },
            getRel(index){
                this.getRe=true;
                this.num =this.IMGList[index].mid;
                this.stop();
            },
            heidRel(){
                this.getRe=false;
                this.move();
            },
            YCHint(){
                this.hint = false;
                this.move();
            },
            updata(){
                this.getTagsList()
			},
            XStag(a){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    console.log(res.data);
                    for(let i =0;i<this.IMGList.length;i++){
                        if(this.IMGList[i].status=='1101'){
                            this.IMGList[i].status='使用中'
                        }
                        if(this.IMGList[i].status=='1001'){
                            this.IMGList[i].status='未使用'
                        }
                        if(this.IMGList[i].status=='1201'){
                            this.IMGList[i].status='禁用'
                        }
                    }
                    if(a!=undefined){
                        this.message = res.data[a];
                        this.tags = true;
                        this.stop();
                    }
                })
            },
            YCtag(){
                this.tags = false;
                this.move();
            },
            XSset(){
                this.sets = true
                this.stop();
            },
            YCset(){
                this.sets = false

            },
            listen(msg,ddd){
                this.bindMid=msg;
                this.hqUrl=ddd;
                console.log(this.bindMid,this.hqUrl)
            },
            handleSizeChange1() { // 每页条数切换
                this.pageSize = pageSize;
                console.log(this.pagesize);
                this.getList()
            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.currentPage = currentPage;
                this.getList()
            },
            stop(){
                document.body.style.overflow='hidden';
                document.body.style.position='fixed';
                document.body.style.width='100%';
            },
            move(){
                document.body.style.overflow='';//出现滚动条
                document.body.style.position='initial';
                document.body.style.height='1006px';
            },
            getLt(a){
                if(this.userData.roles[0].role_name=='admin'){
                    let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                    this.api.material_search({params}).then((res)=>{
                        this.IMGList=res.data;
                        for(let i =0;i<this.IMGList.length;i++){
                            if(this.IMGList[i].status=='1101'){
                                this.IMGList[i].status='使用中'
                            }
                            if(this.IMGList[i].status=='1001'){
                                this.IMGList[i].status='未使用'
                            }
                            if(this.IMGList[i].status=='1201'){
                                this.IMGList[i].status='禁用'
                            }
                        }
                        if(a!=undefined){
                            this.message = res.data[a];
                            this.sc = true;
                        }
                    })
                }else{
                    this.$message('您没有该权限')
                }

            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.type};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags
                })
            },
            getListTags(name){
                if(!name){
                    this.listTagData.length=0
                }else{
                    if(this.listTagData.indexOf(name)==-1){
                        this.listTagData.push(name)

                    }else{
                        for(var i=0;i<this.listTagData.length;i++ ){
                            if(this.listTagData[i]==name){
                                this.listTagData.splice(i,1);

                            }
                        }
                    }
                }

                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    for(let i =0;i<this.IMGList.length;i++){
                        if(this.IMGList[i].status=='1101'){
                            this.IMGList[i].status='使用中'
                        }
                        if(this.IMGList[i].status=='1001'){
                            this.IMGList[i].status='未使用'
                        }
                        if(this.IMGList[i].status=='1201'){
                            this.IMGList[i].status='禁用'
                        }
                    }
                    this.total=res.total;
                    this.getTagsList()
                })
            },
            getListTag(name){
                if(!name){
                    this.listTag.length=0
                }else{
                    if(this.listTag.indexOf(name)==-1){
                        this.listTag.push(name);

                    }else{
                        for(var i=0;i<this.listTag.length;i++ ){
                            if(this.listTag[i]==name){
                                this.listTag.splice(i,1);

                            }
                        }
                    }
                }

                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    for(let i =0;i<this.IMGList.length;i++){
                        if(this.IMGList[i].status=='1101'){
                            this.IMGList[i].status='使用中'
                        }
                        if(this.IMGList[i].status=='1001'){
                            this.IMGList[i].status='未使用'
                        }
                        if(this.IMGList[i].status=='1201'){
                            this.IMGList[i].status='禁用'
                        }
                    }
                    this.total=res.total;
                    this.getTagsList()
                })
            },
            dataUpdating(a){
                this.getList();
            },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,status:this.status}
                this.api.material_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    for(let i =0;i<this.IMGList.length;i++){
                        if(this.IMGList[i].status=='1101'){
                            this.IMGList[i].status='使用中'
                        }
                        if(this.IMGList[i].status=='1001'){
                            this.IMGList[i].status='未使用'
                        }
                        if(this.IMGList[i].status=='1201'){
                            this.IMGList[i].status='禁用'
                        }
                    }
                })
            },
        },

    }
</script>
<style scoped>
	.active{
		color: #1583e2!important;
		border:0!important;
	}
	/*.boxImg_xz_yz{*/
	/*display: inline-block;*/
	/*max-width: 180px !important;*/
	/*height:35px;*/
	/*overflow: hidden;*/
	/*}*/
</style>