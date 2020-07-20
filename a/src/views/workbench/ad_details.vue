<template>
    <div>
        <div>
            <div class="top_name" :class="{bag:this.userType==0}">
                <div class="tit_top_url">
                    <span class="log_url" @click="fh">广告源列表 &nbsp;/&nbsp;</span>
                    <span class="log_ur">广告源详情</span>
                </div>
                <div class="tit_top_con">
                    <span class="tit_name">广告源详情</span>
                </div>
                <div v-if="userType==0" class="ditch">
                    <span>渠道</span>
                    <select v-model="channel">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                    </select>
                </div>
            </div>
            <div class="content_right" :class="{content_bag:userType==0}">
                <div class="screen">
                    <div class="date">
                        <el-date-picker
                                v-model="value"
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
                    <span>广告主</span>
                    <select v-model="admaster">
                        <option value="">全部</option>
                        <option :value="item.admaster" v-for="item in adList">{{item.admaster}}</option>
                    </select>
                    <span>广告类</span>
                    <select v-model="type">
                        <option value="">全部</option>
                        <option :value="item.type" v-for="item in ADtype">{{item.type}}</option>
                    </select>
                    <span>审核状态</span>
                    <select v-model="status">
                        <option value="">全部</option>
                        <option value="-1">审核失败</option>
                        <option value="0">待审核</option>
                        <option value="1">审核通过</option>

                    </select>
                    <div class="wl">
                        <span>物料URL</span>
                        <input type="text" v-model="url">
                        <span>落地页URL</span>
                        <input type="text" v-model="preview_url">
                        <span class="screen_btn1" @click="dataList()">查询</span>
                        <span class="screen_btn2" @click="remove">重置</span>
                        <span class="screen_btn2">导出</span>
                        <span class="screen_btn" @click="statusType">批量操作</span>
                    </div>

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
                                    <span>{{scope.$index+1+((page-1)*p)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="sdkid"
                                    label="SDK-ID">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="原始物料">
                                <template slot-scope="scope">
                                    <img :src="tableData[scope.$index].url" style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    :show-overflow-tooltip="true"
                                    label="原始落地页">
                                <template slot-scope="scope">
                                    <a :href="tableData[scope.$index].preview_url" target="_blank" >{{tableData[scope.$index].preview_url}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="status_name"
                                    label="审核状态">
                            </el-table-column>
                            <el-table-column
                                    prop="created_at"
                                    :show-overflow-tooltip="true"
                                    label="审核时间">
                            </el-table-column>
                            <el-table-column
                                    prop="auditor"
                                    label="审核人">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="广告详情">
                                <template slot-scope="scope">
                                    <el-button  type="text" @click="particulars(tableData[scope.$index].adid,tableData[scope.$index].sdkid,tableData[scope.$index].created_at)" size="small">查看详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="150"
                            >
                                <template slot-scope="scope">
                                    <el-button  type="text" @click="setStatus(tableData[scope.$index].adid,tableData[scope.$index].sdkid)" size="small">修改审核状态</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
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
       <aff v-if="YR" :adver="adver" :channel="channel"></aff>
    </div>
</template>

<script>
    import aff from './ad_affirm'
    export default {
        components:{aff},
        name: "ad_details",
        data(){
            return{
                tableData:[{num:0}],
                page:1,
                p:10,
                total:0,
                value:this.$route.query.value1,
                sdkList:[],
                adList:[],
                ADtype:[],
                status:'',
                admaster:'',
                type:'',
                sdkid:'',
                channel:'',
                qdLists:[],
                YR:false,
                userType:localStorage.getItem('userType'),
                url:'',
                preview_url:'',
                adver:[
                    {
                        adid:'',
                        sdkid:'',
                        url_md5:''
                    }
                ],

            }
        },
        mounted(){
            this.sdkid = this.$route.query.sdkid;
            this.typeList();
        },
        methods:{
            remove(){
                this.value='';
                this.sdkid='';
                this.type='';
                this.admaster='';
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
            fh(){
                this.$router.go(-1)
            },
            heid(){
                this.YR=false;
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            particulars(adid,sdkid,created_at){
                this.$router.push({
                    path:'./ad_particulars',
                    query:{
                        adid:adid,
                        sdkid:sdkid,
                        tdate:created_at,

                    }
                })
            },
            statusType(){
                this.$router.push({
                    path:'./ad_select',
                    query:{
                        value:this.value,
                        type:this.type,
                        sdkid:this.sdkid,
                        url:this.url,
                        preview_url:this.preview_url,
                        admaster:this.admaster,
                        status:this.status,
                        channel:this.channel,
                    },
                })
            },
            typeList(){
                this.api.adreview_config_sdkid({}).then((res)=>{
                    this.sdkList=res;
                    this.adZlist()
                })
            },
            adZlist(){
                let params = {sdkid:this.$route.query.sdkid};
                this.api.adreview_config_admaster({params}).then((res)=>{
                    this.adList=res;
                    this.adType()
                })
            },
            adType(){
                let params ={sdkid:this.sdkid};
                this.api.adreview_config_type({params}).then((res)=>{
                    this.ADtype=res;
                    this.channelList()
                })
            },
            dataList(){
                let params = {
                    sdkid:this.sdkid,admaster:this.admaster,type:this.type,tdate:this.value,status:this.status,p:this.p,page:this.page,preview_url:this.preview_url,url:this.url,channel:this.channel
                };
                this.api.adreview_adver_search({params}).then((res)=>{
                    this.total=res.total;
                    this.tableData=res.data;

                })
            },
            setStatus(adid,sdkid){
                this.YR=true;
                this.adver[0].adid=adid;
                this.adver[0].sdkid=sdkid;
            },
            jump(index){
                let routeData = this.$router.resolve({
                    path:'./theme_details',
                });
                window.open(routeData.href, '_blank');
            },
            channelList(){
                this.api.adreview_config_channel({}).then((res)=>{
                    this.qdLists=res;
                    this.channel=res[0].channel;
                    this.dataList();
                })
            }
        }
    }
</script>

<style scoped>
    .bag{
        height: 155px!important;
    }
    .content_bag{
        margin-top:243px!important;
    }
    .content_right{
         margin-top:186px;
        background: #fff;
        min-height: 776px;
    }
    .top_name{
        height: 98px;
    }
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .screen{
        margin: 0 24px 25px 24px;
    }
    .screen>span,.screen .wl span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .screen .wl input{
        padding-left: 14px;
        width:300px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 20px;
        margin-top: 27px;
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
    .screen_btn{
        width: 96px!important;
    }
    .screen_btn1,.screen_btn2,.screen_btn{
        width:68px;
        height:36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .date{
        display: inline-block;
        margin-right: 20px;
    }
    .date .el-date-editor {
        width: 140px;
    }
    .ditch{
        margin: 20px 0 0 24px;
    }
    .ditch span{
        display: inline-block;
        margin-right: 8px;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .ditch select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
</style>