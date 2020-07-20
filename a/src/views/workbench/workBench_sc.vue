<template>
    <div>
        <div class="bg">
            <div class="AddIMG">
                <div class="AddIMG_tit">
                    <span>发布素材需求</span>
                </div>
                <div style="overflow-y: auto;height: 655px">
                    <div>
                        <span class="tit_txt">素材类型</span>
                        <select style="margin-right: 24px" v-model="type" @change="getSJlist()">
                            <option value="" disabled selected>请选择</option>
                            <option v-for="(item,index) in types" :value="item.type">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <span class="tit_txt">需求名称</span>
                        <input type="text" class="xqName" placeholder="请填写需求名称" v-model="demand_name" maxlength="20"/>
                    </div>
                    <div>
                        <span class="tit_txt">优先级</span>
                        <select v-model="priority">
                            <option value="" disabled selected>请选择</option>
                            <option value="高">高</option>
                            <option value="中">中</option>
                            <option value="低">低</option>
                        </select>
                    </div>
                    <div>
                        <span class="tit_txt">需求数量</span>
                        <input type="number" v-model="num" class="number" placeholder="请输入需求数量"  maxlength="2"/>
                    </div>
                    <!-- <div>
                        <span class="tit_txt">设计规范</span>
                        <select class="sj_sel" v-model="design_standard">
                            <option value="" disabled selected>请选择</option>
                            <option v-for="(item,index) in sj" :value="item.id">{{item.name}}</option>
                        </select>
                    </div> -->
                    <div class="time">
                        <span class="tit_txt">截止时间</span>
                        <el-date-picker
                                v-model="endtime"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="24:00:00"
                                format="yyyy 年 MM 月 dd 日 H 时 m 分"
                                value-format="yyyy-MM-dd HH:mm"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        <span class="tit_txt fj">附件</span>
                        <div class="uplaod">
                            <el-upload
                                    class="upload-demo"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-remove="handleRemove"
                                    :http-request="uploadFile"
                                    action="111">
                                <el-button size="small" type="primary">添加附件</el-button>
                            </el-upload>
                        </div>
                        <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate2" >
                            <div class="strip" :style="{width:bbb+'%'}" style="background: blue;height: 5px"></div>
                            <div style="text-align: center;font-size: 10px">当前附件上传{{bbb}}%</div>
                        </div>
                    </div>
                    <div>
                        <span class="tit_txt fj">风格</span>
                        <div class="uplaod">
                            <el-upload
                                    class="upload-demo"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-remove="Remove"
                                    :http-request="uploadF"
                                    action="111">
                                <el-button size="small" type="primary">上传参考图</el-button>
                            </el-upload>
                        </div>
                        <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate" >
                            <div class="strip" :style="{width:aaa+'%'}" style="background: blue;height: 5px"></div>
                            <div style="text-align: center;font-size: 10px">当前附件上传{{aaa}}%</div>
                        </div>
                    </div>
                    <div>
                        <span class="tit_txt top">设计要求</span>
                        <textarea maxlength="1000" v-model="requirement" placeholder="请补充本次需求相关详细描述
