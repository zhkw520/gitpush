<template>
	<div>
		<div class="top_name">
			<span class="inner">|</span>
			<span class="top_txt">物料库>广告壁纸</span>
		</div>
		<div class="content">
			<div class="Search">
				<input type="text" placeholder="输入物料ID快速查询" v-model="search" @input="getWl()"/>
				<img src="../../../public/img/ss.png" @click="getList()"/>
				<span style="font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(31,46,77,1);margin-right: 20px">状态</span>
				<select v-model="status" @click="getWl()">
					<option value="" selected>全部</option>
					<option value="1101">使用中</option>
					<option value="1001">未使用</option>
					<option value="1201">禁用</option>
				</select>
				<span class="Search_tit" @click="getCon" :class="{activeHeid:this.controlBtn}"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-right: 14px" >添加本地物料</span>
			</div>
			<div class="contentImg">
				<div class="label">
					<span class="label_txt">预置标签:</span>
					<span class="labelName" @click="getListTag()" :class="{active:listTag.length==0}">全部</span>
					<div class="tags" :class="{ALLtags:class0==true}">
						<span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
					</div>
					<span class="tagsAll" v-if="this.class0==false" @click="getTag">查看更多</span>
					<span class="tagsAll" v-if="this.class0==true" @click="heidTag">收起</span>
				</div>
				<div class="label">
					<span class="label_txt" >个性标签:</span>
					<span class="labelName" @click="getListTags()" :class="{active:listTagData.length==0}">全部</span>
					<div class="tags" :class="{ALLtags:class1==true}">
						<span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.name,index)" :class="{active:listTagData.indexOf(item.name)!=-1}">{{item.name}}</span>
					</div>
					<span class="tagsAll" v-if="this.class1==false" @click="getTag1">查看更多</span>
					<span class="tagsAll" v-if="this.class1==true" @click="heidTag1">收起</span>
				</div>
				<div class="label" >
					<span class="label_txt">运营标签:</span>
					<span class="labelName" @click="getTagYY()" :class="{active:listTags.length==0}">全部</span>
					<div class="tags" :class="{ALLtags:class2==true}">
						<span v-for="(item,index) in Operatorlist" class="labelName" @click="getTagYY(item.desc,index)" :class="{active:listTags.indexOf(item.desc)!=-1}">{{item.desc}}</span>
					</div>
					<span class="tagsAll" v-if="this.class2==false" @click="getTag2">查看更多</span>
					<span class="tagsAll" v-if="this.class2==true" @click="heidTag2">收起</span>
				</div>
			</div>
			<rel v-if="getRe" :num="num" :material="material" ></rel>
			<AM v-if="sc" :message="message" :hqUrl="hqUrl" :bindMid="bindMid" :material="material" :types="type" :lx="lx" @updatas="updatas" @listID="listID"></AM>
			<hin v-if='hint' ></hin>
			<tag v-if="tags" :message="message" :typeSC='type' :material="material" @updata="updata"></tag>
			<set v-if="sets" :typeSC='type'  @listenToChildEvent="listen" :material="material" :ids='ids'></set>
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
							<span class="boxImg_text">物料ID:</span>
							<span class="boxImg_content">{{DL.mfid}}</span>
						</div>
						<div>
							<span class="boxImg_text">壁纸唯一标签:</span>
							<span class="boxImg_content">{{DL.attach.wpid_tags_id}}</span>
						</div>
						<div>
							<span class="boxImg_text boxImg_bq">内容标签:</span>
							<div class="boxImg_xz">
								<div class="boxImg_xz_yz">
									<span class="box_box"  v-for="(tag,index2) in DL.tags" v-if="tag!=''">{{tag}}</span>
									<span class="box_box"  v-for="(ta,index3) in DL.self_tags" v-if="ta!=''">{{ta}}</span>
								</div>
								<span class="img"  @click="XStag(index)">+ 标签</span>
							</div>
						</div>
						<div>
							<span class="boxImg_text boxImg_bq">运营标签:</span>
							<div class="boxImg_xz">
								<div class="boxImg_xz_yz">
									<span class="box_box"  v-for="(tags,index2) in DL.sls_tags" v-if="tags!=''">{{tags}}</span>
								</div>
								<span class="img"  @click="BJtag(index)">+ 标签</span>
							</div>
						</div>
                    
						<div>
							<div class="zt">
								<span class="boxImg_text">物料状态:</span>
								<span class="boxImg_content">{{DL.status}}</span>
							</div>
							<div class="cc">
								<span class="boxImg_text">预览图尺寸:</span>
								<span class="boxImg_content">{{DL.size}}</span>
							</div>
						</div>
						<div>
							<div class="xgsc">
								<span class="boxImg_text">相关素材:</span>
								<span class="ck" @click="getRel(index)">查看详情</span>
							</div>
							<div class="xgsc">
								<span class="boxImg_text">打底广告图:</span>
								<span class="boxImg_content">{{DL.ad_pic==1?'有':'无'}}</span>
							</div>

						</div>
						<div>
							<div class="xgsc">
								<span class="boxImg_text">物料使用记录:</span>
								<span class="ck">查看详情</span>
							</div>
							<div class="xgsc">
								<span class="boxImg_text">广告图位数:</span>
								<span class="boxImg_content">{{DL.ad_num}}</span>
							</div>
						</div>
                        <div>
                            <div class='zt'>
								<span class="boxImg_text">资源类型:</span>
								<span class="boxImg_content" style="width:100px">{{DL.model}}</span>
							</div>
                            <!-- <div class="xgsc">
								<span class="boxImg_text">来源:</span>
								<span class="boxImg_content" style="width:100px">{{DL.resource}}</span>
							</div> -->
                        </div>
						<div>
							<span class="boxImg_text">壁纸标识:</span>
							<span class="boxImg_content">{{DL.wpid}}</span>
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
					<span>编辑物料</span>
				</div>
			</div>
		</div>
		<div class="bgs" v-if="tagData">
			<div class="contents">
				<div style="font-size: 18px;font-weight: bold;margin-bottom: 15px">运营标签编辑</div>
				<div class="tags_name" style="width: 100%;border: 1px solid #e2e2e2;border-radius: 5px;height: 200px;text-align: left;overflow-y: auto;padding: 5px">
					<template>
						<el-checkbox-group
								v-model="checkedCities1">
							<el-checkbox v-for="(item,index) in tagslist" :label="item" :key="item.usertag" @change="ffff">{{item.desc}}</el-checkbox>
						</el-checkbox-group>
					</template>
				</div>
				<div class="btn">
					<span class="adds" @click="addTags()">保存</span>
					<span @click="Heidtags()">取消</span>
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
    import AM from './AddMaterial'
    import hin from './hintMessage'
    import tag from './tag'
    import set from './Select_material'
    export default {
        components:{AM,hin,tag,set,rel},
        data() {
            return {
                tagData:false,
                sc:false,
                hint:false,
                tags:false,
                sets:false,
                IMGList:[],
                search:'',
                pageSize: 4,
                total: 0,
                currentPage: 1,
                type:'f_sls_lockscreen',
				lx:'广告壁纸',
                message:{},
                preset_tags:[],
                preset:[],
                self_tags:[],
                bindMid:[],
                hqUrl:[],
                material:0,
                getRe:false,
                num:'',
                inx:null,
                inde:null,
                status:null,
                userData:{},
                class0:false,
                class1:false,
                class2:false,
                listTag:[],
                listTagData:[],
                listTags:[],
                search_tags:[],
                controlBtn:true,
                control:[],
                Operatorlist:[],
                tagslist:[],
                checkedCities1:[],
                wpid:'',
                ta:[],
                ids:'',
            }
        },
        created(){
            this.control=JSON.parse(localStorage.getItem('control'));
            if(this.control.length==0){
                this.controlBtn=true;
            }else{
                for(var i=0;i<this.control.length;i++){
                    if(this.control[i].uri_key=='uri.mfinal.add'){
                        this.controlBtn=false;
                    }
                }
            }

        },
        mounted() {
            this.getWl()
            this.getData()
        },
        methods: {
            Heidtags(){
                this.tagData=false;
                this.checkedCities1=[];
                this.ta=[];
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
                this.class0=true;
            },
            heidTag(){
                this.class0=false;
            },
            getTag1(){
                this.class1=true;
            },
            heidTag1(){
                this.class1=false;
            },
            getTag2(){
                this.class2=true;
            },
            heidTag2(){
                this.class2=false;
            },
            getCon(){
                this.sc = true;
                this.message=''
				// this.stop();
            },
            listID(data){
                this.ids=data;
                this.XSset();
            },
            SCsc(){
                this.sc = true
                this.stop();
            },

            heidSc(){
                this.sc = false;
                this.hqUrl=''
                this.bindMid=''
                this.move();
            },
            ShowHint(){
                this.hint = true;
                this.stop();
            },
            YCHint(){
                this.hint = false;
                this.move();
            },
            getRel(index){
                this.getRe=true;
                this.num =this.IMGList[index].mfid;
                this.stop();
            },
            heidRel(){
                this.getRe=false;
                this.move();
            },
            YCtag(){
                this.tags = false
                this.move();
            },
            XSset(){
                this.sets = true
                this.stop();
            },
            YCset(){
                this.sets = false

            },
            updatas(){
                this.getWl()
            },
            listen(msg,ddd){
                this.bindMid=msg;
                this.hqUrl=ddd;
                console.log(this.bindMid,this.hqUrl);
            },
            handleSizeChange1() { // 每页条数切换
                this.pageSize = pageSize;
                console.log(this.pagesize);
                this.getWl()
            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.currentPage = currentPage;
                this.getWl()
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
                if(this.userData.roles[0].role_name=='admin') {
                    let params = {
                        p: this.pageSize,
                        page: this.currentPage,
                        type: this.type,
                        search: this.search,
                        status: this.status
                    }
                    this.api.mfinal_search({params}).then((res) => {
                        this.IMGList = res.data;
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
                        if (a != undefined) {
                            this.message = res.data[a];
                            this.sc = true;
                            this.stop();
                        }

                    })
                }else{
                    this.$message('您没有该权限')
                }
            },
			ffff(){
                console.log(this.checkedCities1)
			},
            XStag(a){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),op_tags:JSON.stringify(this.listTags),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;

                    if(a!=undefined){
                        this.message = res.data[a];
                        this.tags = true;
                        this.stop();
                    }
                })
            },
            BJtag(index){
                this.tagData = true;
                this.wpid=this.IMGList[index].wpid;
                this.api.lockwallpaper_tags_list().then((res)=>{
                    this.tagslist=res;
                    for(var i=0;i<this.IMGList[index].sls_tags.length;i++){
                        for(var j=0;j<res.length;j++){
                            if(res[j].desc==this.IMGList[index].sls_tags[i]){
                                this.checkedCities1.push(res[j])
							}
						}
					}
                })
			},
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.type};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags
                })
            },
            getWl(){
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),op_tags:JSON.stringify(this.listTags),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
                    this.IMGList=res.data;
                    this.total=res.total;
                    this.getTagsList();
                    this.getOperatorTag();
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
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),op_tags:JSON.stringify(this.listTags),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
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
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),op_tags:JSON.stringify(this.listTags),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
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
            getTagYY(name){
                if(!name){
                    this.listTags.length=0
                }else{
                    if(this.listTags.indexOf(name)==-1){
                        this.listTags.push(name);

                    }else{
                        for(var i=0;i<this.listTags.length;i++ ){
                            if(this.listTags[i]==name){
                                this.listTags.splice(i,1);

                            }
                        }
                    }
                }
                let params ={p:this.pageSize,page:this.currentPage,type:this.type,search:this.search,search_tags:JSON.stringify(this.listTag),search_self_tags:JSON.stringify(this.listTagData),op_tags:JSON.stringify(this.listTags),status:this.status}
                this.api.mfinal_search({params}).then((res)=>{
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
            updata(){
                this.getTagsList()
            },
			getOperatorTag(){
                this.api.lockwallpaper_tags_list().then((res)=>{
                    this.Operatorlist=res;
                })
			},
            addTags(){
				for (var i=0;i<this.checkedCities1.length;i++){
                    var listD={
                        tags_id:'',
                        tags_name:'',
					}
                    listD.tags_id=this.checkedCities1[i].usertag;
                    listD.tags_name=this.checkedCities1[i].desc;
                    this.ta.push(listD);
				}
                let formData = new FormData;
                formData.append('wpid',this.wpid);
                formData.append('tags',JSON.stringify(this.ta));
                this.api.lockwallpaper_tags_add(formData).then((res)=>{
					this.getWl();
                    this.Heidtags();
                })
            },

        },

    }
</script>
<style>
	.active{
		color: #1583e2!important;
		border:0!important;}
	.bgs{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.2);
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		text-align: center;
	}
	.contents{
		background: #fff;
		width: 600px;
		height: 300px;
		padding: 24px;
		border-radius: 10px;
		margin-top: 20%;
		margin-left: 50%;
		transform: translate(-50%,-50%);
	}
    .ALLtags{height:100%!important;}
	.btn{
		width: 100%;
		height: 50px;
		position:fixed;
		bottom: 0;
		text-align: center;
	}
	.btn span{
		display: inline-block;
		line-height:40px;
		border:1px solid #ddd;
		text-align: center;
		width: 80px;
		height: 40px;
		border-radius: 10px;
		color: #666666;
		cursor: pointer;
	}
	.adds{
		border: 0px!important;
		background:#2ad5cd!important; ;
		color: #fff!important;
		margin-right:50px;
	}
    .boxImg_right_1 div{
        height: 32px;
    }
</style>