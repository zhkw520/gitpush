<template>
    <div>
        <div class="titl" v-if="sdk_type == 'adsdk'">
            <div style="margin:24px 0 20px 24px">
                <span style="color: #b3b3b3;cursor: pointer " @click="fh()">线上审核资源替换</span>
                <span style="color: #b3b3b3;cursor: pointer " @click="goIndex()">&nbsp;/&nbsp;ADSDK渠道详情</span>
                <span style="color: #b3b3b3;cursor: pointer" @click="goHome()">&nbsp;/&nbsp;广告内容列表</span>
                <span style="color: #1890ff;">&nbsp;/&nbsp;广告详情</span>
            </div>
            <div>
                <span class="titl_name">广告详情</span>
            </div>
        </div>
        <div class="titl" v-if="sdk_type == 'fmsdk'">
            <div style="margin:24px 0 20px 24px">
                <span style="color: #b3b3b3;cursor: pointer " @click="fh()">线上审核资源替换</span>
                <span style="color: #b3b3b3;cursor: pointer " @click="goIndex()">&nbsp;/&nbsp;FMSDK渠道详情</span>
                <span style="color: #b3b3b3;cursor: pointer" @click="goHome()">&nbsp;/&nbsp;广告内容列表</span>
                <span style="color: #1890ff;">&nbsp;/&nbsp;广告详情</span>
            </div>
            <div>
                <span class="titl_name">广告详情</span>
            </div>
        </div>
        <div class="content_right">
            <div class="content_right_top">
                <div class="content_right_tit">
                    <span>广告内容</span>
                </div>
                <div>
                    <!-- <span v-if="this.$route.query.source=='SDK-API'">图片MD5:</span>
                    <span class="con" v-if="this.$route.query.source=='SDK-API'">{{this.$route.query.url_md5}}</span> -->
                    <span v-if="this.$route.query.source=='own'">落地页MD5:</span>
                    <span class="con" v-if="this.$route.query.source=='own'">{{this.preview_md5}}</span>
                    <span>获取内容时间:</span>
                    <span >{{time}}</span>
                    <div class="updataLoad">
                        <span @click="getTH">添加替换</span>
                    </div>
                </div>
                <div>
                    <span>广告名称:</span>
                    <span class="con">{{tableData.title}}</span>
                    <span >包名:</span>
                    <span >{{pkg}}</span>
                </div>
                <div>
                    <span>数据访问量:</span>
                    <span class="con">{{pv}}</span>
                    <span >实现方式:</span>
                    <span>{{model}}</span>
                </div>
                <div>
                    <span>sdkID:</span>
                    <span class="con">{{sdk_id}}</span>
                    <span >来源:</span>
                    <span >{{src}}</span>
                </div>
                <div>
                    <span>三方广告ID:</span>
                    <span class="con">{{id_adsrc}}</span>
                    <span>渠道</span>
                    <span class="con">{{tableData.media_channel}}</span>
                    
                </div>
                <div>
                    <span >落地页:</span>
                    <a :href="preview_url" style="display:inline-block;max-width:1300px;overflow: auto " target="_blank">{{preview_url}}</a>
                </div>
                
                <div v-if="sdk_type == 'adsdk'">
                    <span>原始图:</span>
                    <template>
                    <el-table
                            :data="tableData.original_res"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :on-exceed="handleExceed"
                            border>
                        <el-table-column
                                label="预览图"
                        >
                            <template slot-scope="scope">
                                <img :src="tableData.original_res[scope.$index].url" style="width: 80px" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="url"
                        >
                        </el-table-column>
                        <el-table-column
                                
                                label="尺寸"
                        >
                                <template slot-scope="scope">
                                    <div>
                                        <span>宽:{{cuWidth}}</span><br/>
                                        <span>高:{{cuHeight}}</span>
                                    </div>
                                </template>
                        
                        </el-table-column>
                        <!-- <el-table-column
                                prop="width"
                                label="场景类型">
                        </el-table-column> -->
                        <el-table-column
                                prop="created_at"
                                label="资源状态">
                                 <template slot-scope="scope">
                                     <span>{{newIMG&&newIMG.indexOf(tableData.original_res[scope.$index].url)==-1?'未送审':'已送审'}}</span>
                                </template>
                        </el-table-column>
                        <!-- <el-table-column
                                prop="creator"
                                label="审核状态">
                        </el-table-column> -->
                        <el-table-column
                                prop="pv"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" @click='verifier(scope.$index)' v-if="newIMG.indexOf(tableData.original_res[scope.$index].url)==-1">更新为可送审</el-button>
                                <span v-else style='color:#ddd;font-size:14px;'>更新为可送审</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>

            <div v-if="sdk_type == 'fmsdk'">
                    <span>原始图:</span>
                    <template>
                    <el-table
                            :data="tableData.original_res"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :on-exceed="handleExceed"
                            border>
                        <el-table-column
                                label="预览图"
                        >
                            <template slot-scope="scope">
                                <img :src="tableData.original_res[scope.$index].url" style="width: 80px" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                
                                label="尺寸"
                        >
                                <template slot-scope="scope">
                                    <div>
                                        <span>宽:{{cuWidth}}</span><br/>
                                        <span>高:{{cuHeight}}</span>
                                    </div>
                                </template>
                        
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="url"
                        >
                        </el-table-column>
                        
                        <!-- <el-table-column
                                prop="width"
                                label="场景类型">
                        </el-table-column> -->
                        <!-- <el-table-column
                                prop="created_at"
                                label="资源状态">
                                 <template slot-scope="scope">
                                     <span>{{newIMG&&newIMG.indexOf(tableData.original_res[scope.$index].url)==-1?'未送审':'已送审'}}</span>
                                </template>
                        </el-table-column> -->
                        <!-- <el-table-column
                                prop="creator"
                                label="审核状态">
                        </el-table-column> -->
                        <!-- <el-table-column
                                prop="pv"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" @click='verifier(scope.$index)' v-if="newIMG.indexOf(tableData.original_res[scope.$index].url)==-1">更新为可送审</el-button>
                                <span v-else style='color:#ddd;font-size:14px;'>更新为可送审</span>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </template>
            </div>
                
            
        </div>
            
            <div>
                <div>
                    <span style="font-size:14px;margin-bottom:15px">替换列表</span>
                </div>
                <template>
                    <el-table
                            :data="tableData2"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :on-exceed="handleExceed"
                            border>
                        <el-table-column
                                label="预览图"
                        >
                            <template slot-scope="scope">
                                <img :src="tableData2[scope.$index].url" style="width: 80px"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="url"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="width"
                                label="尺寸">
                        </el-table-column>
                         <el-table-column
                                prop="space_type"
                                label="场景类型">
                                 <template slot-scope="scope">
                                <span >{{tableData2[scope.$index].space_type_name}}</span>
                            </template>
                        </el-table-column>
                         <el-table-column
                                v-if="sdk_type == 'adsdk'"
                                prop="status"
                                label="审核状态">
                                <template slot-scope="scope">
                                <span >{{tableData2[scope.$index].status==0?"待审核":tableData2[scope.$index].status==1?'送审中':tableData2[scope.$index].status==2?'审核通过':"审核不通过"}}</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                v-if="sdk_type == 'adsdk'"
                                prop="status"
                                label="原因说明">
                                <template slot-scope="scope">
                                <span >{{tableData2[scope.$index].note==''?"--":tableData2[scope.$index].note}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="created_at"
                                label="上传时间">
                        </el-table-column>
                        <el-table-column
                                prop="creator"
                                label="操作人员">
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                label="操作">
                            <template slot-scope="scope">
                                <a class="iconfont" :href="downloadLink(scope.$index)" style="margin-right: 10px;text-decoration: none;color:#3377ff;font-size:14px">下载</a>
                                <el-button @click="getRemove(tableData2[scope.$index].url_md5,tableData2[scope.$index].space_type)" type="text" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="bg" v-if="th">
                <div class="load_up">
                    <div class="load_tit">
                        <span>添加替换</span>
                    </div>
                    <div class="text_tit">
                        <span >场景类型</span>
                        <select style="width:200px;height:36px" v-model="space_type">
                            <option :value="item.space_type" v-for="(item,index) in typeList">{{item.space_type_name}}</option>
                        </select>
                    </div>
                    <div class='qdTh'> 
                        <span class='fj'>附件</span>
                        <el-upload
                        class="upload-demo"
                        action="aaaa"
                        multiple
                        :limit="10"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :http-request="upload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <div v-for="(item,index) in fileName" style="text-align: left;margin-left:95px">
                            <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                <div slot="content" class="text">{{item}}</div>
                                <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{item}}</span>
                            </el-tooltip>
                            <span class='eliminate' @click='eraser(index)'>x</span>
                        </div>
                    </div>
                
                    <div class="btns">
                        <span class="tj" @click="add()">添加</span>
                        <span @click="heidTH()">取消</span>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="ss">
                <div class="load_up">
                    <div class="load_tit">
                        <span>原图送审</span>
                    </div>
                    <div class="text_tit">
                        <span >场景类型</span>
                        <select style="width:200px;height:36px" v-model="space_type">
                            <option :value="item.space_type" v-for="(item,index) in typeList">{{item.space_type_name}}</option>
                        </select>
                    </div>
                    <div class="btns">
                        <span class="tj" @click="check()">添加</span>
                        <span @click="heidSS()">取消</span>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="remove">
                <div class="del">
                    <div class="tit">
                        <span>删除</span>
                    </div>
                    <div class="move">
                        <span>是否确认删除？</span>
                    </div>
                    <div class="btn">
                        <span class="sc" @click="delelt()">删除</span>
                        <span @click="heidRemove()">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "has_replaced",
        data(){
            return{
                sdk_type:this.$route.query.sdk_type,
                tableData2:[],
                times:[],
                remove:false,
                start_date:'',
                end_date:'',
                mid:'',
                md5:'',
                p:10,
                page:1,
                total:0,
                time:'',
                preview_url:'',
                imgs:[],
                new_url_md5:'',
                new_url:'',
                tableData:{},
                width:'',
                height:'',
                th:false,
                pv:"",
                sdk_id:'',
                src:'',
                model:'',
                pkg:'',
                text:'',
                type:'',
                search:'',
                new_res:[],
                url_md5:'',
                preview_md5:'',
                typeList:[],
                fileName:[],
                newIMG:[],
                ss:false,
                space_type:"",
                index:'',
                newType:"",
                id_adsrc:"",
                cuWidth: "",
                cuHeight:"",
            }
        },

        mounted(){
            this.getDataList();
        },
        methods:{
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                
                if (!isJPG) {
                    this.$message.error('仅支持.jpg格式， 请调整后重新上传!');
                }
                
                return isJPG;
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                for(var i=0;i<this.new_res.length;i++){
                    if(this.new_res[i].name!='file.name'){
                        this.new_res.splice(i,1);
                    }
                }
            },
            getTH(){
                this.th=true;
                this.getTypes();
            },
            heidTH(){
                this.th=false;
                this.new_res=[];
                this.space_type=''
            },
            verifier(index){
                this.ss=true;
                this.index=index;
                this.getTypes();
            },
            heidSS(){
                this.ss=false;
                this.space_type=''
            },
            fh(){
                  this.$router.push({
                    path:"./channel_resource"
                })
            },
            goIndex(){
                     this.$router.push({
                     path:"./Channels_for_details",
                     query:{
                         channel:this.$route.query.media_channel,
                        tdate:this.$route.query.tdate,
                        sdk_type:this.sdk_type,
                     }
                        
                })
            },
            goHome(){
                this.$router.push({
                    path:"./Advertising_source_details",
                    query:{
                        channel:this.$route.query.media_channel,
                        time:this.$route.query.tdate,
                        num:this.$route.query.times,
                        is_preview:this.$route.query.is_preview,
                        source:this.$route.query.source,
                        sdkid:this.$route.query.sdkid,
                        sdk_type:this.sdk_type
                    }
                })
            },
            getTypes(){
                let params={media_channel:this.tableData.media_channel}
                this.api.replace_channel_space_type({params}).then((res)=>{
                    this.typeList=res;
                })
            },
            eraser(index){
                for(var i=0;i<this.new_res.length;i++){
                    if(this.new_res[i].name==this.fileName[index]){
                        this.new_res.splice(i,1);
                    }
                }
                this.fileName.splice(index,1);
            },
            add(){
                if(!this.new_url){
                    this.$message.error('请上传文件或等待文件上传成功！')
					return;
                }
                if(this.new_res.length==0){
                    this.$message.error('请上传文件')
					return;
                }
                if(!this.space_type){
                    this.$message.error('场景类型不能为空')
					return;
                }
                let formData = new FormData;
                formData.append('id_adsrc',this.tableData.id_adsrc);
                formData.append('media_channel',this.tableData.media_channel);
                formData.append('content',this.tableData.content);
                formData.append('title',this.tableData.title);
                formData.append('space_type',this.space_type);
                formData.append('new_res',JSON.stringify(this.new_res));
                formData.append('original_res',  JSON.stringify(this.tableData.original_res));
                formData.append('adid',this.$route.query.id);
                formData.append('sdk_id',this.tableData.sdk_id);
                formData.append('src',this.tableData.src);
                formData.append('tdate',this.tableData.tdate);
                formData.append('model',this.tableData.model);
                formData.append('source',this.$route.query.source);
                formData.append('is_preview',this.$route.query.is_preview);
                formData.append('pv',this.tableData.pv);
                formData.append('url_md5',this.tableData.original_res[0].url_md5);
                formData.append('preview_url',this.tableData.preview_url);
                formData.append('preview_md5',this.tableData.preview_md5);
                this.api.replace_add(formData).then((res)=>{
                    if(res!=false){
                        this.heidTH()
                        this.getDataList()
                        this.fileName = []
                    }
                   
                })
            },
            check(){
                if(!this.space_type){
                    this.$message.error('广告位类型不能为空');
                    return
                }
                let formData=new FormData;
                 formData.append('id_adsrc',this.tableData.id_adsrc);
                 formData.append('content',this.tableData.content);
                formData.append('title',this.tableData.title);
                formData.append('model',this.tableData.model);
                formData.append('pv',this.tableData.pv);
                formData.append('is_preview',this.$route.query.is_preview);
                formData.append('source',this.$route.query.source);
                formData.append('space_type',this.space_type);
                formData.append('url',this.tableData.original_res[this.index].url);
                formData.append('media_channel',this.tableData.media_channel);
                formData.append('adid',this.tableData.adid);
                formData.append('sdk_id',this.tableData.sdk_id);
                formData.append('src',this.tableData.src);
                formData.append('tdate',this.tableData.tdate);
                formData.append('preview_url',this.tableData.preview_url);
                 formData.append('preview_md5',this.tableData.preview_md5);
                this.api.replace_channel_trans_original_audit(formData).then((res)=>{
                    if(res!=false){
                        this.heidSS();
                        this.getDataList()
                    }
                })
            },
            getRemove(id,type){
                this.remove =true;
                this.md5=id;
                this.newType=type;
            },
            heidRemove(){
                this.remove =false;
            },
            upload(file){
                    this.fileName.push(file.file.name)
                    let formData =new FormData;
                    formData.append('file',file.file);
                    formData.append('oss_channel','fanmai');
                   this.api.file_upload(formData).then((res)=>{
                       var obj = {};
                       this.new_url= res.url;
                       this.new_url_md5=res.md5;
                       var image = new Image();
                       var _this=this;
                       image.onload=function(){
                           _this.width = image.width;
                           _this.height = image.height;
                           obj.width =_this.width;
                           obj.height = _this.height
                       };
                       image.src= res.url;
                       obj.new_url=this.new_url;
                       obj.name=file.file.name;
                       obj.md5=this.new_url_md5;
                       this.new_res.push(obj);
                   })
            },
            getDataList(){
                 this.newIMG=[];
                // this.type= this.$route.query.type;
                // this.text=this.$route.query.text;
                // this.start_date = this.$route.query.start_date;
                // this.end_date = this.$route.query.end_date;
                // if(!this.type||!this.text){
                //     this.search=''
                // }else{
                //     var s = '{"'+this.type + '":"'+this.text + '"}';
                //     this.search=s;
                // }
                let params;
                // if(this.$route.query.source=='SDK-API'){
                     params ={mid:this.$route.query.id,tdate:this.$route.query.tdate,times:this.$route.query.times,source:this.$route.query.source,sdk_id:this.$route.query.sdk_id,src:this.$route.query.src,url_md5:this.$route.query.url_md5,is_preview:this.$route.query.is_preview,media_channel:this.$route.query.media_channel,preview_url:this.$route.query.preview_url};
                // }else{
                //      params ={mid:this.$route.query.id,tdate:this.$route.query.tdate,times:this.$route.query.times,source:this.$route.query.source};
                // }
                this.api.replace_res_detail({params}).then((res)=>{
                    if(res.length == '1'){
                        for(var i=0;i<res.length;i++){
                            res[i].original_res.forEach(element => {
                                this.id_adsrc = (element.id_adsrc + ',').substring(0,(element.id_adsrc + ',').length-1)
                                this.cuWidth = (element.width + ',').substring(0,(element.width + ',').length-1)
                                this.cuHeight = (element.height + ',').substring(0,(element.height + ',').length-1)
                            });   
                            this.tableData=res[i];
                            this.time = res[i].tdate;
                            this.mid=res[i].mid;
                            this.preview_url = res[i].preview_url;
                            this.preview_md5 = res[i].preview_md5;
                            this.pv = res[i].pv;
                            this.model = res[i].model;
                            this.src = res[i].src;
                            this.pkg = res[i].pkg;
                            this.sdk_id = res[i].sdk_id;
                            this.imgs = res[i].original_res;
                            // this.url_md5 =res[i].original_res[0].url_md5
                            this.tableData2=res[i].new_res;
                            for(var j=0;j<this.tableData2.length;j++){
                                this.tableData2[j].width=this.tableData2[j].width+'*'+this.tableData2[j].height;
                                this.newIMG.push(this.tableData2[j].url);
                            }
                        }

                    }else{
                        this.$message.error('数据错误')
                    }
                    
                })

            },
            downloadLink(a){
                return this.tableData2[a].url;
            },
            delelt(){
                let formData =new FormData;
                formData.append('md5',this.md5);
                formData.append('mid',this.mid);
                formData.append('preview_url',this.tableData.preview_url);
                formData.append('space_type',this.newType);
                formData.append('media_channel',this.tableData.media_channel);
                formData.append('source',this.$route.query.source);
                formData.append('is_preview',this.$route.query.is_preview);
                formData.append('sdk_id',this.$route.query.sdk_id);
                formData.append('id_adsrc',this.$route.query.id_adsrc);
                formData.append('src',this.tableData.src);
                formData.append('url_md5',this.$route.query.url_md5);
                this.api.replace_del(formData).then((res)=>{
                    if(res!=false){
                    this.getDataList();
                    this.heidRemove()
                    }
                   
                })
            },
        },

    }
