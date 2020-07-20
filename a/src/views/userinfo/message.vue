<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">个人中心 &nbsp;/&nbsp;</span>
                <span class="log_url">消息通知</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">消息通知</span>
            </div>
        </div>
        <div class="content_table">
            <div style="margin-bottom: 24px;padding: 0 24px;">
                <span  class="ad" style="margin: 0px 24px 0px 4px;">筛选时间</span>
                <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span  class="ad">消息类型</span>
                <select v-model="type">
                    <option value="">全部</option>
                    <option value="1">新用户申请</option>
                    <option value="2">入口提示</option>
                </select>
                 <span  class="ad">状态</span>
                <select v-model="status">
                    <option value="">全部</option>
                    <option value="0">未读</option>
                    <option value="2">待处理</option>
                    <option value="1">已处理</option>
                </select>
               
                
                <span class="ad">搜索</span>
                <input type="text" placeholder="请输入关键词" v-model="search"/>
                <span class="cx" @click="getDataList(1)">查询</span>
                <!-- <span class="cx" @click="downloadImg()">导出</span> -->
            </div>
            <div>
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableData"
                            height="450"
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="通知标题"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="消息类型"
                                :show-overflow-tooltip="true"
                                :formatter="formatType"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                               :formatter="formatState"
                        >
                        </el-table-column>
                       
                        <el-table-column
                                prop="newsContent.created_at"
                                label="通知时间"
                                
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small" @click="details(scope.row)">查看详情</el-button>
                                <!-- <el-button  type="text" size="small" @click="zfXQ(tableData[scope.$index].id,tableData[scope.$index].status)" v-if="tableData[scope.$index].isfinish==2">查看作废原因</el-button> -->
                                
                            </template>
                        </el-table-column>
                       
                    </el-table>
                </template>
            </div>
             
        </div>   
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 50, 100, 200,500]"
                    :page-size="p"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
 import download from '../../api/commonality'
    export default {
        name: "message",
        data(){
            return{
                value:[],
                search:'',
                tableData:[],
                type:'',
                p:10,
                page:1,
                total:0,
                status:"",
            }
        },
        mounted(){
            if(this.$route.query.name){
                this.value=[this.$route.query.tstart,this.$route.query.tend];
                this.search=this.$route.query.name;
                this.is_receiver=this.$route.query.is_receiver;
            }else{
                var qt = (new Date((new Date()).getTime() - 1*24*60*60*1000)).toLocaleDateString().split('/');
                if(Number(qt[1])<10){
                    qt[1]=(0).toString()+qt[1]

                }
                if(Number(qt[2])<10){
                    qt[2]=(0).toString()+qt[2]

                }
                var next = (new Date()).toLocaleDateString().split('/');
                if(Number(next[1])<10){
                    next[1]=(0).toString()+next[1]
                }
                if(Number(next[2])<10){
                    next[2]=(0).toString()+next[2]
                }
                this.value=[qt.join('-'),next.join('-')];
            }
            this.getDataList();
        },
        methods:{
            details(row){
                this.$router.push({
                    path:"./messageDetails",
                    query:{
                        id:row.id,      
                    }
                })
           },
            formatType(row, column, cellValue) {
                if(cellValue == "1"){
	                return '新用户申请';
	            }else if (cellValue == "2"){
	                return '入口提示';
	            }
            },
            formatState(row, column, cellValue) {
                if(cellValue == "0"){
	                return '未读';
	            }else if (cellValue == "2"){
	                return '待处理';
	            }else if (cellValue == "1"){
	                return '已处理';
	            }
		    },
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getDataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getDataList()
            },
            getDataList(){
                var params = {
                    tstart:this.value[0],
                    tend:this.value[1],
                    p:this.p,
                    page:this.page,
                    search:this.search,
                    type:this.type,
                    status:this.status}
                this.api.pushlib_message_all({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total = res.total;
                })
            },
           
        },
    }
</script>

<style scoped>
    .top_tit{
        width:100%;
        height:112px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 8;
    }
    .content_table{
        margin-top:200px;
        background:rgba(255,255,255,1);
    }
    .ad{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0 24px 0 44px;
    }
    select{
        width:150px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        /* margin-right: 28px; */
        margin-top: 24px;
    }
    input{
        width:140px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        padding: 0 5px;
        border:1px solid rgba(211,219,235,1);
        /* margin-right: 28px; */
        margin-top: 24px;
    }
    .cx{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        text-align: center;
        cursor: pointer;
        margin-left: 24px;
    }
    .cz{
        display: inline-block;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(232,234,237,1);
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height:36px;
        text-align: center;
    }
    .dc{
        display: inline-block;
        width:96px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        cursor: pointer;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        line-height:36px;
        float: right;
        margin: 24px 24px 0 0 ;
    }
    .summary1,.summary2{
        height:48px;
        text-align: left;
    }
    .summary1 span{
        display: inline-block;
        background:#f7f9fc;
        color:#1F2E4D;
        font-size:14px;
        font-weight:bold;
        line-height:48px;
        font-family:PingFang-SC-Regular;
        width: 11%;
        padding-left: 24px;
    }
    .summary2 span{
         display: inline-block;
        background:#f7f9fc;
        color:#1F2E4D;
        font-size:14px;
        font-weight:bold;
        line-height:48px;
        font-family:PingFang-SC-Regular;
        width: 9%;
       padding-left: 16px;

    }
    .big span{
        width: 11.5%!important;
    }
    .names{
        position: absolute;
        top:65px;
        right: 0;
        height: 200px;
        overflow-y:auto;
        background: #fff;
        z-index: 999999;
        border: 1px solid #ddd;
    }
    .names span{
        text-align: center;
        display: block;
        height: 36px;
        line-height: 36px;
        border-bottom:1px solid #eee 
    }
</style>