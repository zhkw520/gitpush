<template>
    <div class="work_tab">
        <el-table
                :data="tableData2"
                header-align="center"
                :header-cell-style="getRowClass"
                :cell-style="cell"
                border
                style="width: 100%;color:#000">
            <el-table-column
                    prop="user_name"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="用户邮箱">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="updated_at"
                    label="最近记录">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="账号状态">
                <template slot-scope="scope">
                    <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#3377ff"
                            inactive-color="#e6e9f0"
                            v-model="scope.row.status"
                            @change=change(scope.$index,scope.row.status)>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="getUSERdATA(scope.$index)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <set v-if="User" :userMessage="userMessage" :id="id"></set>
    </div>

</template>

<script>
    import set from './setUser'
    export default {
        components:{set},
        props:['tableData2','management','list','roleID'],
        name: "table",
        data(){
            return{
                User:false,
                userMessage:{},
                id:'',
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#8F9BB3;text-align:center;font-size:14px;font-weight:Medium;height:48px;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            change(a,b){
                this.api.edit_account_status({email:this.tableData2[a].email,status:b}).then((res)=>{

                })
            },
            qx(){this.User=false},
            getUSERdATA(a){
               this.User= true;
               this.id = this.roleID;
               this.userMessage=this.tableData2[a];
            },
        }
    }
</script>

<style scoped>

</style>