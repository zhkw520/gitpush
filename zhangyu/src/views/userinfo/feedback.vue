<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/意见反馈</span>
            <div class="title_left">
                <span>意见反馈</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="title">
                <div class="title_ss">
                    <div>
                        <img src="../../../public/img/ss.png"/>
                    </div>
                    <input type="text" placeholder="搜索关键词" v-model="search" @input="getList()"/>
                    <span>搜索</span>
                </div>
                <div class="title_tj" @click="submit">
                    <span><img src="../../../public/img/add_msg.png" style="width: 12px;margin-right: 14px">提交反馈</span>
                </div>
            </div>
            <div>
                <el-table
                        :data="listData"
                        style="width: 100%"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        border
                >
                    <el-table-column
                            prop="user.email"
                            label="用户账号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user.user_name"
                            label="用户名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="fd_type"
                            label="问题类型"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="fd_desc"
                            label="问题描述"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="提交时间"
                            sortable
                    >
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="particulars(scope.row.fd_id)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="submitter">
                <div class="tijiao">
                    <div class="content">
                        <div class="title_name">
                            <span>意见反馈</span>
                        </div>
                        <div class="selece_type">
                            <span class="txt">问题类型</span>
                            <select v-model="type">
                                <option :value="item.fd_type" v-for="(item,index) in types">{{item.fd_type}}</option>
                            </select>
                        </div>
                        <div class="input_type">
                            <span class="txt txt_top">问题描述</span>
                            <el-input
                                    type="textarea"
                                    :rows="9"
                                    placeholder="请输入内容,最多输入300个字"
                                    maxlength="300"
                                    v-model="desc">
                            </el-input>
                        </div>
                        <div class="text_name">
                            <span class="txt">上传截图</span>
                            <span class="txt_1">最多可上传3张，单张大小不超过2M</span>
                        </div>
                        <div class="box_uploading">
                            <el-upload class="up"
                                       action="http://ts-designer.idatachain.cn/Api/Upload/uploadFile"
                                       :http-request="uploadFile"
                                       list-type="picture-card"
                                       :on-remove="handleRemove"
                                       accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                                       :show-file-list="true"
                                       :before-upload="beforeAvatarUpload"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                        <div class="btn_tj">
                            <span class="tj" @click="ADDTj">提交</span>
                            <span class="qx" @click="qx">取消</span>
                        </div>
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
    </div>

</template>

<script>
    export default {
        name: "feedback",
        data(){
            return {
                submitter:false,
                types:[],
                dialogImageUrl: '',
                dialogVisible: false,
                type:'缺陷',
                desc:'',
                imgurl:'',
                pics:[],
                currentPage:1,
                pageSize:30,
                total:0,
                search:'',
                listData:[
                    {

                    }
                ],
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;text-align:center;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            getList(){
                let params ={p:this.pageSize,page:this.currentPage,search:this.search}
                this.api.feedback_list({params}).then((res)=>{
                    this.listData = res.data;
                    this.total = res.total;
                })
            },
            particulars(id){
                this.$router.push({
                    path:'/userinfo/details',
                    query: {
                        fd_id:id
                    },
                })
            },
            uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    console.log(res)
                    this.imgurl = res.url;
                    this.pics.push(res.url) ;
                })
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG&&!isPNG) {
                    this.$message.error('上传预览图片只能是 JPG 或PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传预览图片大小不能超过 2MB!');
                }
                return isPNG || isJPG && isLt2M ;
            },


            handleRemove(file, fileList)
            {
                this.pics.pop(this.imgurl);
                console.log(this.imageUrl)
            },

            submit(){
                this.submitter = true;
                this.getTypes()
            },
            qx(){
                this.submitter = false;
                this.type=''
                this.desc=''
                this.pics.length=0
            },
            getTypes(){
                this.api.feedback_type({}).then((res)=>{
                    this.types = res
                })
            },
            ADDTj(){
                this.api.feedback_add({type:this.type,desc:this.desc,pics:this.pics}).then((res)=>{
                        this.submitter = false;
                })
            },
            handleSizeChange1(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
               this.getList()

            },
            handleCurrentChange1(currentPage) {//页码切换
                console.log(currentPage);
                this.getList()

            },
        }
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 999999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .centNavBox{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:194px;
    }
.title{
    margin-bottom: 32px;
}
.title_ss{
    display: inline-block;
}
.title_ss>input{
    width:374px;
    height:36px;
    padding-left: 30px;
    background:rgba(255,255,255,1);
    border-radius:4px 0px 0px 4px;
    border:1px solid rgba(211,219,235,1);
}
.title_ss>div{
    width: 28px;
    height: 28px;
    display: inline-block;
    position: relative;
    left: 34px;
    top:10px;
}
.title_ss span{
    display: inline-block;
    width:68px;
    height: 38px;
    background:rgba(51,119,255,1);
    border-radius:0px 4px 4px 0px;
    border: 1px solid rgba(51,119,255,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 36px;
    text-align: center;
    cursor: pointer;
}
.title_tj{
    float: right;
    text-align: center;
}
.title_tj>span{
    display: block;
    width:112px;
    height:36px;
    background:rgba(242,246,252,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    line-height: 36px;
    text-align: center;
    cursor: pointer;
}
.tijiao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9999999;
    top: 65px;
    bottom: 0;
    right: 0;
}
.content{
    width:588px;
    height: 535px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    position: absolute;
    top: 30%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    overflow-y: auto;
}
.title_name,.selece_type,.input_type,.text_name,.box_uploading{
    margin:0 24px 24px 24px !important; ;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 33%!important;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.title_name{
    text-align: left;
    height: 56px;
    border-bottom: 1px solid #e0e0e0;
}
.title_name>span{
    display: inline-block;
    line-height: 56px;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
}
.selece_type,.input_type,.text_name,.box_uploading{
    margin-left: 30px;
    margin-bottom: 30px;
}
.box_uploading{
    width:100% ;
    overflow: hidden;
}

.txt{
    display: inline-block;
    margin-right:24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1)
}
.txt_top{
    vertical-align:top;
}
.selece_type>select{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
}
.txt_1{
    color: #ddd;
}
.btn_tj{
    text-align: left;
    margin-bottom: 50px;
}
.tj,.qx{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    border:1px solid rgba(211,219,235,1);
    line-height: 36px;
    text-align: center;
    cursor: pointer;
}
.tj{
    margin-left: 106px;
    color:rgba(255,255,255,1)!important;
    background:rgba(51,119,255,1)!important;
    margin-right: 14px;
    border: 0!important;
}

.up{
    width:340px;
    height: 110px;
    overflow: hidden;
    padding-left: 81px;
}


</style>