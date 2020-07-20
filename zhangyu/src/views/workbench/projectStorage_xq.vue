<template>
    <div>
        <div>
             <div class="top_name">
                <span class="top_txt" @click='fh(-1)'>待处理&nbsp;/&nbsp;入库确认&nbsp;/&nbsp;查看详情</span>
                <div class="title_left">
                    <img src="img/fh.png" alt=""  @click='fh(-1)'>
                    <span @click='fh(-1)'>查看详情</span>
                </div>
            </div>
        </div>
        <div class='content_right'>
               <div class='top' > 
                   <div class="titN">
                       <span>素材信息</span>
                   </div>
                   <div>
                       <span class='tits'>项目名称</span>
                       <span class='cons'>{{this.listData.pro_name}}</span>
                       <span  class='tits_2'>项目ID</span>
                       <span>{{this.listData.pro_id}}</span>
                   </div>
                    <div>
                       <span class='tits'>设计师昵称</span>
                       <span class='cons'>{{this.listData.designer}}</span>
                       <span  class='tits_2'>待入库数量</span>
                       <span>{{this.listData.num}}</span>
                   </div>
                    <div>
                       <span class='tits'>入库类型</span>
                       <span class='cons' v-if='this.listData.demand'>{{this.listData.put_type=='0'?'需整理入库':"直接入库"}}</span>
                       <span  class='tits_2'>相关需求</span>
                       <span>{{this.listData.did}}</span>
                   </div>
                    <div>
                       <span class='tits'>审批人</span>
                       <span class='cons'>{{this.listData.audior}}</span>
                       <span  class='tits_2'>素材类型</span>
                       <span v-if='this.listData.demand'>{{this.listData.demand.type=='ad_picture'?'广告图':this.listData.demand.type=='ad_template'?"广告模板":this.listData.demand.type=='sls_dynamic'?"杂志锁屏动效":this.listData.demand.type=='sls_picture'?"杂志锁屏壁纸":this.listData.demand.type=='th_lock_screen'?"锁屏主题素材":this.listData.demand.type=='th_icon'?"图标主题素材":"二级界面主题素材"}}</span>
                   </div>
                    <div>
                       <span class='tits'>审批时间</span>
                       <span class='cons'>{{this.listData.audior_time}}</span>
                       <span  class='tits_2'>需求发起人</span>
                       <span v-if='this.listData.demand'>{{this.listData.demand.creator}}</span>
                   </div>
                    <div>
                       <span class='tits'>备注</span>
                       <span class='cons' v-if='this.listData.demand'>{{this.listData.demand.note}}</span>
                       <span  class='tits_2'>需求发起时间</span>
                       <span v-if='this.listData.demand'>{{this.listData.demand.created_at}}</span>
                   </div>
               </div>
               <div class='fj'>
                    <div class="titN">
                       <span>附件</span>
                   </div>
                   <div class='imgName'>
                        <img :src="this.listData.preview_pic" alt="">
                        <span>{{this.listData.file_name}}</span>
                        <a class='xz' :href="this.listData.file_url">
                            <img  src="img/xz.png" alt="">
                        </a>
                         
                   </div>
               </div>
               <div class='uploads3' v-if='this.put_type=="1"&&this.status_type=="0"'>
                    <div class='but'>
                        <div class='but_left' style="margin-right:20px">
                            <img :src="this.prev_uri" alt="">
                        </div>
                        <div class='but_right'>
                            <div>
                                <span class='bg_name'>绑定项目ID：</span>
                                <input type="text" style="width:166px" v-model="porject_id" disabled>    
                            </div>
                            <div>
                                <span class='bg_name'>素材类型：</span>
                                <select v-model="type" disabled>
                                    <option :value="item.type" v-for='item in scType'>{{item.name}}</option>
                                </select>   
                            </div>
                            <div v-if='this.listData.demand.type=="th_lock_screen"||this.listData.demand.type=="th_icon"||this.listData.demand.type=="th_second_page"'>
                                <span class='bg_name'>名称：</span>
                                <input type="text" v-model="name">    
                            </div>
                            <div>
                                <span class='bg_name' style="vertical-align: top">尺寸：</span>
                                <input type="text" v-model="sjSize" disabled>  
                            </div> 
                            <div v-if='this.listData.demand.type!="th_lock_screen"&&this.listData.demand.type!="th_icon"&&this.listData.demand.type!="th_second_page"'>
                                <span class='bg_name' style="vertical-align: top">选择标签：</span>
                               <div class='ta'>
                                    <span class='ta_name'>预置标签</span>
                                    <div class="AddIMG_bq_box_top_bq" style=" margin-bottom: 15px;">
                                        <template>
                                            <el-checkbox-group
                                                    v-model="preinstall">
                                                <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" >{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                    <span class='ta_name'>个性标签</span>
                                    <div style="margin-bottom: 18px">
                                        <input type="text" placeholder="创建或搜索个性标签" v-model="tagsName" maxlength="6" @input="getTagsList()">
                                    </div>
                                    <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                                        <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
                                        <template>
                                            <el-checkbox-group v-model="bardian">
                                                <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>   
                            </div>
                            <div v-if='this.listData.demand.type=="th_lock_screen"||this.listData.demand.type=="th_icon"||this.listData.demand.type=="th_second_page"'>
                                <span class='bg_name'>使用范围：</span>
                                <select v-model="range">
                                    <option value="">请选择</option>
                                    <option value="all">不限</option>
                                    <option :value="da.range" v-for='da in fw'>{{da.range}}</option>
                                </select> 
                            </div>
                             <div v-if='this.listData.demand.type=="th_lock_screen"||this.listData.demand.type=="th_icon"||this.listData.demand.type=="th_second_page"'>
                                <span class='bg_name'>备注描述：</span>
                                <input type="text" v-model="note">    
                            </div>
                            <div v-if='this.listData.demand.type=="th_lock_screen"||this.listData.demand.type=="th_icon"||this.listData.demand.type=="th_second_page"'>
                                <span class='bg_name'>内容标签：</span>
                                <div class='ta'>
                                    <div class="tag_box">
                                        <input  type="text" placeholder="创建或搜索个性标签" v-model="tagsName" maxlength="32" @input="tagsTheme()"/>
                                        <div class="tags_box">
                                            <span class="CJ" v-if="tagsName!=''" @click="ADDtagTheme()" >创建“{{tagsName}}”标签</span>
                                            <div class='AddIMG_bq_box_top_zdy'>
                                                <template>
                                                    <el-checkbox-group
                                                            v-model="tags">
                                                        <el-checkbox v-for="(item,index) in tag" :label="item.name">{{item.name}}</el-checkbox>
                                                    </el-checkbox-group>
                                                </template>

                                            </div>

                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <!-- <div class='add_btn'>
                                <span class='sc' @click='scADD2()'>上传</span>
                            </div> -->
                        </div>
                    </div>
               </div>
               <div class='uploads' v-if='this.put_type=="0"&&this.status_type=="0"'>
                    <div class="titN">
                       <span>添加入库素材</span>
                   </div>
                   <div style="max-height:200px;width:100%;overflow-x:auto; overflow-y: hidden;">
                        <div class='porject_up' @click="adds()">
                                <img src="img/sc.png" alt="" class='icon'>
                        </div>
                        <div class='porject_up' v-for='(item,index) in this.materials'>
                            <img src="img/remove.png" alt="" class='del' @click="dels(index)">
                            <img :src="item.prev_uri" alt="" class='imgs'>
                        </div>
                   </div>
                  
               </div>
               <div class='uploads_2'  v-if='this.status_type=="1"'>
                     <div class="titN">
                       <span>入库信息</span>
                   </div>
                   <div>
                       <span class='Name'>处理人</span>
                       <span class='Name_left'>{{this.listData.handler}}</span>
                       <span class='Name'>处理时间</span>
                       <span class='Name_right'>{{this.listData.handler_at}}</span>
                   </div>
                   <div>
                       <span class='Name'>入库数量</span>
                       <span class='Name_left'>{{this.listData.local_num}}</span>
                       <span class='Name'>入库数量异常说明</span>
                       <span class='Name_right'>{{this.listData.exception_note}}</span>
                   </div>
                   <div style="margin:24px 0 0 8px">
                       <div class='box_img' v-for='(item,index) in this.listData.materials'>
                           <img :src="item.prev_uri" v-if='item.type!="th_lock_screen"&&item.type!="th_icon"&&item.type!="th_second_page"' >
                            <img :src="item.main_preview" v-if='item.type=="th_lock_screen"||item.type=="th_icon"||item.type=="th_second_page"' >
                       </div>
                   </div>
               </div>
               <div class='foot'>
                    <span @click='storage()' v-if='this.status_type=="0"'>添加入库</span>
                    <span class='NEXT' @click='fh(-1)' v-if='this.status_type=="1"'>返回</span>
               </div>
        </div>
        <div class='bg' v-if='show'>
                <div class='bg-add'>
                    <div class='tit_name'>
                        <span>添加素材</span>
                        <img src="img/gb.png" alt="" @click='unShow()'>
                    </div>
                    <div class='but'>
                        <div class='but_left'>
                            <img :src="this.prev_uri" alt="">
                        </div>
                        <div class='but_right'>
                            <div>
                                <span class='bg_name'>附件：</span>
                                <el-upload
                                    class="upload-demo"
                                    action="1"
                                    :http-request="uploadF"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="1"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                            </div>
                            <div>
                                <span class='bg_name'>绑定项目ID：</span>
                                <input type="text" style="width:266px" v-model="porject_id" disabled>    
                            </div>
                            <div>
                                <span class='bg_name'>素材类型：</span>
                                <select v-model="type" @change="getTag()">
                                    <option :value="item.type" v-for='item in scType' >{{item.name}}</option>
                                </select>
                                  
                            </div>
                            <div v-if='this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"'>
                                <span class='bg_name'>名称：</span>
                                <input type="text" v-model="name">    
                            </div>
                            <div>
                                <span class='bg_name' style="vertical-align: top">尺寸：</span>
                                <input type="text" v-model="sjSize" disabled placeholder="上传附件后自动获取"> 
                                <div class="AddIMG_yl_upload">
                                    <el-upload
                                            :http-request="uploadFile"
                                            class="upload-demo"
                                            action="111"
                                            :before-remove="beforeRemove"
                                            :on-remove="handleRemove1"
                                            :file-list="fileList">
                                        <el-button size="small" type="primary">上传预览图</el-button>
                                    </el-upload>
                                </div> 
                            </div> 
                            <div v-if='this.type!="th_lock_screen"&&this.type!="th_icon"&&this.type!="th_second_page"'>
                                <span class='bg_name' style="vertical-align: top">选择标签：</span>
                                <div class='ta'>
                                    <span class='ta_name'>预置标签</span>
                                    <div class="AddIMG_bq_box_top_bq" style=" margin-bottom: 15px;">
                                        <template>
                                            <el-checkbox-group
                                                    v-model="preinstall">
                                                <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" >{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                    <span class='ta_name'>个性标签</span>
                                    <div style="margin-bottom: 18px">
                                        <input type="text" placeholder="创建或搜索个性标签" v-model="tagsName" maxlength="6" @input="getTagsList()">
                                    </div>
                                    <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                                        <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
                                        <template>
                                            <el-checkbox-group v-model="bardian">
                                                <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>   
                            </div>
                            <div v-if='this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"'>
                                <span class='bg_name'>使用范围：</span>
                                <select v-model="range">
                                    <option value="">请选择</option>
                                    <option value="all">不限</option>
                                    <option :value="da.range" v-for='da in fw'>{{da.range}}</option>
                                </select> 
                            </div>
                             <div v-if='this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"'>
                                <span class='bg_name'>备注描述：</span>
                                <input type="text" v-model="note">    
                            </div>
                            <div v-if='this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"'>
                                <span class='bg_name' style="vertical-align: top">内容标签：</span>
                                <div class='ta'>
                                    <div class="tag_box">
                                        <input  type="text" placeholder="创建或搜索个性标签" v-model="tagsName" maxlength="32" @input="tagsTheme()"/>
                                        <div class="tags_box">
                                            <span class="CJ" v-if="tagsName!=''" @click="ADDtagTheme()" >创建“{{tagsName}}”标签</span>
                                            <div class='AddIMG_bq_box_top_zdy'>
                                                <template>
                                                    <el-checkbox-group v-model="tags">
                                                        <el-checkbox v-for="(item,index) in tag" :label="item.name">{{item.name}}</el-checkbox>
                                                    </el-checkbox-group>
                                                </template>

                                            </div>

                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div class='add_btn'>
                                <span class='sc' @click='scADD()'>上传</span>
                                <span @click='unShow()'>取消</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
         <div class='bg' v-if='rk'>
            <div class='tsBox'>
                    <div class='tsBox_tit'>
                        <span v-if="this.materials.length==this.listData.num">确认素材信息无误并提交入库</span>
                        <span class='tsBox_tit2' v-if="this.materials.length!=this.listData.num">入库异常说明</span>
                        <div>
                            <textarea name="" id="" v-if="this.materials.length!=this.listData.num"  v-model='exception_note' placeholder="请输入入库异常原因(最多20字)" maxlength="20"></textarea>
                        </div>
                    </div>
                    <div class='tsBox_btn'>
                        <span class='tsBox_btn_qd' @click='sh()'>确定</span>
                        <span @click='heid()'>取消</span>

                    </div>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
                data(){
                    return{
                        dialogImageUrl: '',
                        dialogVisible: false,
                        show:false,
                        listData:{},
                        attach:{},
                        aaa:0,
                        initiate:false,
                        fileList:[],
                        sjSize:"",
                        prev_uri:"",
                        scType:[],
                        type:"",
                        fw:{},
                        range:"",
                        preset_tags:[],
                        preinstall:[],
                        self_tags:[],
                        bardian:[],
                        tagsName:"",
                        preset:[0,1],
                        porject_id:"",
                        name:"",
                        note:"",
                        materials:[],
                        rk:false,
                        exception_note:"",
                        tags:[],
                        tag:[],
                        put_type:'',
                        status_type:"",
                    }
                },
                mounted(){
                    this.getData()
                },
                methods: {
                        handleRemove(file, fileList) {
                            this.attach={};
                        },
                        handleRemove1(){
                            this.prev_uri='',
                            this.sjSize=''
                        },
                        handlePictureCardPreview(file) {
                            this.dialogImageUrl = file.url;
                            this.dialogVisible = true;
                        },
                       
                        handlePreview(file) {
                            console.log(file);
                        },
                       
                        beforeRemove(file, fileList) {
                            return this.$confirm(`确定移除 ${ file.name }？`);
                        },
                        adds(){
                            if(this.materials.length<this.listData.num){
                                this.show=true;
                            }
                            
                        },
                        sss(da){
                            console.log(da)
                        },
                        unShow(){
                            this.show=false;
                            this.name='';
                            this.attach={};
                            this.sjSize='';
                            this.prev_uri='';
                            this.preinstall=[];
                            this.bardian=[];
                            this.range='';
                            this.note='';
                             this.type=this.listData.demand.type;
                               
                        },
                        fh(index){
                            this.$router.go(index)
                        },
                        heid(){
                            this.rk=false;
                            if(this.put_type=='1'){
                                this.materials=[]
                            }
                        },
                        getData(){
                            let params={id:this.$route.query.id}
                            this.api.demand_design_project_detail({params}).then((res)=>{
                                this.listData=res;
                                this.type=res.demand.type;        
                                this.put_type=res.put_type;
                                this.status_type=res.local_status;
                                this.porject_id=res.pro_id;
                                if(this.put_type=='1'){
                                    this.prev_uri=res.preview_pic;
                                   
                                }                              
                                this.getType();
                                this.syfw();
                                if(this.put_type=='1'){
                                    this.size();
                                }
                                this.getTagsList()
                                this.tagsTheme()
                            })
                        },                   
                        uploadF(file){
                                let formData = new FormData;
                                formData.append('file',file.file);
                                this.api.file_upload(formData).then((res)=>{
                                    this.attach=res;
                                })
                        },
                        size(){
                             var image = new Image();
                                    var _this=this;
                                    image.onload=function(){
                                        var width = image.width;
                                        var height = image.height;
                                        _this.sjSize = (width+"*"+height)
                                    };
                                    image.src=this.prev_uri;
                        },
                        uploadFile(file){   
                                let formData = new FormData;
                                formData.append('file',file.file);
                                this.api.file_upload(formData).then((res)=>{
                                    this.prev_uri = res.url;
                                    var image = new Image();
                                    var _this=this;
                                    image.onload=function(){
                                        var width = image.width;
                                        var height = image.height;
                                        _this.sjSize = (width+"*"+height)
                                    };
                                    image.src= res.url;
                                })
                        },
                        getType(){
                            let params={material:'1'};
                            this.api.config_material_type({params}).then((res)=>{
                                this.scType=res;
                            })
                        },
                        syfw(){
                            this.api.themes_config_account().then((res)=>{
                                this.fw=res;
                            })
                        },
                        getTagsList(){
                            let params = {preset:this.preset,material:'1',type:this.type,search:this.tagsName,p:50,page:1};
                            this.api.tags_search({params}).then((da)=>{
                                this.preset_tags = da.data.tags;
                                this.self_tags = da.data.self_tags;
                            })
                        },
                        tagsTheme(){
                                let params = {material:'2',type:'theme',search:this.tagsName,p:500,page:1};
                                this.api.tags_search({params}).then((da)=>{
                                    this.tag=da.data.self_tags;
                                })
                        },
                        getTag(){
                            if(this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"){
                                this.tagsTheme();
                            }else{
                                this. getTagsList()
                            }
                        },
                        ADDtags(){
                            this.bardian.push(this.tagsName);
                            let formData = new FormData;
                            formData.append('name',this.tagsName);
                            formData.append('preset',0);
                            formData.append('material',1);
                            formData.append('type',this.type);
                            this.api.tags_add(formData).then((res)=>{
                                this.tagsName='';
                                this. getTagsList();
                            })
                        },
                        ADDtagTheme(){
                            let formData =new FormData;
                            formData.append('name',this.tagsName);
                            formData.append('preset',"0");
                            formData.append('material','2');
                            formData.append('type','theme');
                            this.api.tags_add(formData).then((res)=>{
                                this.tagsName='';
                                this.tagsTheme();
                            })
                        },
                        sh(){
                            if(this.materials.length!=this.listData.num&&this.exception_note==''){
                                  this.$message.error('入库异常说明不能为空');
                                  return
                            }
                             if(this.materials.length==0){
                                  this.$message.error('素材不能为空');
                                  return
                            }
                            if(this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"){
                                 var formData =new FormData;
                                formData.append('project_id',this.listData.pro_id);
                                formData.append('put_type',this.listData.put_type);
                                formData.append('exception_note',this.exception_note);
                                formData.append('materials',JSON.stringify(this.materials))
                            }else{
                                formData =new FormData;
                                formData.append('project_id',this.listData.pro_id);
                                formData.append('put_type',this.listData.put_type);
                                formData.append('exception_note',this.exception_note);
                                formData.append('materials',JSON.stringify(this.materials))
                            }
                           
                            this.api.material_project_add(formData).then((res)=>{
                                if(res!=false){
                                    this.heid();
                                    this.getData();
                                }
                            })
                        },
                         scADD2(){
                             if(this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"){
                                 let list={
                                    attach:{url:""},
                                    previews:[],
                                   
                                }
                                if(!this.name){
                                    this.$message.error('名字不能为空');
                                    return
                                }
                                if(!this.prev_uri){
                                    this.$message.error('预览图不能为空');
                                    return
                                }
                                if(this.tags.length==0){
                                    this.$message.error('标签不能为空');
                                    return
                                }
                                 if(!this.range){
                                    this.$message.error('使用范围不能为空');
                                    return
                                } if(!this.note){
                                    this.$message.error('备注不能为空');
                                    return
                                }
                                list.name=this.name;
                                list.attach.url=this.listData.file_url;
                                list.previews.push(this.prev_uri);
                                list.main_preview=this.prev_uri;
                                list.size=this.sjSize;
                                list.type=this.type;
                                list.tags=this.tags.join(',');
                                list.range=this.range;
                                list.note=this.note;
                                this.materials.push(list);
                             }else{
                                this.materials=[];
                                let list={
                                    attach:{url:""}
                                }
                                if(!this.prev_uri){
                                    this.$message.error('预览图不能为空');
                                    return
                                }
                                if(this.preinstall==0){
                                    this.$message.error('预置标签不能为空');
                                    return
                                }
                                
                                list.name=this.name;
                                list.attach.url=this.listData.file_url;
                                list.size=this.sjSize;
                                list.prev_uri=this.prev_uri;
                                list.type=this.type;
                                list.preinstall=this.preinstall;
                                list.bardian=this.bardian;
                                this.materials.push(list);
                             }
                           
                            
                        },
                         scADD(){
                            if(!this.attach.name){
                                this.$message.error('附件不能为空');
                                return
                            }
                             if(!this.prev_uri){
                                this.$message.error('预览图不能为空');
                                return
                            }
                             if(this.type=="th_lock_screen"||this.type=="th_icon"||this.type=="th_second_page"){
                                    let list={
                                        attach:{url:""},
                                        previews:[],
                                        }
                                if(!this.name){
                                    this.$message.error('名字不能为空');
                                    return
                                }
                                if(this.tags.length==0){
                                    this.$message.error('标签不能为空');
                                    return
                                }
                                 if(!this.range){
                                    this.$message.error('使用范围不能为空');
                                    return
                                } if(!this.note){
                                    this.$message.error('备注不能为空');
                                    return
                                }
                                    list.name=this.name;
                                    list.attach=this.attach;
                                    list.size=this.sjSize;
                                    list.type=this.type;
                                    list.previews.push(this.prev_uri);
                                    list.main_preview=(this.prev_uri);
                                    list.prev_uri=this.prev_uri;
                                    list.tags=this.tags.join(',')
                                    list.range=this.range;
                                    list.note=this.note;
                                    this.materials.push(list)
                             }else{
                                let list={}
                                if(this.preinstall.length==0){

                                    this.$message.error('预置标签不能为空');
                                    return
                                }
                                    list.attach=this.attach;
                                    list.size=this.sjSize;
                                    list.prev_uri=this.prev_uri;
                                    list.type=this.type;
                                    list.preinstall=this.preinstall;
                                    list.bardian=this.bardian;
                                    this.materials.push(list);
                             }
                           
                            this.unShow()
                         
                            
                        },
                       
                        dels(index){
                            this.materials.splice(index,1);
                        },
                        storage(){
                            if(this.put_type=='1'){
                                this.scADD2()
                            }
                            console.log(this.materials)
                            this.rk=true
                        }
                }
}
</script>

