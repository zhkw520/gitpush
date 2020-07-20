<template>
    <div>
        <div class="top_name">
            <span class="top_txt">个人中心/修改密码</span>
            <div class="title_left">
                <span>修改密码</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="center">
                <div class="message">
                    <span class="fs">初始密码</span>
                    <input type="password" v-if="show_1" v-model="input1" />
                    <input type="text" v-if="show" v-model="input1" @input="yz()"/>
                    <div class="imgs_1">
                        <img :src="url" @click="heid"/>
                    </div>

                </div>
                <div class="message">
                    <span>新密码</span>
                    <input type="password" v-if="show_1" v-model="input2" />
                    <input type="text" v-if="show" v-model="input2" @input="yz1()"/>
                </div>
                <div class="message">
                    <span>确认新密码</span>
                    <input type="password" v-if="show_1" v-model="input3" @blur="yz3()"/>
                    <input type="text" v-if="show" v-model="input3" @blur="yz3()"/>
                </div>
            </div>
            <div class="btns">
                <span class="btn_txt" @click="edit_account_password">修改</span>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "password",
        data(){
            return{
                show:false,
                show_1:true,
                input1:'',
                input2:'',
                input3:'',
                url:'img/eye2.png'
            }
        },
        methods:{
            heid(){
                this.show = !(this.show);
                this.show_1 = !(this.show_1);
                if(this.url=='img/eye2.png'){
                    this.url = 'img/eye.png'
                }else {
                    this.url='img/eye2.png'
                }

            },
            edit_account_password(){

                if(!this.input1){
                    this.$message.error('旧密码不能为空！');
                    return
                }
                if(!this.input2){
                    this.$message.error('新密码不能为空！');
                    return
                }
                if(!this.input3){
                    this.$message.error('重复密码不能为空');
                    return
                }
                if(this.input2!=this.input3){
                    return
                }
                let params = {
                    email:localStorage.getItem('userAd'),
                    password_old:this.input1,
                    password:this.input2,
                    password_confirmation:this.input3,
                };
                this.api.edit_account_password(params).then((res)=>{

                });
            },
            yz(){
                if(!this.input1.match(/^[\u4e00-\u9fa5]+$/ )){
                    return
                }else{
                    this.$message.error('密码不能为汉字')
                }
            },
            yz1(){
                if(!this.input2.match(/^[\u4e00-\u9fa5]+$/ )){
                    return
                }
            },
            yz3(){
                if(this.input2!=''&&this.input3!=''&&this.input2!=this.input3){
                    this.$message.error('两次密码不相同，请重输')
                }
                if(!this.input3.match(/^[\u4e00-\u9fa5]+$/ )){
                    return
                }else{
                    this.$message.error('密码不能为汉字')
                }
            }
        }
    }
</script>

<style scoped>
.centNavBox{
    width: 100%;
    padding: 24px 0 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #FFF;
    margin-top:194px;
}
.top_name{
    height: 109px;
    z-index: 999999;
}
.top_txt{
    display: inline-block;
    margin-left: 24px;
}
.center{margin-bottom: 24px}
.btns{text-align:left;margin-left: 114px}
.btns>span{
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
    text-align: center;
    cursor: pointer;
    line-height: 36px;
}
.message{margin-bottom: 24px}

.message>span{
    display: inline-block;
    width: 80px;
    margin-left: 10px;
    margin-right: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    line-height:36px;
    text-align: right;
}
.message>input{
    margin-left: 0;
    width:394px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    padding-left: 10px;
}
.btn_txt{
    background:rgba(51,119,255,1)!important;
    border: 0!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 14px;
}
.fs{
    margin-left: 40px;
}
.title_left{
    margin-bottom: 100px;
}
.imgs_1{
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-left: 15px;
    /*border: 1px dashed #ddd;*/
    vertical-align: middle;
    cursor: pointer;
}
img{
    width: 16px;
}
.title_left>span{
    display: inline-block;
    margin-left: 24px;
    font-size:20px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(50,50,50,1);
}
</style>