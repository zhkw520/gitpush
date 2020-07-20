<template>
 <div>
        
        <div class="top_name">
            <span class="top_txt" @click='fh(-1)'>杂志锁屏推送审核管理&nbsp;/&nbsp; 内部音频配置管理</span>
            <div class="title_left">
                <span>内部音频配置管理</span>
                <span class='lk'>{{this.$route.query.channel}}</span>
                <span class='open_status'>功能状态：</span>
                <span class='open_status' style="margin-left:0" :class='{red:this.open==0}'>{{this.open==0?"禁用":'启用'}}</span>
            </div>
            <div class='right_btn'>
                <span @click='opens()'>{{this.open==1?'禁用':'启用'}}功能</span>
                <!-- <span>一键确认</span> -->
                <span @click='getWl()'>添加物料</span>
            </div>
            
        </div>
        <div style="position: relative;">
            <div class='condition'>
                <span class='tit_name'>物料ID</span>
                <input type="text" v-model='mfid'>
                <span class='tit_name'>壁纸标识</span>
                <input type="text" v-model='wpid'>
                <!--<span class='tit_name'>音频ID</span>
                <input type="text" v-model='song_id'>-->
                <span class='tit_name'>是否生效</span>
                <select v-model='status'>
                    <option value="">全部</option>
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select>
                <!--<span class='tit_name'>状态</span>
                <select v-model='status'>
                    <option value="">全部</option>
                    <option value="1">已确认</option>
                    <option value="0">待确认</option>
                </select>-->
                <span class='cx' @click="getData()">查询</span>
                <span class='cz' @click='reset()'>重置</span>
                <!--<span class='gd' @click='unwind()'>更多筛选项</span>
                <img :src="img" alt="" style="width:10px;margin-left:10px"/>-->
            </div>
            <div class='more' v-if='unfold'>
                 <div class="polling_tag">
                    <span class="tag_name">内容标签</span>
                    <!-- <span class="labelName"  @click="getListTag('')" :class="{active:listTag.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class0==true}">
                        <span v-for="(item,index) in preset_tags" class="labelName" @click="getListTag(item.name,index)" :class="{active:listTag.indexOf(item.name)!=-1}">{{item.name}}</span>
                    </div> -->
                    <span class="unfold" v-if="isType==0" @click="expansion">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isType==0"/>
                    <span class="unfold" v-if="isType==1" @click="expansion">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isType==1"/>
                </div>

                <div class="polling_tag" style="margin-top:0">
                    <span class="tag_name">运营标签</span>
                    <!-- <span class="labelName" @click="getListTags('')" :class="{active:listTagData.length==0}">全部</span>
                    <div class="tags" :class="{ALLtags:class1==true}">
                        <span v-for="(item,index) in self_tags" class="labelName" @click="getListTags(item.desc,index)" :class="{active:listTagData.indexOf(item.desc)!=-1}">{{item.desc}}</span>
                    </div> -->
                    <span class="unfold" v-if="isTypes==0" @click="expansionTag">展开</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/xs.png" v-if="isTypes==0"/>
                    <span class="unfold" v-if="isTypes==1" @click="expansionTag">收起</span>
                    <img style="width: 10px;height: 6px" src="../../../public/img/sq.png" v-if="isTypes==1"/>
                </div>
            </div>
        </div>
        <div class='titlt'>
             <template>
                <el-table
                        :data="list"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                >
                    <el-table-column
                            prop="num"
                            label="杂志锁屏">
                            <template slot-scope="scope" v-if='list[scope.$index].mfinal'>
                                        <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                            <div slot="content">
                                               <img :src='list[scope.$index].mfinal.prev_uri' style="max-width:261px;max-height: 464px"  />
                                            </div>
                                            <img :src='list[scope.$index].mfinal.prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />                               
                                         </el-tooltip>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="user.email"
                            label="详细信息">
                            <template slot-scope="scope">
                                        <a style="color:#3377ff;cursor: pointer" @click='CkDetails(scope.$index)'>点击查看</a>
                                    </template>
                    </el-table-column>
                    <el-table-column
                            prop="channel.channel"
                            label="是否生效">
                            <template slot-scope="scope">
                                <el-switch
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#3377ff"
                                        inactive-color="#e6e9f0"
                                        v-model="scope.row.status"
                                        @change='changes(scope.$index)'>
                                </el-switch>
                            </template>
                    </el-table-column>
                     <el-table-column 
                            prop="channel.channel"
                            label="生效时段">
                            <template slot-scope="scope" >
                                    <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                            <div slot="content" style="min-width:500px">
                                                <template v-if="list[scope.$index].song_setting">
                                                        <el-table
                                                                ref="tab"
                                                                :data="list[scope.$index].song_setting"
                                                                style="width: 100%"
                                                                :header-cell-style="getRowClass"
                                                                :cell-style="cell"
                                                                >   
                                                            <el-table-column
                                                                    prop="plid"
                                                                    label="生效时段">
                                                                    <template slot-scope="prop">
                                                                        <span>{{(list[scope.$index].song_setting)[prop.$index].start_time+'~'+(list[scope.$index].song_setting)[prop.$index].end_time}}</span>
                                                                    </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="count"
                                                                    label="循环播放次数">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="sound"
                                                                    :show-overflow-tooltip="true"
                                                                    label="音量">
                                                            </el-table-column>
                                                        </el-table>    
                                                </template>
                                            </div>
                                            <span  style="cursor: pointer">多个时段</span>                               
                                         </el-tooltip>
                                    
                            </template>
                    </el-table-column>
                    <!-- <el-table-column
                            prop="num"
                            label="循环播放次数">
                            <template slot-scope="scope">
                                    <el-tooltip v-if="list[scope.$index]" placement="right" class="tit_txt_2 logs tit_txts">
                                            <div  slot="content" style="min-width:500px">
                                                <template >
                                                        <el-table
                                                                ref="tab"
                                                                :data="list[scope.$index].song_setting"
                                                                style="width: 100%"
                                                                :header-cell-style="getRowClass"
                                                                :cell-style="cell"
                                                                >   
                                                            <el-table-column
                                                                    prop="plid"
                                                                    label="生效时段">
                                                                    <template slot-scope="prop">
                                                                        <span>{{(list[scope.$index].song_setting)[prop.$index].start_time+'~'+(list[scope.$index].song_setting)[prop.$index].end_time}}</span>
                                                                    </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="count"
                                                                    label="循环播放次数">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="sound"
                                                                    :show-overflow-tooltip="true"
                                                                    label="音量">
                                                            </el-table-column>
                                                        </el-table>    
                                                </template>
                                            </div>
                                            <span  style="cursor: pointer">多个规则</span>                               
                                         </el-tooltip>
                                    
                            </template>
                    </el-table-column>
                            prop="channel.channel"
                            label="音量">
                           <template slot-scope="scope">
                                    <el-tooltip placement="right" class="tit_txt_2 logs tit_txts">
                                            <div v-if="list[scope.$index]" slot="content" style="min-width:500px">
                                                <template>
                                                        <el-table
                                                                ref="tab"
                                                                :data="list[scope.$index].song_setting"
                                                                style="width: 100%"
                                                                :header-cell-style="getRowClass"
                                                                :cell-style="cell"
                                                                >   
                                                            <el-table-column
                                                                    prop="plid"
                                                                    label="生效时段">
                                                                    <template slot-scope="prop">
                                                                        <span>{{(list[scope.$index].song_setting)[prop.$index].start_time+'~'+(list[scope.$index].song_setting)[prop.$index].end_time}}</span>
                                                                    </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="count"
                                                                    label="循环播放次数">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    prop="sound"
                                                                    :show-overflow-tooltip="true"
                                                                    label="音量">
                                                            </el-table-column>
                                                        </el-table>    
                                                </template>
                                            </div>
                                            <span  style="cursor: pointer">多个规则</span>                               
                                         </el-tooltip>
                            </template>
                    </el-table-column>-->
                    <!-- <el-table-column
                            prop="channel.channel"
                            label="状态">
                             <template slot-scope="scope">
                                <span>{{list[scope.$index].is_valid==1?'已确认':'待确认'}}</span>
                            </template>
                    </el-table-column> -->
                     <el-table-column
                            prop="updated_at"
                            :show-overflow-tooltip="true"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            prop="updator"
                            :show-overflow-tooltip="true"
                            label="操作人员">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150"
                    >
                        <template slot-scope="scope">
                            <el-button  type="text"  @click="getShow(scope.$index)"  size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="10"
                            layout="sizes, prev, pager, next"
                            :total="total">
                    </el-pagination>
            </div>
        </div>
        <div class='bg' v-if='tj'>
            <div class='con'>
                <div class='ts'>
                    <span>{{list.status==1?'禁用':'启用'}}功能</span>
                </div>
                <div>
                    <span style="margin:0 24px" v-if='open==1'>禁用后，该功能失效，终端将按照默认策略执行是否确认？</span>
                    <span style="margin:0 24px" v-if='open==0'>启用后，终端将按照配置生效的策略执行，是否确认？</span>
                </div>
                 <div class="btn_right" style="float:left;">
                                <span class='cx' @click='ADD()'>确定</span>
                                <span @click='gb()'>取消</span>
                </div>   
            </div>
        </div>
        <div class='bg' v-if="change">
            <div class='compile'>
                <div class='ts'>
                    <span>编辑</span>
                    <span style="color:#3377ff;float:right;margin-right:24px;cursor: pointer;" @click='addRule()'>添加规则</span>
                </div>
                <div>
                    <div class='regulation' v-for='(item,index) in ruleList'>
                        <div>
                            <span class='tit'>规则{{index+1}}</span>
                            <span style="color:#3377ff;float:right;cursor: pointer;" @click='removeRule(index)'>删除</span>
                        </div>
                        <div>
                            <span  class='titName'>开始时间：</span>
                            <template>
                                <el-time-picker
                                    v-model="item.start_time"
                                    format='HH:mm'
                                    value-format='HH:mm'
                                    :picker-options="{
                                    selectableRange:  '00:00:00 - 23:00:00'
                                    }"
                                    placeholder="任意时间点">
                                </el-time-picker>
                               
                            </template>
                        </div>
                         <div>
                            <span  class='titName'>结束时间：</span>
                            <template>
                                <el-time-picker
                                    v-model="item.end_time"
                                    format='HH:mm'
                                    value-format='HH:mm'
                                    :picker-options="{
                                    selectableRange:  '00:00:00 - 23:00:00'
                                    }"
                                    placeholder="任意时间点">
                                </el-time-picker>
                               
                            </template>
                        </div>
                        <div>
                            <span  class='titName'>最大自动播放次数：</span>
                            <input type="number" style="width:212px" v-model='item.count'>
                            <!--<input type="checkbox" style="width:16px;vertical-align: middle;">
                            <span>次数不限</span>-->
                        </div>
                        <div>
                            <span  class='titName'>自动播放音量：</span>
                            <select v-model='item.sound'>
                                <option value="0">静音</option>
                                <option value="1">原音量播放</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="btn_right" style="float:left;">
                    <span class='cx' style="margin-bottom:20px" @click='bj()'>确认</span>
                    <span @click='HeidChange'>取消</span>
                </div>
            </div>
        </div>
        <div class='bg' v-if='details'>
            <div class='details' v-if="mfinal">
                 <div class='ts'>
                    <span>查看详情</span>
                    <img style="float:right;margin-right:24px;cursor: pointer;width:16px;margin-top:20px" src='img/gb.png' @click='delDetails()'>
                </div>
                <div>
                    <span class='titNames'>物料ID</span>
                    <span>{{mfinal.mfid}}</span>
                </div>
                 <div>
                    <span class='titNames'>壁纸标识</span>
                    <span>{{mfinal.wpid}}</span>
                </div>
                 <div>
                    <span class='titNames'>音频ID</span>
                    <span></span>
                </div>
                 <div>
                    <span class='titNames'>内容标签</span>
                    <div class="tag">
                        <span v-for="item in mfinal.tags" class="tagName" v-if="item!=''">{{item}}</span>
                    </div>
                    
                </div>
                 <div>
                    <span class='titNames'>尺寸</span>
                    <span>{{mfinal.size}}</span>
                </div>
                 <div>
                    <span class='titNames'>文件</span>
                    <a v-if="mfinal.attach" href="mfinal.attach.attach_url" style="color:#3377ff;cursor: pointe;margin-left:10px">下载</a>
                </div>
            </div>
        </div>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :video='video'></ADDWL>
        <loading v-if='load'></loading>
 </div>
