<template>
    <div>
        <div class="top_name">
            <span class="top_txt">杂志锁屏物料</span>
            <div class="tit_name">
                <span>查看杂志锁屏</span>
            </div>
            <div class="search_criteria">
                <div class="date">
                    <el-date-picker
                            v-model="date"
                            @change="getData()"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="num">
                    <span>数量:</span>
                    <span>{{this.total}}</span>
                     <span class="dated" v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">(已过期)</span>
                </div>
            </div>
        </div>
        <div class="box" v-if="this.dataList.length>0">
            <div class="box_img" v-for="(item,index) in this.dataList">
                <div class="left_img">
                     <img :src="item.mfinal.prev_uri" v-if="((item.mfinal.prev_uri).split('.'))[((item.mfinal.prev_uri).split('.')).length-1]!='mp4'" />
                    <video :src="item.mfinal.prev_uri" v-if="((item.mfinal.prev_uri).split('.'))[((item.mfinal.prev_uri).split('.')).length-1]=='mp4'"></video>
                </div>
                <div class="right_txt">
                    <div>
                        <span class="right_txt_name">物料ID</span>
                        <span class="right_txt_content">{{item.mfid}}</span>
                    </div>
                    <div class="img_size">
                        <span class="right_txt_name">尺寸</span>
                        <span class="right_txt_content">{{item.mfinal.size}}</span>
                    </div>
                    <div>
                        <span class="right_txt_name">文件</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024).toFixed(0)>=1&&(item.mfinal.attach.size/1024/1024).toFixed(0)<1">{{(item.mfinal.attach.size/1024).toFixed(0)}}kb</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024/1024).toFixed(1)>=1&&(item.mfinal.attach.size/1024/1024/1024).toFixed(1)<1">{{(item.mfinal.attach.size/1024/1024).toFixed(1)}}MB</span>
                        <span class="right_txt_content" v-if="(item.mfinal.attach.size/1024/1024/1024).toFixed(2)>=1">{{(item.mfinal.attach.size/1024/1024/1024).toFixed(2)}}GB</span> 
                        <a :href="item.mfinal.attach.url">下载</a>
                    </div>
                    <!-- <div class="img_size">
                        <span class="right_txt_name">线上埋点状态</span>
                        <span class="right_txt_content">{{item.status_online==0?'不通过':"审核通过"}}</span>
                    </div> -->
                    <div class="img_size">
                        <span class="right_txt_name">审核状态</span>
                          <span class="right_txt_content">{{item.status==0?"待审核":item.status==1?"审核通过":'审核不通过'}}</span>
                        <span class="right_txt_content  yy" @click='updateStatus(index)' v-if="item.status==0" v-show="isShow">更新状态</span>
                    </div>
                     <div class="img_size">
                        <span class="right_txt_name">上线状态</span>
                        <span class="right_txt_content">{{item.status_check==0?'待确定':item.status_check==1?'已上线':'未上线'}}</span>
                    </div>
                     <div class="img_size" v-if="item.note">
                        <span class="right_txt_name">原因说明</span>
                        <!-- <span class="right_txt_content">{{item.note}}</span> -->
                         <div v-if="item.note!=undefined" style="display:inline-block;max-width:100px;overflow: hidden;height:15px">
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts" >
                                    <div slot="content" class="text">{{item.note}}</div>
                                    <span  class="text" style="overflow: hidden;width: 100px;height: 24px;margin-left: 10px">{{item.note}}</span>
                                </el-tooltip>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="null_content" v-if="this.dataList.length==0">
            <img src="../../../public/img/null.png">
            <span class="prompt_message">无相关资源，若有疑问，请联系管理人员</span>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next,total, jumper"
                    :total="total">
            </el-pagination>
        </div>
         <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>更新状态</span>
                </div>
                <div class='sel'>
                    <select v-model="status">
                        <option value="1">审核通过</option>
                        <option value="2">审核不通过</option>
                    </select>
                    <div class='sel_1' v-if="status=='2'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="测试不通过" class='aaa'></el-checkbox>
                            <el-checkbox label="内容差"  class='aaa'></el-checkbox>
                            <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                            <el-checkbox label="其他"  class='aaa bb'>
                                <template>
                                    <span style="margin-right:10px">其他</span>
                                    <textarea placeholder="最多20字" maxlength="20" disabled v-model="yy" v-if="checkList.indexOf('其他')==-1"></textarea>
                                     <textarea placeholder="最多20字" maxlength="20"  v-model="yy" v-if="checkList.indexOf('其他')!=-1"></textarea>
                                </template>
                            </el-checkbox>
                        </el-checkbox-group>
                        
                    </div>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd" @click="pushLib()">确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "journal_of_push",
        data(){
            return{
                date:(new Date()).toLocaleDateString().split('/').join('-'),
                ADDwl:false,
                plid:'2',
                dataList:[],
                total:0,
                pageSize:8,
                currentPage: 1,
                show:false,
                tc:false,
                status:"",
                checkList:[],
                yy:"",
                index:"",
                isShow: true,
            }
        },
        mounted(){
            this.getData();
            
        },
        methods:{
            handleSizeChange1(pageSize) { // 每页条数切换
                this.pageSize = pageSize;
                this.getData()
            },
            handleCurrentChange1(currentPage) {//页码切换
                this.currentPage = currentPage;
                this.getData()
            },
            updateStatus(index){
               this.tc=true;
                 if(index==''){
                   this.index=0;
               }else{
                   this.index=index;
               }
           },
           qx(){
               this.tc=false;
               this.status='';
               this.checkList=[];
           },
            pushLib(){
             let formData= new FormData;
             formData.append('status',this.status),
             formData.append('plid',this.dataList[this.index].plid),
             formData.append('mfid',this.dataList[this.index].mfid),
             formData.append('note',this.checkList.join(',')+this.yy)   
                this.api.pushlib_external_audit(formData).then((res)=>{
                    if(res!=false){
                        this.qx();
                         this.getData();
                    }
                })
           },
            getData(){
                if(new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)){
                    this.isShow = false;
                }
                let params = {p:this.pageSize,page:this.currentPage,tdate:this.date};
                this.api.pushlib_external_mfinal({params}).then((res)=>{
                    this.dataList = res.data;
                    this.total=res.total;
                    this.$previewRefresh()
                })
            },
        },
    }
