<template>
        <div>
            <div>
                <div class="top_name">
                    <span class="top_txt" @click='fh'>广告内容审核&nbsp;/&nbsp;项目管理</span>
                    <div class="title_left">
                        <span>项目管理</span>
                    </div>
                    <div class='sel'>
                        <span class='yjqr' @click='tc()'>新建项目</span>
                    </div>
                </div>
            </div>
             <div  class="content_right">
                <div class='tableBox'>
                    <template>
                        <el-table
                                :data="tableData"
                                style="width: 100%;"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                >
                        
                            <el-table-column
                                    label="项目ID"
                                    prop="pid"
                                    >
                                   
                            </el-table-column>
                        
                            <el-table-column
                                    prop="name"
                                    label="项目名称">
                                   
                            </el-table-column>
                             <el-table-column
                                    prop="spaceids"
                                    label="媒体广告位">
                                     <template slot-scope="scope">
                                        <span v-for='val in tableData[scope.$index].spaceids'>{{val+';'}}</span>
                                    </template>
                            </el-table-column>
                             <el-table-column
                                    prop=""
                                    label="投审方式">
                                    <template slot-scope="scope">
                                        <span >{{tableData[scope.$index].mode==1?'先审后投':"先投后审"}},</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    prop="froms"
                                    label="物料来源">
                                    <template slot-scope="scope">
                                        <span v-for='val in tableData[scope.$index].froms'>{{val==1?'填充':val==2?'曝光':'广告云'}},</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    prop="tags"
                                    label="禁用分类">
                                    <template slot-scope="scope">
                                        <span v-for='val in tableData[scope.$index].tags'>{{val.tags_name}},</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="操作">
                                    <template slot-scope="scope">
                                        <el-button  type="text" size="small" @click='bj(scope.$index)'>编辑</el-button>
                                        <!-- <el-button  type="text" size="small" @click="remove(scope.$index)">删除</el-button> -->
                                    </template>
                            </el-table-column>
                            
                        </el-table>
                    </template>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="page"
                            :page-size="p"
                            layout="prev, pager, next,total, jumper"
                            :total="total">
                    </el-pagination>
		        </div>
            </div>
            <div class='tcvBox' v-if='this.show'>
                <div class='box'>
                    <div class='box_tit'>
                        <span>
                            删除
                        </span>
                    </div>
                    <div class='box_con'>
                        <span>删除后影响对应广告位投放类容，是否删除？</span>
                    </div>
                    <div class='btn'>
                    
                        <span class='qx' @click='heid()'>取消</span>
                        <span class='yes' @click='del()'>确认</span>
                    </div>
                    
                </div>
            </div>
            <div class='tcvBox' v-if='this.AD'>
                <div class='box'>
                    <div class='box_tit'>
                        <span>
                            {{tit}}
                        </span>
                    </div>
                    <div class='box_con'>
                        <div>
                            <span class='titles'>项目名称:</span>
                            <input type="text" v-model="name" placeholder="最多输入10个字" maxlength="10">
                        </div>
                         <div>
                            <span class='titles'>媒体广告位:</span>
                            <input type="text" v-model="spaceids" placeholder="不同广告位用;分开" >
                        </div>
                         <div>
                            <span class='titles'>投审方式:</span>
                            <select v-model="mode">
                                <option value="1">先审后投</option>
                                <option value="2">先投后审</option>
                            </select>
                        </div>
                         <div  style="margin-top:0">
                            <span class='titles'>物料来源:</span>
                            
                             <el-select v-model="froms" multiple placeholder="请选择">
                                <el-option
                                v-for="item in list"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                         <div>
                            <span class='titles'>禁用分类:</span>
                            <span class='ta' :class='{act:key.indexOf(index)!=-1}' v-for='(item,index) in tagsList' @click='active(index)'>{{item.tags_name}}</span>
                        </div>
                    </div>
                    <div class='btn'>
                    
                        <span class='qx' @click='qx()'>取消</span>
                        <span class='yes' @click='add()'>确认</span>
                    </div>
                    
                </div>
            </div>
        </div>
</template>

