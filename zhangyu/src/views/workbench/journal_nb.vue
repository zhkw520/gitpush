
<template>
<div class="template">
       <div class="top_name">
                <span class="top_txt" @click='fh()'>杂志锁屏推送审核管理  /  上线内容管理</span><br/>
                <span class="top_txts" style="width: 113px;display: inline-block;">上线内容管理</span>
               
               
                <!-- <span class='qdName'>渠道</span>
                <select v-model="channel">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                </select> -->
                <span class='qud'>{{this.$route.query.channel}}</span>
                
                <span class='userGl' v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='addWl()' style="margin: 0px 20% 0 0;">添加物料</span>
                <span class="select" v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='jump()' style="margin: 0px 1% 0 0;background: rgba(51,119,255,1);color:#ffffff;">一键确认</span>

        </div>
        <div class='screening'>
                <div class="date">
                    <el-date-picker
                            v-model="date"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            @change="changeDate">
                    </el-date-picker>
                </div>
                <span class='qdName'>数量:</span>
                <span>{{this.total}}</span>
                <span class="dated" v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">(已过期)</span>
               
        </div>
        <div style="margin-top:250px;background:#fff" class='rePadding'>
             <template>
                    <el-table
                            ref="tab"
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            @selection-change="handleSelectionChange"
                            >
                        <el-table-column
                                label="权重"
                                v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">
                            <template slot-scope="scope">
                                <div><span :id='"isShow"+scope.$index'>{{tableData[scope.$index].weight}}</span></div>
                            </template>
                        </el-table-column>   
                        <el-table-column
                                label="权重"
                                v-else>
                            <template slot-scope="scope">
                                <div><span :id='"isShow"+scope.$index'>{{tableData[scope.$index].weight}}<i class="el-icon-edit" style="font-size: 30px;cursor: pointer;" @click="icon_click(scope.$index,scope.row)"></i></span><span class="box"><input :id='"pro"+scope.$index' v-model="theWeight" @blur="InputClick(scope.$index)"/></span></div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="杂志锁屏">
                                <template slot-scope="scope">
                                <img :src='tableData[scope.$index].mfinal.prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="1" />
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="文字链标题"
                                :show-overflow-tooltip="true"
                                >
                                <template slot-scope="scope">
                                    <span v-if="tableData[scope.$index].title!=''">{{tableData[scope.$index].title}}</span>
                                    <span v-if="tableData[scope.$index].title==''">--</span>
                                </template>
                        </el-table-column>  
                        <el-table-column
                                label="文字链内容"
                                :show-overflow-tooltip="true"
                                >
                                <template slot-scope="scope">
                                    <span v-if="tableData[scope.$index].content!=''">{{tableData[scope.$index].content}}</span>
                                    <span v-if="tableData[scope.$index].content==''">--</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="文字链标识"
                                >
                                <template slot-scope="scope">
                                    <span v-if="tableData[scope.$index].click_action!=''">{{tableData[scope.$index].click_action}}</span>
                                    <span v-if="tableData[scope.$index].click_action==''">--</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="落地页"
                                >
                                 <template slot-scope="scope">
                                    <a :href="tableData[scope.$index].url" target="_blank" style="text-decoration: none;color: #66b1ff" v-if="tableData[scope.$index].url!=''">点击查看</a>
                                    <a  v-if="tableData[scope.$index].url==''">-</a>
                                </template>
                        </el-table-column>
                         <el-table-column
                                label="状态">
                                  <template slot-scope="scope">
                                      <span v-if="tableData[scope.$index].status_name == '信息缺失'" style="color:red;">{{tableData[scope.$index].status_name}}</span>
                                      <span v-else>{{tableData[scope.$index].status_name}}</span>
                                </template>
                        </el-table-column>
                         <el-table-column
                                prop="updated_at"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="creator"
                                label="操作人员">
                                  <template slot-scope="scope">
                                      <span>{{tableData[scope.$index].updator==''?'--':tableData[scope.$index].updator}}</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                
                                v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)"
                        >
                            <template slot-scope="scope">
                                 <!-- <el-button  type="text" size="small" v-if='tableData[scope.$index].status=="0"' @click='updateStatus(index)'>审核</el-button> -->
                                 <!-- <el-button v-if='tableData[scope.$index].status!="0"' type="text" size="small">修改结果</el-button> -->
                                <el-button  type="text" size="small" @click="details(scope.row)">管理文字链</el-button>
                                <el-button  type="text" size="small" @click="deleteRow(scope.$index, scope.row)">移除</el-button>
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
                    <span>更新状态</span>
                </div>
                <div class='sel'>
                    <select v-model="status2">
                        <option value="1">已上线</option>
                        <option value="2">拒绝上线</option>
                    </select>
                    <div class='sel_1' v-if="status2=='拒绝上线'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="测试不通过" class='aaa'></el-checkbox>
                            <el-checkbox label="内容差"  class='aaa'></el-checkbox>
                            <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                            <el-checkbox label="其他"  class='aaa bb'>
                                <template>
                                    <span style="margin-right:10px">其他</span>
                                    <textarea placeholder="最多20字" maxlength="20"  v-model="yy"></textarea>
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
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :showClose="showClo"
            :before-close="handleClose"
            width="30%">
            <span>确认将该物料从该投放库移除吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="surRemove">确 认</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="一键确认"
            :visible.sync="confirmVisible"
            :showClose="showClo"
            :before-close="handleClose"
            width="30%">
            <span>将所有待确认状态的内容状态更新为已确认(已确认的内容会按排期下发到客户端)</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSur">确 认</el-button>
                <el-button @click="confirmVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="管理文字链"
            :visible.sync="textVisible"
            width="40%"
            :showClose="showClo"
            :close-on-click-modal='false'
            :before-close="handleClose">
            <el-form label-width="120px">
                <el-form-item label="标识:">
                    <select v-model="click_action">
                        <option value="-1">请选择</option>
                        <option value="3">无</option>
                        <option value="0">点击查看</option>
                        <option value="1">打开应用</option>
                        <option value="2">下载应用</option>
                    </select>
                </el-form-item>
                <el-form-item label="标题:" v-if="click_action != '-1'&&click_action != '3'">
                    <el-input type="text" maxlength="13"  placeholder="最多13字" show-word-limit v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="内容描述:" v-if="click_action != '-1'&&click_action != '3'">
                    <el-input type="textarea" maxlength="44"  placeholder="最多44字" show-word-limit  v-model="content"></el-input>
                </el-form-item>
                 <el-form-item label="标题(选填):" v-if="click_action == '3'">
                    <el-input type="text" maxlength="13"  placeholder="最多13字" show-word-limit v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="内容描述(选填):" v-if="click_action == '3'">
                    <el-input type="textarea" maxlength="44"  placeholder="最多44字" show-word-limit  v-model="content"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接:" v-if="click_action == '0'">
                    <el-input v-model="url"></el-input>
                </el-form-item>
                <el-form-item label="包名(选填):" v-if="click_action == '1'">
                    <el-input v-model="pkgname"></el-input>
                </el-form-item>
                <el-form-item label="拉活链接:" v-if="click_action == '1'">
                    <el-input v-model="deeplink"></el-input>
                </el-form-item>
                <el-form-item label="下载链接:" v-if="click_action == '1'">
                    <el-input v-model="download_url"></el-input>
                </el-form-item>
                <el-form-item label="包名:" v-if="click_action == '2'">
                    <el-input v-model="pkgname"></el-input>
                </el-form-item>
                <el-form-item label="下载链接:" v-if="click_action == '2'">
                    <el-input v-model="download_url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePage">保存</el-button>
                <el-button @click="cancelTx">取消</el-button>
            </span>
        </el-dialog>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :date="date" :channel='channel' :material="material"></ADDWL>
