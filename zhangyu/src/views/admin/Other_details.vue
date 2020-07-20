<template>
    <div>
         <div class='titTop'>
             <div>
                 <span class='topName_left' @click="fh(-1)">{{this.$route.query.type=='sls_dynamic'?'场景锁屏动效':this.$route.query.type=='f_call_show'?'来电秀':this.$route.query.type=='sls_picture'?'杂志锁屏壁纸':this.$route.query.type=='ad_picture'?'广告图':"广告模板"}}/</span>
                 <span class='topName_right'>查看详情</span>
             </div>
             <div>
                 <span class='text_name'>查看详情</span>
             </div>
         </div>
         <div class='message_text'>
             <div class='message_tit'>
                 <span >结算信息</span>
             </div>
             <div>
                 <span class='message_tit_name'>绑定设计师：</span>
                 <span class='message_tit_content' v-if='listData.id_card'>{{listData.open_id+''+"("+listData.name+""+listData.id_card+")"}}</span>
                 <span class='message_tit_content' v-if='listData.code'>{{listData.open_id+''+"("+listData.name+""+listData.code+")"}}</span>
             </div>
             <div>
                 <span class='message_tit_name'>项目ID：</span>
                 <span class='message_tit_content'>{{project_id}}</span>
             </div>
             <div>
                 <span class='message_tit_name'>结算方式：</span>
                 <span class='message_tit_content'>{{listData.settle_type==1?"买断结算":listData.settle_type==2?"分成结算":""}}</span>
             </div>
             <div>
                 <span class='message_tit_name'>{{listData.settle_type==1?"买断价格":listData.settle_type==2?"分成比例":""}}：</span>
                 <span class='message_tit_content'>{{listData.settle_type==1?'￥'+listData.settle_value:listData.settle_type==2?listData.settle_value+'%':""}}</span>
             </div>
         </div>
         <div class='ht' v-if='this.$route.query.type=="f_call_show"'>
            <div class='message_tit'>
                <span>上架记录</span>
            </div>
            <div class='ADDJL'>
                <span @click='ADDrecord()'>添加上架记录</span>
            </div>
            <div  class="contract">
                    <template>
                        <el-table
                                :data="channel_themes"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                        >
                            <el-table-column
                                    prop="date"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">渠道:</span>
                                        <span class="titTableCon">{{channel_themes[scope.$index].channel}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">上架名称:</span>
                                        <span class="titTableCon">{{channel_themes[scope.$index].channel_call_show_name}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                             <el-table-column
                                    prop="name"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">上架时间:</span>
                                        <span class="titTableCon">{{channel_themes[scope.$index].tdate}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    
                                        <div v-if='channel_themes[scope.$index].price'>
                                            <span style="margin-left:45px">上架单价：</span>
                                            <span style="display: inline-block;width:30%">{{'￥'+channel_themes[scope.$index].price}}</span>
                                            <span>资源文件：</span>
                                            <span style="display: inline-block">{{channel_themes[scope.$index].attach.name}}</span>
                                            <a :href="channel_themes[scope.$index].attach.url" target="_blank" style="display: inline-block;text-align: right;cursor: pointer;">下载</a>
                                        </div>
                                   
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
            </div>
         </div>
         <div class='ht'  v-if='this.$route.query.type=="f_call_show"'>
            <div class='message_tit'>
                <span>相关合同</span>
            </div>
            <div class='ADDht'>
                <span @click='ADDht()'>添加合同</span>
            </div>
            <div  class="contract">
                    <template>
                        <el-table
                                :data="contracts"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                        >
                            <el-table-column
                                    prop="date"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">文件归档号:</span>
                                        <span class="titTableCon">{{contracts[scope.$index].archive_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">合同编号:</span>
                                        <span class="titTableCon">{{contracts[scope.$index].contract_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="100"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span v-if="contracts[scope.$index].status=='1'" style="color:#39BD65">{{contracts[scope.$index].status_text}}</span>
                                        <span v-if="contracts[scope.$index].status=='0'" style="color:#FFA033">{{contracts[scope.$index].status_text}}</span>
                                        <span v-if="contracts[scope.$index].status=='2'" style="color:#F05656">{{contracts[scope.$index].status_text}}</span>
                                        <span v-if="contracts[scope.$index].status=='3'" style="color:#1F2E4D">{{contracts[scope.$index].status_text}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="50"
                            >
                                <template slot-scope="scope">
                                    <img src="../../../public/img/dels.png" style="cursor: pointer" @click="DelContract(contracts[scope.$index].archive_id)"/>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <div>
                                        <div v-for="da in contracts[scope.$index].contract_files">
                                            <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                            <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right;cursor: pointer;">下载</a>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
            </div>
         </div>
         <div class='xgSC'>
             <div class='message_tit'>
                 <span >相关素材</span>
             </div>
             <div class='img_boxs'>
                 <div class='imgBOX' v-for='item in dataLIST'>
                      <div class='imgs'>
                          <img :src="item.prev_uri" alt="">
                      </div>
                      <span class='img_id'>{{item.mid}}</span>
                 </div>
             </div>
         </div>
         <div class='xgSC' v-if='this.$route.query.type!="f_call_show"'>
             <div class='message_tit' >
                 <span >相关物料</span>
             </div>
             <div class='img_boxs'>
                 <div class='imgBOX' v-for='(item,index) in Materials'>
                      <div class='imgs'>
                          <img :src="item.prev_uri" alt="">
                      </div>
                      <span class='img_id'>{{item.mid}}</span>
                 </div>
             </div>
         </div>
         <div class='ht'  v-if='this.$route.query.type!="f_call_show"'>
            <div class='message_tit' >
                <span >相关合同</span>
            </div>
            <div class='ADDht'>
                <span @click='ADDht()'>添加合同</span>
            </div>
            <div  class="contract">
                    <template>
                        <el-table
                                :data="contracts"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                        >
                            <el-table-column
                                    prop="date"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">文件归档号:</span>
                                        <span class="titTableCon">{{contracts[scope.$index].archive_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span class="titTableName">合同编号:</span>
                                        <span class="titTableCon">{{contracts[scope.$index].contract_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="100"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <span v-if="contracts[scope.$index].status=='1'" style="color:#39BD65">{{contracts[scope.$index].status_text}}</span>
                                        <span v-if="contracts[scope.$index].status=='0'" style="color:#FFA033">{{contracts[scope.$index].status_text}}</span>
                                        <span v-if="contracts[scope.$index].status=='2'" style="color:#F05656">{{contracts[scope.$index].status_text}}</span>
                                        <span v-if="contracts[scope.$index].status=='3'" style="color:#1F2E4D">{{contracts[scope.$index].status_text}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="50"
                            >
                                <template slot-scope="scope">
                                    <img src="../../../public/img/dels.png" style="cursor: pointer" @click="DelContract(contracts[scope.$index].archive_id)"/>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <div>
                                        <div v-for="da in contracts[scope.$index].contract_files">
                                            <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                            <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right;cursor: pointer;">下载</a>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
            </div>
         </div>
         <div class='bg' v-if='record'>
             <div class='htTC'>
                 <div class='htTC_tit'>
                     <span>添加上架记录</span>
                 </div>
                 <div>
                     <span class='htTC_name'>附件：</span>
                     <el-upload
                            class="demo_sc"
                            action="a"
                            :http-request="fj"
                            >
                            <el-button size="small" type="primary">选择附件</el-button>
                    </el-upload>   
                 </div>
                 <div>
                     <span class='htTC_name'>上架时间：</span>
                      <el-date-picker
                        v-model="time"
                        type="datetime"
                        value-format='yyyy-MM-dd-HH-ss'
                        placeholder="选择日期时间">
                    </el-date-picker>
                 </div>
                 <div>
                     <span class='htTC_name'>渠道：</span>
                      <select style="margin-right: 44px" v-model="channel">
                            <option value="">全部</option>
                            <option :value="item.channel" v-for="item in channels">{{item.channel_name}}</option>
                    </select>
                 </div>
                 <div>
                     <span class='htTC_name'>上架名称：</span>
                     <input type="text" v-model='channel_call_show_name '>
                 </div>
                  <div>
                     <span class='htTC_name'>上架单价：</span>
                     <input type="number" v-model="price">
                 </div>
                 <div class='btns'>
                     <span class='qd' @click='setRecord()'>确定</span>
                     <span @click='qx()'>取消</span>
                 </div>
             </div>
         </div>
          <div class="bg" v-if="ht">
            <div class="content">
                <div class="content_tit">
                    <span style="margin-left:24px">添加合同</span>
                </div>
                <div style="margin-top:24px">
                    <input type="text" class="content_input" placeholder="搜索文件归档号" v-model="contract_id"/>
                    <span class="content_seach" @click="getHT()">查询</span>
                </div>
                <div style="margin: 14px 20px" v-for="item in listS">
                    <div>
                        <span class="ContractID">合同编号：</span>
                        <span style="display: inline-block;width: 200px;height: 20px" class="ContractID">{{item.contract_id}}</span>
                        <span v-if="item.status=='1'" class="statusColor" style="color:#39BD65;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='0'" class="statusColor" style="color:#FFA033;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='2'" class="statusColor" style="color:#F05656;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='3'" class="statusColor" style="color:#1F2E4D;float: right">{{item.status_text}}</span>
                        <div>
                            <span  class="ContractID">归档文件：</span>
                            <div v-for="da in item.contract_files" style="display: inline-block">
                                <div>
                                    <span class="imgName">{{da.name}}</span>
                                    <a class="content_xz" target="_blank" :href="da.url" >下载</a>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div class="content_btn">
                    <span class="btn_tj" @click="setContract()">添加</span>
                    <span @click="heidHTs()">取消</span>
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
        data(){
            return{
                contracts:[],
                time:"",
                record:false,
                ht:false,
                listS:[],
                contract_id:"",
                channel_themes:[],
                Materials:[],
                dataLIST:"",
                channels:[],
                channel:'',
                channel_call_show_name:"",
                price:"",
                attach:{},
                listData:{},
                load:true,
                project_id:"",
            }
        },
        mounted(){
            this.getContract();
        },
        methods:{
             getRowClass({row, column, rowIndex, columnIndex}) {
                    if (rowIndex === 0) {
                        return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:blod;font-family:PingFang-SC-Medium;height:56px'
                    } else {
                        return ''
                    }
            },
            cell({row, column, rowIndex, columnIndex}){
                    return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
            },
            fh(index){
                this.$router.go(index)
            },
            ADDrecord(){
                this.record=true
            },
            qx(){
                this.record=false;
                this.channel='';
                this.time='';
                this.channel_call_show_name='';
                this.price='';
                this.attach={}
            },
            ADDht(){
                this.ht=true
            },
            heidHTs(){
                this.ht=false,
                this.contract_id=''
            },
             getHT(){
                    let params={contract_id:this.contract_id};
                    this.api.common_contract({params}).then((res)=>{
                        this.listS=res;
                    })
                },
             fj(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attach=res;
                })
            },    
            
             qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                })
            },
            getRecord(){
                let params={mfid:this.$route.query.mfid}
                this.api.mfinal_call_show_records({params}).then((res)=>{
                    this.channel_themes=res
                })
            },
            setRecord(){
                if(!this.attach.name){
                    this.$message.error('附件不能为空');
                    return
                }
                 if(!this.channel){
                    this.$message.error('渠道不能为空');
                    return
                }
                 if(!this.channel_call_show_name){
                    this.$message.error('上架名称不能为空');
                    return
                }
                 if(!this.price){
                    this.$message.error('上架价格不能为空');
                    return
                }
                 if(this.price<=0){
                    this.$message.error('上架价格不能小于零');
                    return
                }
                 if(!this.time){
                    this.$message.error('上架时间不能为空');
                    return
                }
                let formData =new FormData;
                formData.append('mfid',this.$route.query.mfid)
                formData.append('attach',JSON.stringify(this.attach))
                formData.append('channel',this.channel)
                formData.append('channel_call_show_name',this.channel_call_show_name)
                formData.append('price',this.price)
                formData.append('tdate',this.time)
                this.api.mfinal_call_show_records_add(formData).then((res)=>{
                    this.getRecord();
                    this.qx()
                })
            }, 
            getContract(){
                this.load=true
                if(this.$route.query.material==1){
                    var params={rid:this.$route.query.mid,type:this.$route.query.type}
                }else{
                    params={rid:this.$route.query.mfid,type:this.$route.query.type}
                }
                this.api.contracts_list({params}).then((res)=>{
                   this.contracts=res
                   this.getLIST();
                   this.load=false
                })
            },
            getDetails(){
                 if(this.$route.query.material==1){
                   let params={mid:this.$route.query.mid}
                   this.api.material_detail({params}).then((res)=>{
                       this.listData=res.settlement_info;
                       this.project_id=res.project_id
                   })
                }else{
                   let params={mfid:this.$route.query.mfid}
                   this.api. mfinal_detail({params}).then((res)=>{
                        this.listData=res.settlement_info
                        this.project_id=res.project_id
                   })
                }
            },
            DelContract(id){
                 if(this.$route.query.material==1){
                    var formData =new FormData
                    formData.append('rid',this.$route.query.mid)
                    formData.append('type',this.$route.query.type)
                    formData.append('contract_id',id)
                }else{
                    formData =new FormData
                    formData.append('rid',this.$route.query.mfid)
                    formData.append('type',this.$route.query.type)
                    formData.append('contract_id',id)
                }
                this.api.contracts_del(formData).then((res)=>{
                    this.getContract()
                })
            },
            setContract(){
                 if(this.$route.query.material==1){
                     var formData=new FormData;
                    formData.append('rid',this.$route.query.mid)
                    formData.append('type',this.$route.query.type)
                    formData.append('contract_id',this.contract_id)
                 }else{
                    formData=new FormData;
                    formData.append('rid',this.$route.query.mfid)
                    formData.append('type',this.$route.query.type)
                    formData.append('contract_id',this.contract_id)
                 }
                this.api.contracts_add(formData).then((res)=>{
                    if(res!=false){
                        this.heidHTs();
                        this.getContract();

                    }
                })
            },
            getMaterials(){
                let params={mid:this.$route.query.mid}
                this.api.material_mfinals({params}).then((res)=>{
                    this.Materials=res.data
                })
            },
            getLIST(){
                if(this.$route.query.material==1){
                    let params = {'mid':this.$route.query.mid}
                    this.api.material_bind_get({params}).then((res)=>{
                        this.dataLIST = res;
                        this.getDetails();
                        this.getMaterials();
                    })
                }else{
                    let params={"mfid":this.$route.query.mfid};
                        this.api.mfinal_bind_get({params}).then((res)=>{
                            this.dataLIST = res
                            this.getRecord();
                            this.getDetails();
                            this.qd()
                        })
                    }
            },
        },
}
</script>

<style scoped>
.titTop{
    width:100%;
    height: 100px;
    border-top:1px solid #ededed;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    position: fixed;
    left: 256px;
    top:63px;
    z-index: 8 !important;
}
.topName_left{
    display: inline-block;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:20px;
    color:rgba(73,85,110,1);
    opacity:0.48;
    margin: 19px 0 19px 19px;
    cursor: pointer;
}
.topName_right{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:20px;
    color:rgba(73,85,110,1);
    opacity:1
}
.text_name{
    display: inline-block;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:20px;
    color:rgba(73,85,110,1);
    opacity:1;
    margin: 0 0 0 19px;
    }
    .message_text{
        width: 100%;
        height:257px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(200,201,204,0.5);
        opacity:1;
        border-radius:2px;
        margin-top: 181px;
    }
    .message_tit{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #ddd;
    }
    .message_tit span{
        display: inline-block;
        line-height: 48px;
        margin-left: 24px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(50,50,51,1);
        opacity:1;
    }
    .message_tit_name{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        opacity:1;
        margin: 24px 0 0 24px;
    }
    .message_tit_content{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        opacity:1;
    }
    .xgSC{
        margin-top: 16px;
        width: 100%;
        height:382px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(200,201,204,0.5);
        opacity:1;
        border-radius:2px;
    }
    .img_boxs{
        margin: 24px 24px 24px 0;
    }
    .imgBOX{
        width: 147PX;
        margin-left: 24px;
    }
    .imgs{
        width:147px;
        height:260px;
        background:rgba(222,222,222,1);
        opacity:1;
        position: relative;
    }
    .imgs img{
        max-width: 147px;
        max-height: 260px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .img_id{
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(50,50,51,1);
        opacity:1;
        margin-top: 8px;
    }
    .ht{
        width: 100%;
        margin-top: 16px;
        background: #fff;
    }
    .ADDht span ,.ADDJL span{
        display: inline-block;
        width:88px;
        height:32px;
        background:rgba(51,119,255,1);
        opacity:1;
        border-radius:4px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        margin: 12px 0 0 24px;
    }
    .ADDJL span{
       width:116px!important;
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
    .htTC{
        width:580px;
        min-height:419px;
        background:rgba(255,255,255,1);
        opacity:1;
        border-radius:4px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);

    } 
    .htTC_tit{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #ddd;

    }
    .htTC_tit span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:48px;
        margin-left: 16px;
        color:rgba(50,50,51,1);
        opacity:1;
    }
    .htTC_name{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:22px;
        color:rgba(50,50,51,1);
        opacity:1;
        width: 80px;
        margin: 34px 0 0 16px;
    }
    .demo_sc{
        display: inline-block;
    }
    .htTC input{
        width:390px;
        padding-left: 10px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
    }
    .htTC select{
        width:400px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
    }
    .btns span{
        display: inline-block;
        text-align: center;
        cursor: pointer;
        width:74px;
        height:32px;
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:4px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(50,50,51,1);
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        color:#fff!important;
        border: 0!important;
        margin: 28px 16px 27px 104px;
    }

     .content{
        position: relative;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .content_tit{
        border-bottom: 1px solid #ddd;
        height: 40px;
    }
    .content_tit span{
        display: inline-block;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 0px 0 24px 0px;
        line-height: 40px;
    }
    .content_btn{
        position: absolute;
        width: 100%;
        bottom: 0;
        margin-bottom: 24px;
        text-align: right;
    }
.content_btn span{
    display: inline-block;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    width:80px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-right: 20px;
}
 .btn_tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
    }
    .content_input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin:0  24px 0 20px;
    }
     .content_seach{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
</style>