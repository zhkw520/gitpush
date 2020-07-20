<template>
<div class='bg'>
    <div class='content'>
        <div class="titName">
                <span>预计结算数据详情</span>
                <img src="../../../public/img/gb.png" @click="heidMassage()">
        </div>
        <div class='switcher' v-if='this.is_receiver==1'>
            <span :class="{pitch:this.num==0}" style="margin-right:82px" @click='listData("0")'>结算数据</span>
            <span :class="{pitch:this.num==1}" @click='listData("1")' >数据凭证</span>
        </div>
        <div class='table' v-if='this.num==0'>
                <template>
                    <el-table
                            :data="list"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="id"
                                label="日期"
                                style="text-align:left"
                                >
                            <template slot-scope="scope" style="text-align:left">
                                <span>{{list[scope.$index].tdate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="remit.receive_amount"
                                label="预期结算金额">
                            <template slot-scope="scope" style="text-align:right">
                                <span>￥{{parseFloat(list[scope.$index].income / 100).toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
        </div>
        <div style='height:41px'  v-if='this.num==0'>
            <span style="display:inline-block;width:46%;text-align:left;font-size:12px;font-family:Roboto-Regular,Roboto;font-weight:400;color:rgba(23,43,77,1);margin-left:20px;line-height:41px">合计</span>
            <span style="display:inline-block;width:47%;text-align:right;font-size:12px;font-family:Roboto-Regular,Roboto;font-weight:400;color:rgba(23,43,77,1);margin-right:20px;line-height:41px">￥{{price}}</span>
        </div>
        <div class='CKmassage'  v-if='this.num==0'>
            <span @click="getMsg()">查看详细信息</span>
        </div>
       <!-- <div class="block"  v-if='this.num==0'>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="p"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div> -->
        <div v-if='this.num==1'>
            <div class='titNames'>
                <span class='titName_tit'>附件</span>
                 <span class='icon' v-if='up'>+</span> 
                <div class='titName_add' v-if='up'>
                    <el-upload
                            class="aaa"
                            :http-request="uploadf"
                             action="111"
                            multiple
                            >
                            <span size="small" type="primary">添加</span>
                    </el-upload>
                   
                </div>
            </div>
            <div v-for="(item,index) in (this.fj.attachs.concat(this.attachs))" style="margin:0 0 10px 24px">
               <span class='fjName'>{{item.name}}</span>
                <a class='xz' :href="item.url">下载</a>
                <span class='sc' @click="delFJ(index)" v-if="decan">删除</span>
            </div>
             <el-progress :percentage="this.times" v-if="jd"></el-progress>
        </div>
        <div class='btn_bottom' v-if='this.num==1'>
            <span class='cancel' @click='heidMassage()'>取消</span>
            <span class='bj' @click='modifier(0)' v-if='edit'>编辑</span>
            <span class='ok' v-if="qd" @click='affirm()'>确认</span>
            <span class='bc' @click='modifier(1)' v-if='replenish'>补充文件</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
props:['name','tstart','tend','is_receiver','id','a','fj','type','channels','projects'],
components: {},
data() {
    return {
            list:[],
            p:50,
            page:1,
            total:0,
            num:0,
            price:'',
            qd:false,
            decan:false,
            up:false,
            authority:[],
            edit:false,
            replenish:false,
            index:'',
            times:"",
            fcounter:0,
            jd:false,
            attachs:[],
    };
},
    mounted(){
        this.getData();
        this.authority=JSON.parse(localStorage.getItem('control'));
        for(var i=0;i<this.authority.length;i++){
            if(this.authority[i].uri=='demandsettle/opt/audit/add'){
                this.edit=true;
                return
            }
            if(this.authority[i].uri=='demandsettle/opt/audit/edit'){
                this.replenish=true;
                return
            }
        }
    },
    methods: {
        modifier(num){
            if(num==0){
                this.decan=true;
                this.edit=false;
                this.index=num;
            }
            if(num==1){
                this.replenish=false;
                this.index=num;
            }
            this.qd=true;
            this.up=true;
        },
        affirm(){
            if(this.index==0){
                 this.redact()
            }else{
                this.add()
            }
        },
        add(){
            let formData=new FormData;
            formData.append('id',this.id);
            formData.append('is_receiver',this.is_receiver);
            formData.append('attachs',JSON.stringify(this.fj.attachs.concat(this.attachs)));
            this.api.demandsettle_opt_audit_add(formData).then((res)=>{
                if(res!=false){
                    this.heidMassage();
                }
            })
        },
        redact(){
             let formData=new FormData;
            formData.append('id',this.id);
            formData.append('is_receiver',this.is_receiver);
            formData.append('attachs',JSON.stringify(this.fj.attachs.concat(this.attachs)));
            this.api.demandsettle_opt_audit_edit(formData).then((res)=>{
                if(res!=false){
                    this.heidMassage();
                }
            })
        },
         scope(){
                var _this=this;
                _this.times=0;
                var timer = setInterval(function () {
                    if(_this.times<99){
                        _this.times++
                    }
                },100);
            },
        uploadf(file){
            this.jd=true;
                this.times=0;
                ++this.fcounter;
                this.scope();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_private_upload(formData).then((res)=>{
                    this.attachs.push(res);
                    this.times=100;
                    --this.fcounter;
                    this.jd=false;
                })
            },
        heidMassage(){
                    this.$parent.heidDetail();
                    this.attachs=[];
        },
        listData(num){
            this.num=num;
            this.getData();
        },
        delFJ(index){
            (this.fj.attachs).splice(index, 1);
        },
        //  handleSizeChange(p) { // 每页条数切换
        //         this.p = p;
        //         this.getData()
        //     },
        //     handleCurrentChange(page) {//页码切换
        //         this.page = page;
        //         this.getData()
        //     },
            getMsg(){
                console.log(window.location.hash.split("?")[0])
                let urld = window.location.hash.split("?")[0];
                if(urld == '#/income/Payment_operation/details'){
                    let routeData = this.$router.resolve({
                    path:"../AdvertisingNoSettlement",
                    query:{
                        tstart:this.tstart,
                        tend:this.tend,
                        is_receiver:this.is_receiver,
                        name:this.name,
                        }
                    });
                     window.open(routeData.href, '_blank');
                }else if(urld == '#/workbench/ALL'){
                    let routeData = this.$router.resolve({
                    path:'/income/Advertising',
                    query:{
                            tstart:this.tstart,
                            tend:this.tend,
                            is_receiver:this.is_receiver,
                            name:this.name,
                            type:this.type
                        }
                    });
                    window.open(routeData.href, '_blank');
                }else{
                    let routeData = this.$router.resolve({
                    path:'../Advertising',
                    query:{
                            tstart:this.tstart,
                            tend:this.tend,
                            is_receiver:this.is_receiver,
                            name:this.name,
                            type:this.type
                        }
                    });
                    window.open(routeData.href, '_blank'); 
                }
            },
        getData(){
            if(this.a==undefined){
                var params={id:this.$route.query.id,is_receiver:this.is_receiver,projects:this.projects,channels:this.channels}
            }else{
                 params={id:this.id,is_receiver:this.is_receiver,projects:this.projects,channels:this.channels}
            }
           
            this.api.settle_data_estimate_list({params}).then((res)=>{
                this.list=res.data;
               
                this.price = 0;
                for(var i=0;i<res.data.length;i++){

                //     unit+=parseFloat(res.data[i].income);
                // console.log(parseFloat(res.data[i].income))
                // }
                // console.log(unit)
                // this.price=unit;

                    this.price += parseFloat(res.data[i].income);
                }


                this.price = parseFloat(this.price / 100).toFixed(2);
            })
        },
        getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
        cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
        },    

    },
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
    .content{
        position: absolute;
        left: 50%;
        top:30%;
        transform: translate(-50%,-50%);
        width:800px;
        height:546px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        
        
    }
    .titName{
        height:44px;
        background:rgba(244,245,247,1);
        border-radius:4px 4px 0px 0px;
    }
    .titName span{
        display: inline-block;
        margin: 8px 0 4px 28px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(23,43,77,1);
    }
    .titName img{
        width:16px;
        height:16px;
        float: right;
        margin: 14px 28px 0 0 ;
        cursor: pointer;
    }
    .switcher{
        height:48px;
        background:rgba(255,255,255,1);
        text-align: center;
    }
    .switcher span{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        line-height: 48px;
        cursor: pointer;
        display: inline-block;
    }
    .pitch{
        color: #0052CC!important;
        border-bottom: 1px solid #0052CC
    }
    .table{
        height: 280px;
        margin-top: 1px;
        overflow-y:auto ;
    }
    .CKmassage{
        height: 30px;
        text-align: right;
    }
    .CKmassage span{
        display: inline-block;
        color: #0052CC;
        cursor: pointer;
        line-height: 30px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        margin-right: 20px;
    }
    .titNames{
        border-top:1px solid rgba(223, 225, 230, 1);
        height: 46px;
    }
    .titName_tit{
       display: inline-block;
      font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:500;
        color: rgba(31, 44, 77, 1);
        margin-left: 24px;
        line-height: 46px;
    }
    .titName_add{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        cursor: pointer;
    }
    .icon{
        color:rgba(0, 82, 204, 1);
        margin:0 10px
    }
    .fjName{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(38,52,82,1);
    }
    .xz,.sc{
      display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,119,255,1);  
        margin-left: 12px;
        cursor: pointer;
    }
    .btn_bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 56px;
        width: 100%;
    }
    .bj,.ok,.bc{
        display: inline-block;
        width:60px;
        height:32px;
        background:rgba(0,82,204,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:32px;
        text-align: center;
        border-radius: 5px; 
        margin: 11px 12px 0 0;
        float: right;
        cursor: pointer;
    }
    .bc{
        width:88px!important;
    }
    .cancel{
        display: inline-block;
        width:60px;
        height:32px;
        border:1px solid rgba(165,173,186,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        line-height:32px;
         text-align: center;
        border-radius: 5px; 
        margin: 11px 24px 0 0;
        float: right;
        cursor: pointer;
    }
</style>