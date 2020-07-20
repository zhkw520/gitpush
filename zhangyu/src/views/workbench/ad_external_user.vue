<template>
    <div>
        <div class="top_name">
            <div class="tit_top_url">
                <span class="log_url" @click="fh(-1)">广告源列表 &nbsp;/&nbsp;</span>
                <span class="log_ur">账号管理</span>
            </div>
            <div class="tit_top_con">
                <span class="tit_name">账号管理</span>
            </div>
            <span class="add_btn" @click="getShow('')">添加外部账号</span>
        </div>
        <div style="margin-top:187px">
            <template>
                <el-table
                        :data="list"
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
                            prop="email"
                            label="账号">
                    </el-table-column>
                    <el-table-column
                            prop="channel"
                            label="渠道">
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            width="150"
                    >
                        <template slot-scope="scope">
                            <el-button  type="text"  @click="getShow(list[scope.$index].email,list[scope.$index].channel)"  size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
        <div class="bg" v-if="show">
            <div class="bg_con">
                <div class="tit_con">
                    <span>{{name}}外部账号</span>
                </div>
                <div class="set">
                    <span>账号</span>
                    <input type="text" placeholder="请输入账号" v-model="email"/>
                </div>
                <div class="set">
                    <span>渠道</span>
                    <select v-model="channel">
                        <option value="">全部</option>
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                    </select>
                </div>
                <div class="bg_btn">
                    <span class="qd" @click="addUser">确定</span>
                    <span @click="heidShow()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ad_external_user",
        data(){
            return{
                list:[],
                p:10,
                page:1,
                total:0,
                name:'添加',
                channel:'',
                email:'',
                show:false,
                qdLists:[],
            }
        },
        mounted(){this.getData()},
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
            fh(){
                this.$router.go(-1)
            },
            getData(){
                let params = {p:this.p,page:this.page};
                this.api.adreview_user_channel_list({params}).then((res)=>{
                    this.list=res.data;
                    this.total=res.total
                })
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getShow(email,channel){
                if(email!=''){
                    this.name='编辑';
                    this.email=email;
                    this.channel=channel;
                }else {
                    this.name='添加';
                }
                this.show=true;
                this.channelList()
            },
            heidShow(){
                this.show=false;
                this.email='';
                this.channel=''
            },
            addUser(){
               if(!this.channel){
                   this.$message.error('渠道不能为空')
               }
                if(!this.email){
                    this.$message.error('邮箱不能为空')
                }
                let formData = new FormData;
                formData.append('email',this.email);
                formData.append('channel',this.channel);
                this.api.adreview_user_channel_add(formData).then((res)=>{
                    this.getData();
                    this.heidShow()
                })
            },
            channelList(){
                this.api.adreview_config_channel({}).then((res)=>{
                    this.qdLists=res;
                })
            }
        }
    }
</script>

<style scoped>
    .top_name{
        height: 98px;
    }
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .add_btn{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        width:124px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        position: absolute;
        top:30px;
        right: 300px;
        cursor: pointer;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .bg_con{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 20px;
        width:420px;
        height:203px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .tit_con{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-bottom: 20px;
    }
    .set{
       margin-bottom: 20px;
    }
    .set span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin-right: 14px;
    }
    .set input{
        width:341px;
        height:36px;
        padding-left: 14px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .set select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .bg_btn{text-align: right}
    .bg_btn span{
        display: inline-block;
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
        cursor: pointer;
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: 0!important;
        margin-right: 20px;
    }
</style>