<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">广告源列表</span>
            </div>
        </div>
        <div class="content_right">
            <div class="screen">
                <div class="date">
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </div>
                <span>SDK-ID</span>
                <select v-model="sdkid">
                    <option value="">全部</option>
                    <option :value="item.sdkid" v-for="item in sdkList">{{item.sdkid}}</option>
                </select>
                <span class="screen_btn1" @click="dataList()">查询</span>
                <span class="screen_btn" @click="remove" v-if="userType==1">重置</span>
                <span class="screen_btn2" @click="manage" v-if="userType==0">账号管理</span>
                <span class="screen_btn">导出</span>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="num"
                                label="序号">
                            <template slot-scope="scope">
                                <span>{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="sdkid"
                                label="SDK-ID">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="广告个数">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150"
                        >
                            <template slot-scope="scope">
                                <el-button @click="jump(tableData[scope.$index].sdkid,tableData[scope.$index].value1)" type="text" size="small">查看详情</el-button>
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
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ad_-source",
        data(){
            return{
                value1:(new Date()).toLocaleDateString().split('/').join('-'),
                tableData:[{
                    num:"001",
                }],
                page:1,
                p:10,
                total:0,
                sdkid:'',
                admaster:"",
                type:'',
                status:'',
                sdkList:[],
                userType:localStorage.getItem('userType')

            }
        },
        mounted(){
            this.typeList();
            this.dataList();
        },
        methods:{
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
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            jump(id){
                this.$router.push({
                    path:'./ad_details',
                    query:{
                        sdkid:id,
                        value1:this.value1
                    }
                })
            },
            manage(){
                this.$router.push({
                    path:'./ad_external_user'
                })
            },
            dataList(){
                let params={sdkid:this.sdkid,tdate:this.value1,p:this.p,page:this.page}
                this.api.adreview_adsdk_search({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                })
            },
            remove(){
                this.value1='';
                this.sdkid='';

            },
            typeList(){
                this.api.adreview_config_sdkid({}).then((res)=>{
                    this.sdkList=res;
                })
            }
        },
    }
</script>

<style scoped>
    .top_name{
        height: 62px;
        border: 0;
    }
.top_txt{
    margin-left: 24px;
    font-size:18px;
    font-family:PingFang-SC;
    font-weight:500;
    line-height:62px ;
    color:rgba(31,46,77,1);
}
    .content_right{
        margin-top:145px ;
        background: #fff;
        min-height: 776px;
    }
    .date{
        display: inline-block;
        margin-right: 20px;
    }
    .date .el-date-editor {
        width: 272px;
    }
    .screen{
        margin: 0 24px 20px 24px;
    }
    .screen>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .screen>select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 20px;
        margin-top: 27px;
    }
    .screen_btn1{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        border: 0!important;
    }
    .screen_btn2{
        width:96px!important;
    }
    .screen_btn,.screen_btn1,.screen_btn2{
        width:68px;
        height:36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
</style>