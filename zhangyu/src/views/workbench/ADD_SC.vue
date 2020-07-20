<template>
    <div>
        <div class="bg" >
            <div class="AddIMG">
                <div class="AddIMG_tit">
                    <span>{{title}}</span>
                </div>
                <div class="AddIMG_content">
                    <div class="AddIMG_content_left">
                        <div>
                            <span>绑定素材预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img />
                        </div>
                        <div class="AddIMG_box_txt">
                            <span></span>
                        </div>
                        <div>
                            <span>上传素材预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img  class="ADD_img_img" :src="prev_uri" v-if="this.prev_uri!=''&&(prev_uri.split('.'))[(prev_uri.split('.').length-1)]!='mp4'"/>
                            <video class="ADD_img_img" :src="prev_uri" controls="controls" v-if="this.prev_uri!=''&&(prev_uri.split('.'))[(prev_uri.split('.').length-1)]=='mp4'" />
                        </div>
                    </div>
                    <div class="AddIMG_content_right">
                        <div class="AddIMG_input">
                            <span class="tit" style="vertical-align: top">附件:</span>
                            <!--<span class="AddIMG_input_box">上传</span>-->
                            <!--<input type="file" />-->
                            <div class="AddIMG_input_box">
                                <el-upload
                                        class="upload-demo"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :on-remove="handleRemove"
                                        :http-request="uploadF"
                                        action="111"
                                >
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                            </div>
                            <img src="../../../public/img/msg.png" @click="showHint" style="vertical-align: top"/>
                            <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate" >
                                <div class="strip" :style="{width:aaa+'%'}" style="background: blue;height: 5px"></div>
                                <div style="text-align: center;font-size: 10px">当前附件上传{{aaa}}%</div>
                            </div>
                        </div>

                        <div class="AddIMG_zp">
                            <span class="tit">绑定设计师作品:</span>
                            <input type="text" class="AddIMG_zp_text" v-model="bind_workid" />
                            <p>由设计师站获得的素材，必须填写对应的作品ID</p>
                        </div>
                        <div class="AddIMG_select">
                            <span class="tit">素材类型:</span>
                            <select v-model="type" @change="getTagsList()" >
                                <option :value="item.type" v-for="item in scType">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="AddIMG_switch" v-if="sw&&this.status!=1101">
                            <span  class="tit">是否启用:</span>
                            <el-switch
                                    @change="open"
                                    v-model="value2"
                                    active-color="#409EFF"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="AddIMG_yl">
                            <span class="tit">尺寸:</span>
                            <input class="AddIMG_yl_size" v-model="sjSize" placeholder="上传预览图后自动获取" disabled>
                            <div class="AddIMG_yl_upload">
                                <el-upload
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :http-request="uploadFile"
                                        :on-remove="Remove"
                                        class="upload-demo"
                                        action="111"
                                        :before-upload="beforeAvatarUpload"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">上传预览图</el-button>
                                </el-upload>
                            </div>
                            <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate2" >
                                <div class="strip" :style="{width:bbb+'%'}" style="background: blue;height: 5px"></div>
                                <div style="text-align: center;font-size: 10px">当前附件上传{{bbb}}%</div>
                            </div>
                        </div>
                        <div class="AddIMG_bq">
                            <span class="tit TIT">选择标签:</span>
                            <div class="AddIMG_bq_box">
                                <div class="AddIMG_bq_box_top">
                                    <div class="AddIMG_bq_box_top_tit">预置标签:</div>
                                    <div class="AddIMG_bq_box_top_bq">
                                        <!--<span class="bq" v-for="(item,index) in preset_tags">{{item.name}}</span>-->
                                        <template>
                                            <el-checkbox-group
                                                    v-model="preinstall">
                                                <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" >{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                                <div class="AddIMG_bq_box_bottom">
                                    <div class="AddIMG_bq_box_top_tit">个性标签:
                                        <input type="text" placeholder="创建或搜索个性标签" maxlength="6" v-model="tagsName" @input="getTagsList()"/>
                                    </div>
                                    <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                                        <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
                                        <template>
                                            <el-checkbox-group
                                                    v-model="bardian">
                                                <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg_btn">
                            <span class="bg_btn_up" @click="AddMatter">上传</span>
                            <span @click="heidSc">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['id','index'],
        name: "content_component",
        data(){
            return {
                title:'添加素材',
                preinstall:[],
                bardian:[],
                value2:true,
                fileList:[],
                prev_uri:'',
                attach:{
                    name:'',
                    url:'',
                    size:'',
                    ext:'',
                    md5:''
                },
                bind_mid:'',
                bind_workid:'',
                self_tags:[],
                tags:[],
                sjSize:'',
                preset:[0,1],
                preset_tags:[],
                type:'',
                sw:false,
                size:'',
                scUrl:'',
                scType:'',
                tagsName:'',
                is_bind_mid:true,
                is_bind_workid:false,
                file:{},
                aaa:0,
                bbb:0,
                initiate:false,
                initiate2:false,
                status:'',
                clickNmu:0,
            }
        },
        mounted(){
            this.getTagsList();
            this.title='添加素材'
        },
        methods:{

            heidSc(){
                this.$parent.heidAddSC();
                this.$parent.getscR();
            },
            showHint(){
                this.$parent.ShowHint()
            },
            XSset(){
                if(this.message.mid!=undefined){
                    return
                }
                if(this.is_bind_mid==true){
                    return
                }else{
                    this.$parent.XSset();
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isPSD = file.type === 'image/psd';
                const isBMP = file.type === 'image/bmp';
                const isGIF = file.type === 'image/gif';
                const isTIF = file.type === 'image/tif';
                if (!isJPG&&!isPNG&&!isPSD&&!isBMP&&!isGIF&&!isTIF) {
                    this.$message.error('只支持JPG、PNG、psd、bmp、gif、tif格式!');
                }
                return isPNG || isJPG ||isPSD||isBMP||isGIF||isTIF;
            },
            open(){
                let formData = new FormData;
                formData.append('mid',this.message.mid);
                formData.append('status',this.status);
                formData.append('valid',this.value2==true?1:0);
                this.api.material_status_change(formData).then((res)=>{
                    console.log(res);
                })
            },

            time(){
                var _this=this;
                _this.aaa=0;
                var timer = setInterval(function () {
                    if(_this.aaa<99){
                        _this.aaa++
                    }
                },100);
            },
            time1(){
                var _this=this;
                _this.bbb=0;
                var timer = setInterval(function () {
                    if(_this.bbb<99){
                        _this.bbb++
                    }
                },100);
            },
            uploadF(file){
                if(this.status==1101){
                    return
                }else{
                    this.initiate=true;
                    this.time();
                    let formData = new FormData;
                    formData.append('file',file.file);
                    this.api.file_upload(formData).then((res)=>{
                        this.aaa=100;
                        this.initiate=false;
                        // this.attach.name = res.name;
                        // this.attach.size = res.size;
                        // this.attach.ext = res.ext;
                        // this.attach.md5 = res.md5;
                        // this.attach.url = res.url;
                        this.attach=res
                    })
                }

            },
            getType(){
                let params={material:1};
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                    console.log(this.scType)
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate=false;
            },
            Remove(file, fileList) {
                this.file = '';
                this.initiate2=false;
            },
            uploadFile(file){
                if(this.status==1101){
                    return
                }else{
                    this.initiate2=true;
                    this.time1();
                    let formData = new FormData;
                    formData.append('file',file.file);
                    this.api.file_upload(formData).then((res)=>{
                        this.bbb=100;
                        this.initiate2=false;
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
                }

            },
            getTagsList(){
                let params = {preset:this.preset,material:1,type:this.type,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    console.log(da);
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags;
                    this. getType();
                })
            },
            ADDtags(){
                if(!this.type){
                    this.$message.error('类型不能为空')
                    return
                }
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
            AddMatter(){
                if(this.clickNmu==0){
                    this.clickNmu=1
                }else{
                    return
                }
                    if(!this.type){
                        this.$message('类型不能为空')
                        return
                    }
                    if(!this.prev_uri){
                        this.$message('未上传预览图')
                        return
                    }
                    if(!this.attach.name){
                        this.$message('未上传文件')
                        return
                    }
                    if(this.preinstall.length<=0){
                        this.$message('预置标签不能为空')
                        return
                    }

                    if(!this.bind_workid){
                        this.$message('未绑定作品ID')
                        return
                    }
                    if(!this.bind_workid.match(/^\d{1,}$/)){
                        this.$message('绑定作品ID为数字')
                        return
                    }
                    let formData = new FormData;
                     formData.append('id',this.id);
                     formData.append('demand_type',"demand_material");
                    formData.append('type',this.type);
                    formData.append('status',(this.value2==true?1:0));
                    formData.append('prev_uri',this.prev_uri);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('tags',this.preinstall);
                    formData.append('self_tags',this.bardian);
                    formData.append('bind_mid',this.bind_mid);
                    formData.append('bind_workid',this.bind_workid);
                    formData.append('is_bind_workid',1);
                    formData.append('size',this.sjSize);
                    formData.append('is_bind_mid',1);
                    this.api.demand_add_material(formData).then((res)=>{
                        if(res!=false){
                            this.clickNmu=0
                            this.$parent.heidAddSC();
                            this.$parent.getscR();
                        }

                    })
                },

            getMatterDetails(){
                let params ={mid:this.message.mid};
                this.api.material_detail({params}).then((res)=>{
                    this.sw=true;
                    this.prev_uri=res.prev_uri;
                    for (var j=0;j<res.tags.length;j++){
                        if(this.preset_tags.indexOf(res.tags[j])==-1){
                            this.preinstall= res.tags.splice(j);
                        }
                    }
                    for (var e=0;e<res.self_tags.length;e++){
                        if(this.self_tags.indexOf(res.self_tags[e])==-1){
                            this.bardian=res.self_tags.splice(e);
                        }
                    }
                    this.sjSize=res.size;
                    this.type=res.type;
                    this.is_bind_mid=res.is_bind_mid==1?true:false;
                    this.is_bind_workid=res.is_bind_workid==0?true:false;
                    for(let i=0;i<res.bind_mid.length;i++){
                        this.bind_mid=res.bind_mid[i].mid;
                        this.hqUrl = res.bind_mid[i].prev_uri;
                    }
                    if(res.status==1201){
                        this.value2=false;
                    }else{
                        this.value2=true;
                    };
                    this.status = res.status;
                })

        },

        },
    }
</script>

<style scoped>
    input{
        margin-left: 0;
        padding-left: 10px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .AddIMG{
        position: absolute;
        left: 50%;
        top:15px;
        transform: translateX(-50%);
        width:1115px;
        height:884px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
        text-align: left;
        height: 55px;
        border-bottom: 1px solid #E6E9F0;

        margin-bottom: 24px;
    }
    .AddIMG_tit span{
        display: inline-block;
        margin-left: 24px;
        color:rgba(54,54,54,1);
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 55px;
    }
    .AddIMG_content_right{
        display: inline-block;
        width: 750px;
        margin-top: 25px;
    }
    .AddIMG_content_left{
        margin-left: 24px;
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
    }
    .AddIMG_content_left span,.AddIMG_content_right span{
        display: inline-block;
        margin-bottom: 10px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);

    }
    .AddIMG_content_left img{
        max-width: 228px;
        max-height: 328px;
        border:0px!important;
        position: relative;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .AddIMG_content_right span{
        margin-bottom: 0px;
    }
    .AddIMG_box{
        width:228px;
        padding: 0 17px;
        height:328px;
        background:#f7f9fc;
        border-radius:4px;
    }
    .AddIMG_box_txt{
        margin-left: 45px;
        width:141px;
        text-align: center;
        margin-top: 19px;
    }
    .AddIMG_box_txt span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        background:rgba(0,153,255,.1);
    }
    .AddIMG_input,.AddIMG_sc,.AddIMG_zp,.AddIMG_select,.AddIMG_yl{
        margin-bottom: 20px;
    }
    .AddIMG_switch{
        display: inline-block;
    }
    .AddIMG_sc input{
        width:254px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin: 0 11px 0 0 !important;
    }
    .AddIMG_input input{
        width:140px;
        height:50px;
        margin-left: 0;
        position: relative;
        left: -140px;
        padding: 0;
        opacity:0;
        top:-14px;
    }
    .AddIMG_input img{
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
    .AddIMG_input_box{
        display: inline-block;
        width:106px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1)!important;
    }
    .tit{
        display: inline-block;
        width:117px;
        margin-right: 16px;
        vertical-align: middle;
        text-align: right;
    }
    .TIT{
        vertical-align:top!important;
    }
    .AddIMG_sc_cjeckbox{
        width: 14px!important;
        height: 14px!important;
        margin:2px  11px 0 0!important;
        padding-left: 0!important;
    }
    .AddIMG_sc_btn{
        display: inline-block;
        margin-right: 10px;
        width:124px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1)!important;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .AddIMG_sc_btn_jy{
        background:rgba(153,153,153,1)!important;
        color:rgba(255,255,255,1)!important;
    }
    .AddIMG_sc p,.AddIMG_zp p ,.AddIMG_yl p,.AddIMG_input p{
        margin:10px 0 0 133px;
        padding: 0;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#8b9bb3;
    }
    .AddIMG_zp_text{
        width:254px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 21px;
    }
    .AddIMG_select{
        display: inline-block;
    }
    .AddIMG_select select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG_yl_size{
        display: inline-block;
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgb(229, 227, 235);
    }
    /*.AddIMG_yl input{*/
    /*width:125px;*/
    /*height:50px;*/
    /*position: relative;*/
    /*left: -140px;*/
    /*top:-35px;*/
    /*opacity: 0;*/
    /*}*/
    .AddIMG_yl_upload{
        width: 150px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        text-align: center;
        vertical-align: top;
        margin-left: 20px;
    }
    .AddIMG_yl_upload>span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(19,159,248,1);
        line-height: 50px;
    }
    .AddIMG_bq_box{
        display: inline-block;
        width:560px;
        height:258px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        overflow-y: auto;
    }
    .AddIMG_bq_box_top{
        border-bottom: 1px solid rgba(230,230,230,1);
    }
    .AddIMG_bq_box_top_tit{
        margin: 14px 0 14px 14px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
        margin:0 20px 0px 0px ;

    }


    .AddIMG_bq_box_top_tit input{
        display: block;
        width:326px;
        padding-left: 10px;
        height:28px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 10px;
    }
    .bg_btn{
        margin: 40px 0;
    }
    .bg_btn span{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        text-align: center;
        cursor: pointer;
    }
    .bg_btn_up{
        border:0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px;
        margin-left: 133px;
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