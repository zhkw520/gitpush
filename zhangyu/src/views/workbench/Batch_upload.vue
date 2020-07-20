<template>
    <div class="bg">
        <div class="content_img">
            <div class="img_tit">
                <span>批量上传</span>
            </div>
            <div class="up_img">
                <div class="load_upload">
                    <el-upload
                            class="upload-demo"
                            action="aaaa"
                            multiple
                            :on-exceed="handleExceed"
                            :limit="100"
                            :http-request="before"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
                <div class="table_load">
                    <template>
                        <el-table
                                :data="tableDataList"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                               >
                            <el-table-column
                                    prop="name"
                                    :show-overflow-tooltip="true"
                                    width="575"
                                    label="文件名">
                            </el-table-column>

                            <el-table-column
                                    prop="size"
                                    label="附件名称">
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="状态">
                                <template slot-scope="scope">
                                    <span v-if="tableDataList[scope.$index].status=='上传中'" class="win">上传中</span>
                                    <span v-if="tableDataList[scope.$index].status=='上传成功'" class="win">上传成功</span>
                                    <span v-if="tableDataList[scope.$index].status=='上传失败'" class="loss">上传失败</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="50"
                            >
                                <template slot-scope="scope">
                                    <a  @click="remove(scope.$index)">删除</a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
            <div class="bottom_btn">
                <div>
                    <span class="qd" @click="addImg()">确定</span>
                    <span @click="qx">取消</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['id','ind','is_special'],
        name: "batch_upload",
        data(){
            return{
                tableDataList:[],
                middleware:[],
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'color:rgba(30,30,30,1);font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },

            cell({row, column, rowIndex, columnIndex}){
                return 'color:#000;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            remove(index){
                if(this.tableDataList[index].status=='上传中'){
                    this.$message.error('请上传完成后再删除。');
                    return
                }
                if(this.tableDataList[index].status=='上传失败'){
                    this.tableDataList.splice(index,1);
                    return
                }
                if(this.tableDataList[index].status=='上传成功'){
                    for(var i=0;i<this.middleware.length;i++){
                        if(this.middleware[i].name==this.tableDataList[index].name){
                            this.middleware.splice(i,1);
                        }
                    }
                    this.tableDataList.splice(index,1);
                }

            },
            before(file){
                var obj={};
                var arr={};
                obj.status='上传中';
                obj.name = file.file.name;
                this.tableDataList.push(obj);
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    if(!res){
                        obj.status='上传失败';
                        console.log(obj)
                    }else {
                        obj.status='上传成功';
                        arr.name=res.name;
                        arr.size=res.size;
                        arr.ext=res.ext;
                        arr.md5=res.md5;
                        arr.url=res.url;
                        this.middleware.push(arr);
                    }
                })
            },

            qx(){
               this.$parent.heidBU();
               this.$parent. AddMaterial()
            },
            addImg(){
                let formData = new FormData;
                formData.append('id',this.id);
                formData.append('line_num',this.ind);
                formData.append('is_special',this.is_special);
                formData.append('middleware',JSON.stringify(this.middleware));
                this.api.demand_business_bind_middleware(formData).then((res)=>{
                    this.$parent.heidBU();
                    this.$parent. AddMaterial()
                })
            },
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 999;
        bottom: 0;
        right: 0;
    }
    .content_img{
        position: absolute;
        width: 1106px;
        min-height: 380px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .img_tit{
        width:100%;
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .img_tit span{
        display: inline-block;
        margin-left: 24px;
        line-height: 55px;
        font-size:18px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .up_img{
        margin: 0px 24px;
    }
    .upload-demo{
        margin: 30px 0;
    }
    .win{
        color: #55a532;
    }
    .loss{
        color: red;
    }
    .up_img a{
        color:rgba(51,119,255,1);
        cursor: pointer;
    }
    .bottom_btn{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 80px;
        background:rgba(247,249,252,1);
    }
    .bottom_btn  div{
        display: inline-block;
        float: right;
        margin-right: 24px;
    }
    .bottom_btn  div span{
        cursor: pointer;
        display: inline-block;
        text-align: center;
        line-height: 36px;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-top: 20px;
    }
    .qd{
        border: 0!important;
        background:rgba(51,119,255,1)!important;
        color:rgba(211,219,235,1)!important;
        margin-right: 24px;
    }
</style>