<script>
export default {
        data(){
            return{
                tableData:[],
                p:10,
                page:1,
                total:0,
                show:false,
                index:"",
                AD:false,
                tit:'新建',
                tagsList:[],
                key:[],
                name:"",
                desc:'',
                mode:"",
                spaceids:"",
                tags:[],
                froms:[],
                pis:"",
                list:[{value:1,label:"填充"},{value:2,label:"曝光"},{value:3,label:"云广告"}],
               
            }
        },
        mounted(){
            this.getDATA();
            this.tagsData();
           
        },
        methods:{
             getRowClass({row, column, rowIndex, columnIndex}) {
                    if (rowIndex === 0) {
                        return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:blod;font-family:PingFang-SC-Regular;'
                    } else {
                        return ''
                    }
                },
                cell({row, column, rowIndex, columnIndex}){
                        return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                },
                fh(){
                    this.$router.go(-1)
                },
                 handleSizeChange1(p) { // 每页条数切换
                    this.p = p;
                    this.getDATA()
                },
                handleCurrentChange1(Page) {//页码切换
                    this.page = Page;
                    this.getDATA()
                },
                getDATA(){
                    
                    let params={p:this.p,page:this.page}
                    this.api.adver_project_search({params}).then((res)=>{
                        this.tableData=res.data
                        this.total=res.total
                    })
                },
                remove(index){
                    this.show=true;
                    this.index=index;
                },
                heid(){
                    this.show=false
                    this.index=''
                },
                tc(){
                    this.AD=true;
                    this.tit='新建项目'
                    
                },
                bj(index){
                    this.tit='编辑',
                    this.index=index;
                    this.AD=true;
                    this.pid=this.tableData[index].pid;
                    this.name=this.tableData[index].name;
                    this.tags=this.tableData[index].tags;
                    this.spaceids=this.tableData[index].spaceids.join(';');
                    this.mode=this.tableData[index].mode;
                     this.froms=this.tableData[index].froms;
                     if(this.tags.length>0){
                         for(var i=0;this.tagsList.length;i++){
                            for(var y=0;y<this.tags.length;y++){
                                if(this.tagsList[i].tags_id==this.tags[y].tags_id){
                                    this.key.push(i)
                                }
                            }
                        }
                     }
                    
                },
                qx(){
                    this.AD=false;
                        this.name='';
                        this.tags=[];
                        this.key=[];
                        this.froms=[];
                        this.mode=[];
                        this.spaceids=''
                },
                tagsData(){
                     this.api.adver_tags_config_opstags().then((res)=>{
                        this.tagsList=res
                     })
                },
                active(index){
                    if(this.key.indexOf(index)==-1){
                        this.key.push(index)
                    }else{
                        for(var i =0;i<this.key.length;i++){
                            if(this.key[i]==index){
                                this.key.splice(i,1)
                            }
                        }
                    }
                },
                add(){
                    var taList=[];
                    for(var i=0;i<this.key.length;i++){
                        taList.push(this.tagsList[this.key[i]])
                    }
                    if(!this.name){
                        this.$message.error('项目名称不能为空');
                        return
                        
                    }
                    if(this.forms==[]){
                        this.$message.error('物料来源不能为空');
                        return
                        
                    }
                    if(this.key==[]){
                        this.$message.error('禁用分类不能为空');
                        return
                        
                    }
                    if(!this.mode){
                        this.$message.error('投审方式不能为空');
                        return
                        
                    }
                    if(!this.spaceids){
                        this.$message.error('媒体广告位不能为空');
                        return
                        
                    }
                    if(!this.pid&&this.tit=='编辑'){
                        this.$message.error('pid不能为空');
                        return
                        
                    }
                    if(this.tit=='编辑'){
                        var formData=new FormData;
                        formData.append("pid",this.pid);
                        formData.append('name',this.name);
                        formData.append('spaceids',this.spaceids)
                        formData.append('froms',JSON.stringify(this.froms))
                        formData.append('mode',this.mode)
                        formData.append('tags',JSON.stringify(taList))
                    }else{
                         var formData=new FormData;
                        formData.append('name',this.name)
                        formData.append('froms',JSON.stringify(this.froms))
                        formData.append('mode',this.mode);
                         formData.append('spaceids',this.spaceids)
                        formData.append('tags',JSON.stringify(taList))
                    }
                    this.api.adver_project_edit(formData).then((res)=>{
                        if(res!=false){
                            this.qx();
                            this.getDATA();
                        }
                    })
                },
                
        },
}
</script>

<style scoped>
    .top_name{height: 100px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .top_txt{
        cursor: pointer;
    }
    .tit_name{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(31,46,77,1);
        margin:0 10px 0 24px;
    }
     .sel{
        display: inline-block;
        float: right;
        margin:-40px 20% 0 0;

    }
    .sel span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 5px;
        color: #3377ff;
        border: 1px solid #ddd;
        text-align: center;
        margin-left: 15px;
        width:90px ;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
    }
     .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-top: 190px
    }
    .tcvBox{
    position: fixed;
    top: 65px;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.3);
    width: 100%;
    height: 100%;
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    width:500px;
    min-height: 450px;
    border-radius: 8px;
}
.box_tit{
    width: 100%;
    height:60px;
    border-bottom: 1px solid #000;
    line-height: 60px;
}
.box_tit span{
    display: inline-block;
    margin-left: 24px;
    font-size: 16px;
    font-weight: bold;
    color:#000;
}
.titles{
    display: inline-block;
    width: 120px;
    text-align: left;

}
.box_con{
     width: 100%;
}
.box_con div{
    margin-top:24px
}
.box_con div input{
    width: 190px;
    height: 26px;
    padding:5px 0 5px 10px;
    border-radius: 3px;
}
.box_con div select{
    width:200px;
    height: 36px;
}
.box_con div span{
    display: inline-block;
     margin-left: 24px;
    font-size: 14px;
    font-weight:400;
    color:#000;
}
.btn{
   width:100%; 
}
.yes,.qx{
    display: inline-block;
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 50px;
    float: right;
}
.yes{
    border: 0!important;
    background: #3377ff;
    color: #fff!important;
    margin-right: 24px!important;
    cursor: pointer;
}
.ta{
    display: inline-block;
    padding:3px 5px;
    border:1px solid #ddd;
    color: #000;
    border-radius: 3px;
    margin: 10px 10px 0 0 !important;
    cursor: pointer;
}
.ta:hover{
     background: #3377ff;
    border:0!important;
    color:#fff!important
}
.act{
    background: #3377ff;
    border:0!important;
    color:#fff!important
}
</style>