</script>

<style scoped>
    .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-top: 200px;
    }
    .titel_table{
        width: 100%;
        height: 36px;
        margin: 30px 0;
    }
    .titel_table>span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        font-weight: bold;
        font-size: 18px;
    }
    .title_top{
        margin-top: 60px;
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
    .content{
        background: #fff;
        width: 600px;
        height: 350px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .del{
        background: #fff;
        width: 400px;
        height: 150px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .tit{
        border-bottom: 1px solid #ddd;
    }
    .tit span{
        display:inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 18px;
        font-weight: bold;
    }
    .move{
        width: 100%;
        margin-top: 20px;
    }
    .move span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
    }
    .btn{
        margin: 20px 0;
        text-align: center;
    }
    .btn span {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        text-align: center;
    }
    .sc{
        color: #f5f6fa!important;
        background: #3377ff !important;
        border: 0!important;
        margin-right: 40px;
    }
    .upload-demo{display: inline-block!important;margin: 0!important}
    .upload{
        margin-top: 20px;
        width: 100px;
    }
    .cx{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .block_fy{
        text-align: right;
        margin-top: 30px;
    }
    .titl{
        width: 100%;
        height: 100px;
        border-top: 3px solid #ededed;
        background: #fff;
        -webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
        box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
        position: fixed;
        left: 256px;
        top: 63px;
        z-index: 99;
    }
    .titl_name{
        font-size: 20px;
        font-weight: bold;
        font-family: "Microsoft YaHei";
        margin-left: 24px;
    }
    .content_right_tit span{
        display: inline-block;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 18px;
    }
    .content_right_top{
        margin-bottom: 30px;
        border-bottom: 1px solid #DDD;
    }
    .content_right_top div{
        margin-bottom: 15px;
    }
    .content_right_top span{
        display: inline-block;
        width: 100px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        margin-right: 15px;
    }
    .con{
        display: inline-block;
        margin-right: 20px!important;
        width:400px!important;
    }
    .updataLoad{
        display: inline-block;
        float: right;
        width:100px;
    }
    .updataLoad span{
        display: inline-block;
        width: 100px;
        height: 36px;
        background:#3377ff ;
        color: #fff;
        cursor: pointer;
        line-height: 36px;
        text-align: center;
        border-radius: 5px;
    }
    .load_up{
        border-radius: 10px;
        width: 600px;
        min-height: 270px;
        position: relative;
        background: #fff;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .load_tit{border-bottom: 1px solid #ddd}
    .load_tit span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin:10px 0 10px 0;
        font-size: 18px;
        font-weight: bold;
    }
    .load_up div{
        margin:15px 24px 0 24px
    }
    .text_tit span,.fj{
        display: inline-block;
        margin-right: 15px;
        font-size: 16px;
        color: #666666;
        width: 80px;
    }
    .text_tit input{
        width: 200px;
        height: 36px;
        padding:0 8px ;
        margin-right: 15px;
    }
    .btns{
        text-align: center;
        margin-top: 30px;
    }
    .btns span{
        display: inline-block;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 30px;
        text-align: center;
        border-radius: 3px;
        margin-bottom: 30px

    }
    .tj{
        border: 0!important;
        background: #3377ff!important;
        color: #fff!important;
    }
    .eliminate{
        display: inline-block;
        width: 15px;
        height: 15px;
        background: red;
        border-radius: 50%;
        color: #fff;
        line-height: 12px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        margin-left: 15px
    }
</style>