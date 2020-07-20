<template>
    <div>
        <div class="titl">
            <div style="margin:24px 0 20px 24px">
                <span style="color: #b3b3b3;cursor: pointer " @click="fh()">资源替换管理</span>
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
                    <span>状态:</span>
                    <span >{{this.tableData.status==0?"待替换":'已替换'}}</span>
                     <span>更新时间:</span>
                      <div style="display:inline-block">
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content" class="text">{{this.tableData.updated_at}}</div>
                                    <span  class="text" style="overflow: hidden;width: 100px;height: 24px;margin-left: 24px">{{this.tableData.updated_at}}</span>
                                </el-tooltip>     
                    </div>
                     <span>操作人员:</span>
                    <span >{{this.tableData.creator}}</span>
                    <div class="updataLoad">
                        <span @click="getTH">上传</span>
                    </div>
                </div>
                <div>
                    <span>原因：</span>
                    <div style="display:inline-block;">
                        {{this.tableData.note}}
                    </div>
                </div>
                 <div>
                    <span >落地页:</span>
                    <a :href="this.tableData.preview_url" style="display:inline-block;max-width:1300px;overflow: auto " target="_blank">{{this.tableData.preview_url}}</a>
                </div>
                <div>
                    <span style="vertical-align: top">原始图:</span>
                    <div style="display: inline-block">
                        <div ><a :href="this.tableData.image_url" style="display:inline-block;max-width:1300px;overflow: auto" target="_blank">{{this.tableData.image_url}}</a></div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <span style="font-size:14px;margin-bottom:15px">替换列表</span>
                </div>
                <template>
                    <el-table
                            :data="listData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :on-exceed="handleExceed"
                            border>
                        <el-table-column
                                label="预览图"
                        >
                            <template slot-scope="scope">
                                <img :src="listData[scope.$index].url" style="width: 80px"/>
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
                                 <template slot-scope="scope">
                                        <span>{{listData[scope.$index].width+'*'+listData[scope.$index].height}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="审核状态">
                                 <template slot-scope="scope">
                                        <span>{{listData[scope.$index].status==0?'待审核':listData[scope.$index].status==1?"审核通过":'审核不通过'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="note"
                                label="原因">
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
                                <a class="iconfont" :href="listData[scope.$index].url" style="margin-right: 10px;color:#3377ff;font-size:14px">下载</a>
                                <el-button @click="getRemove(listData[scope.$index].md5)" type="text" >删除</el-button>
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
                    <div class='upyc'>
                        <el-upload
                        class="upload-demo"
                        action="aaaa"
                        multiple
                        :limit="10"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        :http-request="upload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    <div class="text_tit">
                        <span>新资源URL</span>
                        <div style="display: inline-block;width: 235px">
                            <input type="text" v-model="item.new_url" disabled v-for="item in new_res"/>
                        </div>
                    </div>

                    <div class="btns">
                        <span class="tj" @click="add()">添加</span>
                        <span @click="heidTH()">取消</span>
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
                listData:[],
                tableData:{},
                th:false,
                remove:false,
                new_res:[],
                new_url:"",
                new_url_md5:"",
                mid:'',
            }
        },

        mounted(){
            this.getData();
        },
        methods:{
            fh(){
                this.$router.push({
                    path:'./Offline_resources'
                })
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
              
            },
            getTH(){
                this.th=true
            },
            heidTH(){
                this.th=false;
            },
            getRemove(md5){
                this.remove =true;
                this.md5=md5;
            },
            delelt(){
                let formData =new FormData;
                formData.append('md5',this.md5);
                formData.append('mid',this.$route.query.mid);
                this.api.replace_import_image_del(formData).then((res)=>{
                   this.getData();
                   this.heidRemove();
                })
            },
            heidRemove(){
                this.remove =false;
            },
            upload(file){
                    let formData =new FormData;
                    formData.append('file',file.file);
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
                       
                       obj.md5=this.new_url_md5;
                       this.new_res.push(obj);
                   })
            },
             add(){
                if(!this.new_url){
                    this.$message.error('请上传文件或等待文件上传成功！')
                }
                let formData = new FormData;
                formData.append('mid',this.$route.query.mid)
                formData.append('new_res',JSON.stringify(this.new_res));
                this.api.replace_import_image_add(formData).then((res)=>{
                    this.th=false;
                    this.new_res = [];
                    this.getData()
                })
            },
            getData(){
                let params={mid:this.$route.query.mid}
                this.api.replace_import_detail({params}).then((res)=>{
                    this.tableData=res;
                    this.listData=res.new_res; 
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
        background: rgba(51,119,255,1)!important;
        border: 0!important;
        margin-right: 40px;
    }
    .upload-demo{margin-left: 95px!important;}
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
        background: rgba(51,119,255,1)!important ;
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
        background:rgba(51,119,255,1)!important ;
        color: #fff;
        cursor: pointer;
        line-height: 36px;
        text-align: center;
        border-radius: 5px;
    }
    .load_up{
        border-radius: 10px;
        width: 500px;
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
    .text_tit span{
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

    }
    .tj{
        border: 0!important;
        background: rgba(51,119,255,1)!important;
        color: #fff!important;
    }
    a{
        color: #3377ff!important
    }
</style>