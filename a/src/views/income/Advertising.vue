<template>
    <div>
        <div class="top_tit">
            <div class="tit_top_url">
                <span class="log_url">收益管理 &nbsp;/&nbsp;</span>
                <span class="log_url">广告结算数据</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告结算数据</span>
            </div>
        </div>
        <div class="content_table">
            <div style="margin-bottom: 24px;padding: 0 24px;">
                <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <span  class="ad">数据类型</span>
                <select v-model="is_receiver" @change="change(value)">
                    <option value="1">收款数据</option>
                    <option value="0">付款数据</option>
                </select>
                 <span  class="ad" v-if="is_receiver==0">渠道</span>
                <select v-model="channel"  v-if="is_receiver==0">
                    <option value="">全部</option>
                    <option :value="item.channel" v-for="item in channelData">{{item.channel}}</option>
                </select>
                <div style=" display: inline-block;position: relative;">
                    <span class="ad">结算方</span>
                    <input type="text" placeholder="请输入结算方" v-model="name" @input="getName" />
                    <div class='names' v-if="show">
                        <span v-for="da in JSname" @click='setName(da.name)'>{{da.name}}</span>
                    </div>
                </div>
                <div style=" display: inline-block;position: relative;" v-if='is_receiver==1'> 
                    <span class="ad">项目</span>
                    <select v-model="project">
                        <option value="">全部</option>
                        <option :value="item.project_name" v-for='item in JSlist'>{{item.project_name}}</option>
                    </select>
                </div>
               
                
                <span class="ad">搜索</span>
                <input type="text" placeholder="请输入关键词" v-model="search"/>
                <span class="cx" @click="getDataList(1)">查询</span>
                <span class="cx" @click="downloadImg()">导出</span>
            </div>
            <div  v-if="is_receiver==1">
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableData"
                            height="450"
                            style="width: 100%">
                        <el-table-column
                                prop="tdate"
                                label="日期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="结算方"
                               
                        >
                        </el-table-column>
                        <el-table-column
                                prop="advertiser"
                                label="投放公司">
                        </el-table-column>
                        <el-table-column
                                prop="project"
                                label="项目名称"
                               
                        >
                        </el-table-column>
                       
                        <el-table-column
                                prop="pv"
                                label="展示"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击">
                        </el-table-column> 
                        <el-table-column
                            prop="click_ratio"
                            label="点击率"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                         <el-table-column
                                prop="download"
                                label="下载">
                        </el-table-column> 
                         <el-table-column
                                prop="download_feedback"
                                label="反馈下载">
                        </el-table-column>
                        <el-table-column
                                prop="income"
                                label="收益"
                        >
                        </el-table-column>
                       
                    </el-table>
                </template>
            </div>
             <div  v-if="is_receiver==0">
                <template>
                    <el-table
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            :data="tableData"
                            height="450"
                            style="width: 100%">
                        <el-table-column
                                prop="tdate"
                                label="日期"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="结算方"
                                v-if="!this.$route.query.type"
                        >
                        </el-table-column>
                        <!-- <el-table-column
                                prop="advertiser"
                                 v-if="!this.$route.query.type"
                                label="投放公司">
                               
                        </el-table-column> -->
                      
                        <el-table-column
                                prop="scene"
                                label="场景"
                                
                        >
                        </el-table-column>
                          <el-table-column
                                prop="channel"
                                label="渠道"
                                
                        >
                        </el-table-column>
                        <el-table-column
                                prop="adid"
                                label="广告位ID"
                                
                        >
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                label="展示"
                                :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="click"
                                label="点击">
                        </el-table-column> 
                        <el-table-column
                            prop="click_ratio"
                            label="点击率"
                            :show-overflow-tooltip="true"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="income"
                                label="成本"
                                
                        >
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div v-if="tableData.length>0&&is_receiver==1" class='summary1'>
                <span>汇总</span>
                <span>—</span>
                <span>—</span>
                <span>—</span>
                <span>{{exhibition1}}</span>
                <span>{{exhibition2}}</span>
                <span>{{click_ratio}}</span>
                <span>{{exhibition5}}</span>
                <span>{{exhibition6}}</span>
                <span>{{exhibition4}}</span>
            </div>
            <div v-if="tableData.length>0&&is_receiver==0" class='summary2' :class='{big:this.$route.query.type!=undefined}'>
                <span>汇总</span>
                <span>—</span>
                <span>—</span>
                <span  v-if="!this.$route.query.type">—</span>
                <span>—</span>
                <span>{{exhibition1}}</span>
                <span>{{exhibition2}}</span>
                <span>{{click_ratio}}</span>
                <span>{{exhibition4}}</span>
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
        name: "advertiser",
        data(){
            return{
                value:[],
                search:'',
                tableData:[],
                is_receiver:1,
                p:10,
                page:1,
                total:0,
                exhibition1:'',
                exhibition2:'',
                click_ratio:'',
                exhibition4:'',
                exhibition5:'',
                exhibition6:'',
                name:'',
                channel:"",
                channelData:[],
                JSname:[],
                show:false,
                project:"",
                JSlist:[],
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
                    var next = (new Date()).toLocaleDateString().split('/');
                    if(Number(next[1])<10){
                        next[1]=(0).toString()+next[1]
                    }
                    this.value=[qt.join('-'),next.join('-')];
                }
                this.getDataList();
                this.getqd();
        },
        methods:{
            change(value){
                this.name=''
                this.channel=''
                this.project=''
                this.search=''
                this.getDataList();
            },
            getObject(){
                if(!this.name){
                    this.$message.error('结算方不能为空')
                    return
                }
                let params={balance_name:this.name}
                this.api.adproject_listpage({params}).then((res)=>{
                    this.JSlist=res.data
                })
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
            getqd(){
                this.api.settle_data_ssp_channel().then((res)=>{
                    this.channelData=res;
                })
            },
            
             downloadImg(){
                var url = '/settle/data/export'+'?is_receiver='+this.is_receiver+'&name='+this.name+'&search='+this.search+'&channel='+this.channel+'&tstart='+this.value[0]+'&tend='+this.value[1];
                download.downloadImg(url);
            },
            getName(){
                if(this.name!=''){
                    this.show=true;
                    this.JSname=[];
                     let params={is_receiver:this.is_receiver,search:this.name,p:100,page:1}
                        this.api.settle_settlement_search({params}).then((res)=>{
                            if(res.data.length == '0'){
                                this.show = false
                            }else{
                                this.JSname=res.data;
                            }
                            
                })
                }
               
            },
            setName(da){
                this.name=da;
                this.show=false;
                this.getObject()
            },
            getDataList(num){
                if(num!=undefined){
                    this.page=num;
                         var params = {tstart:this.value[0],tend:this.value[1],p:this.p,page:num,search:this.search,is_receiver:this.is_receiver,name:this.name,channel:this.channel,project:this.project} 
                }else{
                        params = {tstart:this.value[0],tend:this.value[1],p:this.p,page:this.page,search:this.search,is_receiver:this.is_receiver,name:this.name,channel:this.channel,project:this.project}

                }
                
                this.api.settle_data_search({params}).then((res)=>{
                    this.tableData=res.data;

                    // var a1=0;
                    // var a2=0;
                    // var a4=0;
                    // for(var i=0;i<res.data.length;i++){
                    //     a1+=parseFloat(res.data[i].pv);
                    //     a2+=parseFloat(res.data[i].click);
                    //     a4+=parseFloat(res.data[i].income);

                    var a1= 0;
                    var a2= 0;
                    var a4= 0;
                    var a3 =0;
                    var a5= 0;
                    for(var i=0;i<this.tableData.length;i++){
                        a1 += parseInt(res.data[i].pv);
                        a2 += parseInt(res.data[i].click);
                        a3 += parseInt(res.data[i].download);
                        a4 += parseFloat(res.data[i].income);
                        a5 += parseInt(res.data[i].download_feedback)
                        this.tableData[i].income = parseFloat(this.tableData[i].income / 100).toFixed(2);
                    }
                    this.exhibition1 = parseInt(a1);
                    this.exhibition2 = parseInt(a2);
                    
                    var sratio = 0;
                    if(this.exhibition1 > 0){
                        sratio =  parseFloat(this.exhibition2 / this.exhibition1 * 100).toFixed(2);

                    }
                    this.exhibition5=a3;
                    this.exhibition6=a5;
                    this.click_ratio = sratio.toString() +'%';
                    this.exhibition4 = parseFloat(a4 / 100 ).toFixed(2);
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
        z-index: 99;
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
        width: 8.5%;
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
        width: 10.1%;
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
        width: 100%;
        overflow-y:auto;
        background: #fff;
        z-index: 100;
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