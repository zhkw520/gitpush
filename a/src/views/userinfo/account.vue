<template>
<div>
    <div class="top_name">
        <span class="top_txt">个人中心/可管理账号</span>
        <div class="title_left">
            <span>可管理账号</span>
        </div>
    </div>
    <div class="box_input">
        <div class="box" v-for="(item,index1) in list">
            <div class="box_1">

                <img :src="item.icon==''?'./img/user.png':item.icon" style="border-radius: 50%;width: 80px;height: 80px">
            </div>
            <div class="box_2">
                <p class="box_txt">{{item.role_name}}</p>
                <p>{{item.created_at}}创建</p>
            </div>
            <div class="box_3">
                <p class="box_txt box_num">{{item.users.length}}</p>
                <p>已绑定账号数</p>
            </div>
            <div class="box_4" @click="details(index1)">
                <img src="../../../public/img/mesg.png">
            </div>
        </div>
    </div>
    <div class="centNavBox">
        <div class="box_input_2">
            <input type="text" placeholder="输入用户名或邮箱快速查询" v-model="search" @input=" getList()"/>
            <span class="btns">查询</span>
            <span class="btn_2" @click="add"><img src="../../../public/img/add_msg.png">添加账号</span>
        </div>
        <div class="box_input_3">
            <div class="name" v-for="(item,index) in list" @click="aaa(index)" :class="{active:num ==index}"><span>{{item.role_name}}</span></div>
        </div>
        <tab :tableData2="tableData2" :management="management" :list="list" style="margin:0 24px" :roleID="roleID"></tab>
        <div class="detail" v-if="show">
            <div class="detail_1">
                <div class="detail_1_1">
                    <span>{{name}}权限详情</span>
                </div>
                <el-table
                        :header-cell-style="getRowClass"
                        :data="tableData"
                        border
                        style="width: 100%;color: black;">
                    <el-table-column
                            prop="group_name"
                            label="权限名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="note"
                            label="权限说明">
                    </el-table-column>
                </el-table>
                <div class="detail_1_2" @click="shut">
                    <img src="../../../public/img/gb.png"/>
                </div>
            </div>
        </div>

        <ADD v-if="management"></ADD>
    </div>
</div>

</template>

<script>
    import tab from './table';
    import ADD from './ADDuser'
    export default {
        components:{tab,ADD},
        name: "account",
        data(){
            return{
                tableData:[
                    {
                        group_name:'',
                        note:''
                    }
                ],
                num:0,
                selectData:[],
                isActive:1,
                listTab:false,
                list:[],
                role_id:'',
                name:'',
                email:'',
                roles:'',
                company:'',
                password:'',
                phone:'',
                password_confirmation:'',
                management:false,
                show:false,
                tableData2:[],
                rolesList:[],
                roleID:'',
                search:'',

            }
        },
        mounted(){
            this.getData();
            this.getList();
        },
        methods:{
            details(c){
                this.show=true;
                this.api.role_user().then((res)=>{
                   this.role_id= res[c].role_id;
                   this.name=res[c].role_name;
                   this.role();
                })
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(246,246,246,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;height:48px;'
                } else {
                    return ''
                }
            },

            shut(){
                this.show=false
            },
            add(){
                this.management=true;
            },
            qx(){
                this.management=false;
            },
            getList(){
                let params = {search:this.search}
                this.api.role_user({params}).then((res)=>{
                    this.list = res;
                    this.tableData2 = res[0].users;
                    this.roleID =res[0].role_id;
                })
            },
            aaa(index){
                this.api.role_user().then((res)=>{
                    this.tableData2 = res[index].users;
                    this.roleID = res[index].role_id;
                    this.num = index;
                    console.log(this.num);
                })
            },
            role(){
                let params = {role_id:this.role_id};
                this.api.perm_userperm({params}).then((res)=>{
                    this.tableData = res;
                    console.log(res)
                })
            },

            getEmilUSER(){
                let params = {};
                this.api.get_account({params}).then((res)=>{

                })
            },
            getData(){
                let params = {
                    email:localStorage.getItem('userAd'),
                };
                this.api.get_account({params}).then((datas)=>{
                    this.userData = datas;
                    console.log(datas.roles)
                    var rolesList=[];
                    for(let i=0;i<this.userData.roles.length;i++){
                        rolesList.push(this.userData.roles[i].role_name);
                    }
                    this.rolesList=rolesList;
                    // if(rolesList.indexOf('admin')!=-1){
                    //     this.$router.push({
                    //         path:'/userinfo/AccounAudit'
                    //     })
                    // }
                });
            },
        }
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 999;
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
    .centNavBox{
        width: 100%;
        padding: 24px 0 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:24px;
    }

.box_input{
    margin-top: 197px;
}
.box{
    display: inline-block;
    width:523px;
    height:128px;
    margin-right: 17px;
    position: relative;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius:5px;
}
.box:nth-child(3n){
    margin-right: 0;
}
.txt_right{
    padding-right: 9px;
}
.box_1{
    width:80px ;
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    margin: 0 20px;
}
.box_1 img{
    width: 80px;
    height: 80px;
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
p{
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(143,155,179,1);
}
.box_txt{
    margin-bottom: 15px;
    font-size:18px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(50,50,50,1);
}
input{
    margin-left: 0px;
    width:384px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px 0px 0px 4px;
    border:1px solid rgba(211,219,235,1);
    padding-left: 20px;
}
.btns{
    display: inline-block;
    width:68px;
    height:40px;
    line-height:40px;
    background:rgba(51,119,255,1);
    border-radius:0px 4px 4px 0px;
    cursor: pointer;
    text-align: center;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.btn_2{
    display: inline-block;
    width:112px;
    height:36px;
    line-height: 36px;
    background:rgba(242,246,252,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    float: right;
    text-align: center;
    margin-right: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(61,73,102,1);
    cursor: pointer;
}
.btn_2{
   margin-left: 60px;
}
.btn_2 img{
    width: 12px;
    margin-right: 14px;
}
.box_input_2{
    margin-bottom: 34px;
    margin-left: 24px;
}
.name{
    min-width:104px;
    height:36px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(211,219,235,1);
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
.name>span{
    display: inline-block;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    line-height: 36px;

}
.box_input_3{
    margin-left: 24px;
}
.box_num{
    font-size:18px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(48,144,240,1);
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
    border-radius:0 5px 0 0;
}
.box_4>img{
    width:20px;
    position: relative;
    top: -18px;
}
.detail{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 99999;
    top: 65px;
    left: 220px;
    bottom: 0;
    right: 0;
    margin-left: 38px;
}
.detail_1{
    position: absolute;
    top: 50%;
    left: 44%;
    padding: 30px 24px 0;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    overflow-y: auto;
    border-radius: 8px;
    width: 862px;
    height: 673px;
    text-align: center;
}
.detail_1_1{
    text-align: left;
}
.detail_1_1>span{
    display: inline-block;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
}
.detail_1_2{
    width: 30px;
    position: absolute;
    right: 80px;
    top:40px;
    cursor: pointer;
}

.detail_1_2>img{
    width: 16px;
    position: absolute;
    top: -16px;
    right: -54px;
}
.detail input{
    margin-left:30px;
    width:320px;
    height:50px;
    border:1px solid rgba(230,230,230,1);
    border-radius:5px;
}
.detail div{
    margin-bottom:30px ;
}
.active{
    background:rgba(51,119,255,1)!important;
}
.active>span{
    color:rgba(255,255,255,1)!important;
}
</style>