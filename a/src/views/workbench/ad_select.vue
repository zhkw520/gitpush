<template>
    <div>
        <div class="top_name">
            <div class="tit_top_url">
                <span class="log_url" @click="fh">广告源列表 &nbsp;/&nbsp;</span>
                <span class="log_ur">广告源详情</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">广告源详情</span>
            </div>
        </div>
        <div class="content_right">
            <div style="margin-left: 21px">
                <input type="checkbox" v-model="check" @change="setCheckAll"/>
                <span>全选</span>
                <input type="checkbox" v-model="tg" @change="setTag()"/>
                <span>设置为通过</span>
                <input type="checkbox" v-model="btg" @change="setTag2()"/>
                <span>设置为不通过</span>
                <span class="qd" @click="statusTYPE">确定</span>
                <span class="qx" @click="qx">取消</span>
            </div>
            <div>
                <template>
                    <el-table ref="tab0"
                              :data="tableData"
                              style="width: 100%"
                              :header-cell-style="getRowClass"
                              :cell-style="cell"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="序号"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="sdkid"
                                label="SDK_ID"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="原始物料"
                        >
                            <template slot-scope="scope">
                                <img :src="tableData[scope.$index].url" style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="原始落地页"
                                :show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <a :href="tableData[scope.$index].preview_url" target="_blank" >{{tableData[scope.$index].preview_url}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="status_name"
                                label="审核状态"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="created_at"
                                :show-overflow-tooltip="true"
                                label="审核时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="auditor"
                                label="审核人"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="广告详情"
                        >
                            <template slot-scope="scope">
                                <el-button  type="text" @click="particulars(tableData[scope.$index].adid,tableData[scope.$index].sdkid,tableData[scope.$index].created_at)" size="small">查看详情</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150"
                        >
                            <template slot-scope="scope">
                                <el-button  type="text" @click="set(tableData[scope.$index].adid,tableData[scope.$index].sdkid)" size="small">修改审核状态</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <div class="bg" v-if="xs">
            <div class="qr">
                <span>确认全部设置为{{this.tit}}</span>
                <span class="red">{{this.tit}}</span>
                <span>吗？</span>
                <div v-if="btg==true" class="yy">
                    <div>
                        <span>请选择原因</span>
                    </div>
                    <div>
                        <input type="checkbox" v-model="chenck1"/>
                        <span>物料和落地页不匹配</span>
                    </div>
                    <div>
                        <input type="checkbox" v-model="chenck2"/>
                        <span>物料内容差</span>
                    </div>
                    <div>
                        <input type="checkbox" v-model="chenck3"/>
                        <span>屏蔽竞品</span>
                    </div>
                    <div>
                        <input type="checkbox" v-model="chenck4"/>
                        <span>其他</span>
                        <input type="text" v-model="text" class="text"/>
                    </div>
                </div>
                <div>
                    <span class="yes" @click="statusTYPE()">确定</span>
                    <span @click="no">取消</span>
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
        <aff v-if="YR" :adver="adver" :channel="this.channel"></aff>
    </div>
</template>

<script>
    import aff from './ad_affirm'
    export default {
        components:{aff},
        name: "ad_select",
        data(){
            return{
                tableData:[],
                p:10,
                page:1,
                total:0,
                sdkid:'',
                admaster:'',
                tdate:'',
                type:'',
                channel:'',
                status:'',
                tags:[],
                check:false,
                check1:false,
                check2:false,
                check3:false,
                check4:false,
                tg:false,
                btg:false,
                adver:[
                    {
                        adid:'',
                        sdkid:'',
                        url_md5:''
                    }
                ],
                tit:'审核通过',
                xs:false,
                YR:false,
                msg:'',
                text:'',
            }
        },
        mounted(){
            this.dataList();
            this.channel=this.$route.query.channel;
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
            set(adid,sdkid){
                this.YR=true;
                this.adver[0].adid=adid;
                this.adver[0].sdkid=sdkid;
            },
            heid(){
                this.YR=false;
            },
            fh(){
                this.$router.push({
                    path:'./ad_source'
                })
            },
            particulars(adid,sdkid,created_at){
                this.$router.push({
                    path:'./ad_particulars',
                    query:{
                        adid:adid,
                        sdkid:sdkid,
                        tdate:created_at
                    }
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.dataList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.dataList()
            },
            qx(){
               this.$router.go(-1);
            },
            setCheckAll(){
                this.tableData.map((option) => {
                    this.$refs.tab0.toggleRowSelection(option);
                })
            },
            setTag(){
                if(this.tg==true){
                    this.btg=false;
                    this.xs=true;
                    this.tit='审核通过'
                }
            },
            setTag2(){
                if(this.btg==true){
                    this.tg=false;
                    this.xs=true;
                    this.tit='审核不通过'
                }
            },
            no(){
                this.xs=false;
                this.tg=false;
                this.btg=false;
            },
            handleSelectionChange(val){
                this.adver=[];
                this.tags=val;
                var arr={};
                for(var i=0;i<this.tags.length;i++){
                    arr.adid=this.tags[i].adid;
                    arr.sdkid=this.tags[i].sdkid;
                }
                this.adver.push(arr);
            },
            dataList(){
                let params = {
                    sdkid:this.$route.query.sdkid,admaster:this.$route.query.admaster,type:this.$route.query.type,tdate:this.$route.query.value,status:this.$route.query.status,p:this.p,page:this.page
                };
                this.api.adreview_adver_search({params}).then((res)=>{
                    this.total=res.total;
                    this.tableData=res.data;
                })
            },
            statusTYPE(){
                if(this.tg==false&&this.btg==false){
                    this.$message.error('请选择通过或不通过');
                    return
                }
                if(this.tg==true){
                    this.status=1
                }
                if(this.btg==true){
                    this.status=-1
                }
                if(this.chenck==true){
                    this.msg+='物料和落地页不匹配'
                }
                if(this.chenck2==true){
                    this.msg+='物料内容差'
                }
                if(this.chenck3==true){
                    this.msg+='屏蔽竞品'
                }
                if(this.chenck4==true){
                    this.msg=this.msg+this.text;
                }
                let formData=new FormData;
                formData.append('adver',JSON.stringify(this.adver));
                formData.append('status',this.status);
                formData.append('msg',this.msg);
                this.api.adreview_adver_audit(formData).then((res)=>{
                    this.status='';
                    this.check=false;
                    this.tg=false;
                    this.btg=false;
                    this.adver=[];
                    this.msg='';
                    this.text='';
                    this.dataList();
                })
            },
        }
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .qr{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        width:420px;
        min-height:80px;
        padding: 20px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .qr>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-bottom: 30px;
    }
    .red{
        color: red!important;
    }
    .qr>div{
        float: right;
    }
    .qr>div>span{
        display: inline-block;
        cursor: pointer;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        line-height: 36px;
        text-align: center;
    }
    .yes{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: 0!important;
        margin-right: 20px;
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
    .content_right input{
        margin:33px 12px 33px 0!important;
        width: 16px;
        height: 16px;

    }
    .content_right span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 60px;
    }
    .qd,.qx{
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width:68px;
        height:36px;
        line-height: 36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        border: 0!important;
        color: #fff!important;
    }
    .yy{width: 100%}
    .yy span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin:0 10px 21px 10px;
    }
    .yy input{
        width:16px;
        height:16px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .text{
        padding-left: 10px;
        width:220px!important;
        height:32px!important;
        background:rgba(255,255,255,1)!important;
        border:1px solid rgba(211,219,235,1)!important;
    }
</style>