</template>
<script>
 import ADDWL from './Jounrnal_select'
 import loading from '../../components/loading'
 export default {
    components:{ADDWL,loading},
   data () {
     return {
            img:"/img/xs.png",
            unfold:false,
            isType:"0",
            class0:false,
            isTypes:"0",
            class1:false,
            list:[{num:'2'}],
            p:10,
            page:1,
            total:0,
            wpid:"",
            mfid:"",
            song_id:"",
            status:"",
            is_valid:"",
            search_tags:"",
            search_self_tags:"",
            op_tags:"",
            ADDwl:false,
            video:'video',
            load:true,
            tj:false,
            ruleList:[],
            change:false,
            details:false,
            open:'',
            editData:{mfid:''},
            mfinal:null
            }
   },
   mounted(){
       this.getDetails()
       this.getData()
   },
   methods:{
       fh(index){
           this.$router.go(index)
       },
       getDetails(){
           let params={plid:this.$route.query.plid}
           this.api.pushlib_details({params}).then((res)=>{
                this.open=res.is_valid
           })
       },
       setData(res){
            this.list=res.data;
            this.total=res.total;
            this.load=false;
       },
       getData(){
           let params={wpid:this.wpid,mfid:this.mfid,song_id:this.song_id,status:this.status,is_valid:this.is_valid,search_tags:this.search_tags,search_self_tags:this.search_self_tags,op_tags:this.op_tags,p:this.p,page:this.page,plid:this.$route.query.plid}
           this.api.pushlib_slssong_search({params}).then((res)=>{
               console.log('test');
               this.setData(res)
            //    this.getDetails()
           })
       },
       changes(index){
           let formData = new FormData
           formData.append('plid',this.$route.query.plid)
           formData.append('mfid',this.list[index].mfid)
           formData.append('status',this.list[index].status)
           this.api.pushlib_slssong_update_status(formData).then((res)=>{
               if(res!=false){
                   this.getData()
               }
           })
       },
       reset(){
            this.wpid="",
            this.mfid="",
            this.song_id="",
            this.status=""
            this.is_valid=""
       },
       CkDetails(index){
           this.details=true;
           this.mfinal = this.list[index].mfinal;
       }, 
       delDetails(){
           this.details=false
       },
       addRule(){
           var obj={start_time:"",end_time:"",sound:"",count:""}
           this.ruleList.push(obj)
       },
       bj(data){
            let formData =new FormData
            formData.append('plid',this.$route.query.plid);
            formData.append('mfid',this.editData.mfid)
            formData.append('song_setting',JSON.stringify(this.ruleList))
            this.api.pushlib_slssong_edit_setting(formData).then((res)=>{
                console.log('test2')
                if(res!=false&&data==undefined){
                    this.HeidChange()
                    this.getData()
                }
            })
       },
       delReule(id, index){
            let formData = new FormData
            formData.append('plid',this.$route.query.plid);
            formData.append('mfid',this.editData.mfid)
            formData.append('sid',id)
            this.api.pushlib_slssong_del_setting(formData).then((res)=>{
                if(res != false){
                    this.ruleList.splice(index,1);
                }
            })
       },
       removeRule(index){
           if(this.ruleList[index].id){
               this.delReule(this.ruleList[index].id, index);
           }else{
                this.ruleList.splice(index,1);
           }
       },
       getShow(index){
           this.change = true;
           this.ruleList = this.list[index].song_setting
           this.editData.mfid = this.list[index].mfid
       },
       HeidChange(){
           this.change=false
       },
       opens(){
           this.tj=true
       },
       gb(){
           this.tj=false
       },
       getWl(){
                this.ADDwl = true;
        },
        heidWL(){
               this.ADDwl = false;
        },
        ADD(){
            let formData=new FormData
            formData.append('plid',this.$route.query.plid)
            formData.append('is_valid',this.open==1?'0':"1")
            this.api.pushlib_edit_isvalid(formData).then((res)=>{
                if(res!=false){
                    this.gb();
                    this.getDetails()
                }
            })
        },
       unwind(){
            if(this.unfold==false){
                    this.unfold=true;
                    this.img="/img/sq.png"
                }else{
                    this.unfold=false;
                    this.img="/img/xs.png"
            }
       },
        expansion(){
                if(this.isType==0){
                    this.isType=1;
                    this.class0=true
                }else{
                    this.isType=0;
                    this.class0=false
                }

        },
        expansionTag(){
                if(this.isTypes==0){
                    this.isTypes=1;
                    this.class1=true
                }else{
                    this.isTypes=0;
                    this.class1=false
                }

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
        getSize(){
            this.api.template_config_size().then((res)=>{
                this.sizeList=res
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
        listenToChildEvent(id){
                let formData =new FormData;
                formData.append('plid',this.$route.query.plid);
                formData.append('bind_mfid',JSON.stringify(id));
                this.api.pushlib_slssong_add(formData).then((res)=>{
                    if(res!=false){
                        this.heidWL();
                        this.getData()
                    }
                    
                })
        },
   },
  
 }
</script>

<style scoped>
    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .top_txt{cursor: pointer;}
    .right_btn{
        display: inline-block;
        float:right;
        margin-right: 20%;
        margin-top:-25px
    }
    .title_left span{
        font-weight: bold;
    }
    .right_btn span,.cx,.cz{
        margin-left: 24px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width:100px;
        height: 36px;
        line-height: 36px;
        border:1px solid #ddd;
        border-radius: 3px;
        margin-left: 24px;
        font-size: 14px;
        margin-top: -30px;
        
    }
    .lk{
        display: inline-block;
        padding:3px;
        border: 1px solid #ddd;
        color:#3377ff;
        border-radius:5px;
        font-size: 12px!important;
    }
    .open_status{
        display: inline-block;
        font-size: 12px!important;
        font-weight: 500!important;
    }
    .condition{
        padding:24px;
        background: #fff;
        margin-top: 196px;
        height:40px;
    }
    .tit_name{
        display: inline-block;
        margin-right: 14px;
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium,PingFang-SC;
        font-weight: 500;
        color: rgba(31,46,77,1);
        text-align: right;
    }
    select{
        width: 100px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
    }
    input{
        width: 175px;
        height: 32px;
        padding-left: 5px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .gd{
        color:#3377ff;
        margin-left: 24px;
        cursor: pointer;
    }
    .more{
        position:absolute;
        top:88px;
        background:rgba(255,255,255,1);
        z-index: 8;
        width: 100%;
    }
    .polling_tag{
        margin:20px 22px 0 24px;
        min-height: 60px;
        border-top: 1px dashed #E6E9F0;
    }
    .tag_name{
        display: inline-block;
        line-height: 60px;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(143,155,179,1);
        margin-right: 32px;
    }
    .tags{
        display: inline-block;
        max-width: 1090px;
        height: 45px;
        overflow: hidden;
        margin-top: 7px;
        margin-bottom: 5px;
    }
    .ALLtags{
        height: 100%!important;
        
    }
    .labelName{
        padding: 0 10px;
    }
    .unfold{
        display: inline-block;
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(121,130,148,1);
        cursor: pointer;
        margin-right: 5px;
    }
    .titlt{
        margin-top: 24px;
        background: #fff;
        padding:24px 
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
     .con{
        position: absolute;
        top:50%;
        left:50%;
        width:500px;
        height: 200px;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .compile{
        position: absolute;
        top:50%;
        left:50%;
        width:550px;
        min-height: 200px;
        max-height: 800px;
        overflow-y: auto;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .details{
        position: absolute;
        top:50%;
        left:50%;
        width:500px;
        min-height: 200px;
        background: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .ts{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
    }
    .ts span{
        font-size: 14px;
        font-weight: bold;
        margin-left: 24px;
        display: inline-block;
        line-height: 50px;

    }
    .btn_right{
        display: inline-block;
        float:right;
        margin: 24px 24px 0 0;
    }
    .btn_right span{
        display: inline-block;
        cursor: pointer;
        width: 90px;
        height: 36px;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 36px;
        text-align: center;
        margin-left: 24px;
            
    }
    .cx{
        color: #fff!important;
        border:0!important;
        background: #3377ff!important;
    }
    .regulation{
        padding: 0 24px;
    }
    .regulation>div{
        margin-bottom: 16px;
    }
    .titName{
        display: inline-block;
        width:120px;
        text-align: right;
    }
    .tit{
        display: inline-block;
        font-weight: bold;
    }
    .regulation input{
        margin-right: 10px!important;
    }
    .regulation select{
        width:218px
    }
    .regulation{
        border-bottom: 1px solid #ddd;
    }
    .titNames{
        display: inline-block;
        width:90px;
        text-align: right;
        font-size: 14px;
        margin-right: 10px;
        margin-bottom: 16px;
    }
    .tag{
        display: inline-block;
        padding:2px 3px ;
        border:1px solid #ddd;
        border-radius: 2px;
        margin-right: 10px;
    }
    .red{
        color:red
    }
</style>
