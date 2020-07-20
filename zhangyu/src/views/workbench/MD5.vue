<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">运营工具 &nbsp;/&nbsp; 锁屏壁纸MD5库</span>
                <div class="title_left">
                    <span>锁屏壁纸MD5库</span>
                </div>
            </div>
        </div>
        <div class="top">
            <span @click="uploadData">上传</span>
        </div>
        <div class="centNavBox">
            <template>
                <el-table
                        :data="tableData"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="fid"
                            width="100"
                            label="序号"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="tags_name"
                            label="标签"
                            :show-overflow-tooltip="true"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            :show-overflow-tooltip="true"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="md5"
                            label="MD5值"
                            :show-overflow-tooltip="true"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="上传时间">
                    </el-table-column>
                    <el-table-column
                            prop="creator"
                            :show-overflow-tooltip="true"
                            label="操作账号">
                    </el-table-column>
                    <el-table-column
                            prop="ee"
                            width="150"
                            label="附件下载">
                        <template slot-scope="scope">
                            <a class="iconfont" :href="downloadLink(scope.$index)" style="margin-left: 15%">&#xe697;</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            width="150"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
                            <el-button type="text" size="small" @click="Tags(tableData[scope.$index].wpid)">标签</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="page"
                        :page-size="p"
                        layout="prev, pager, next,total, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="tcvBox" v-if="show" >
            <div class="box"  >
                <div class="box_1">
                    <span>上传壁纸</span>
                </div>
                <div class="box_2">
                    <span class="text">附件</span>
                    <el-upload
                            class="upload-demo"
                            :limit="1"
                            :on-success="handleAvatarSuccess"
                            action="111"
                            :http-request="upload"
                            :on-exceed="handleExceed"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                    >
                        <el-button size="small" type="primary">上传物料包</el-button>
                    </el-upload>
                </div>
                <div class="MD">
                    <span class="MD_name">MD5</span>
                    <span class="box_3">{{MD5}}</span>
                </div>
                <div class="btn_1">
                    <span class="btn_y" @click="uploading">确定</span>
                    <span class="btn_n" @click="qx()">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="tag" >
            <div class="content">
                <div style="font-size: 18px;font-weight: bold;margin-bottom: 15px">添加标签</div>
                <div class="tags_name" style="width: 100%;border: 1px solid #e2e2e2;border-radius: 5px;height: 200px;text-align: left;overflow-y: auto;padding: 5px;overflow-y: auto">
                    <template>
                        <el-checkbox-group
                                v-model="checkedCities1">
                            <el-checkbox v-for="(item,index) in tagslist" :label="item" >{{item.desc}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
                <div class="btn">
                    <span class="add" @click="addTags()">添加</span>
                    <span @click="Heidtags()">取消</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import '../../assets/icon/iconfont.css';
    export default {
        name: "m-d5",
        data(){
            return {
                file:{},
                tableData:[],
                show:false,
                MD5:'',
                name:'',
                size:'',
                url:'',
                ext:'',
                wpid:'',
                total:0,
                page:1,
                p:10,
                tags:[],
                is_check:false,
                check_md5:'',
                checksum_md5:'',
                tag:false,
                tagslist:[],
                checkedCities1: [],
                tag_id:[],
            }
        },
        mounted(){
            this.msgData()
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(30,30,30,1);font-size:14px;font-weight:bold;font-family:PingFang-SC-Regular;padding-left:24px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'padding-left:24px;color:#000;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            uploadData(){
                this.show = true;
                this.MD5 = '';
            },
            Tags(id){
                this.tag=true;
                this.wpid=id;
                let params = {wpid:this.wpid};
                this.api.lockwallpaper_lwp_tags({params}).then((res)=>{
                    this.tag_id=res[0].tags;
                    for(let i=0;i<this.tag_id.length;i++){
                        for(let j=0;j<this.tagslist.length;j++){
                            if(this.tagslist[j].usertag==this.tag_id[i]){
                                this.checkedCities1.push(this.tagslist[j]);
                            }
                        }
                    }
                })
            },
            Heidtags(){
                this.tag=false;
                this.checkedCities1=[];
                this.tags=[];
            },
            qx(){
                this.show = false;
            },
            upload(){
                let formData =new FormData;
                formData.append('file',this.file);
                this.api.file_zip_upload(formData).then((res)=>{
                    console.log(res);
                    this.MD5 = res.md5;
                    this.check_md5= res.check_md5;
                    this.checksum_md5 = res.checksum_md5;
                    this.url = res.url;
                    this.name = res.name;
                    this.ext = res.ext;
                    this.size = res.size;
                    this.wpid = res.wpid;
                    if(res.is_check==false){
                        this.is_check = 0;
                    }
                    if(res.is_check==true){
                        this.is_check = 1;
                    }
                    this.check_md5 = res.check_md5;
                    this.checksum_md5 = res.checksum_md5;

                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeAvatarUpload(file) {
                this.file = file;
                console.log(this.file)
                const isXzip = file.type === 'application/x-zip-compressed';
                const iszip = file.type === 'application/zip';
                if (!(isXzip||iszip)) {
                    this.$message.error('只支持ZIP格式!');
                }
                return isXzip||iszip;
            },
            handleRemove(file, fileList) {
                this.file = '';
            },
            handleAvatarSuccess(response, file, fileList) {
                console.log(response)
                this.MD5 = response.md5;
                this.url = response.url;
                this.name = response.name;
                this.ext = response.ext;
                this.size = response.size;
                if(response.is_check==false){
                    this.is_check = 0;
                }
                if(response.is_check==true){
                    this.is_check = 1;
                }
                this.check_md5 = response.check_md5;
                this.wpid=response.wpid
                this.checksum_md5 = response.checksum_md5;
            },
            uploading(){
                if(!this.file){
                    this.$message.error('请上传文件，文件不能为空！');
                    return
                }
                let params = {name:this.name,size:this.size,ext:this.ext,url:this.url,md5:this.MD5,is_check:this.is_check,check_md5:this.check_md5,checksum_md5:this.checksum_md5,wpid:this.wpid};
                this.api.lockwallpaper_add({params}).then((res)=>{
                    this.show = false;
                    this.msgData();
                },error => {
                    console.log(error)
                }).catch(()=>{

                })

            },
            msgData(){
                let params = {p:this.p,page:this.page};
                this.api.lockwallpaper_list({params}).then((res)=>{
                    this.tableData = res.data;
                    console.log(this.tableData[0].wpid)
                    console.log(this.tableData)
                    this.total =res.total;
                    res.last_page=this.p  ;
                    res.per_page=this.page;
                    this.getTags();
                })
            },
            downloadLink(a){
                return this.tableData[a].url;
            },
            del(b){
                let params = {id:this.tableData[b].fid};
                this.api.lockwallpaper_del({params}).then((res)=>{
                    this.msgData();
                })
            },
            handleSizeChange1() { // 每页条数切换
                this.p = p;
                this. msgData()
            },
            handleCurrentChange1(page) {//页码切换
                console.log(page);
                this.page = page;
                this. msgData()
            },
            getTags(){
                this.api.lockwallpaper_tags_list().then((res)=>{
                    this.tagslist=res;
                })
            },
            addTags(){
                for(let i=0;i<this.checkedCities1.length;i++){
                    var tag = {
                        tags_id:'',
                        tags_name:''
                    }
                    tag.tags_id = this.checkedCities1[i].usertag;
                    tag.tags_name = this.checkedCities1[i].desc;
                    this.tags.push(tag);
                }
                let formData = new FormData;
                formData.append('wpid',this.wpid);
                formData.append('tags',JSON.stringify(this.tags));
                this.api.lockwallpaper_tags_add(formData).then((res)=>{
                    this.msgData();
                    this.Heidtags();
                })
            },
        },
    }
</script>

<style scoped>
    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
        text-align: center;
    }
    .content{
        background: #fff;
        width: 600px;
        height: 300px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        transform: translate(-50%,-50%);
    }
    .centNavBox{
        position: relative;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        margin-bottom: 0 !important;
        height: 60px;
        font-size:14px;
        line-height:60px ;
        color:rgba(0,0,0,1) !important;
    }
    .top{
        text-align: right;
        margin-top: 200px;
        margin-bottom: 20px;
    }
    .top>span{
        display: inline-block;
        width: 110px;
        height: 36px;
        line-height: 36px;
        background: #3377ff;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        cursor: pointer;
    }
    .tcvBox{
        position: fixed;
        top: 65px;
        bottom: 0;
        right: 0;
        z-index: 999;
        background: rgba(0,0,0,.3);
        width: 100%;
        height: 100%;
    }
    .box{
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 30px 113px 0;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        background: rgba(255,255,255,1);
        -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        overflow-y: auto;
        max-height: 80%;
    }
    .box_1{
        margin-bottom: 30px;
        text-align: center;
    }
    .box_1>span{
        display: inline-block;
        font-weight: bold;
        font-size: 20px;
    }
    .text{
        vertical-align: top;
        display: inline-block;
        line-height: 30px;
    }
    .btn_1{
        margin: 50px 0;

    }
    .btn_y,.btn_n{
        display: inline-block;
        text-align: center;
        width: 80px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 8px;
    }
    .btn_y{
        background: #3377ff;
        color: #fff;
    }
    .btn_n{
        border: 1px solid #ddd;
        margin-left: 15px;
    }
    .upload-demo{
        display: inline-block;
        margin-left: 20px;
    }
    .box_2>span{
        display: inline-block;
        width:50px;
        text-align: left;
    }
    .box_3{
        display: inline-block;
        width: 310px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ddd;
        margin-left: 20px;
        padding-left: 5px;
    }
    .MD{
        margin-top: 30px;
        text-align: center;
    }
    .MD_name{
        display: inline-block;
        width: 50px;
        text-align:left;
        height: 30px;
        line-height: 30px;
        vertical-align: top;
    }
    .block{
        margin-top: 50px;
        text-align: right;
    }
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
    .add{
        border: 0px!important;
        background:#2ad5cd!important; ;
        color: #fff!important;
        margin-right:50px;
    }
</style>