<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/流程管理</span>
            <div class="title_left">
                <span>流程管理</span>
                <img src="../../../public/img/msg.png" @click="getTitle"/>
            </div>
        </div>
        <div class="centNavBox">
            <div class="center">
                <span>业务需求流程</span>
            </div>
            <div class="yw_select">
                <span>业务类型</span>
                <select v-model="type" @change="getConductorList">
                    <option v-for="(item,index) in YWtypeList" :value="item.type">{{item.name}}</option>
                </select>
            </div>
            <div class="steplist">
                <div class="step " v-for="(item,index) in list">
                    <div style="display: inline-block" v-if='item.status!=100'>
                        <span class="step_box">{{item.status}}</span>
                        <span class="step_text">{{item.status_name}}</span>
                        <div class="step_name">
                            <div class="step_img" v-for="(da,index2) in item.user">
                                <span class="step_txt" @mouseenter="delXS1(index,index2)" @mouseleave="leave()">{{da.user_name}}
                                    <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(num1==index2&&nums1==index)}" @click="del(da.user_id,item.id)"/>
                                </span>
                            </div>
                            <div class="add" @click="getBan(index)">
                                <span class="step_add"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                                <span class="step_add_txt">添加</span>
                            </div>
                        </div>
                        <div class="tag" v-if="item.status_name=='物料审核'">
                            <span :class="{active:audit_type==2}" @click="tag(item.id)">或签</span>
                            <span :class="{active:audit_type==1}" @click="tagTwo(item.id)">会签</span>
                    </div>

                    </div>
                    <div v-if="item.status!=6&&item.status!=100" style="width: 120px;height: 2px;background:#E6E9F0;display: inline-block;vertical-align: top;margin-top: 20px"></div>
                    
                </div>
                <div class="banner" v-if="ban" :style="{left:this.left+'px',top:this.top+'px'}">
                    <span class="tit">负责人</span>
                    <div>
                        <input  type="text" v-model="search" @change="getAccountList()"/>
                    </div>
                    <div class="add_name">
                        <p v-for="(item,index) in this.tableData" @click="userName(index)">{{item.user_name}}</p>
                    </div>
                    <div class="banner_btn">
                        <span class="qd" @click="ADDuserName('demand_business',type)">确定</span>
                        <span @click="heidBan()">取消</span>
                    </div>

                </div>
                <div class='all' > 
                    <span style="margin-right:16px">全部内容可见人员：</span>
                    <span class='user_name' v-for='(key,index) in list[list.length-1].user'   @mouseenter="delName(list[list.length-1].id,index)" @mouseleave="leaves()">{{key.user_name}}
                            <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(project_id==list[list.length-1].id&&indexs==index)}" @click="del(key.user_id,list[list.length-1].id)"/>
                    </span>
                     <span class="step_add" @click='getBan(99)'><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                </div>
            </div>
        </div>

        <div class="centNavBox_2">
            <div class="center">
                <span>素材需求流程</span>
            </div>
            <div class="yw_select">
                <span>素材类型</span>
                <select v-model="WLtype" @change="wlConductorList">
                    <option v-for="(item,index) in SCtypeList" :value="item.type">{{item.name}}</option>
                </select>
            </div>
            <div class="steplist">
                <div class="step " v-for="(item,index) in YClist">
                    <div style="display: inline-block" v-if='item.status!=100'>
                        <span class="step_box">{{item.status}}</span>
                        <span class="step_text">{{item.status_name}}</span>
                        <div class="step_name">
                            <div class="step_img" v-for="(da,index2) in item.user">
                                <span class="step_txt" @mouseenter="delXS2(index,index2)" @mouseleave="leave()">{{da.user_name}}
                                    <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(num2==index2&&nums2==index)}"  @click="del(da.user_id,item.id)"/>
                                </span>
                            </div>
                            <div class="add" @click="getBan1(index)">
                                <span class="step_add"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                                <span class="step_add_txt">添加</span>
                            </div>
                        </div>
                        <div class="tag" v-if="item.status_name=='发布审核'">
                            <span :class="{active1:SCaudit_type==2}" @click="SCtag(item.id)">或签</span>
                            <span :class="{active1:SCaudit_type==1}" @click="SCtagTwo(item.id)">会签</span>
                        </div>
                    </div>
                    <div v-if="item.status!=5&&item.status!=100" style="width: 120px;height: 2px;background:#E6E9F0;display: inline-block;vertical-align: top;margin-top: 20px"></div>
                </div>
                <div class="banner" v-if="ban1" :style="{left:this.left+'px',top:this.top+'px'}">
                    <span class="tit">负责人</span>
                    <div>
                        <input  type="text" v-model="search" @change=" getAccountList()"/>
                        <div></div>
                    </div>
                    <div class="add_name">
                        <p v-for="(item,index) in this.tableData" @click="userName(index)">{{item.user_name}}</p>
                    </div>
                    <div class="banner_btn">
                        <span class="qd" @click="ADDuserName('demand_material',WLtype)">确定</span>
                        <span @click="heidBan()">取消</span>
                    </div>
                </div>
                 <div class='all'> 
                        <span style="margin-right:16px">全部内容可见人员：</span>
                         <span class='user_name' v-for='(key,index) in YClist[YClist.length-1].user' @mouseenter="delName(YClist[YClist.length-1].id,index)" @mouseleave="leaves()">{{key.user_name}}
                            <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(project_id==YClist[YClist.length-1].id&&indexs==index)}" @click="del(key.user_id,YClist[YClist.length-1].id)"/>
                        </span>
                        <span class="step_add" @click='getBan1(99)'><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                </div>
            </div>
        </div>

        <div class="centNavBox_3">
            <div class="center">
                <span>提现流程</span>
            </div>
            <div class="steplist">
                <div class="step" v-for="(item,index) in TXlist">
                    <div style="display: inline-block" v-if='item.status!=100'>
                        <span class="step_box">{{item.status}}</span>
                        <span class="step_text">{{item.status_name}}</span>
                        <div class="step_name">
                            <div class="step_img" v-for="(da,index2) in item.user">
                                <span class="step_txt"  @mouseenter="delXS(index,index2)" @mouseleave="leave()">{{da.user_name}}
                                    <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(num==index2&&nums==index)}" @click="del(da.user_id,item.id)"/>
                                </span>
                            </div>
                            <div class="add" @click="getBan2(index)">
                                <span class="step_add"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                                <span class="step_add_txt">添加</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.status!=5&&item.status!=100" style="width: 120px;height: 2px;background:#E6E9F0;display: inline-block;vertical-align: top;margin-top: 20px"></div>
                </div>
                <div class="banner bannerTop" v-if="ban2" :style="{left:this.left+'px',top:this.top+'px'}">
                    <span class="tit">负责人</span>
                    <div>
                        <input  type="text" v-model="search" @change="getAccountList()"/>
                        <div></div>
                    </div>
                    <div class="add_name">
                        <p v-for="(item,index) in this.tableData" @click="userName(index)">{{item.user_name}}</p>
                    </div>
                    <div class="banner_btn">
                        <span class="qd" @click="ADDuserName('demand_apply')">确定</span>
                        <span @click="heidBan()">取消</span>
                    </div>
                </div>
                 <div class='all'> 
                        <span style="margin-right:16px">全部内容可见人员：</span>
                        <span class='user_name' v-for='(key,index) in TXlist[TXlist.length-1].user'  @mouseenter="delName(TXlist[TXlist.length-1].id,index)" @mouseleave="leaves()">{{key.user_name}}
                            <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(project_id==TXlist[TXlist.length-1].id&&indexs==index)}" @click="del(key.user_id,TXlist[TXlist.length-1].id)"/>
                        </span>
                        <span class="step_add" @click='getBan2(99)'><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                </div>
            </div>
        </div>
        <div class="centNavBox_4">
            <div class="center">
                <span>收款结算流程</span>
            </div>
            <div class="steplist">
                <div class="step" v-for="(item,index) in SKlist">
                    <div style="display: inline-block" v-if='item.status!=100'>
                        <span class="step_box">{{item.status}}</span>
                        <span class="step_text">{{item.status_name}}</span>
                        <div class="step_name">
                            <div class="step_img" v-for="(da,index2) in item.user">
                                <span class="step_txt"  @mouseenter="delXS3(index,index2)" @mouseleave="leave()">{{da.user_name}}
                                    <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(num3==index2&&nums3==index)}" @click="del(da.user_id,item.id)"/>
                                </span>
                            </div>
                            <div class="add" @click="getBan3(index)">
                                <span class="step_add"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                                <span class="step_add_txt">添加</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.status<6" style="width: 120px;height: 2px;background:#E6E9F0;display: inline-block;vertical-align: top;margin-top: 20px"></div>
                </div>
                <div class="banner bannerTop" v-if="ban3" :style="{left:this.left+'px',top:this.top+'px'}">
                    <span class="tit">负责人</span>
                    <div>
                        <input  type="text" v-model="search" @change="getAccountList()"/>
                        <div></div>
                    </div>
                    <div class="add_name">
                        <p v-for="(item,index) in this.tableData" @click="userName(index)">{{item.user_name}}</p>
                    </div>
                    <div class="banner_btn">
                        <span class="qd" @click="ADDuserName('demand_settle_receive')">确定</span>
                        <span @click="heidBan()">取消</span>
                    </div>
                </div>
                 <div class='all'> 
                        <span style="margin-right:16px">全部内容可见人员：</span>
                         <span class='user_name' v-for='(key,index) in SKlist[SKlist.length-1].user'  @mouseenter="delName(SKlist[SKlist.length-1].id,index)" @mouseleave="leaves()">{{key.user_name}}
                            <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(project_id==SKlist[SKlist.length-1].id&&indexs==index)}" @click="del(key.user_id,SKlist[SKlist.length-1].id)"/>
                        </span>
                        <span class="step_add" @click='getBan3(99)'><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                </div>
            </div>
        </div>
        <div class="centNavBox_5">
            <div class="center">
                <span>付款结算流程</span>
            </div>
            <div class="steplist">
                    <div class="step" v-for="(item,index) in FKlist">
                    <div style="display: inline-block" v-if='item.status!=100'>
                        <span class="step_box">{{item.status}}</span>
                        <span class="step_text">{{item.status_name}}</span>
                        <div class="step_name">
                            <div class="step_img" v-for="(da,index2) in item.user">
                                <span class="step_txt"  @mouseenter="delXS4(index,index2)" @mouseleave="leave()">{{da.user_name}}
                                    <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(num4==index2&&nums4==index)}" @click="del(da.user_id,item.id)"/>
                                </span>
                            </div>
                            <div class="add" @click="getBan4(index)">
                                <span class="step_add"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                                <span class="step_add_txt">添加</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.status<6" style="width: 120px;height: 2px;background:#E6E9F0;display: inline-block;vertical-align: top;margin-top: 20px"></div>
                </div>
                <div class="banner bannerTop" v-if="ban4" :style="{left:this.left+'px',top:this.top+'px'}">
                    <span class="tit">负责人</span>
                    <div>
                        <input  type="text" v-model="search" @change="getAccountList()"/>
                        <div></div>
                    </div>
                    <div class="add_name">
                        <p v-for="(item,index) in this.tableData" @click="userName(index)">{{item.user_name}}</p>
                    </div>
                    <div class="banner_btn">
                        <span class="qd" @click="ADDuserName('demand_settle_paying')">确定</span>
                        <span @click="heidBan()">取消</span>
                    </div>
                </div>
                 <div class='all'> 
                        <span style="margin-right:16px">全部内容可见人员：</span>
                         <span class='user_name'  v-for='(key,index) in FKlist[FKlist.length-1].user'   @mouseenter="delName(FKlist[FKlist.length-1].id,index)" @mouseleave="leaves()">{{key.user_name}}
                            <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(project_id==FKlist[FKlist.length-1].id&&indexs==index)}" @click="del(key.user_id,FKlist[FKlist.length-1].id)"/>
                        </span>
                        <span class="step_add" @click='getBan4(99)'><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                </div>
            </div>
        </div>
       <div class="centNavBox_5">
            <div class="center">
                <span>分成金额审核</span>
            </div>
            <div class="yw_select">
                <span>分成金额审核</span>
                <select v-model="SQtype" @change="getCallShow()">
                   <option value="1">主题</option>
                   <option value="2">来电秀</option>
                   <option value="3">素材</option>
                </select>
            </div>
            <div class="steplist">
                <div class="step " v-for="(item,index) in SQlist">
                    <div style="display: inline-block" v-if='item.status!=100'>
                        <span class="step_box">{{item.status}}</span>
                        <span class="step_text">{{item.status_name}}</span>
                        <div class="step_name">
                            <div class="step_img" v-for="(da,index2) in item.user">
                                <span class="step_txt" @mouseenter="delXS1(index,index2)" @mouseleave="leave()">{{da.user_name}}
                                    <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(num1==index2&&nums1==index)}" @click="del(da.user_id,item.id)"/>
                                </span>
                            </div>
                            <div class="add" @click="getBan5(index)">
                                <span class="step_add"><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                                <span class="step_add_txt">添加</span>
                            </div>
                        </div>
                        <!-- <div class="tag" v-if="item.status_name=='物料审核'">
                            <span :class="{active:audit_type==2}" @click="tag(item.id)">或签</span>
                            <span :class="{active:audit_type==1}" @click="tagTwo(item.id)">会签</span>
                    </div> -->

                    </div>
                    <div v-if="item.status!=3&&item.status!=100" style="width: 120px;height: 2px;background:#E6E9F0;display: inline-block;vertical-align: top;margin-top: 20px"></div>
                    
                </div>
                <div class="banner bannerTop" v-if="ban5" :style="{left:this.left+'px',top:this.top+'px'}">
                    <span class="tit">负责人</span>
                    <div>
                        <input  type="text" v-model="search" @change="getAccountList()"/>
                    </div>
                    <div class="add_name">
                        <p v-for="(item,index) in this.tableData" @click="userName(index)">{{item.user_name}}</p>
                    </div>
                    <div class="banner_btn">
                        <span class="qd" @click="ADDuserName('demand_sharing_income',SQtype)">确定</span>
                        <span @click="heidBan()">取消</span>
                    </div>
                </div>
                <div class='all' > 
                    <span style="margin-right:16px">全部内容可见人员：</span>
                    <span class='user_name' v-for='(key,index) in SQlist[SQlist.length-1].user'   @mouseenter="delName(SQlist[SQlist.length-1].id,index)" @mouseleave="leaves()">{{key.user_name}}
                            <img src="../../../public/img/del.png" style="width: 16px;opacity:0" :class="{getImg:(project_id==SQlist[SQlist.length-1].id&&indexs==index)}" @click="del(key.user_id,SQlist[SQlist.length-1].id)"/>
                    </span>
                     <span class="step_add" @click='getBan(99)'><img src="../../../public/img/add_msg.png" style="width: 12px;margin-top: 12px"></span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="title">
            <div class="content">
                <div class="tit_sm">
                    <span>配置说明</span>
                    <img src="../../../public/img/yc.png" @click="heidTitle"/>
                </div>
                <div class="tit_txt">
                    <span>与各需求类型流程相关，需配置对应责任人：</span>
                    <span> 1、每个流程中对应的可选择责任人的配置项，必须至少选择一个责任人；</span>
                    <span> 2、或签:任意一人通过审核；会签:必须所有人都通过审核</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "process",
        data(){
            return{
                YWtypeList:[],
                SCtypeList:[],
                type:'f_ad_picture',
                WLtype:'ad_picture',
                SQtype:'1',
                list:[],
                YClist:[],
                ban:false,
                index:'',
                audit_type:2,
                SCaudit_type:2,
                title:false,
                search:'',
                user:[],
                tableData:'',
                user_id:'',
                ban1:false,
                ban2:false,
                ban3:false,
                ban4:false,
                ban5:false,
                TXlist:[],
                SKlist:[],
                FKlist:[],
                SQlist:[],
                num:null,
                nums:null,
                num1:null,
                nums1:null,
                num2:null,
                nums2:null,
                num3:null,
                nums3:null,
                num4:null,
                nums4:null,
                left:'',
                top:'',
                project_id:"",
                indexs:""
            }
        },
        mounted(){
            this.getYWtype();
        },
        methods:{
            getYWtype(){
                let params ={material:0};
                this.api.config_material_type({params}).then((res)=>{
                    this.YWtypeList = res;
                    this.getSCtype();
                })
            },
            getSCtype(){
                let params ={material:1};
                this.api.config_material_type({params}).then((res)=>{
                    this.SCtypeList = res;
                    this.getConductorList();
                    this.wlConductorList();
                    this.txConductorList();
                    this.ReceivablesList();
                    this.paymentList();
                    this.getCallShow();
                })
            },
            
            getConductorList(){
                let params= {demand_type:'demand_business',type:this.type};
                this.api.process_list({params}).then((res)=>{
                    this.list = res;
                    this.audit_type=res[3].audit_type;
                })
            },
            getCallShow(){
                let params={demand_type:"demand_sharing_income",type:this.SQtype};
                this.api.process_list({params}).then((res)=>{
                    this.SQlist= res;
                })
            },
            wlConductorList(){
                let params= {demand_type:'demand_material',type:this.WLtype};
                this.api.process_list({params}).then((res)=>{
                    this.YClist = res;
                    this.SCaudit_type=res[1].audit_type;
                })
            },
            txConductorList(){
                let params= {demand_type:'demand_apply'};
                this.api.process_list({params}).then((res)=>{
                    console.log(res);
                    this.TXlist = res;
                })
            },
            ReceivablesList(){
                let params= {demand_type:'demand_settle_receive'};
                this.api.process_list({params}).then((res)=>{
                    this.SKlist = res;
                })
            },
            paymentList(){
                let params= {demand_type:'demand_settle_paying'};
                this.api.process_list({params}).then((res)=>{
                    this.FKlist = res;
                })
            },
            ADDuserName(demandType,type){
                if(type==undefined){
                    let formData = new FormData;
                    formData.append("demand_type",demandType);
                    formData.append('status',this.index+1);
                    formData.append("user_id",this.user_id);
                    formData.append('audit_type',this.audit_type);
                    this.api.process_add_auditor(formData).then((res)=>{
                        this.user_id='';
                        this.search='';
                        this.getConductorList();
                        this.wlConductorList();
                        this.txConductorList();
                        this.ReceivablesList();
                        this.paymentList();
                        this.getCallShow();
                        this.ban = false;
                        this.ban1 = false;
                        this.ban2 = false;
                        this.ban3 = false;
                        this.ban4 = false;
                        this.ban5 = false;
                        this.left='';
                        this.search='';
                        this.tableData=[];

                    })
                }else{
                    let formData = new FormData;
                    formData.append("demand_type",demandType);
                    formData.append('type',type);
                    formData.append('status',this.index+1);
                    formData.append("user_id",this.user_id);
                    formData.append('audit_type',this.audit_type);
                    this.api.process_add_auditor(formData).then((res)=>{
                        this.user_id='';
                        this.search='';
                        this. getConductorList();
                        this.wlConductorList();
                        this.txConductorList();
                        this.ReceivablesList();
                        this.paymentList();
                        this.getCallShow()
                        this.ban = false;
                        this.ban1 = false;
                        this.ban2 = false;
                        this.ban3 = false;
                        this.ban4 = false;
                        this.ban5 = false
                        this.left=''
                        this.search='';
                        this.tableData=[];

                    })
                }

            },
            getBan(index){
                this.ban=true;
                this.index=index;
                if(index!=99){
                    this.left=this.index*276;
                }
                if(index==99){
                    this.top=-10;
                }else{
                    this.top=-200
                }
                
                this.ban2=false;
                this.ban1=false;
                this.ban3=false;
                this.ban4=false;
                this.ban5 = false
            },
            getBan1(index){
                this.ban1=true;
                this.index=index;
                if(index!=99){
                    this.left=this.index*276;
                }
                 if(index==99){
                    this.top=-10;
                }else{
                    this.top=-200
                }
                this.ban=false;
                this.ban2=false;
                this.ban3=false;
                this.ban4=false;
                this.ban5 = false

            },
            getBan2(index){
                this.ban2=true;
                this.index=index;
                if(index!=99){
                    this.left=this.index*276;
                }
                 if(index==99){
                    this.top=-10;
                }else{
                    this.top=-200
                }
                this.ban1=false;
                this.ban3=false;
                this.ban4=false;
                this.ban=false;
                this.ban5 = false

            },
            getBan3(index){
                this.ban3=true;
                this.index=index;
                if(index!=99){
                    this.left=this.index*276;
                }
                 if(index==99){
                    this.top=-10;
                }else{
                    this.top=-200
                }
                this.ban1=false;
                this.ban2=false;
                this.ban4=false;
                this.ban=false;
                this.ban5 = false

            },
            getBan4(index){
                this.ban4=true;
                this.index=index;
                if(index!=99){
                    this.left=this.index*276;
                }
                 if(index==99){
                    this.top=-10;
                }else{
                    this.top=-200
                }
                this.ban1=false;
                this.ban2=false;
                this.ban3=false;
                this.ban=false;
                this.ban5 = false

            },
             getBan5(index){
                this.ban5=true;
                this.index=index;
                if(index!=99){
                    this.left=this.index*276;
                }
                 if(index==99){
                    this.top=-10;
                }else{
                    this.top=-200
                }
                this.ban1=false;
                this.ban2=false;
                this.ban3=false;
                this.ban=false;
                this.ban4 = false

            },
            heidBan(){
                this.ban=false;
                this.ban1=false;
                this.ban2=false;
                 this.ban3=false;
                this.ban4=false;
                this.ban5 = false
                this.left='';
                this.search=''
                this.tableData=[];
            },
            getListUser(){
                let params = {search:this.search}
                this.api.get_accounts({params}).then((res)=>{
                    
                })
            },
            tag(id){
                this.audit_type=2;
                this.countersign(id,2)
            },
            tagTwo(id){
                this.audit_type=1;
                this.countersign(id,1)
            },
            SCtag(id){
                this.SCaudit_type=2;
                this.countersign(id,2)
            },
            SCtagTwo(id){
                this.SCaudit_type=1;
                this.countersign(id,1)
            },
            getTitle(){
                this.title=true
            },
            heidTitle(){
                this.title=false;
            },
            countersign(id,num){
                let formData = new FormData;
                formData.append("id",id);
                formData.append('audit_type',num)
                this.api.process_edit_audittype(formData).then((res)=>{

                })
            },
            getAccountList(){
                this.tableData=[];
                let params ={p:100,page:1,search:this.search};
                this.api.account_all({params}).then((res)=>{
                    this.tableData = res.data;
                    console.log(this.tableData)
                })
            },
            userName(index){
                this.search = this.tableData[index].user_name;
                this.user_id = this.tableData[index].user_id;
            },
            del(USERid,id){
                let formData = new FormData;
                formData.append("user_id",USERid);
                formData.append("id",id);
                this.api.process_del_auditor(formData).then((res)=>{
                    this. getConductorList();
                    this. wlConductorList();
                    this.txConductorList();
                    this.ReceivablesList();
                    this.paymentList();
                })
            },
            delName(id,index){
                this.project_id=id;
                this.indexs=index;
            },
              delName2(id,index){
                this.project_id=id;
                this.indexs=index;
            },
              delName3(id,index){
                this.project_id=id;
                this.indexs=index;
            },
              delName4(id,index){
                this.project_id=id;
                this.indexs=index;
            },
              delName5(id,index){
                this.project_id=id;
                this.indexs=index;
            },
            leaves(){
                this.project_id='';
                this.indexs='';
            },
            delXS(da,index){
                this.nums =da ;
                this.num= index;
            },
            delXS1(da,index){
                this.nums1 =da ;
                this.num1= index;
            },
            delXS2(da,index){
                this.nums2 =da ;
                this.num2= index;
            },
            delXS3(da,index){
                this.nums3 =da ;
                this.num3= index;
            },
            delXS4(da,index){
                this.nums4 =da ;
                this.num4= index;
            },
            leave(){
                this.nums=null;
                this.num= null;
                this.nums1=null;
                this.num1= null;
                this.nums2=null;
                this.num2= null;
                this.nums3=null;
                this.num3= null;
                this.nums4=null;
                this.num4= null;
            }
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 999999;
        bottom: 0;
        right: 0;
    }
    .content{
        position: absolute;
        width:635px;
        height:229px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .centNavBox,.centNavBox_2,.centNavBox_3,.centNavBox_4,.centNavBox_5{
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:194px;
    }
    .centNavBox_3,.centNavBox_4,.centNavBox_4,.centNavBox_5{
        min-height: 552px;
    }
    .centNavBox_2,.centNavBox_3,.centNavBox_4,.centNavBox_5{margin-top:24px!important;}
    .top_name{
        height: 109px;
        z-index: 99;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .title_left img{
        width:16px;
        height:16px;
        margin-left: 8px;
        cursor: pointer;
    }
    .center{
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .center span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        margin-left: 24px;
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .yw_select{
        margin-top: 23px;
    }
    .yw_select span{
        display: inline-block;
        text-align: center;
        margin:0 24px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .yw_select select{
        width:192px;
        height:36px;
        padding-left: 8px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .steplist{
        margin-top: 34px;
    }
    .step{
        display: inline-block;
        text-align: center;
        vertical-align: top;
    }
    .step>div{
        width: 156px;
    }
    .step:first-child{
        margin-left: 62px;
    }
    .steplist:last-child{
        margin-right: 0px!important;
    }
    .step_name{max-width: 160px}
    .step_box{
        display: inline-block;
        width:32px;
        height:32px;
        border-radius: 50%;
        background:rgba(51,119,255,1);
        text-align: center;
        line-height: 32px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-bottom: 22px;
    }
    .step_text{
        display: block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:bold;
        color:#8f9bb3;
    }
    .step_add{
        display: inline-block;
        width:36px;
        height:36px;
        background:rgba(230,233,240,1);
        border-radius: 50%;
        text-align: center;
        line-height: 36px;
        color: #ffff;
        margin-top: 14px;
    }
    .step_img{
        display: inline-block;
        text-align: center;
        /*margin-right:10px;*/
    }
    .step_img span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(143,155,179,1);
    }
    .step_add_txt{
        display: block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(48,144,240,1);
        margin-top: 12px;
    }
    .add{
        display: block;
        cursor: pointer;
    }
    .step_txt{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(61,73,102,1);
        cursor: pointer;
        height: 20px;
        vertical-align: top;
    }
    .getImg{
       opacity: 1!important;
    }
    .banner{
        margin-top: 10px;
        width:240px;
        position: relative;
        top: -200px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .bannerTop{
        margin-top: 200px;
    }
    .add_name{
        margin-top: 10px;
        width:240px;
        max-height:164px;
        position: relative;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        overflow-y: auto;
    }
    .add_name p{
        margin-left: 24px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .tit{
        display: block;
        line-height: 40px;
        margin-left: 20px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .banner input{
        width:195px;
        height:36px;
        padding-left: 5px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-left: 20px;
    }
    .banner_btn{
        margin-top: 24px;
        margin-left: 20px;
    }
    .banner_btn span{
        cursor: pointer;
        display: inline-block;
        width:68px;
        height:36px;
        line-height: 36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        text-align: center;
    }
    .qd{
        background:rgba(51,119,255,1)!important;
        color:rgba(255,255,255,1)!important;
        margin-right: 14px;
    }
    .tag{
        margin-top: 60px;
        margin-bottom: 24px;
    }
    .tag span{
        display: inline-block;
        width:44px;
        height:20px;
        background:rgba(255,255,255,1);
        border-radius:2px 0px 0px 2px;
        border:1px solid #D3DBEB;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
        cursor: pointer;
    }
    .active{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
    }
    .active1{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
    }
    .tit_sm{
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
    .tit_sm span{
        display: inline-block;
        text-align: center;
        line-height: 56px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
    }
    .tit_sm img{
        width:16px;
        height:16px;
        position: relative;
        right: -500px;
        cursor: pointer;
    }
    .tit_txt{
        margin-top: 23px;
    }
    .tit_txt span{
        display: block;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin-left: 24px;
        margin-bottom: 20px;
    }
    .all{
        margin-left:24px;
    }
    .all span{
        margin-bottom: 30px;
    }
    .user_name{
        display: inline-block;
        border:1px solid #ddd;
        padding:3px 5px;
        border-radius: 3px;
        margin-right: 10px;
    }
</style>
