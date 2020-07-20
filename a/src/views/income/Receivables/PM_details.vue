<template>
  <div>
       <div class="top_name">
            <span class="top_txt"  @click='fh(-2)'>广告收款结算 /</span>
            <span class="top_txt" @click='fh(-1)'>项目管理/</span>
            <span class="top_txt">项目详情</span>
            <div class="title_left">
                <span>项目详情</span>
                <span class='bj' @click='bg()' v-if='type==1'>编辑</span>
            </div>
        </div>
        <div class='select_box'>
            <div class='select_tit'>
                <span style="margin-left:24px">必要信息</span>
            </div>
            <div class='select_bh'>
                <span>企业微信审批编号:</span>
                <span>{{this.approve_id}}</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>项目名称：<span class="err" v-if="name_valid==0">(存在项目重名，数据无效)</span></span>
                 <input type="text" class='input_left' :class='{examine:this.type==1}' :disabled="type==1" v-model='project_name' >
                <span class='select_left'>合作公司：<span class="err" v-if='!this.company_id&&this.company_name!=""'>(合作公司不存在，数据无效)</span></span>
                <input type="text" class='input_left' @focus='focuson()'  v-model='company_name' @input='focuson()' :class='{examine:this.type==1}' :disabled="type==1">
                <ul v-if='old'>
                    <li @click='oldADD(company_name)' v-if="company_name && OLDname==false">新增"{{company_name}}"为合作公司</li>
                    <li v-for='(item,index) in company' @click='select_check(index)'>{{item.name}}</li>
                 </ul>
                <span class='select_left' style="width:100%">广告类型：一级分类 </span>
                <input type="text" class='input_left examine' v-model='ad_type' v-if='type==1' disabled>
                <select v-model='ad_type' class='input_left' @change='getType(1)' :class='{examine:this.type==1}' v-if="type==2">
                    <option :value="item" v-for="item in list">{{item}}</option>
                </select>   

            </div>
            <div class='select_box_2'>
                <span class='select_left'>结算主体：<span class="err" v-if='state1&&balance_id==""'>(结算主体不存在，数据无效)</span></span>
                 <el-autocomplete
                        :class='{examine:this.type==1}' 
                        :disabled="type==1"
                        class="inline-input"
                        v-model="state1"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        >
                    </el-autocomplete>
                 <span class='select_left'>上线时间：</span>
                  <el-date-picker
                    v-if='type==2'
                    v-model="online_time"
                    class='datetimes'
                    type="datetime"
                    value-format='yyyy-MM-dd-HH-mm-ss'
                    placeholder="选择日期时间">
                </el-date-picker>
                <input type="text" v-model="online_time" class='input_left examine' v-if='type==1' disabled >
                <span class='select_left' v-if='ad_type&&this.list2.length>0'>二级分类</span>
                 <input type="text" class='input_left examine' v-model='ad_type2' v-if='ad_type2&&type==1' disabled>
                 <select name="" id="" class='input_left' v-model='ad_type2'  v-if='ad_type&&this.list2.length>0&&this.type==2' @change='getType(2)' >
                    <option :value="item" v-for="item in list2">{{item}}</option>
                </select>
            </div>
            <div class='select_box_3' :class="{top:ad_type2&&this.list3.length==0}">
                <span class='select_left'>投放形式</span>
                 <input type="text" class='input_left examine' v-model='put_type' v-if='type==1' disabled>
                 <select class='input_left' v-model="put_type"  v-if='this.type==2' >
                     <option value="" >请选择</option>
                     <option value="常规业务" >常规业务</option>
                     <option value="试玩业务" >试玩业务</option>
                </select>
                <span class='select_left'  v-if='ad_type2&&this.list3.length>0'>三级分类</span>
                 <input type="text" class='input_left examine' v-model='ad_type3' v-if='ad_type3&&type==1' disabled>
                 <select name="" id="" class='input_left' v-model="ad_type3"  v-if='ad_type2&&this.list3.length>0&&this.type==2' >
                     <option :value="item" v-for="item in list3">{{item}}</option>
                </select>
            </div>
           <div>
               <span class='sw' >商务模式</span>
           </div>
           <div>
               <template>
                    <el-table
                            :data="bussiness_types"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="margin-right:24px;color:#000">
                        <el-table-column
                                label="生效时间" prop="starttime"
                               >
                        </el-table-column>
                        <el-table-column
                                label="失效时间" prop="endtime"
                                >
                                 <template slot-scope="scope">
                                    <span v-if='bussiness_types[scope.$index].endtime'>{{bussiness_types[scope.$index].endtime}}</span>
                                    <span v-if='bussiness_types[scope.$index].endtime==""'>-</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="计费方式" prop="cost_type">
                        
                        </el-table-column>
                        <el-table-column
                                label="分成模式(ZK)" prop="profit_share_ratio"
                                >
                        </el-table-column>
                        <el-table-column
                                label="结算模式" prop="balance_type"
                                >
                        </el-table-column>
                         <el-table-column
                                label="固价价格" prop="fix_price"
                                >
                        </el-table-column>
                         <el-table-column
                                label="修改时间" prop="updated_at"
                                >
                        </el-table-column>
                        <el-table-column label="操作人员" prop="updator">
                            
                        </el-table-column>
                         <el-table-column label="操作" v-if='this.type==2'>
                            <template slot-scope="scope">
                                <el-button type="text" @click='swADD(2,scope.$index)'>编辑</el-button>
                                <el-button type="text" @click='sc(scope.$index)'>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <div class='SWADD'  v-if='type==2'>
                    <span @click='swADD(1)'>+添加</span>
                </div>
           </div>

        </div>
        <div class='ht'>
            <div  class='select_tit'>
                <span style="margin-left:24px">相关合同 <span class="err">(待补充)</span></span>
            </div>
            <div  v-if='type==2'><span class="ADDs" @click="ADDht()">添加合同</span></div>
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
                                <template slot-scope="scope" v-if='this.type==2'>
                                    <img src="../../../../public/img/dels.png" style="cursor: pointer" @click="del(scope.$index)"/>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <div>
                                        <div v-for="da in contracts[scope.$index].contract_files">
                                            <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                            <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right">下载</a>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
            </div>
        </div>
        <div class='fj'>
            <div   class='select_tit'>
                <span style="margin-left:24px">附加信息</span>
            </div>
             <div class='select_bh'>
                <span>报备信息</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>报备媒体：</span>
                 <input type="text" class='input_left' v-model="report_media" :class='{examine:this.type==1}' :disabled="type==1">
                <span class='select_left'>广告主id：</span>
                <input type="text" class='input_left' v-model="report_ad_id" :class='{examine:this.type==1}' :disabled="type==1">
                <span class='select_left' style="width:100%">直客链接是否自动更新版本：</span>
                <select name="" id="" class='input_left' v-model="report_link_auto_update" :class='{examine:this.type==1}' :disabled="type==1">
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select>   

            </div>
             <div class='select_box_2'>
                <span class='select_left'>报备广告位：</span>
                 <input type="text" class='input_left' v-model="report_space_id" :class='{examine:this.type==1}' :disabled="type==1">
                <span class='select_left'>直客链接：</span>
                <input type="text" class='input_left' v-model="report_link" :class='{examine:this.type==1}' :disabled="type==1">
            </div>
             <div class='select_bh'>
                <span>需求量级</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>请求量：</span>
                 <input type="text" class='input_left' v-model="ad_req_pv" :class='{examine:this.type==1}' :disabled="type==1">
                <span class='select_left'>点击量：</span>
                <input type="text" class='input_left' v-model="ad_click_pv" :class='{examine:this.type==1}' :disabled="type==1">
            </div>
             <div class='select_box_2'>
                <span class='select_left'>展示量：</span>
                 <input type="text" class='input_left' v-model="ad_show_pv" :class='{examine:this.type==1}' :disabled="type==1">
                <span class='select_left'>下载量：</span>
                <input type="text" class='input_left' v-model="ad_download_pv" :class='{examine:this.type==1}' :disabled="type==1">
            </div>
             <div class='select_bh'>
                <span>备注</span>
            </div>
            <div>
                <textarea v-model="note" :class='{examine:this.type==1}' :disabled="type==1"></textarea>
            </div>
             <div class='select_bh'>
                <span>附件：</span>
            </div>
            <div style=" min-height: 60px;">
                <div class="upFJ" v-if='type==2'>
                    <el-upload
                            class="upload-demo"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            multiple
                            action="111">
                        <el-button size="small" type="primary">上传</el-button>
                    </el-upload>
                    <el-progress :percentage="this.times" v-if="up"></el-progress>
                </div>
                <div style="margin: 14px 0 14px 0px" v-for="(item,index) in attachements">
                            <div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);">{{item.name}}</div>
                            <a class="content_xz" :href="item.url" target="_blank">下载</a>
                    <span class="content_xz" @click="dels(index)" v-if="type==2">删除</span>
                </div>
            </div>
        </div>
        <div class='btns' v-if="type==2">
                <span class='bc' @click="projectBj()">保存</span>
                <span @click='setType()'>取消</span>
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
                    <span class="btn_tj" @click="heidHT()">添加</span>
                    <span @click="heidHTs()">取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if='sw'>
            <div class='swBox'>
                <div class="content_tit">
                    <span>{{this.num==1?'添加':'编辑'}}</span>
                </div>
                <div>
                    <span>生效时间：</span>
                    <el-date-picker
                        v-model="starttime"
                        class='datetimes'
                        type="date"
                        value-format='yyyy-MM-dd'
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div>
                    <span>失效时间：</span>
                    <el-date-picker
                        v-model="endtime"
                        class='datetimes'
                        value-format='yyyy-MM-dd'
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div>
                    <span>计费方式：</span>
                    <select v-model="cost_type" class='datetime'>
                        <option value="未知">未知</option>
                        <option value="CPM">CPM</option>
                        <option value="CPC">CPC</option>
                        <option value="CPD">CPD</option>
                        <option value="CPA">CPA</option>
                        <option value="CPS">CPS</option>
                    </select>
                </div>
                <div>
                    <span>分成模式：</span>
                    <input type="text" placeholder="请输入百分比，例如30%" class='datetime' v-model="profit_share_ratio">
                </div>
                <div>
                    <span>结算模式：</span>
                    <select name="" id="" class='datetime' v-model="balance_type">
                        <option value="未知">未知</option>
                        <option value="以zk数据为准">以zk数据为准</option>
                        <option value="以广告主反馈数据为准（包括后台）">以广告主反馈数据为准（包括后台）</option>
                    </select>
                </div>
                <div>
                    <span v-if='balance_type!="未知"'>固定价格：</span>
                    <input type='number' placeholder="请输入" class='datetime' v-model="fix_price" v-if='balance_type!="未知"'>
                </div>
                <div class='btns' style="box-shadow:0 0 0 #fff">
                    <span class='bc' style="margin-left:95px" @click='push()'>确定</span>
                    <span @click="swHeid()">取消</span>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
            data(){
                return{
                    ht:false,
                    sw:false,
                       level:"",
                       list:[],
                       list2:[],
                       list3:[],
                       one:"",
                       two:"",
                       three:"",
                       tableData:[],
                       online_time:"",
                       old:false,
                       company:[],
                       company_name:"",
                       listData:{},
                       project_name:"",
                       company_id:"",
                       ad_type:"",
                       ad_type2:"",
                       ad_type3:"",
                       bussiness_types:[],
                       attachements:[],
                       contracts:[],
                       contract:[],
                       report_media:"",
                       report_ad_id:"",
                       report_space_id:'', 
                       report_link:"",
                       ad_req_pv:"",
                       ad_click_pv:"",
                       ad_show_pv:"",
                       ad_download_pv:"",
                       note:"",
                       report_link_auto_update:'0',
                       contract_id:'',
                       listS:[],
                       state1:"",
                       balance_id:'',
                       JSlist:[],
                       endtime:"",
                       starttime:"",
                       cost_type:"",
                       profit_share_ratio:"",
                       balance_type:"",
                       fix_price:"",
                       index:'',
                       num:"",
                       times:"",
                       up:false,
                       type:"1",
                       approve_id:"",
                       name_valid:"",
                       OLDname:true,
                       put_type:"",
                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                bg(){
                    this.type=2;
                },
                sc(index){
                    this.bussiness_types.splice(index,1);
                },
                fh(index){
                    this.$router.go(index)
                },
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
                getDataList(){
                    let params={project_id:this.$route.query.project_id}
                    this.api.adproject_detail({params}).then((res)=>{
                        this.approve_id=res.approve_id;
                        this.bussiness_types=res.bussiness_types;
                        this.attachements=res.attachements;
                        this.contracts=res.contracts;
                        this.project_name=res.project_name;
                        this.company_id=res.company_id;
                        if(res.company_id){
                             this.company_name=res.company.name;
                        }else{
                             this.company_name=res.company_name;
                        }
                        this.balance_id=res.balance_id;
                        if(this.balance_id){
                            this.state1=res.balance.name
                        }else{
                            this.state1=res.balance_name;
                        }
                        
                        this.online_time=res.online_time;
                        this.ad_type=res.ad_type;
                        this.ad_type=res.ad_type;
                        this.ad_type2=res.ad_type2;
                        this.ad_type3=res.ad_type3;
                        this.report_media=res.report_media;
                        this.report_space_id=res.report_space_id;
                        this.report_ad_id=res.report_ad_id;
                        this.report_link=res.report_link;
                        this.report_link_auto_update=res.report_link_auto_update;
                        this.ad_req_pv=res.ad_req_pv;
                        this.ad_show_pv=res.ad_show_pv;
                        this.ad_click_pv=res.ad_click_pv;
                        this.ad_download_pv=res.ad_download_pv;
                        this.note=res.note;
                        this.name_valid=res.name_valid;
                        this.put_type=res.put_type;
                        this.getType();
                        this.getJS();
                    })
                },
                getType(index){
                   if(index==1){
                        this.list2=[];
                        this.ad_type2=''
                        this.list3=[];
                    }
                    if(index==2){
                        this.list3=[];
                    }
                     this.api.adproject_adtype().then((res)=>{
                         this.list=res;
                    })

                    if(this.ad_type){
                        this.level=2
                        let params={level:this.level,levelname:this.ad_type}
                        this.api.adproject_adtype({params}).then((res)=>{
                            this.list2=res
                        })
                    }
                    if(this.ad_type2){
                        this.level=3
                        let params={level:this.level,levelname:this.ad_type,level2name:this.ad_type2}
                        this.api.adproject_adtype({params}).then((res)=>{
                            this.list3=res
                        })
                    }
                    

                },
                ADDht(){
                     this.ht=true;
                },
                 handleRemove(file, fileList) {
                    
                },
                focuson(){
                    let params={search:this.company_name}
                    this.api.adproject_adcompany_list({params}).then((res)=>{
                        this.company=res;
                        if(this.company.length>0){
                             for(var i=0 ;i<this.company.length;i++){
                                this.OLDname=(this.company[i].name==this.company_name);
                            }
                        }else{
                            this.OLDname=false
                        }
                       
                        
                    })
                   this.old=true;
                   
                },

                select_check(index){
                    this.company_name=this.company[index].name;
                    this.company_id=this.company[index].company_id;
                    this.old=false
                },
                oldADD(company_name){
                    let formData=new FormData;
                    formData.append('company_name',company_name)
                    this.api.adproject_adcompany_add(formData).then((res)=>{
                        if(res!=false){
                            this.old=false
                            this.company_id=this.company[0].company_id
                        }
                    })  
                },
                 heidHTs(){
                    this.ht=false;
                    this.contract_id='';
                    this.listS=[];
                },
                 heidHT(){
                   
                        this.ht=false;
                        this.contract.push((this.listS[0]).archive_id);
                        this.contracts=this.contracts.concat(this.listS);
                        this.contract_id='';
                        this.listS=[];
                    
                },
                getHT(){
                    let params={contract_id:this.contract_id};
                    this.api.common_contract({params}).then((res)=>{
                        this.listS=res;
                    })
                },
                 del(index){
                    this.contracts.splice(index,1);
                },
                 dels(index){
                    this.attachs.splice(index,1)
                },
                getJS(){
                    let params={is_receiver:'1'}
                    this.api.settle_settlement_searchall({params}).then((res)=>{
                        this.JSlist=res
                    })
                },
                 handleSelect(item) {
                    this.balance_id=item.id;
                },
                querySearch(queryString, cb) {
                    for(var i =0;i<this.JSlist.length;i++){
                        this.JSlist[i].value=this.JSlist[i].name
                    }
                    var results = queryString ? this.JSlist.filter(this.createFilter(queryString)) : this.JSlist;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                swADD(num,index){
                    this.sw=true;
                    this.num=num;
                    this.index=index;
                    if(num==2){
                         this.endtime=this.bussiness_types[this.index].endtime;
                        this.starttime=this.bussiness_types[this.index].starttime;
                        this.cost_type=this.bussiness_types[this.index].cost_type;
                        this.profit_share_ratio=this.bussiness_types[this.index].profit_share_ratio;
                        this.balance_type=this.bussiness_types[this.index].balance_type;
                        this.fix_price=this.bussiness_types[this.index].fix_price;
                    }
                },
                swHeid(){
                    this.sw=false;
                    this.endtime="";
                    this.starttime="";
                    this.cost_type="";
                    this.profit_share_ratio="";
                    this.balance_type="";
                    this.fix_price="";
                    this.num='';
                    this.index=''
                },
                push(){
                    var patt= new RegExp(/^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/);
                     if(!this.starttime){
                        this.$message.error('生效时间不能为空')
                        return
                    }
                     if(!this.cost_type){
                        this.$message.error('计费方式不能为空')
                        return
                    }
                     if(!this.profit_share_ratio){
                        this.$message.error('分成模式不能为空')
                        return
                    }
                    if(!(patt.test(this.profit_share_ratio))){
                        this.$message.error('分成模式内容异常，请输入百分比，例如30%')
                        return
                    }
                     if(!this.balance_type){
                        this.$message.error('结算模式不能为空')
                        return
                    }
                     if(this.balance_type!="未知"&&!this.fix_price){
                        this.$message.error('固价价格不能为空')
                        return
                    }
                     if(this.balance_type!="未知"&&this.fix_price<='0'){

                        this.$message.error('固价价格不能小于0')
                        return
                    }
                    if(this.endtime==null){
                        this.endtime="";
                    }
                    var obj={};
                    obj.endtime=this.endtime;
                    obj.starttime=this.starttime;
                    obj.cost_type=this.cost_type;
                    obj.profit_share_ratio=this.profit_share_ratio;
                    obj.balance_type=this.balance_type;
                    obj.fix_price=this.fix_price;
                    if(this.num==1){
                        this.bussiness_types.push(obj)
                    }
                    if(this.num==2){
                        this.bussiness_types.splice(this.index,1,obj)
                        // this.bussiness_types[this.index]=obj;
                        // console.log(this.bussiness_types)
                    }
                    this.swHeid()
                },
                 time(){
                    var _this=this;
                    _this.times=0;
                    var timer = setInterval(function () {
                        if(_this.times<99){
                            _this.times++
                        }
                    },100);
                },
                 uploadFile(file){
                    this.up=true;
                    this.times=0
                    this.time();
                    let formData = new FormData;
                    formData.append('file',file.file);
                    this.api.file_private_upload(formData).then((res)=>{
                        this.attachements.push(res);
                        this.times=100;
                    })
                    this.up=false;
                },
                setType(){
                    this.type=1;
                    this.getDataList()
                },
                projectBj(){
                    if(this.bussiness_types.length==''){
                        this.$message.error('商务模式不能为空')
                        return
                    }
                   if(!this.put_type){
                        this.$message.error('投放形式不能为空')
                        return
                    }
                     if(!this.project_name){
                        this.$message.error('项目名称不能为空')
                        return
                    }
                     if(!this.company_id){
                        this.$message.error('合作公司不能为空')
                        return
                    }
                    //  if(!this.balance_id){
                    //     this.$message.error('结算主体不能为空')
                    //     return
                    // }
                     if(!this.online_time){
                        this.$message.error('上线时间不能为空')
                        return
                    }
                     if(!this.ad_type){
                        this.$message.error('广告类型一级分类不能为空')
                        return
                    }
                     if(this.list2.length>0&&!this.ad_type2){
                        this.$message.error('广告类型二级分类不能为空')
                        return
                    }
                     if(this.list3.length>0&&!this.ad_type3){
                        this.$message.error('广告类型三级分类不能为空')
                        return
                    }
                     if(!this.report_media){
                        this.$message.error('报备媒体不能为空')
                        return
                    }
                     if(!this.report_space_id){
                        this.$message.error('报备广告位不能为空')
                        return
                    }
                     if(!this.report_ad_id){
                        this.$message.error('广告主id不能为空')
                        return
                    }
                    //  if(!this.report_link){
                    //     this.$message.error('直客链接不能为空')
                    //     return
                    // }
                    //  if(!this.report_link_auto_update){
                    //     this.$message.error('直客链接是否自动更新版本不能为空')
                    //     return
                    // }
                     if(!this.ad_req_pv){
                        this.$message.error('请求量不能为空')
                        return
                    }
                     if(!this.ad_show_pv){
                        this.$message.error('展示量不能为空')
                        return
                    }
                     if(!this.ad_click_pv){
                        this.$message.error('点击量不能为空')
                        return
                    }
                     if(!this.ad_download_pv){
                        this.$message.error('下载量不能为空')
                        return
                    }
                    //  if(!this.note){
                    //     this.$message.error('备注不能为空')
                    //     return
                    // }
                    let formData =new FormData;
                    formData.append('bussiness_types',JSON.stringify(this.bussiness_types));
                    formData.append('attachements',JSON.stringify(this.attachements))
                    formData.append('contracts',JSON.stringify(this.contracts))
                    formData.append('put_type',this.put_type)
                    formData.append("project_id",this.$route.query.project_id)
                    formData.append('project_name',this.project_name)
                    formData.append('company_id',this.company_id)
                    formData.append("balance_id",this.balance_id)
                    formData.append('online_time',this.online_time)
                    formData.append('ad_type',this.ad_type)
                    formData.append('ad_type2',this.ad_type2)
                    formData.append('ad_type3',this.ad_type3)
                    formData.append('report_media',this.report_media)
                    formData.append('report_space_id',this.report_space_id)
                    formData.append('report_ad_id',this.report_ad_id)
                    formData.append('report_link',this.report_link)
                    formData.append('report_link_auto_update',this.report_link_auto_update)
                    formData.append('ad_req_pv',this.ad_req_pv)
                    formData.append('ad_show_pv',this.ad_show_pv)
                    formData.append('ad_click_pv',this.ad_click_pv)
                    formData.append('ad_download_pv',this.ad_download_pv)
                    formData.append('note',this.note)
                    this.api.adproject_edit(formData).then((res)=>{
                        if(res!=false){
                            this.type=1;
                            this.getDataList()
                        }
                    })
                },
            },
}
</script>

<style scoped>
     .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
        cursor: pointer;
    }
    .bj{
        display: inline-block;
        width: 90px;
        height: 36px;
        text-align: center!important;
        line-height: 36px!important;
        background: #3377ff;
        color: #fff!important;
        border-radius: 3px;
        float: right;
        font-size: 14px!important;
        font-weight: 400!important;
        margin: 0px 20% 0 0!important;
        cursor: pointer;
    }
    .select_box{
        width: 100%;
        background: #fff;
        min-height: 671px;
        margin-top:195px ;
    }
    .select_tit{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #ddd;
        margin-left:0!important ;
    }
    .select_tit span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        line-height: 48px;
    }
    .select_bh{
        margin-top: 24px!important;

    }
    .select_bh span{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
    }
    .select_box_1,.select_box_2,.select_box_3{
        display: inline-block;
        margin-right: 183px;
    }
    .select_box_1{
        position: relative;
    }
    ul{
        width: 268px;
        max-height: 400px;
        overflow-y:auto ;
        position: absolute;
        top:176px;
        background: #fff;
        box-shadow: 3px 5px 3px 3px #ddd;
        z-index: 6;
    }
    li{
        width: 100%;
        height: 36px;
        font-size: 14px;
        text-align: center;
        background: rgba(247,248,250,1);
        border-bottom: 1px solid #fff;
        line-height: 36px;
        cursor: pointer;
    }
    li:hover{
        background: #3377ff;
        color:#fff
    }
    .select_box_2{
        vertical-align: top;
    }
    .select_tit_name{

        margin: 24px 0 8px 24px;
    }
    .select_left{
        display: block;
        width:100%;
        height:20px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(50,50,51,1);
        margin: 24px 0 8px 0;
    }
    .inline-input{
        width:100%;
    }
    .select_box>div,.fj>div{
        margin:0 24px;
    }
    .select_box>div input,.fj>div input{
        width:263px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
        padding-left:5px ;
    }
     .select_box>div select,.datetime,.datetimes,.fj>div select{
         width:268px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
     }
    .datetimes{
        border:0!important
    }
     .input_left{
         
         display: block;
     }
     .sw{
         display: inline-block;
         font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        margin: 24px 10px 16px 0;
     }
     .err{
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:17px;
        color:rgba(212,0,0,1); 
     }
     .ht{
         width: 100%;
         min-height: 104px;
         margin-top: 24px;
         background: #fff;
     }
     .fj{
         width: 100%;
         margin-top: 24px;
         background: #fff;

     }
     textarea{
         width:719px;
        height:117px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        margin: 8px 0 24px 0;
     }
     .upload-demo{
         margin:8px 0 0 0 ;
     }
     .color{
         display: inline-block;
         font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(21,91,212,1);
        cursor: pointer;
        margin:16px 0 24px 8px;
     }
     .btns{
         margin-top: 24px;
         height:56px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(200,201,204,0.5);
        line-height: 56px;
     }
     .btns span{
         display: inline-block;
         cursor: pointer;
         text-align: center;
         width:74px;
        height:32px;
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        line-height: 32px;
        border-radius:4px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(50,50,51,1);   
     }
     .bc{
         background: #3377ff!important;
         border:0!important;
         color: #fff!important;
         margin: -10px 16px 0 24px;
     }
      .ADDs{
        margin:16px 24px ;
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:96px;
        height:36px;
        background:#3377ff;
        border-radius:4px;

        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:#fff;
    }
     .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0
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
    .content_ck, .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
    .SWADD{
        width: 100%;
        height: 36px;
        border:1px dotted #3377ff;
        text-align: center;
    }
    .SWADD span{
        display: inline-block;
        line-height: 36px;
        color: #3377ff;
        cursor: pointer;
    }
    .swBox{
        position: absolute;
        left:50%;
        top:50%;
        width: 580px;
        height: 504px;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 5px;
    }
    .swBox>div{
        margin-bottom: 24px;
    }
    .swBox>div>span{
        display: inline-block;
        margin: 0 10px 0 24px;
    }
    .examine{
        border:0!important;
        background: rgba(247,248,250,1)!important;
    }
    .top{
        position:relative;
        top:-84px
    }
</style>