</script>

<style scoped>
    a{
        display: inline-block;
        width:44px;
        height:20px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 14px;
    }
    .top_txt,.tit_name span{
        margin-left: 24px;
    }
    .top_name{
        height: 166px;
    }
    .tit_name span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .tit_name{
        margin-bottom: 24px;
    }
    .search_criteria {
        padding: 0 24px;
    }
    .search_criteria div{
        display: inline-block;
    }
    .date{
        margin-right: 12px;
    }
    .num span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }

    .action_btn span{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }

    .box{
        margin-top: 244px;
    }
    .box_img{
        display: inline-block;
        width:380px;
        height:189px;
        position: relative;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin:0px 20px 24px 0;
    }
    /*.box_img:nth-child(4n){*/
        /*margin-right: 0!important;*/
    /*}*/
    .left_img{
        display: inline-block;
        width:116px;
        height:149px;
        background:rgba(227,231,235,1);
        border-radius:2px;
        margin-left: 15px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
    .left_img img ,.left_img video{
        max-width: 99px;
        max-height: 149px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .right_txt{
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 150px;
    }
    .right_txt div{
        height: 25px;
    }
    .right_txt_name{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .right_txt_content{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 10px;
    }
    .null_content{
        text-align: center;
        position: relative;
        margin-top: 400px;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .prompt_message{
        display: block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        text-align: center;
    }
     .dated{
        display: inline-block;
        margin-left: 10px;
        color: red!important;
    }
    .yy{
        color: #3377ff!important;
        cursor: pointer;
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
        max-height:400px;
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
   }
   .sel_btn span{
    margin-right: 24px;
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
       border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
   }
</style>