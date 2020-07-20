<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">线上审核资源替换</span>
            </div>
        </div>
        <div class="content_right">
            <div class="screen">
                <span>日期：</span>
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
                <span>SDK类型:<i style="font-style:normal;color:red;">(必选)</i></span>
                <el-select v-model="sdk_type" placeholder="请选择" @change="change">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span>渠道</span>
                <select v-model="channel" >
                    <option value="">全部</option>
                    <option :value="item.media_channel" v-for='(item,index) in channelList'>{{item.media_channel}}</option>
                </select>
                <span class="screen_btn1" @click='pushService()' v-if="sdk_type == 'adsdk'">一键推送</span>
                <span class="screen_btn1" @click='getData()' v-if="sdk_type == 'adsdk'">查询</span>
                <span class="screen_btn1" @click='getData_fm()' v-if="sdk_type == 'fmsdk'">查询</span>
            </div>
            <div v-if="sdk_type == 'adsdk'">
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="tdate"
                                label="日期">
                        </el-table-column>
                        <el-table-column
                                prop="media_channel"
                                label="渠道">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="审核通过率">
                                <template slot-scope="scope">
                                    <span v-if='!Array.isArray(tableData[scope.$index].space_ratio) || !tableData[scope.$index].space_ratio[0]'>--</span>
                                   
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="开屏审核通过率">
                                <template slot-scope="scope">
                                    <span v-if='!Array.isArray(tableData[scope.$index].space_ratio) || !tableData[scope.$index].space_ratio[0]'>--</span>
                                   
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="角标审核通过率">
                                 <template slot-scope="scope">
                                    <span v-if='!Array.isArray(tableData[scope.$index].space_ratio) || !tableData[scope.$index].space_ratio[0]'>--</span>
                                   
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="暂停审核通过率">
                                 <template slot-scope="scope">
                                    <span v-if='!Array.isArray(tableData[scope.$index].space_ratio) || !tableData[scope.$index].space_ratio[0]'>--</span>
                                   
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="updated_at"
                                label="更新时间">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150"
                        >
                            <template slot-scope="scope">
                                <el-button @click="jump(tableData[scope.$index].media_channel,tableData[scope.$index].tdate)" type="text" size="small">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div v-if="sdk_type == 'fmsdk'">
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="tdate"
                                label="日期">
                        </el-table-column>
                        <el-table-column
                                prop="media_channel"
                                label="渠道">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="已替换数量">
                                <!-- <template slot-scope="scope">
                                    <span v-if='!Array.isArray(tableData[scope.$index].space_ratio) || !tableData[scope.$index].space_ratio[0]'>--</span>
                                   
                                </template> -->
                        </el-table-column>
                        
                        <el-table-column
                                prop="updated_at"
                                label="更新时间">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150"
                        >
                            <template slot-scope="scope">
                                <el-button @click="jump(tableData[scope.$index].media_channel,tableData[scope.$index].tdate)" type="text" size="small">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div v-if="sdk_type == ''">
                <p style="text-align: center;font-size: 21px;color: grey;margin-top: 80px;">暂无数据</p>
            </div>
            <div class="block" v-if="sdk_type != ''">
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
        <div class='bg' v-if='ts'>
                <div class="load">
                     <div class="load_tit">
                        <span>一键推送</span>
                    </div>
                    <div class='text'>
                        <span>将当前所有可送审状态资源推送给广告平台，是否确定？</span>
                    </div>
                    <div class='btns'>
                        <span class='qd' @click="submit()">确定</span>
                        <span @click='qx()'>取消</span>
                    </div>
                   
                </div>
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
                channel:"",
                channelList:[],
                admaster:"",
                type:'',
                status:'',
                sdkList:[],
                userType:localStorage.getItem('userType'),
                ts:false,
                sdk_type:'',
                options: [{
                    value: 'adsdk',
                    label: 'ADSDK类型'
                    }, {
                    value: 'fmsdk',
                    label: 'FMSDK类型'
                }],

            }
        },
        created(){
            if(this.$route.query.sdk_type){
               this.sdk_type = this.$route.query.sdk_type
           }else{
               this.sdk_type = ''
           }

        },
        mounted(){
           
        },
        methods:{
            change(value){
                if(value == 'adsdk'){
                    this.getData();
                    this.getType()
                }else{
                    this.getData_fm();
                    this.getType()
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
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            pushService(){
                this.ts=true;
            },
            qx(){
               this.ts=false; 
            },
            jump(type,date){
                this.$router.push({
                    path:'./Channels_for_details',
                    query:{
                        tdate:date,
                        channel:type,
                        sdk_type:this.sdk_type
                    },
                  
                })
            },
            getType(){
                let params={sdk_type:this.sdk_type}
                this.api.replace_channel_media_channel({params}).then((res)=>{
                    this.channelList=res;
                })
            },
            submit(){
                if(!this.value1){
                    this.$message.error('日期不能为空');
                    return
                }
                // if(!this.channel){
                //     this.$message.error('渠道不能为空');
                //     return
                // }
                let formData=new FormData;
                formData.append('is_preview','2');
                formData.append('tdate',this.value1);
                formData.append('media_channel',this.channel)
                this.api.replace_channel_shortcut_audit(formData).then((res)=>{
                    if(res!=false){
                        this.qx()
                    }
                })
            },
            getData(){
                let params={tdate:this.value1,media_channel:this.channel,p:this.p,page:this.page,sdk_type:this.sdk_type}
               this.api.replace_channel_audit_statistics({params}).then((res)=>{
                   this.tableData=res.data;
                   this.total=res.total
               })
            },
            getData_fm(){
                let params={tdate:this.value1,media_channel:this.channel,p:this.p,page:this.page,sdk_type:this.sdk_type}
               this.api.replace_fm_statistics({params}).then((res)=>{
                   this.tableData=res.data;
                   this.total=res.total
               })
            },
            
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
        float:right;
        margin:27px  24px 0 0 ;
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
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
     .load{
        border-radius: 10px;
        width: 500px;
        min-height: 270px;
       
        position: relative;
        background: #fff;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .load_tit{border-bottom: 1px solid #ddd}
    .load_tit span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin:10px 0 10px 0;
        font-size: 18px;
        font-weight: bold;
        margin-left: 24px
    }
    .text{
        padding:24px;
        margin: 30px 0;
        text-align: center
    }
    .text span{
        display: inline-block;
        font-size: 16px
    }
    .btns{
        text-align: right
    }
    .btns span{
        display: inline-block;
        border-radius: 8px;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 24px;
        text-align: center;
    }
    .qd{
        border: 0!important;
        background: #3377ff!important;
        color: #fff!important 
    }
</style>