</div>
</template>

<script>

import ADDWL from './Jounrnal_select'
export default {

components: {ADDWL},
data() {

return {
       qdLists:[], 
       plid:this.$route.query.plid,
       channel:this.$route.query.channel,
       material:3,
       date:(new Date()).toLocaleDateString().split('/').join('-'),
       status:'',
       tableData:[],
        page:1,
        p:10,
        total:0,
        tc:false,
        status2:"",
        checkList:[],
        pl:false,
        value:[],
        index:'',
        advers:[],
        yy:"",
        dialogVisible: false,
        confirmVisible:false,
        showClo:false,
        ADDwl:false,
        textVisible:false,
        isShow:true,
        title: '',
        content: '',
        click_action:-1,
        url: '',
        theWeight:'',
        rouelForm:{},
        textlink:[],
        rows:{},
        rowData:{},
        pkgname:'',
        deeplink:'',
        download_url:'',
};
},

methods: {
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    //一键确认
    confirmSur(){
        let formData =new FormData;
        formData.append('plid',this.plid);
        formData.append('tdate',this.date);
        this.api.pushlib_textlink_audit(formData).then((res)=>{
            this.confirmVisible = false;
            this.getData()
        })
    },
    dJ(index){
        document.getElementById('isShow'+index).style.display = 'block';
        document.getElementById('pro'+index).style.display = 'none';
    },
    changeDate(val){
        this.getData()
    },
    icon_click(index,rows){
        // console.log(rows)
        document.getElementById('isShow'+index).style.display = 'none';
        document.getElementById('pro'+index).style.display = 'block';
        this.theWeight = rows.weight;
        this.rouelForm = rows;
    },
    InputClick(index){
        if(this.theWeight > 99 || this.theWeight < 0){
            this.$message.error('权重值范围限制为0~99')
            return false
        }
        let formData =new FormData;
        formData.append('plid',this.rouelForm.plid);
        formData.append('tdate',this.date);
        formData.append('mfid',this.rouelForm.mfid);
        formData.append('title',this.rouelForm.title);
        formData.append('content',this.rouelForm.content);
        formData.append('url',this.rouelForm.url);
        formData.append('weight',this.theWeight);
        this.api.pushlib_textlink_edit_weight(formData).then((res)=>{
            document.getElementById('isShow'+index).style.display = 'block';
            document.getElementById('pro'+index).style.display = 'none';
            this.getData()
        })
    },
    addWl(){
       this.ADDwl = true;
    },
    heidWL(){
        this.ADDwl = false;
    },
    listenToChildEvent(id,date){
        let formData =new FormData;
        formData.append('plid',this.$route.query.plid);
        formData.append('tdate',date);
        formData.append('bind_mfid',JSON.stringify(id));
        this.api.pushlib_textlink_add(formData).then((res)=>{
            this.heidWL();
            this.getData()
        })
    },
     pushLib(){
          if(this.index=='aa'){
                    let array={plid:"",adid:"",mfid:""}
                    for(var i=0;i<this.value.length;i++){
                            array.plid=this.value[i].plid;
                            array.adid=this.value[i].adid;
                            array.mfid=this.value[i].mfid;
                            this.advers.push(array);
                        }
                        if(!this.status2){
                             this.$message.error('状态不能为空')
                        }
                        let formData =new FormData;
                        formData.append('status',this.status2),
                        formData.append('note',this.checkList.join(',')+this.yy) 
                        formData.append('advers',JSON.stringify(this.advers))
                        this.api.pushlib_adver_mfinal_audit(formData).then((res)=>{
                            if(res!=false){
                                this.getData();
                                this.qx();
                                this.Qxplcz();
                            }
                    })
               }else{
                   let array={plid:"",adid:"",mfid:""}
                     array.plid=this.tableData[this.index].plid;
                     array.adid=this.tableData[this.index].adid;
                     array.mfid=this.tableData[this.index].mfid;
                    this.advers.push(array);
                       if(!this.status2){
                             this.$message.error('状态不能为空')
                        }
                     let formData =new FormData;
                      formData.append('status',this.status2),
                        formData.append('note',this.checkList.join(',')+this.yy) 
                        formData.append('advers',JSON.stringify(this.advers))
                        this.api.pushlib_adver_mfinal_audit(formData).then((res)=>{
                            if(res!=false){
                                this.getData();
                                this.qx();
                                this.Qxplcz();
                            }
                    })
               }
            
           },   
    plcz(){
        this.pl=true;
    },
    fh(){
        this.$router.push({
            path:"./journal_list"
        })
    },
    Qxplcz(){
        this.pl=false;
       if(this.value.length>0){
            this.tableData.map((option) => {
                    this.$refs.tab.toggleRowSelection(option);
                })
       }else{
           this.value=[];
       }
       
    },
    getChannel(){
                    this.api.pushlib_configs_channel().then((res)=>{
                        this.qdLists=res;
                    })
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
                this.getData()
                
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },  
             handleSelectionChange(val) {
                this.value= val;
             },  
             jump(){
                 this.confirmVisible = true;          
             },
             remove(){
                 this.dialogVisible = true;
             },
             surRemove(){
                //  console.log(this.rows)
                let formData =new FormData;
                 
                let array={plid:"",mfid:"",tdate:""}
                     array.plid=this.rows.plid;
                     array.mfid=this.rows.mfid;
                     array.tdate=this.date;
                   this.textlink.push(array); 
                   formData.append('textlink',JSON.stringify(this.textlink))
                    this.api.pushlib_textlink_del(formData).then((res)=>{
                        this.dialogVisible = false;
                        this.getData();
                    })

             },
             deleteRow(index, rows) {
                 this.dialogVisible = true;
                 this.rows = rows;
                 
                },
              updateStatus(index){
                this.advers=[];
                if(index=='aa'&&this.value.length==0){
                    return
                }
               this.tc=true;
               if(index==''){
                   this.index=0;
               }else{
                   this.index=index;
               }
              
               
               
           }, 
            qx(){
               this.tc=false;
               this.status2='';
               this.checkList=[];
           }, 
           details(row){
                this.textVisible = true;
                this.rowData = row;
                this.title = row.title;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                this.content = row.content;
                this.click_action = row.click_action_type;
                this.url = row.url;
                this.deeplink = row.deeplink;
                this.pkgname = row.pkgname;
                this.download_url = row.download_url;
           },
           cancelTx(){
               this.textVisible = false;
               this.form = {};
           },
           savePage(){
            //    var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
                if(this.click_action==-1){
                    this.$message.warning('标识不能为空');
                    return
                }
               if(!this.title&&this.content!=''&&this.click_action == '3'){
                   this.$message.warning('标题和内容描述必须同时填或都不填')
                   return false
               }
               if(!this.content&&this.title!=''&&this.click_action == '3'){
                   this.$message.warning('标题和内容描述必须同时填或都不填')
                   return false
               }
           
               if(this.click_action == 0){
                   var click_action_title = '点击查看'
                   if(!this.url){
                       this.$message.warning('跳转链接不能为空!')
                       return false
                   }

               }else if(this.click_action == 1){
                   var click_action_title = '打开应用'
                   if(!this.deeplink){
                       this.$message.warning('拉活链接不能为空!')
                       return false
                   }
                   if(!this.download_url){
                       this.$message.warning('下载链接不能为空!')
                       return false
                   }

               }else if(this.click_action == 2){
                   var click_action_title = '下载应用'
                   if(!this.pkgname){
                       this.$message.warning('包名不能为空!')
                       return false
                   }
                   if(!this.download_url){
                       this.$message.warning('下载链接不能为空!')
                       return false
                   }

               }else if(this.click_action == -1){
                   var click_action_title = ''
               }else if(this.click_action == 3){
                   var click_action_title ='无'
               }
                let formData =new FormData;
                formData.append('plid',this.plid);
                formData.append('mfid',this.rowData.mfid);
                formData.append('tdate',this.date);
                formData.append('title',this.title);
                formData.append('content',this.content);
                formData.append('click_action',click_action_title);
                formData.append('pkgname',this.pkgname);
                formData.append('download_url',this.download_url);
                formData.append('deeplink',this.deeplink);
                formData.append('click_action_type',this.click_action);
                formData.append('url',this.url);
               this.api.pushlib_textlink_edit(formData).then((res)=>{  
                    this.textVisible = false;
                    this.getData();
                    this.title = '';
                    this.content = '';
                    this.click_action = '';
                    this.url = '';        
               })
           },
           getData(){
               let params={
                   p:this.p,
                   page:this.page,
                   tdate:this.date,
                   plid:this.plid,
                }
               this.api.pushlib_textlink_search({params}).then((res)=>{
                   this.tableData=res.data;
                   this.total=res.total;
                //    this.$previewRefresh()
               })
           },
            
},

created() {
   

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    //  this.getChannel();
     this.getData()
},

}
</script>
<style  scoped>
  .top_name{
        height: 80px;
        border: 0;
    }
