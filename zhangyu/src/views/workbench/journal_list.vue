
<template>
<div>
     <div class="top_name">
        <span class="top_txt">杂志锁屏推送管理</span>
         <span class="select" @click='SetUser()' >
                       账号管理
        </span>
        <span class='userGl' @click='newADD()'>新建推送库</span>
    </div>
    <div style="margin-top:145px;background:#fff;padding:24px" class='rePadding'>
             <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >   
                        <el-table-column
                                prop="plid"
                                label="推送库ID">

                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="推送库名称">
                        </el-table-column>
                        <el-table-column
                                prop="channel.channel"
                                :show-overflow-tooltip="true"
                                label="渠道">
                                 <template slot-scope="scope">
                                     <span v-if='tableData[scope.$index].channel'>
                                         {{tableData[scope.$index].channel.channel}}
                                    </span>
                                    <span v-else>--</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="audit_type"
                                label="功能">
                                 <template slot-scope="scope">
                                     <span v-if="tableData[scope.$index].channel">
                                         {{backfn(tableData[scope.$index].channel)}}
                                    </span>
                                     <span v-else>--</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="channel.channel_secret"
                                :show-overflow-tooltip="true"
                                label="渠道授权码">
                                <template slot-scope="scope">
                                     <span v-if='tableData[scope.$index].channel'>
                                         {{tableData[scope.$index].channel.channel_secret!=""?tableData[scope.$index].channel.channel_secret:"--"}}
                                    </span>
                                    <span v-else>--</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="num"
                                label="今日推送数">
                                <template slot-scope="scope">
                                    <span>
                                            {{tableData[scope.$index].num!=""?tableData[scope.$index].num:"--"}}
                                    </span>
                                </template>    
                        </el-table-column>
                         <el-table-column
                                prop="updated_at"
                                label="最后推送时间">
                                <template slot-scope="scope">
                                    <span>
                                            {{tableData[scope.$index].updated_at!=""?tableData[scope.$index].updated_at:"--"}}
                                    </span>
                                </template>    
                        </el-table-column>
                        <el-table-column
                                label="操作"
                        >
                            <template slot-scope="scope">
                                 <!-- <el-button  type="text" size="small">账户管理</el-button> -->
                                <el-button  type="text" size="small" @click='jump(scope.$index,scope.row)'>查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </template>
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
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>新建推送库</span>
                </div>
                <div class='sel'>
                   <span class='qdName'>推送库名称：</span>
                   <input type="text" maxlength="10" placeholder="最多可输入10个字" v-model="name"/>
                </div>
                <div>
                    <span class='qdName'>渠道：</span>
                    <input type="text" maxlength="10" placeholder="最多可输入10个字节且不能为汉字" v-model="channel"/>
                </div>
                <div style="margin-top:15px">
                    <span  class='qdName'>功能：</span>
                    <!-- <template>
                        <el-radio v-model="audit_type" label="1">内容推送</el-radio>
                        <el-radio v-model="audit_type" label="2">推送及审核</el-radio>
                    </template> -->
                    <select v-model="audit_type">
                        <option value="1">外部杂志锁屏审核</option>
                        <option value="2">外部投放内容审核</option>
                        <option value="3">内部杂志锁屏管理</option>
                        <option value="4">内部音频配置管理</option>
                    </select>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click='ADDlist()'>确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
    </div>
     <loading v-if='load'></loading>
</div>
</template>

<script>

