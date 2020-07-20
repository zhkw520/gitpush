<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">排期管理&nbsp;/&nbsp;</span>
                <span class="new_url">排期详情</span>
            </div>
            <div>
                <span class="topName">{{this.$route.query.name}}</span>
                <span class="num">({{real_count}}/{{total}})</span>
                <div style="display: inline-block;float: right;margin-right: 15%;">
                    <span class="jl" @click="record()">查看更新记录</span>
                    <span class="zq" @click="Adds">管理周期</span>
                    <!--<span class="dc">导出</span>-->
                </div>
            </div>
            <div>
                <span class="timeZQ">{{this.$route.query.cycle}}</span>
            </div>
        </div>

        <div class="seach">
            <div v-for="(item,index) in list" style="display: inline-block;vertical-align: top" >
                <div class="ADDtimes">
                    <div>
                        <span>{{'周期'+(index+1)}}</span>
                        <span class="num">({{num[index]}}/{{listData[index]?listData[index].length:'0'}})</span>
                        <img src="../../../../public/img/ups.png" v-if="close[index]" @click="pocket(index)">
                        <img src="../../../../public/img/btn.png" v-if="close[index]==false" @click='unfold(index)'>
                    </div>
                    <span>{{item.tstart+'至'+item.tend}}</span>
                </div>
                <div class="pd" v-for="da in listData[index]" v-if="carton">
                   <div>
                       <span class="qdNmae">名称</span>
                       <span class="qdxq">{{da.name}}</span>
                   </div>
                    <div>
                        <span class="qdNmae">渠道</span>
                        <span  class="qdxq">{{da.channel_name==''?'本地':da.channel_name}}</span>
                    </div>
                    <div>
                        <span class="qdNmae">状态</span>
                        <span  class="qdxq">{{da.status==0?'待打包':'已上架'}}</span>
                    </div>
                    <div>
                        <span class="qdNmae">处理人</span>
                        <span  class="qdxq">{{da.creator}}</span>
                    </div>
                    <div>
                        <span class="xq" @click="CkDetails(da)">查看详情</span>
                    </div>
                </div>
                <div v-if="carton">
                    <div class="ADDtime" @click="AddXQ(item.cycle_id)">
                        <img src="../../../../public/img/add_msg.png">
                        <span  class="qdxq">添加需求</span>
                    </div>
                </div>

            </div>

            <div class="ADDtime" @click="Adds">
                <img src="../../../../public/img/add_msg.png">
                <span>添加周期</span>
            </div>
        </div>
        <div v-if='this.carton==false' style="background:#fff">
             <template>
                <el-table
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="主题名称"
                    >
                     <template slot-scope="scope">
                            <input type="text" class="input1" v-model="name[scope.$index]" >
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="cycle"
                            label="渠道"
                    >
                        <template slot-scope="scope">
                             <select  v-model="channel[scope.$index]" >
                                <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                            </select>

                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="pv"
                            label="类型">
                             <template slot-scope="scope">
                                <select v-model="type[scope.$index]" >
                                    <option value="">请选择</option>
                                    <option value="全局" >全局</option>
                                    <option value="桌面" >桌面</option>
                                    <option value="翻新" >翻新</option>
                                    <option value="锁屏" >锁屏</option>
                                    <option value="问题修改" >问题修改</option>
                                    <option value="精品全局" >精品全局</option>
                                 </select>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="creator"
                            label="上架账号"
                    >
                         <template slot-scope="scope">
                             <select v-model="account[scope.$index]" >
                                <option :value="item.account" v-for="item in range">{{item.account}}</option>
                             </select>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updated_at"
                            label="需求说明"
                            :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <textarea v-model="note[scope.$index]" ></textarea>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updated_at"
                            label="状态"
                            :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <select v-model="status[scope.$index]" >
                                <option value="1">已上架</option>
                                <option value="0">待打包</option>
                             </select>
                        </template>
                    </el-table-column>
                     <el-table-column
                            prop="updated_at"
                            label="责任人"
                            :show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <input type="text" class="input" v-model="person[scope.$index]" >
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="ecpc"
                            label="操作">
                        <template slot-scope="scope">
                            <span style="font-size:14px;font-family:PingFang-SC-Medium,PingFang-SC;font-weight:500;color:rgba(51,119,255,1);cursor: pointer" @click="CkDetails(tableData[scope.$index])">查看详情</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div style="margin-top:50px;text-align: center;">
                <span class='updated' @click='setData()'>更新</span>
                <span class='disqualify' @click='restore()'>取消</span>
        
            </div>
        </div>
        <div class="bg" v-if="add">
            <div class="newData">
                <div>
                    <span class="tit_top">管理周期</span>
                    <img src="../../../../public/img/gb.png" style="width: 16px;float: right;margin-right: 24px;cursor: pointer;margin-top: 21px" @click="heidADD()">
                </div>
                <div >
                    <div v-for="(item,index) in list">
                        <span class="tit_name1">{{'周期'+(index+1)}}</span>
                        <div class="date">
                            <el-date-picker
                                    class="date1"
                                    @change="setTimes(index,item.cycle_id)"
                                    v-model="time[index]"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                        <span style="width: 16px;height: 16px;color: #D3DBEB;display: inline-block;margin-left: 14px;line-height: 36px;cursor: pointer" @click="dels(item.cycle_id)">x</span>
                    </div>

                    <div class="addData" @click="addTime()">
                        <img src="../../../../public/img/add_msg.png">
                        <span>添加周期</span>
                    </div>
                    <!--<div class="ADDbtn">-->
                        <!--<span class="tj" @click="addTime()">保存</span>-->
                        <!--<span @click="heidADD()">取消</span>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <div class="bg" v-if="sc">
            <div class="newDatas">
                <div>
                    <span class="tit_top">删除周期</span>
                </div>
                <div >
                    <div class="titName">
                        <span>是否确定删除该项周期？</span>
                    </div>
                    <div class="ADDbtn">
                    <span class="tj" @click="del()">确定</span>
                        <span @click="heidqx()">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return{
                list:[],
                add:false,
                time:[],
                up:1,
                listData:[],
                cycle_id:"",
                sc:false,
                carton:true,
                channels:[],
                range:[],
                type:[],
                name:[],
                channel:[],
                account:[],
                note:[],
                person:[],
                status:[],
                tableData:[],
                index:'',
                close:[],
                total:this.$route.query.total,
                real_count:this.$route.query.real_count,
                num:[],
                nums:[],
            
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            record(){
                this.$router.push({
                    path:"./Record",
                    query:{
                        schedule_id:this.$route.query.schedule_id
                    },
                })
            },
            pocket(index){
                this.carton=true;
                this.close[index]=false;
            },
            unfold(index){
                this.carton=false;
                this.close[index]=true;
                for(var i=0;i<this.close.length;i++){
                    if(i!=index){
                        this.close[i]=false;
                    }
                }
                this.index=index;
                this.qd();
                this.tableData=this.listData[this.index];               
                        for(var k=0;k<this.tableData.length;k++){
                            this.type[k]=this.tableData[k].type;
                            this.name[k]=this.tableData[k].name;
                            this.channel[k]=this.tableData[k].channel;
                            this.account[k]=this.tableData[k].account;
                            this.note[k]=this.tableData[k].note;
                            this.person[k]=this.tableData[k].person;
                            this.status[k]=this.tableData[k].status;
                        }
           
            },
            restore(){       
                this.pocket();
            },

             setData(){
                 for(var i=0;i<this.tableData.length;i++){
                    if(this.name[i]==''){
                   this.$message.error('名称不能为空');
                   return
               }
               if(this.type[i]==''){
                   this.$message.error('类型不能为空');
                   return
               }
               if(this.channel[i]==''){
                   this.$message.error('渠道不能为空');
                   return
               }
               if(this.account[i]==''){
                   this.$message.error('上架账号不能为空');
                   return
               }
               if(this.person[i]==''){
                   this.$message.error('责任人不能为空');
                   return
               }
               if(this.note[i]==''){
                   this.$message.error('备注说明不能为空');
                   return
               }
              
               let formData = new FormData;
               formData.append('demand_id',this.tableData[i].demand_id);
               formData.append('schedule_id',this.$route.query.schedule_id);
               formData.append('cycle_id',this.tableData[i].cycle_id);
               formData.append('name',this.name[i]);
               formData.append('status',this.status[i]);
               formData.append('type',this.type[i]);
               formData.append('person',this.person[i]);
               formData.append('account',this.account[i]);
               formData.append('channel',this.channel[i]);
               formData.append('note',this.note[i]);
               formData.append('thid',this.tableData[i].thid);
                formData.append('ch_thid',this.tableData[i].ch_thid);
               formData.append('f_thid',this.tableData[i].f_thid);
               formData.append('f_ch_thid',this.tableData[i].f_ch_thid);
                this.api.themes_schedule_demand_edit(formData).then((res)=>{
                    // if(res!=false){
                    //     this.$router.go(-1)
                    // }
                })
                 }
              
            },
              
             qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                    this.Range();
                
                })
            },
            Range(){
                this.api.themes_config_account().then((res)=>{
                    this.range=res;

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
            addTime(){
                let formData =new FormData;
                formData.append('schedule_id',this.$route.query.schedule_id);
                formData.append('name',this.$route.query.name);
                formData.append('tstart',this.$route.query.tstart);
                formData.append('tend',this.$route.query.tend);
                this.api.themes_schedule_cycle_add(formData).then((res)=>{
                    this.getData()
                })
            },
            getData(){
                let params={schedule_id:this.$route.query.schedule_id};
                this.api.themes_schedule_cycles({params}).then((res)=>{
                    this.list=res;
                    var arr=[];
                    for(var i=0 ;i<res.length;i++){
                        arr[i]=[res[i].tstart,res[i].tend];
                    }
                    for(var i=0;i<this.list.length;i++){
                        this.demandList(this.list[i].cycle_id,i);
                        this.close[i]=false;
                    }
                    this.time=arr;
                })
            },
            demandList(id,index){
                let params={schedule_id:this.$route.query.schedule_id,cycle_id:id};
                this.api.themes_schedule_demands({params}).then((res)=>{
                    this.listData.push(res);
                    for(var i=0;i<this.listData.length;i++){
                        this.num[i]=0;
                        if(this.listData[i]==res&&i!=index){
                            if(this.listData[index]==undefined){
                                this.listData[index]='';
                            }
                            var arr=this.listData[index];
                            this.listData[index]=this.listData[i];
                            this.listData[i]=arr;
                        
                        }
                        if(this.listData[i]){
                            for(var k=0;k<this.listData[i].length;k++){
                            if(this.listData[i][k].status==1){
                                ++this.num[i];
                            }
                        }
                        }
                       
                    }
                })
            },
            setTimes(index,id){
                let formData=new FormData;
                formData.append('cycle_id',id);
                formData.append('schedule_id',this.$route.query.schedule_id);
                formData.append('name','周期'+(index+1));
                formData.append('tstart',this.time[index][0]);
                formData.append('tend',this.time[index][1]);
                this.api.themes_schedule_cycle_edit(formData).then((res)=>{
                    this.getData();
                })
            },
            dels(id){
                this.sc=true;
                this.cycle_id=id;
            },
            heidqx(){
                this.sc=false;
            },
            del(){
                let formData=new FormData;
                formData.append('cycle_id',this.cycle_id);
                this.api.themes_schedule_cycle_del(formData).then((res)=>{
                    this.getData();
                    this.heidqx();
                })
            },
            heidADD(){
                this.add=false
            },
            Adds(){
                this.add=true;
            },
            AddXQ(id){
              this.$router.push({
                  path:"./select_theme",
                  query:{
                      schedule_id:this.$route.query.schedule_id,
                      cycle_id:id,
                      tstart:this.$route.query.tstart,
                      tend:this.$route.query.tend,
                  },
              })
            },

            CkDetails(data){
                this.$router.push({
                    path:"./xqDetails",
                    query:{
                        data:data,
                        schedule_id:this.$route.query.schedule_id,
                    }
                })
            },
        },

    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:126px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .titName span{
        display: inline-block;
        margin: 0 0 20px 24px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .jl,.zq,.dc{
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;

    }
    .jl{
        width:124px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .zq{
        width:96px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .dc{
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        color:rgba(255,255,255,1);
    }
    .num{
        font-size:12px!important;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,0.45)!important;
    }
    .timeZQ{
        display: inline-block;
        margin-left: 24px;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .seach{
        border-radius:4px;
        margin-top: 210px;
        margin-bottom: 24px;
        overflow-x: auto;
    }
    .ADDtime,.ADDtimes{
        display: inline-block;
        width:315px;
        height:72px;
        background:rgba(255,255,255,1);
        text-align: center;
        cursor: pointer;
        margin: 0 0 10px 0;
        vertical-align: top;
    }
    .ADDtimes{
        text-align: left!important;
        margin:0  10px 10px 0!important;
    }
    .ADDtimes>div>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 13px 0px 8px 20px;
    }
    .ADDtime img,.ADDtime span,.addData img,.addData span{
        position: relative;
        top:50%;
        transform: translateY(-50%);
    }
    .ADDtime img,.addData img{
        width: 12px;
        height: 12px;
        margin-right: 5px;
    }
    .ADDtime span,.addData span,.ADDtimes>span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
    }
    .ADDtimes>span{
        margin-left: 20px;
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
    .newData{
        width:460px;
        min-height:255px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .newDatas{
        width:300px;
        min-height:200px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .tit_top{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .tit_name{
        width: 104px;
        text-align: right;
        margin: 0 12px 0px 0px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    input{
        width:262px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .tit_name1{
        width: 104px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin: 0 12px 0px 0px;
    }
    .date{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-bottom: 20px
    }
    .date1{width: 100%}
    .date1 .el-input__inner{
        border: none;
    }
    .ADDbtn{
        text-align: center;
    }
    .ADDbtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tj{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: none!important;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .addData{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        cursor: pointer;
        text-align: center;
        margin-left: 117px;
        margin-bottom: 20px;
    }
.ADDtimes>div>img{
    width:11px;
    height:6px;
    float: right;
    margin-right: 14px;
    margin-top: 15px;
}
    .pd{
        width:315px;
        height:130px;
        background:rgba(255,255,255,1);
        padding:14px 0px;
        margin-bottom: 10px;
    }
    .qdNmae{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin: 0 8px 8px 16px;
    }
    .xq{
        display: inline-block;
        margin-left: 16px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
    }
    .qdxq{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    input{
        width: 90%;
        margin-bottom: 0;
    }
    select,textarea{
        width: 90%;
        height: 36px;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1)
    }
   .updated{
       display: inline-block;
       width:80px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
         cursor: pointer;
         font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 36px;
        margin-right: 20px;

   }
   .disqualify{
        display: inline-block;
       width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(31,46,77,1);
         text-align: center;
        line-height: 36px;
        cursor: pointer;
        margin-bottom: 50px
   }
</style>