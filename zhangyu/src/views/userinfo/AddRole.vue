<template>
    <div>
        <div class="top_name">
            <span class="top_txt">账号权限 / </span>
            <span class="log_ur">角色管理</span>
            <div class="title_left">
                <span v-if="this.$route.query.role_type=='0'&&this.$route.query.role_id!=undefined">编辑内部角色</span>
                <span v-else-if="this.$route.query.role_type=='1'&&this.$route.query.role_id!=undefined">编辑外部角色</span>
                <span v-else-if="this.$route.query.role_type=='1'&&this.$route.query.role_id==undefined">添加外部角色</span>
                <span v-else-if="this.$route.query.role_type=='0'&&this.$route.query.role_id==undefined">添加内部角色</span>
            </div>
        </div>
        <div class="select_tit">
            <div class="role_name">
                <div class="icon">
                    <img :src="img" style="width:100px;height: 100px;border-radius: 50%"/>
                    <div style="position: absolute;top:0;width: 100px;height: 100px">
                        <el-upload
                                class="upload-demo"
                                action="11"
                                :http-request="upload"
                                >
                            <el-button size="small" type="primary">修改头像</el-button>
                        </el-upload>
                    </div>
                </div>
                <div style="display: inline-block;margin-left: 30px">
                    <div class="tit_name" >
                        <span >角色名称</span>
                        <input type="text" placeholder="最多输入10个字" maxlength="10" v-model="name"/>
                    </div>
                    <div>
                        <div class="role_parent">
                            上级角色
                            <select v-model="parent">
                                <option value="0">无</option>
                                <option v-for="(item,index) in parentList" :value="item.role_id">{{item.role_name}}</option>
                            </select>
                        </div>
                        <div class="role_Add_switch" v-if="this.$route.query.role_id!=undefined">
                            是否启用
                            <el-switch
                                    v-model="status"
                                    @change=GetSwitch
                                    active-value=1
                                    inactive-value=0
                                    active-color="#3377ff"
                                    inactive-color="#e6e9f0">
                            </el-switch>
                        </div>
                    </div>
                </div>

            </div>
            <div class="centNavBox">
                <div class="role_message" v-for="(item,index) in list">
                    <div class="role_message_1">
                        <span class="dysfunction">{{item.group.group_name}}</span>
                        <div class="role_message_1_1">
                            <template>
                                <el-checkbox-group
                                        v-model="checkedCities1">
                                    <el-checkbox v-for="(bq,index2) in item.perm_group" :label="bq.group_key" :key="bq.group_key">{{bq.group_name}}</el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <span class="btn_txt" @click="AddRole()">添加</span>
                    <span @click="jumpReturn">取消</span>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "add-role",
        data(){
            return {
                radio:3,
                titleName:'',
                status:"1",
                name:'',
                checkedCities1:[],
                parent:'',
                list:[],
                parentList:[],
                type:0,
                img:'./img/user.png'
            }
        },
        mounted(){
            this.getList();
            if(this.$route.query.role_id !=undefined){
                this.roleMessage();
            }
        },
        methods:{
            getList(){
                var obj={role_type:''};
                if(this.$route.query.role_type !=undefined){
                    obj.role_type=this.$route.query.role_type
                }
                let params=obj;
                this.api.perm_group({params}).then((res)=>{
                    this.list = res;
                    this.getParent();
                })
            },
            AddRole(){
                if(this.$route.query.role_id !=undefined){
                    this.api.perm_role_edit({role_name:this.name,role_id:this.$route.query.role_id,status:this.status,group_key:this.checkedCities1,parent:this.parent,icon:this.img}).then((res)=>{
                        this.$router.push({
                            path:'/userinfo/roleManagement'
                        })
                    })
                }else{
                    if(this.$route.query.role_type=='1'){
                        this.type='1'
                    }else{
                        this.type='0'
                    }
                    this.api.perm_role_add({role_name:this.name,role_desc:this.description,group_key:this.checkedCities1,parent:this.parent,type:this.type,icon:this.img,status:this.status}).then((res)=>{
                        this.$router.push({
                            path:'/userinfo/roleManagement'
                        })
                    })
                }

            },
            getParent(){
                this.api.role_leader().then((res)=>{
                    this.parentList = res;
                    console.log(res);
                })
            },
            jumpReturn(){
                this.$router.push({
                    path:'/userinfo/roleManagement'
                })
            },
            roleMessage(){
                let params = {role_id:this.$route.query.role_id,role_type:this.$route.query.role_type};
                this.api.perm_role_group({params}).then((res)=>{
                    this.name = res.role.role_name;
                    if(res.role.icon!=''){
                        this.img=res.role.icon;
                    }
                    if(res.role.parent!=null){
                       this.parent = res.role.parent.role_id;
                    }
                    this.status = res.role.status.toString();
                    let dataId = res.permGroup;
                    for(let id in dataId){
                        for(let permid in dataId[id].perm_group){
                            if(dataId[id].perm_group[permid].valid==1){
                                this.checkedCities1.push(dataId[id].perm_group[permid].group_key);
                            }
                        }
                    }
                })
            },
            GetSwitch(){
                let formData = new FormData;
                formData.append('id',this.$route.query.role_id);
                formData.append('status',this.status);
                this.api.change_role_status(formData).then((res)=>{

                })
            },
            upload(file){
                this.img='./img/up.png';
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.img=res.url;
                })
            },
        },
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 999999;
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
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .centNavBox{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:24px;

    }
    .select_tit{
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height:164px;
        margin-top:194px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
.role_name{
    margin-bottom: 30px;
    overflow: hidden;
    height: 164px;
}
.role_name>input{
    width:394px;
    padding-left: 10px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px!important;
}
.wb{
    display: inline-block;
}
.wb select{
    width:64px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px;
}

.role_Add>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    line-height:36px;
}
.role_name span{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
}
.role_message{
    width: 100%;
    height: 120px;
    margin: 20px 20px 20px 0;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.role_message_1>span{
    display: block;
    margin-bottom: 15px;
    line-height: 50px;
    font-size:18px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
}
.el-checkbox{margin-right: 100px}
.btn{
    text-align: left;
    margin-bottom: 80px;
    position: relative!important;
}
.btn>span{
    display: inline-block;
    width:68px;
    text-align: center;
    height:36px;
    border: 1px solid #ddd;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#000;
}

.btn_txt{
    background:#3377ff;
    border: 1px solid transparent;
    margin-right: 14px;
    color:rgba(255,255,255,1)!important;
}
.role_Add_switch{
    float: right;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
    margin-left: 50px;
}

.role_parent{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
}
.role_parent>select{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-left: 24px;
}

    .icon{
        display: inline-block;
        position: relative;
        width:100px;
        height:100px;
        margin-left: 24px;
        top:10px;
        text-align: center;
    }
    .tit_name{
        margin-bottom: 18px;
        margin-top: 37px;
    }
    .tit_name span,.DQrole_name span{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tit_name input,.DQrole_name input{
        width:394px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
</style>