import loading from '../../components/loading'
export default {
 components:{loading},
data() {
    return {
            p:10,
            page:1,
            total:0,
            tableData:[],
            tc:false,
            channel:"",
            qdLists:[],
            name:"",
            audit_type:"",
            load:true
    };
},

methods: {
    backfn(n){
        if(!n){return '--'}
        if(n.audit_type ==1){return '外部杂志锁屏审核'}
        if(n.audit_type ==2){return '外部投放内容审核'}
        if(n.audit_type ==3){return '内部杂志锁屏管理'}
        if(n.audit_type ==4){return '内部音频配置管理'}
        
    },
         getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                } 
                else {
                    return ''
                }
        },
        cell({row, column, rowIndex, columnIndex}){
            return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
        },
         handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData();
        },
        handleCurrentChange(page) {//页码切换
            this.page = page;
            this.getData(); 
        },
         getChannel(){
            this.api.pushlib_configs_channel().then((res)=>{
                this.qdLists=res;
            })
         },  
         newADD(){
             this.tc=true;
             this.getChannel();
         },
         qx(){
             this.tc=false,
             this.name='';
             this.channel='';
         },
         getData(){
             let params = {p:this.p,page:this.page}
             this.api.pushlib_search({params}).then((res)=>{
                 this.tableData=res.data;
                 this.total=res.total;
                 this.load=false
             })
         },
         ADDlist(){
             if(this.channel.match(/^[\u4e00-\u9fa5]+$/)){
                  this.$message.error('渠道不能为中文')
                 return
             }
              if(!this.name){
                  this.$message.error('名称不能为空')
                 return
             }
             if(!this.channel){
                  this.$message.error('渠道不能为空')
                 return
             }
             if(!this.audit_type){
                 this.$message.error('请选择功能')
                 return
             }
             let formData=new FormData;
             formData.append('audit_type',this.audit_type);
              formData.append('name',this.name);
             formData.append('channel',this.channel)
             this.api.pushlib_channel_add(formData).then((res)=>{
                 if(res!=false){
                     this.qx();
                     this.getData();
                 }
             })
         },
         jump(index,row){
             if(this.tableData[index].channel.audit_type==1){
                this.$router.push({
                    path:"./Journal_of_push",
                    query:{
                        channel:this.tableData[index].channel.channel
                    },
                })
             }
             if(this.tableData[index].channel.audit_type==3){
                this.$router.push({
                    path:"./journal_nb",
                    query:{
                        channel:this.tableData[index].channel.channel,
                        plid:row.plid,
                    },
                })
             }
             if(this.tableData[index].channel.audit_type==2){
                this.$router.push({
                    path:"./Jounrnal_ys",
                    query:{
                        channel:this.tableData[index].channel.channel
                    },
                })
             }
              if(this.tableData[index].channel.audit_type==4){
                this.$router.push({
                     path:"./Audio_configuration_management",
                    query:{
                        channel:this.tableData[index].channel.channel,
                        plid:row.plid,
                    },
                })
             }
            
         },
         SetUser(){
                  this.$router.push({
                    path:"./userControl",
                  
                })
            },
},

mounted() {
        this.getData();
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
    font-size: 18px;
    font-family: PingFang-SC;
    font-weight: 500;
    line-height: 62px;
    color: rgba(31,46,77,1);
}
.qdName{
    display: inline-block;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(50,50,50,1);
    margin-left: 40px;
    width: 90px
}
.userGl,.select{
    float: right;
    display: inline-block;
    height: 36px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    width: 144px;
    background: rgba(242,246,252,1);
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(61,73,102,1);
    margin: 10px 20% 0 0 
}
.userGl{
    margin-right: 20px!important
}
.bg{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content{
        width: 400px;
       height:300px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
    }
    .con_tit{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .con_tit span{
        display: inline;
        margin-left: 24px;
        display: inline-block;
        line-height: 40px;
        font-size: 18px;
        font-weight: 500;
    }
    .sel{
        margin: 20px 0;
    }
    .sel select{
        width: 200px;
        height: 36px;
        margin-left: 24px;
        border-radius: 5px;
    }
    .sel_1{
        margin: 30px 0 0px 24px;
    }
    .aaa{
          display: block!important;
      margin: 0 0 15px 0 !important
    }
     .bb span{
        vertical-align: top;
    }
   .bb textarea{
       padding: 5px
   }
   .sel_btn{
       width: 100%;
       height: 50px;
       text-align: right;
       margin-top: 20px;
   }
   .sel_btn span{
    margin-right: 50px;
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    margin-top: 7px
   }
   .sel_btn_qd{
        margin-right: 20px!important;
       border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
   }
    select{
    margin-left: 20px;
    width: 200px;
    height: 36px;
    border-radius: 5px;
}
    input{
        width: 190px;
        padding-left: 10px;
        border-radius: 5px;
        height: 36px;
        margin-left: 20px;
        
    }
    
</style>