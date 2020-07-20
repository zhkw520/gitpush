<template>
    <div class="detail">
        <div class="detail_1">
            <div class="detail_1_1_1">
                <span >添加账号</span>
            </div>
            <div class="detail_1_1_3">
                <span class="txt txt_right">所属角色</span>
                <select v-model="role">
                    <option :value="item.role_id" v-for="item in selectData">{{item.role_name}}</option>
                </select>
                <span class="btn_1_3">查看权限</span>
            </div>
            <div class="detail_1_1_4">
                <span  class="txt">用户名</span>
                <input type="text" v-model="name" maxlength="10"/>
            </div>
            <div class="detail_1_1_5">
                <span  class="txt">邮箱账号</span>
                <input type="text" v-model="email"/>
            </div>
            <div class="detail_1_1_6">
                <span  class="txt">初始密码</span>
                <input type="text" v-model="password"/>
            </div>
            <div class="detail_1_1_6">
                <span  class="txt">再次输入密码</span>
                <input type="text" v-model="password_confirmation"/>
            </div>
            <div class="detail_1_1_7">
                <span  class="txt">公司名称</span>
                <input type="text" v-model="company"/>
            </div>
            <div class="detail_1_1_8">
                <span  class="txt">联系电话</span>
                <input type="text" v-model="phone"/>
            </div>
            <div class="operate">
                <span class="btn_txt_1" @click=" addWbUser()" :class="{active:name==''||email==''||password==''||password_confirmation==''||company==''||phone==''}" >添加</span>
                <span class="btn_txt_2" @click="qx">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['userMessage'],
        name: "a-d-duser",
        data(){
            return {
                selectData:[],
                isActive:1,
                listTab:false,
                list:[],
                role_id:'',
                name:'',
                email:'',
                role:'',
                rolesList:[],
                company:'',
                password:'',
                phone:'',
                password_confirmation:'',
                type:''
            }
        },
        mounted(){
            this.getuserDATA();
        },
        methods:{
            getuserDATA(){
                // let params = {search:'',p:100,page:1};
                // this.api.role_roles({params}).then((res)=>{
                //     console.log(res);
                //     this.total = res.total;
                //     this.selectData = res.data;
                //     console.log(this.selectData)
                // })
                this.api.role_external_roles().then((res)=>{
                    this.selectData=res
                })
            },

            qx(){
                this.$parent.qx()
            },

            addWbUser(){
                if(!this.name){
                    this.$message.error('用户名不能为空')
                    return
                }
                if(!this.email){
                    this.$message.error('邮箱不能为空')
                    return
                }
                if(!this.password){
                    this.$message.error('密码不能为空')
                    return
                }if(!this.password_confirmation){
                    this.$message.error('确认密码不能为空')
                    return
                }
                if(this.password_confirmation!=this.password){
                    this.$message.error('两次密码不相同')
                    return
                }
                if(!this.company){
                    this.$message.error('公司不能为空')
                    return
                }
                if(!this.phone){
                    this.$message.error('电话不能为空')
                    return
                }
                this.api.account_external_add({name:this.name,email:this.email,password:this.password,password_confirmation:this.password_confirmation,role_id:this.role,company:this.company,phone:this.phone,contact_email:this.email}).then((res)=>{
                    console.log(res)
                    if(res != false){
                        this.$parent.qx()
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .detail{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 99999999;
        top: 65px;
        bottom: 0;
        right: 0;
    }
    .detail_1{
        position: absolute;
        top: 50%;
        left: 44%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        overflow-y: auto;
        width:584px;
        background:rgba(255,255,255,1);
        border-radius:4px;;
        text-align: center;
        z-index: 9999999;
    }

    .detail_1_2>img{
        width: 30px;
        position: absolute;
        top: -28px;
        right: -65px;
    }
    .detail input{
        margin-left:24px;
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .detail div{
        margin-bottom:24px ;
    }
    .txt{
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        display: inline-block;
        width: 90px;
        text-align: right;
        margin-left: 10px;
    }
    .detail select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
        margin-left:24px;
    }

    .btn_1_3{
        display: inline-block;
        width:96px;
        height:36px;
        text-align: center;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        line-height: 36px;
        cursor: pointer;
    }
    .detail_1_1_1{
        text-align: left;
        height: 55px;
        border-bottom: 1px solid #E6E9F0;
    }
    .detail_1_1_1>span{
        display: inline-block;
        line-height: 55px;
        margin-left: 20px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .operate{
        text-align: left;
        margin-left: 116px;
    }
    .btn_txt_1{
        display: inline-block;
        width:68px;
        height:36px;
        text-align: center;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 36px;
        margin-right: 14px;
        cursor: pointer;
    }
    .active{
        background: #CAD1E0!important;
        color: #FFF!important;
    }
    .btn_txt_2{
        display: inline-block;
        width:68px;
        height:36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 36px;
        cursor: pointer;
    }
    .detail_1_1_3,.detail_1_1_4,.detail_1_1_5,.detail_1_1_6,.detail_1_1_7,.detail_1_1_8{
        text-align: left;
    }
</style>