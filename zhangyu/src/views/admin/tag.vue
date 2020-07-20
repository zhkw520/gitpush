<template>
    <div class="bg">
        <div class="content">
            <div class="tit">
                <span>编辑标签</span>
            </div>
            <div class="AddIMG_bq">
                <span class="bq">选择标签</span>
                <div class="AddIMG_bq_boxs">
                    <div class="AddIMG_bq_box_top">
                        <div class="AddIMG_bq_box_top_tit">预置标签:</div>
                        <div class="AddIMG_bq_box_top_bq">
                            <!--<span class="bq" v-for="(item,index) in preset_tags">{{item.name}}</span>-->
                            <template>
                                <el-checkbox-group
                                        v-model="preinstall">
                                    <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" v-if="item.name!=''">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                    </div>
                    <div class="AddIMG_bq_box_bottom">
                        <div class="AddIMG_bq_box_top_tit">
                            个性标签:
                        </div>
                        <div style="height: 36px;text-align: left">
                            <input type="text" placeholder="创建或搜索个性标签" v-model="tagsName" maxlength="6" @input="getTagsList()"/>
                        </div>
                        <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                            <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
                            <template>
                                <el-checkbox-group
                                        v-model="bardian">
                                    <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg_btn">
                <span class="bg_btn_up" @click="setTags()">保存</span>
                <span @click=" QXtag()">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['message','material','typeSC'],
        name: "tag",
        data(){
            return{
                preset_tags:[],
                self_tags:[],
                preset:[0,1],
                preinstall:[],
                bardian:[],
                tagsName:'',
            }
        },
        mounted(){this.getTagsList(); },
        methods:{
            QXtag(){
                this.$parent.YCtag()
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.typeSC,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags;
                    console.log(this.preset_tags);
                    this.getMatterDetails();
                })
            },
            ADDtags(){
                let formData = new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',0);
                formData.append('material',this.material);
                formData.append('type',this.typeSC);
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName='';
                    this. getTagsList();
                    console.log(this.preinstall);
                })
            },
            getMatterDetails(){
                if(this.material==1){
                    let params ={mid:this.message.mid};
                    this.api.material_detail({params}).then((res)=>{
                        this.preinstall=res.tags;
                        this.bardian=res.self_tags;
                        console.log(this.bardian)
                    })
                }else{
                    console.log(this.message);
                    let params ={mfid:this.message.mfid};
                    this.api.mfinal_detail({params}).then((res)=>{
                        this.preinstall= res.tags;
                        this.bardian=res.self_tags;
                        console.log(res)
                    })
                }

            },
            setTags(){
                if(this.material==1){
                    if(this.preinstall.length<=0){
                        this.$message.error('至少要有一个预置标签');
                        return
                    }
                    let formData = new FormData;
                    formData.append('mid',this.message.mid);
                    formData.append('tags',this.preinstall);
                    formData.append('self_tags',this.bardian);
                    this.api.material_edit_tags(formData).then((res)=>{
                        this.$emit('updata','aa');
                        this.$parent.YCtag();
                    })
                }else{
                    if(this.preinstall.length<=0){
                        this.$message.error('至少有一个预置标签')
                        return
                    }
                    let formData = new FormData;
                    formData.append('mfid',this.message.mfid);
                    formData.append('tags',this.preinstall);
                    formData.append('self_tags',this.bardian);
                    this.api.mfinal_edit_tags(formData).then((res)=>{
                        this.$emit('updata','aa');
                        this.$parent.YCtag();
                    })
                }

            },
        }

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
    transform:translate(-50%,-50%);
    width:560px;
    height:472px;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.tit{
    text-align: left;
    margin-bottom: 20px;
    width:100%;
    height: 56px;
    border-bottom: 1px solid #E6E9F0;

}
.tit span{
    display: inline-block;
    line-height: 56px;
    margin-left: 24px;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.title{
    margin: 0 60px;
}
.title_1 span{
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}

.btn{
    text-align: center;
}
.btn span{
    display: inline-block;
    width:140px;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(153,153,153,1);
    border-radius:5px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height: 50px;
    cursor: pointer;
}
.btn_bc{
    border: 0!important;
    background:rgba(19,159,248,1)!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 40px;
}

.AddIMG_bq_boxs{
    width:560px;
    height:280px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    overflow-y: auto;
    /*position: relative;*/
    /*left: 38%;*/
    /*transform: translateX(-50%);*/
    display: inline-block;
}
.AddIMG_bq_box_top{
    overflow-y: auto;
    border-bottom: 0!important;
}
.AddIMG_bq_box_top_tit{
    margin: 17px 0 15px 17px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
}
.AddIMG_bq_box_top_bq{
    margin:0 20px 0px 0px !important;
}
.AddIMG_bq_box_top_zdy{
    margin:0 20px 0px 11px !important;
}

 input{
     margin-left: 24px;
    margin-right: 10px;
     padding-left: 10px;
    width:130px;
    height:26px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
    border-radius:5px;
    padding-right: 25px;
}
.bq{
    display: block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin-left: 24px;
    vertical-align: top;
}

.AddIMG_bq_box_top{
    border-bottom: 1px solid rgba(230,230,230,1);
}
.AddIMG_bq_box_top_tit{
    margin: 18px 0 18px 24px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
}
.AddIMG_bq_box_top_bq{
    margin:0 20px 0px 11px !important;

}


.AddIMG_bq_box_top_tit input{
    float: left!important;
    display: block;
    width:326px;
    height:28px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin: 10px 0 10px 0px!important;
    padding-right: 0!important;

}
.bg_btn{margin: 24px 0;text-align: left}
.bg_btn span{
    display: inline-block;
    width:68px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    line-height: 36px;
    text-align: center;
    cursor: pointer;
}
.bg_btn_up{
    border:0!important;
    background:rgba(51,119,255,1)!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 14px;
    margin-left: 24px;
}
.CJ{
    display: inline-block;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #d3dbeb;
    padding: 3px 5px ;
    background: #e6e9f0;
    font-size: 12px;
    border-radius: 5px;
    margin-left: 13px;
    margin-bottom: 10px!important;
}

</style>