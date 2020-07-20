<template>
    <div>
        <div class="top">
            <div class="titName">
                <span>日报数据管理</span>
            </div>
            <div>
                <div class="date">
                    <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="至"
                            format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <span class="man">操作人员</span>
                <input type="text" v-model="creator">
                <span class="cx" @click="getData()">查询</span>
                <span class="dr" @click="getUP()">导入</span>
            </div>
        </div>
        <div class="table">
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell">
                    <el-table-column
                            prop="updated_at"
                            label="更新时间"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="导入文件"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="creator"
                            label="处理人">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="数据更新条目数">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <a :href="tableData[scope.$index].url">下载</a>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <div class="bg" v-if="upTxt">
            <div class="upText">
                <div class="titName">
                    <span>导入数据</span>
                </div>
                <div style="overflow-y:auto ">
                    <el-upload
                            class="uploadTxt"
                            ref="upload"
                            action="222"
                            :http-request="upLoad"
                            multiple
                            :on-remove="handleRemove"
                            :before-upload="beforeAvatarUploads"
                            :auto-upload="false"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <a href="text/主题日报数据录入模板.xlsx" target="_blank" style="position: absolute;top:69px;left: 120px">下载模板</a>
                </div>
                <div class="upTxtBtn">
                    <span @click="heidUP()">取消</span>
                    <span @click="submitUpload" style="background: #3377ff;color: #fff;border: 0">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settlement",
        data(){
            return{
                value:[(new Date((new Date()).getTime() - 30*24*60*60*1000)).toLocaleDateString().split('/').join('-'),(new Date()).toLocaleDateString().split('/').join('-')],
                tableData:[],
                p:10,
                page:1,
                total:0,
                creator:'',
                upTxt:false,
                attach:{},

            }
        },
        mounted(){
            this.getData();
        },
        methods:{
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
            submitUpload() {
                this.$refs.upload.submit();
                this.heidUP();
            },
            handleRemove(file) {
                for(var i=0;i<this.fileList.length;i++){
                    if(this.fileList[i]==file){
                        this.fileList.splice(i,1);
                    }

                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getUP(){
                this.upTxt=true;
            },
            heidUP(){
                this.upTxt=false;
                this.attach={};
            },
            getData(){
                if(this.value==[]){
                    this.$message.error('请选择时间')
                }
                if(!this.creator){
                    var params=  {data_type:'1',tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page};
                }else{
                    params={data_type:'1',tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page,creator:this.creator};
                }
                this.api.themes_data_import_list({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
            // Load(file){
            //     let formData = new FormData;
            //     formData.append('file',file.file);
            //     this.api.file_upload(formData).then((res)=>{
            //         this.attach=res;
            //     })
            // },
            upLoad(file){
                let formData = new FormData;
                formData.append('file',file.file);
                formData.append('data_type','1');
                this.api.themes_data_import(formData).then((res)=>{
                    this.getData()
                })
            },
            beforeAvatarUploads(file) {
                this.file = file;
                const iszip = file.name.split('.')[(file.name.split('.')).length-1] === 'xlsx';
                if (!(iszip)) {
                    this.$message.error('只支持xlsx格式!');
                }
                return iszip;
            },
        }
    }
</script>

<style scoped>
    .top{
        width: 100%!important;
        height:120px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0,0)
    }
    .titName span{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 0 20px 24px;
    }
    .date{
        display: inline-block;
        margin:0 24px;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .date .filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    .top input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .man{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .cx,.dr{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .cx{
        color: #fff!important;
        border: none!important;
        background: #3377ff!important;
    }
    .table{
        margin-top: 203px;
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
    .upText{
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        -webkit-box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.06);
        position: relative;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .titName span{
        display: inline-block;
        margin: 20px 20px 24px 20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .uploadTxt{
        margin-left:20px ;
    }
    .upTxtBtn{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .upTxtBtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        float: right;
        margin:0  24px 24px 0;
    }
    a{
        color: #3377ff;
    }
</style>