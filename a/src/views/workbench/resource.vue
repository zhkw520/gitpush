<template>
    <div>
        <div class="tit_top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh">广告源列表 &nbsp;/&nbsp;</span>
                <span class="new_url">广告源详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告源详情</span>
                <span class="time">{{this.$route.query.source}}</span>
                <span class="time">{{this.$route.query.time}}</span>
                <span class="num" >
                    {{this.rank.join(';')}}
                </span>
                <span class="sdk">SKD_ID:{{this.$route.query.sdkid}}</span>
                <span class="educe" @click="derived()">导出</span>
            </div>
        </div>
        <div class="content_right">
            <div class="titel_table">
                <span class="circle"></span>
                <span>共</span>
                <span class="all">{{this.tableData.length}}</span>
                <span>项&nbsp&nbsp</span>
                <span>已处理</span>
                <span >{{cl.length}}</span>
                <span>项&nbsp&nbsp</span>
                <span>剩余</span>
                <span class="red">{{dcl.length}}</span>
                <span>项&nbsp&nbsp</span>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            @selection-change="handleSelectionChange"
                            border>
                        <el-table-column
                                type="index"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                label="原始图片">
                            <template slot-scope="scope">
                                <img :src="tableData[scope.$index].original_res[0].url" style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="落地页">
                            <template slot-scope="scope">
                                <a :href="tableData[scope.$index].preview_url" target="_blank" style="text-decoration: none;color: #66b1ff" v-if="tableData[scope.$index].preview_url!=''">点击查看</a>
                                <a  v-if="tableData[scope.$index].preview_url==''">-</a>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                sortable
                                label="数据填充量">
                        </el-table-column>
                        <el-table-column
                                prop="ratio"
                                sortable
                                label="填充量占比">
                        </el-table-column>
                        <el-table-column
                                prop="tdate"
                                sortable
                                label="内容获取时间">
                        </el-table-column>
                        <el-table-column
                                prop="new_res.length"
                                sortable
                                label="替换资源数量">
                        </el-table-column>
                        <el-table-column
                                prop="sucess_ratio"
                                sortable
                                label="替换占比">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                sortable
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="level"
                                sortable
                                label="资源新鲜度">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" v-clipboard:copy="tableData[scope.$index].copy_file_name" v-clipboard:success="onCopy"   v-clipboard:error="onError">复制命名</el-button>
                                <el-button @click="getAdd(tableData[scope.$index])" type="text" size="small">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="blocks">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import download from '../../api/commonality'
    export default {
        name: "replace",
        data(){
            return{
                tableData:[],
                times:[],
                cl:[],
                dcl:[],
                num:[],
                total:0,
                page:1,
                p:10,
                search:'',
                rank:[],
            }
        },
        mounted(){
            this.getList();
            this.getTimes()
        },
        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getList()
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            onCopy() {
               this.$message.success('复制成功')
            },
            onError() {
                this.$message.error('复制失败')
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            derived(){
                var s = '{"'+'sdk_id' + '":"'+this.$route.query.sdkid + '"}';
                this.search=s;
                var url = '/replace/pending/export'+'?tdate='+this.$route.query.time+'&times='+this.$route.query.num+'&search='+this.search+'&source='+this.$route.query.source+'&is_preview='+this.$route.query.is_preview;
                download.downloadImg(url);
            },
                getTimes(){
                this.rank=[];
                let params = {tdate:this.$route.query.time};
                this.api.replace_times({params}).then((res)=>{
                    var dataList = res;
                    for(var j=0;j<dataList.length;j++){
                        for(var i=0;i<JSON.parse(this.$route.query.num).length;i++){
                            if(dataList[j].hour==JSON.parse(this.$route.query.num)[i]){
                                this.rank.push(dataList[j].desc_times);
                            }
                        }
                    }
                })
            },
           fh(){
                this.$router.go(-1)
           },

            getList(){
                this.dcl=[];
                this.cl=[];
                var s = '{"'+'sdk_id' + '":"'+this.$route.query.sdkid + '"}';
                this.search=s;
                let params ={tdate:this.$route.query.time,times:this.$route.query.num,p:this.p,page:this.page,search:this.search,source:this.$route.query.source,is_preview:this.$route.query.is_preview};
                this.api.replace_pending_list({params}).then((res)=>{
                    this.tableData = res;
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].new_res.length>0){
                            this.tableData[i].status='已处理';
                            this.cl.push(i)
                        }else{
                            this.tableData[i].status='待处理';
                            this.dcl.push(i);
                        }
                    }
                    this.total=res.total
                })
            },
            getAdd(data){
                
                let routeData = this.$router.resolve({
                    path:'./Has_replaced',
                     query:{
                        id:data.mid,
                        sdk_id:data.sdk_id,
                        src:data.src,
                        url_md5:data.original_res[0].url_md5,
                        tdate:this.$route.query.time,
                        times:this.$route.query.num,
                        sdkid:this.$route.query.sdkid,
                        source:this.$route.query.source,
                        is_preview:this.$route.query.is_preview,
                    },
                });
                window.open(routeData.href, '_blank');
            },
            handleSelectionChange(val) {
                this.num = val;
            }

        },
    }
</script>

<style scoped>
    input,select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    input{
        height: 30px!important;
        font-size: 10px;
    }
    .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }
    .titel_table{
        width: 100%;
        height: 36px;
        border: 1px solid #98d6f1;
        border-radius: 5px;
        margin: 15px 0;
        background: rgba(230, 247, 255, 1)
    }
    .titel_table>span{
        display: inline-block;
        line-height: 36px;
        font-size: 14px;
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
        width: 890px;
        height: 500px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 30%;
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
        margin-top: 20px;
        text-align: center;
    }
    .btn span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        text-align: center!important;
    }
    .th{
        color: #f5f6fa!important;
        background: #4f4cf1!important;
        border: 0!important;
        margin-right: 40px!important;
    }
    .box_content div{
        margin-top: 20px;
    }
    .box_content span{
        display: inline-block;
        width: 150px;
        text-align: right;
        font-size: 16px;
        margin-right: 15px;
        line-height: 36px;
    }
    .box_content input{
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    .upload-demo{
        display: inline-block;
        margin-top: 20px;
        width: 150px;
        margin-left: 165px;
    }
    .circle{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #98d6f1;
        border-radius: 50%;
        line-height: 36px;
        margin:9px 15px 0 15px;
    }
    .all{
        color:#4f4cf1
    }
    .red{
        color:red
    }
    .cx{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #4f4cf1 ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .blocks{
        margin-top: 30px;
        float: right;
        margin-bottom: 80px
    }
    .tit_top{
        width: 103%;
        height: 120px;
        left: -24px;
        position: relative;
        top:-50px;
        background: #fff;
    }
    .tit_top_url,.tit_top_con{
        padding:20px 0 0 24px;
    }
    .log_url,.new_url{
        display: inline-block;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
    }
    .log_url{color: #acadb0
    }
    .new_url{color: #4f4cf1}
    .tit_name{
        display: inline-block;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 18px;
    }
    .time,.num,.sdk{
        display: inline-block;
        height: 26px;
        padding: 5px 10px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #000;
        margin-left: 20px;
        line-height: 26px;
        text-align: center;
        background: #e7e7e7;
    }
    .educe{
        float: right;
        color: #3d3d3d;
        border: 1px solid #ddd;
        background: transparent;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        margin:0px 24px 0px 0px ;
    }

</style>