例：xxx渠道的应用分发模板">
                        </textarea>
                    </div>

                </div>
                <div class="btn">
                    <span class="btn_fb" @click="ADDsc()" v-if="bear==false">发布</span>
                    <span class="btn_fb" v-if="bear==true">发布</span>
                    <span @click="heid">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['SCid','status'],
        name: "work-bench_sc",
        data(){
            return{
                attach:{
                    name:'',
                    size:'',
                    url:'',
                    ext:'',
                    md5:''
                },
                type:'',
                types:[],
                sj:[],
                num:null,
                priority:'',
                is_attach:0,
                requirement:'',
                endtime:'',
                design_standard:'',
                is_ref:0,
                ref_url:'',
                initiate2:false,
                initiate:false,
                aaa:0,
                bbb:0,
                demand_name:'',
                bear:false,
            }
        },
        mounted(){
            this.getTypes();
        },
        methods:{
            getData(){
                let params ={id:this.SCid};
                this.api.demand_detail({params}).then((res)=>{
                   this.type=res.type;
                   this.demand_name=res.demand_name;
                   this.priority=res.priority;
                   this.num=res.num;
                   this.endtime=res.endtime;
                    this.requirement=res.require;
                    // this.design_standard=res.design_standard.id;
                    this.attach=res.attach;
                    this.ref_url=res.ref_url;
                })
            },
            ADDsc(){
                if(!this.SCid){
                    if(!this.type){
                        this.$message.error('类型不能为空')
                        return
                    }
                    if(!this.demand_name){
                        this.$message.error('需求名称不能为空')
                        return
                    }
                    if(!this.priority){
                        this.$message.error('优先级不能为空')
                        return
                    }
                    if(!this.num){
                        this.$message.error('需求数量不能为空')
                        return
                    }
                    if(this.num>99){
                        this.$message.error('需求数量最大为99');
                        return
                    }
                    if(this.num<=0){
                        this.$message.error('需求数量为大于零的正整数');
                        return
                    }
                    // if(!this.design_standard){
                    //     this.$message.error('设计规范不能为空')
                    //     return
                    // }
                    if(!this.requirement){
                        this.$message.error('设计要求不能为空')
                        return
                    }
                    if(!this.endtime){
                        this.$message.error('截止时间不能为空')
                        return
                    }
                    if(new Date(this.endtime)<=new Date()){
                        this.$message.error('截止时间不能小于当前时间');
                        return
                    }
                    this.bear=true;
                    let formData = new FormData;
                    formData.append('type',this.type);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('num',this.num);
                    formData.append('priority',this.priority);
                    formData.append('endtime',this.endtime);
                    formData.append('is_attach',this.is_attach);
                    formData.append('is_ref',this.is_ref);
                    formData.append('ref_url',this.ref_url);
                    // formData.append('design_standard',this.design_standard);
                    formData.append('requirement',this.requirement);
                    formData.append('demand_name',this.demand_name);
                    this.api.demand_material_add(formData).then((res)=>{
                        console.log(typeof(this.ref_url))
                    }).catch(()=>{
                        this.bear=false
                    })
                }else{
                    if(!this.type){
                        this.$message.error('类型不能为空')
                        return
                    }
                    if(!this.priority){
                        this.$message.error('优先级不能为空')
                        return
                    }
                    if(!this.num){
                        this.$message.error('需求数量不能为空')
                        return
                    }
                    if(this.num>99){
                        this.$message.error('需求数量最大为99');
                        return
                    }
                    if(this.num<=0){
                        this.$message.error('需求数量为大于零的正整数');
                        return
                    }
                    // if(!this.design_standard){
                    //     this.$message.error('设计规范不能为空')
                    //     return
                    // }
                    if(!this.requirement){
                        this.$message.error('设计要求不能为空')
                        return
                    }
                    if(!this.endtime){
                        this.$message.error('截止时间不能为空')
                        return
                    }
                    if(new Date(this.endtime)<=new Date()){
                        this.$message.error('截止时间不能小于当前时间');
                        return
                    }
                    if(!this.demand_name){
                        this.$message.error('需求名称不能为空')
                        return
                    }
                    this.bear=true
                    let formData = new FormData;
                    formData.append('type',this.type);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('num',this.num);
                    formData.append('id',this.SCid);
                    formData.append('priority',this.priority);
                    formData.append('endtime',this.endtime);
                    formData.append('is_attach',this.is_attach);
                    formData.append('is_ref',this.is_ref);
                    formData.append('ref_url',this.ref_url);
                    // formData.append('design_standard',this.design_standard);
                    formData.append('requirement',this.requirement);
                    formData.append('demand_name',this.demand_name);
                    this.api.demand_material_edit(formData).then((res)=>{
                        let formData = new FormData;
                        formData.append('id',this.SCid);
                        formData.append('status',this.status);
                        this.api.demand_audit(formData).then((res)=>{
                            if(res!=false){
                                this.$emit('upDataList');
                                this.heid();
                            }
                        }).catch(()=>{
                            this.bear=false
                        })
                    })
                }

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
            heid(){
                this.$parent.heidSC();
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            Remove(file, fileList) {
                this.file = '';
                this.initiate = false
            },
            uploadF(file){
                this.initiate = true;
                this.time();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.aaa=100;
                    this.initiate=false;
                    this.ref_url = res.url;
                    this.is_ref=1;
                })
            },
            uploadFile(file){
                this.initiate2 = true;
                this.time1();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.bbb=100;
                    this.initiate2=false;
                    this.is_attach=1;
                    this.attach.name = res.name;
                    this.attach.ext = res.ext;
                    this.attach.md5 = res.md5;
                    this.attach.url = res.url;
                    this.attach.size =res.size;
                })
            },
            getTypes(){
                let params ={demand_type:'demand_material'};
                this.api.config_demands_type({params}).then((res)=>{
                   this.types=res;
                   this.getSJlist();
                })
            },
            getSJlist(){
                let params = {type:this.type};
                this.api.standard_standards({params}).then((res)=>{
                    this.sj = res.data;
                    if(this.SCid){
                        this.getData();
                    }
                    console.log(res)
                })
            },
        }
    }
</script>

<style scoped>
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
        top:50%;
        transform: translate(-50%,-50%);
        width:840px;
        height:800px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
       height: 55px;
        border-bottom: 1px solid #ddd;
    }

    .AddIMG_tit>span{
        display: inline-block;
        text-align: center;
        line-height: 55px;
        margin-left:24px ;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG div{
        margin-bottom: 21px;
    }
    .tit_txt{
        display: inline-block;
        width: 100px;
        text-align: right;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .top{
        vertical-align: top;
    }
   .number{
       width: 190px;
   }
   .fj{vertical-align: top}
    select,input{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 8px;
    }
    .sj_sel{
        width:400px!important;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    textarea{
        width:376px;
        height:144px;
        overflow-y: scroll;
        padding: 14px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        resize:none;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .time{
        margin-bottom: 0!important;
    }
    .check{
        width:16px;
        height:16px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 8px;
    }
    .name{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-right: 20px;
    }
    .btn{
        text-align: right;
        width:840px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        margin-bottom: 0!important;
        position:fixed ;
        bottom: 0;
    }
    .btn span{
        display: inline-block;
        text-align: center;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-right: 44px;
        line-height: 36px;
        cursor: pointer;
        margin-top: 10px;
    }
    .btn_fb{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px!important;
    }
    .uplaod{
        width: 150px;
        display: inline-block;
        margin-bottom: 0!important;
    }
    .upload-demo{
        margin-bottom: 0!important;
    }
</style>