.top_txts{
    margin-left: 24px;
    font-size: 18px;
    font-family: PingFang-SC;
    font-weight: 500;
    line-height: 30px;
    color: rgba(31,46,77,1);
    display: block;
    margin-top: 10px;
}
.qdName{
    display: inline-block;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(50,50,50,1);
    margin-left: 40px
}
 select{
    margin-left: 20px;
    width: 200px;
    height: 36px;
    border-radius: 5px;
}
.userGl{
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
.screening{
    position: fixed;
    width: 100%;
    height: 60px;
   left: 256px;
   top:160px;
    background: #fff
}
.date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 10px 20% 0 0 
    }
    .cx{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 68px;
        background: rgba(51,119,255,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cz,.dc{
            display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
            width: 144px;
        background: rgba(242,246,252,1);
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
    }
    .dc{
        width: 68px!important;
        margin-left: 20px
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
   .qud{
       display: inline-block;
       padding: 5px;
       border:1px solid  rgba(51,119,255,1);
       text-align: center;
       color: rgba(51,119,255,1);
       border-radius: 5px;
       line-height: 1!important;
       margin-left: 10px;
       position: absolute;
       left: 173px;
       top:47px
   }
    .top_txt{
        cursor: pointer; margin-left: 24px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153,153,153,1);
        line-height: 20px!important;
        margin-top: 15px
    }
    .select{
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
        margin: 10px 20% 0 0;
    }
    .box{
        display: block;
        width: 100%;
        height: 100%;  
    }
    .box > input{
        display: none;
        width: 80px;
    height: 25px;
    }
    .template >>> .el-textarea{
        width: 100%;
    }
    .template >>> select{
        margin-left: 0px;
    }
    .template >>> .el-button--primary{
        background: #155BD4;
    }
   
</style>