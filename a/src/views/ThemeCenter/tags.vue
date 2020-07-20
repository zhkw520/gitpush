<template>
    <div class="bg">
        <div class="tag">
            <div class="tit">
                <span>编辑标签</span>
                <img src="../../../public/img/gb.png" @click="qx()">
            </div>
            <div class="tags_con">
                <div class="tags_con_1">
                    <input  type="text" placeholder="创建或搜索个性标签" v-model="tagsName" @input="getTagsList()"/>
                    <div>
                        <span class="CJ" v-if="tagsName!=''" @click="ADDtag()">创建“{{tagsName}}”标签</span>
                        <div>
                            <template>
                                <el-checkbox-group
                                        v-model="tags">
                                    <el-checkbox v-for="(item,index) in tag" :label="item.name">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                    </div>
                </div>
                <div style="padding-left: 24px">
                    <span class="bc" @click="setTags()">保存</span>
                    <span class="qx" @click="qx()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tags",
        props:["type",'id','bq'],
        data(){
            return{
                tag:[],
                tags:[],
                tagsName:'',
            }
        },
        mounted(){
            this.tags=this.bq.split(',');
            this.getTagsList();

        },
        methods:{
            qx(){
                this.$parent.qxTags();
            },
            getTagsList(){
                let params = {material:'2',type:'theme',search:this.tagsName,p:500,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.tag=da.data.self_tags;
                })
            },
            ADDtag(){
                let formData =new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',"1");
                formData.append('material','2');
                formData.append('type',this.type);
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName='';
                    this.getTagsList();
                })
            },
            setTAG(){
                let formData=new FormData;
                formData.append('pkgid',this.id);
                formData.append('tags',this.tags.join(','));
                this.api.themes_package_edit_tags(formData).then((res)=>{
                    this.qx();
                })
            },
            setTags(){
                if(this.type==undefined){
                    this.setTAG();
                    return
                }
                let formData=new FormData;
                formData.append('thmid',this.id);
                formData.append('tags',this.tags.join(','));
                this.api.themes_material_edit_tags(formData).then((res)=>{
                    this.qx();
                })
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
.tag{
    width:560px;
    height:317px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    position: relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
    .tit{
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #E6E9F0;
    }
.tit span{
    display: inline-block;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(61,73,102,1);
    line-height: 50px;
    margin-left:24px ;
}
.tit img{
    margin-top: 15px;
    float: right;
    width:16px;
    height:16px;
    cursor: pointer;
    margin-right: 24px;
}
    .tags_con{
        width: 100%;
        height: 259px;
    }
    .tags_con_1{
        width: 512px;
        padding: 14px 24px;
        height: 190px;
        overflow-y:auto;
    }
    .CJ{
        display: inline-block;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        padding: 3px 5px ;
        background: #d7d7d7;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 10px!important;
    }
    input{
        width:316px;
        height:28px;
        padding-left:10px ;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 14px;
    }
    .bc{
        display:inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-right: 14px;
    }
    .qx{
        display:inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
</style>