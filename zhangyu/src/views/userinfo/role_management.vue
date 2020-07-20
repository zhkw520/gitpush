<template>
    <div>
        <div class="top_name">
            <span class="top_txt">账号权限 / </span>
            <span class="log_ur">角色管理</span>
            <div class="title_left">
                <span>角色管理</span>
            </div>
            <div class="role_lw">
                <span :class="{active:num==0}" @click="getRole('0')">内部角色</span>
                <span :class="{active:num==1}" @click="getRole('1')">外部角色</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="box_input">
                <div class="btn_box" @click="jump">
                    <span><img src="../../../public/img/add_msg.png" style="width: 12px;margin-right: 14px">添加角色</span>
                </div>
                <div class="box" v-for="(item,index) in list">
                    <div class="box_1">
                        <img :src="item.icon==''?'./img/user.png':item.icon" style="border-radius: 50%;width: 80px;height: 80px">
                    </div>
                    <div class="box_2">
                        <p class="box_txt">{{item.role_name}}</p>
                        <p class="masg">{{item.created_at}}创建</p>
                    </div>
                    <div class="box_3">
                        <p class="box_txt box_num" @click="nums(index)">{{item.user_count}}</p>
                        <p class="masg">已绑定账号数</p>
                    </div>
                    <div class="box_4" @click="enter(index)">
                        <img src="../../../public/img/xiugai.png">
                    </div>
                </div>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[30, 40, 50, 60]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "role_management",
        data(){
            return {
                listShow:false,
                list:[],
                id:null,
                p:30,
                page:1,
                total:0,
                search:'',
                role_type:'0',
                num:0,
            }
        },
        mounted(){
            this.getRole();
        },
        methods:{
            jump(){
                this.$router.push({
                    path:'/userinfo/AddRole',
                    query:{
                        role_type:this.role_type
                    },
                })
            },
            getRole(num){
                if(num){
                    this.num=num;
                    this.role_type=num
                }
                let params = {search:this.search,p:this.p,page:this.page,role_type:this.role_type};
                this.api.role_roles({params}).then((res)=>{
                    console.log(res);
                    this.total = res.total;
                    this.list = res.data;
                    console.log(this.list[0].role_id)
                })
            },
            enter(a){
                this.$router.push({
                    path:'/userinfo/AddRole',
                    query:{
                        role_id: this.list[a].role_id,
                        role_type:this.list[a].type

                    }
                })
            },
            nums(index){
                this.$router.push({
                    path:'/userinfo/quantuty',
                    query:{
                        role_id:this.list[index].role_id,
                        role_name:this.list[index].role_name,
                    }
                })
            },
            handleSizeChange(p){
                this.p = p;
                this.getRole();
            },
            handleCurrentChange(page){
                this.page =page;
                this.getRole();
            },
        }
    }
</script>

<style scoped>
    .top_name{
        height: 143px;
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
        margin-bottom: 20px;
    }
    .role_lw{margin-left: 24px}
    .role_lw span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin-right: 56px;
        padding-bottom: 24px;
        cursor: pointer;
    }
    .active{
        color:rgba(51,119,255,1)!important;
        border-bottom: 2px solid #3377FF!important;
    }
    .centNavBox{
        width: 100%;
        padding: 24px 0 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-top:204px;
    }
    .log_ur{
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
.btn_box{
    display: inline-block;
    text-align: center;
    width:519px;
    height:124px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    vertical-align: top;
    margin: 0 17px 24px 0;
    cursor: pointer;
    border: 2px dotted #d3dbeb;
}

    .btn_box>span{
    display: inline-block;
    border-radius:5px;
    text-align: center;
    line-height:128px;
    margin-right: 20px;
    cursor: pointer;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    }

.box{
    display: inline-block;
    width:523px;
    height:128px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    margin: 0 17px 20px 0;
    position: relative;
}
.box:nth-child(3){
    margin: 0 0 20px 0!important;
}
.box:nth-child(3n){
    margin: 0 0 20px 0!important;
}
.box_input{
    position: relative;
    top:0;
    left: 0;
}
.box_1{
    width:80px ;
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    margin: 0 20px 0 30px;
}
img{
    width: 80px;
}
.box_2{
    display: inline-block;
    margin-right: 30px;
    position: relative;
    top:33%;
    transform: translateY(-50%);
}
.box_3{
    display: inline-block;
    text-align: center;
    position: relative;
    top:33%;
    transform: translateY(-50%);
}
.btn_title{display: inline-block}
.btn_title>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#1f2e4d;
    line-height:36px;
}
p{
    font-size: 12px;
}
.box_4{
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    border:20px solid;
    border-color:#3377ff #3377ff transparent transparent ;
    border-radius: 5px;
}
.box_4>img{
    width:20px;
    position: relative;
    top:-18px;

}
.box_txt{
    margin-bottom: 15px;
    font-size:18px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#1f2e4d;
}
.masg{
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#8f9bb3;
}
.box_num{
    text-decoration:underline;
    color:#3377ff;
    cursor: pointer;
}
</style>