<style scoped>
    .top_name{height: 112px}
    .top_txt,.title_left {
        margin-left: 24px;
    }
    .title_left span{
        margin-left: 10px;
        cursor: pointer;
    }
    .top_txt{
        cursor: pointer;
    }
     .content_right{
        width: 48%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 200px;
        margin-left: 26%;
       
    }
    .top{
        width:100%;
        height:348px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
    }
    .tits,.tits_2{
        width: 90px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        margin:24px 0px 0 24px; 
    }
    .cons{
        display: inline-block;
        width: 25%;
        font-size:10px;
        font-weight:400;
        color:rgba(23,43,77,1);
        overflow: hidden;
    }
    .titN span{
        display: inline-block;
        margin:24px 0 0 24px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(23,43,77,1);
    }
    .fj{
        width:100%;
        height:126px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
        margin-top:16px
    }
    .imgName{
        margin:16px 23px 0 24px;
        
    }
    .imgName img{
        display: inline-block;
        width:38px;
        height:39px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(9,30,66,0.08);
        margin-right: 17px;
    }
    .xz{
        float: right;
        width:16px!important
    }
    .xz img{
       width:16px!important;
       height:16px!important  
    }
    .uploads,.uploads_2,.uploads3{
        height:284px;
        width: 100%;
        margin-top:16px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .uploads_2{
        height: 380px!important;
    }
    .uploads3{
        min-height: 600px
    }
    .foot{
         width: 100%;
         height:56px;
        margin-top:16px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 12px 0px rgba(0,0,0,0.06);
    }
    .foot span{
        display: inline-block;
        width:88px;
        height:32px;
        background:rgba(0,82,204,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        cursor: pointer;
        line-height: 32px;
        float: right;
        border-radius: 3px;
        margin-top:12px;
        margin-right:24px;
        
    }
    .NEXT{
        width:60px!important;
        height:32px!important;
        border:1px solid rgba(165,173,186,1)!important;
        color:rgba(107,119,140,1)!important;
        background:transparent!important;
    }
    .Name{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        margin:24px 0 0 24px;
        width:120px;
        height:22px
    }
    .Name_left,.Name_right{
        display: inline-block;
        width: 150px;
        height:22px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(23,43,77,1);
        margin-right: 100px;    
    }
    .Name_right{
        margin-right: 0px!important; 
    }
    .box_img{
        width:128px;
        height:192px;
        background:rgba(244,245,247,1);
        border:1px solid rgba(235,235,235,1);
        margin-left: 16px;
        vertical-align: top;
        position: relative;
        display: inline-block;
    }
    .box_img img{
        max-width: 128px;
        max-height: 100%;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%)
    }
    .up{
        margin:24px 0 0 8px;
        width:100%;
        height: 198px;
        overflow: hidden;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    .bg-add{
        width:801px;
        min-height:576px;
        background:rgba(255,255,255,1);
        opacity:1;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%)
    }
    .tit_name{
        height: 55px;
        border: 1px solid #E6E9F0;
    }
    .tit_name span{
        display: inline-block;
        line-height: 55px;
        margin-left: 24px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
    }
    .tit_name img{
        float:right;
        width: 16px;
        margin: 20px 24px 0 0;
        cursor: pointer;
    }
    .but{
        padding:24px
    }
    .but_left{
        width:147px;
        height:260px;
        background:rgba(197,197,197,1);
        opacity:1;
        position: relative;
        display: inline-block;
        margin-right: 52px;
        vertical-align: top
    }
    .but_left img{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        max-width:147px;
        max-height: 260px
    }
    .but_right{
        display: inline-block;
    }
    .but_right>div{
        margin-bottom: 16px
    }
    .upload-demo{
        display: inline-block
    }
    .bg_name{
        display: inline-block;
        width:90px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(50,50,51,1);
        opacity:1;
        margin-right: 6px;
        text-align: right;vertical-align: top;    }
    input{
        width:176px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
        margin-right:16px;
        padding-left:8px;
        vertical-align: top
    }
    select{
        width:184px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
    }
    .ta{
        display: inline-block;
        max-width: 300px
    }
    .ta_name{
        display: block;
        width:56px;
        height:20px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(150,151,153,1);
        opacity:1;
        margin-bottom: 16px;
    }
    .add_btn span{
            width:60px;
            height:32px;
            border:1px solid rgba(220,222,224,1);
            opacity:1;
            border-radius:4px; 
            cursor: pointer;
            font-size:14px;
            font-family:PingFang SC;
            line-height: 32px!important;
            font-weight:400;
            line-height:20px;
            color:rgba(50,50,51,1);
            text-align: center;
            display: inline-block 
    }
    .sc{
        background:rgba(21,91,212,1)!important;
        color:rgba(255,255,255,1)!important;
        margin: 0 24px 0 98px;
    }
    .AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
        margin:0 20px 0px 0px ;
        max-height:120px;
        overflow-y:auto;

    }
    .CJ{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        padding: 3px 5px ;
        background: #d7d7d7;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 10px!important;
    }
    .porject_up{
        display: inline-block;
        width:128px;
        height:192px;
        background:#F4F5F7;
        border-radius:4px;
        position: relative;
        margin:20px 0 24px 24px;
        cursor: pointer;
    }
    .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .imgs{
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 3
    }
    .del{
        display: inline-block;
        width: 16px;
        height: 16px;
        position: absolute;
        top:-10px;
        right:-5px;
        z-index: 4;
        cursor: pointer;
        
    }
    .tsBox_tit2{
        font-weight: bold
    }
     .tsBox{
        min-width:416px;
        min-height:134px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
        border-radius:4px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%)
    }
    .tsBox_tit{
        margin: 30px 0 32px 0;
    }
    .tsBox_tit span{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(50,50,51,1);
        margin-left: 60px
    }
    .tsBox_btn{
        text-align: right;
    }
    .tsBox_btn span{
        text-align: center;
        border-radius: 3px;
        display: inline-block;
        width:60px;
        height:32px;
        border:1px solid rgba(165,173,186,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        line-height:32px;
        margin-right: 16px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .tsBox_btn_qd{
        background:rgba(0,82,204,1)!important;
        color: #fff!important;
        border: 0!important;
    }
    textarea{
        margin: 28px 0px 0 60px;
        min-width: 260px;
        padding:10px;
    }
    .AddIMG_yl_upload{
        display: inline-block;
        margin-left: 16px;
    }
    .tags_box{
        margin:14px 14px 14px 0;
    }
    .CJ{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        padding: 3px 5px ;
        background: #d7d7d7;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 10px!important;
    }
</style>