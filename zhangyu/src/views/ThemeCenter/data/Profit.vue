<template>
    <div>
        <div class="top">
            <span class="qj">收益数据</span>
            <!--<span class="Section">维度</span>-->
            <!--<select v-model="data_type">-->
                <!--<option value="1">整日</option>-->
                <!--<option value="2">整月</option>-->
            <!--</select>-->
        </div>
        <div class="tabs">
            <div>
                <div>
                    <!--<div class="date" v-if="data_type==2">-->
                        <!--<el-date-picker-->
                                <!--v-model="value1"-->
                                <!--type="month"-->
                                <!--placeholder="选择月">-->
                        <!--</el-date-picker>-->
                    <!--</div>-->
                    <div class="date" style="width: 225px" >
                        <el-date-picker
                                v-model="value"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </div>
                    <span class="nameTit">主题名称</span>
                    <input type="text" v-model="name">
                    <span class="nameTit">渠道</span>
                    <select v-model="channel">
                        <option v-for="item in channels" :value="item.channel">{{item.channel_name}}</option>
                    </select>
                    <span class="cx" @click="GetData()">查询</span>
                    <span class="cz" @click="CZ()">重置</span>
                    <span class="dc">导出</span>
                    <span class="bj" @click="checkBox()">编辑指标</span>
                </div>
            </div>
            <div>
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                    >
                        <el-table-column
                                prop="tdate"
                                label="日期"
                                v-if="num.seach1==true"
                        >
                        </el-table-column>

                        <el-table-column
                                prop="channel"
                                v-if="num.seach2==true"
                                label="渠道">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                                prop="theme_name"
                                label="主题名称"
                                v-if="num.seach3==true"
                        >
                        </el-table-column>

                        <el-table-column
                                prop="price"
                                v-if="num.seach4==true"
                                label="单价">
                        </el-table-column>

                        <el-table-column
                                prop="click"
                                v-if="num.seach5==true"
                                label="点击量">
                        </el-table-column>
                        <el-table-column
                                prop="ctr"
                                v-if="num.seach6==true"
                                label="点击率">
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].ctr}}%</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                prop="download"
                                v-if="num.seach7==true"
                                label="下载量">
                        </el-table-column>
                        <el-table-column
                                prop="sales"
                                v-if="num.seach8==true"
                                label="销售量">
                        </el-table-column>
                        <el-table-column
                                prop="cvr"
                                v-if="num.seach9==true"
                                label="转化率">
                                 <template slot-scope="scope">
                                    <span>{{tableData[scope.$index].cvr}}%</span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                prop="sales_amount"
                                v-if="num.seach10==true"
                                label="销售额">
                        </el-table-column>
                        <el-table-column
                                prop="cost_channel"
                                v-if="num.seach11==true"
                                label="渠道成本费">
                        </el-table-column>
                        <el-table-column
                                prop="bad_debt"
                                v-if="num.seach12==true"
                                label="坏账">
                        </el-table-column>
                        <el-table-column
                                prop="tax"
                                v-if="num.seach13==true"
                                label="扣税费">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                v-if="num.seach14==true"
                                label="设计师成本费">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                v-if="num.seach15==true"
                                label="利润">
                        </el-table-column>
                        <el-table-column
                        :show-overflow-tooltip="true"
                                prop="note"
                                v-if="num.seach16==true"
                                label="备注">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
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
        <div class="bg" v-if="selectBox">
            <div class="select">
                <div class="select_tit">
                    <span>编辑指标</span>
                    <img src="../../../../public/img/gb.png" @click="heidcheckBox()">
                </div>
                <div class="tableTit">
                    <div class="tits">
                        <span>筛选维度:</span>
                    </div>
                    <input type="checkbox" style="margin-left: 24px" v-model="num.seach1"/>
                    <span>日期</span>
                    <input type="checkbox" v-model="num.seach2"/>
                    <span>渠道</span>
                    <input type="checkbox" v-model="num.seach3"/>
                    <span>主题名称</span>
                    <input type="checkbox" v-model="num.seach4"/>
                    <span>单价</span>
                    <input type="checkbox" v-model="num.seach5"/>
                    <span>点击量</span>
                    <input type="checkbox"  style="margin-left: 24px" v-model="num.seach6"/>
                    <span>点击率</span>
                    <input type="checkbox" v-model="num.seach7"/>
                    <span>下载量</span>
                    <input type="checkbox" v-model="num.seach8"/>
                    <span>销售量</span>
                    <input type="checkbox" v-model="num.seach9"/>
                    <span>转化率</span>
                    <input type="checkbox" v-model="num.seach10"/>
                    <span>销售额</span>
                    <input type="checkbox" style="margin-left: 24px" v-model="num.seach11"/>
                    <span>渠道成本费</span>
                    <input type="checkbox" v-model="num.seach12"/>
                    <span>坏账</span>
                    <input type="checkbox" v-model="num.seach13"/>
                    <span>扣税费</span>
                    <input type="checkbox" v-model="num.seach14"/>
                    <span>设计师成本费</span>
                    <input type="checkbox" v-model="num.seach15" />
                    <span>利润</span>
                    <input type="checkbox" v-model="num.seach16" style="margin-left: 24px"/>
                    <span>备注</span>
                    <div class="checkBox_btn">
                        <span @click=" setTitName()">确定</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                value:'',
                tableData:[],
                data_type:"2",
                channels:[],
                channel:'',
                name:'',
                p:10,
                page:1,
                total:0,
                selectBox:false,
                num:{
                    seach1:true,
                    seach2:true,
                    seach3:true,
                    seach4:true,
                    seach5:true,
                    seach6:true,
                    seach7:true,
                    seach8:true,
                    seach9:true,
                    seach10:true,
                    seach11:true,
                    seach12:true,
                    seach13:true,
                    seach14:true,
                    seach15:true,
                    seach16:true,
                },


            }
        },
        mounted(){
            this.qd();
            this.GetData()
        },
        methods:{
            CZ(){
                this.name='';
                this.channel='';
                this.type='';
                this.className='';
                this.value='';
            },
            checkBox(){
                this.selectBox=true;
            },
            setTitName(){
                let formData=new FormData;
                formData.append('uri','/ThemeCenter/data/Profit');
                formData.append('options',JSON.stringify(this.num));
                this.api.common_options_update(formData).then((res)=>{
                    this.heidcheckBox()
                })
            },
            getTitName(){
                let params={uri:"/ThemeCenter/data/Profit"};
                this.api.common_options_get({params}).then((res)=>{
                    if(res!=null){
                        this.num=JSON.parse(res.options);
                    }
                });
            },
            heidcheckBox(){
                this.selectBox=false;
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(255,255,255,1);color:#1f2e4d;margin:0 24px;font-size:14px;font-weight:Medium;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'margin:0 24px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            // themeType(){
            //     this.api.themes_config_theme_type().then((res)=>{
            //         this.theme_type=res;
            //         this.content();
            //         this.qd();
            //     })
            //     this.qd();
            //
            // },
            qd(){
                this.api.themes_config_channel().then((res)=>{
                    this.channels=res;
                })
            },
            // content(){
            //     let params={type:this.type};
            //     this.api.themes_config_theme_class({params}).then((res)=>{
            //         this.cont=res;
            //     })
            // },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.GetData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.GetData()
            },
            GetData(){

                var params={
                    name:this.name,channel:this.channel,tstart:this.value,p:this.p,page:this.page
                };
                this.api.themes_report_income({params}).then((res)=>{
                    this.tableData=res.data;
                    this.total=res.total;
                    this.getTitName();
                })
            },
        }
    }
</script>

<style scoped>
    .top{
        width: 100%!important;
        height:62px;
        background:rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0,0)
    }
    .qj{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 19px 10px 0 24px;
    }
    .Section{
        display: inline-block;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .top select{
        border: none!important;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .tabs{
        width: 100%;
        height:100%;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-top: 145px;
    }
    .date{
        display: inline-block;
        width:145px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin: 24px;
    }
    .date .el-input__inner,.el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%!important;
    }
    .nameTit{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .tabs input{
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .tabs select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 24px;
    }
    .bj {
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width: 124px;
        height: 36px;
        background: rgba(242, 246, 252, 1);
        border-radius: 4px;
        border: 1px solid rgba(211, 219, 235, 1);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(61, 73, 102, 1);
        float: right;
        margin: 24px 24px 0 0;
    }
    .cx,.cz,.dc{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
        margin:0 20px 24px 0;
    }
    .cx{
        color: #fff!important;
        background:rgba(51,119,255,1)!important;
        border: none!important;
    }

    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        bottom: 0;
        right: 0;
    }
    .select{
        width:588px;
        min-height:410px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .select_tit{
        border-bottom: 1px solid #E6E9F0;
    }
    .select_tit span{
        display: inline-block;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
        margin:20px 0 20px 24px;
    }
    .select_tit img{
        width:16px;
        height:16px;
        float: right;
        margin:20px 24px 0 0 ;
    }
    .tits span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
        margin:20px 24px;
    }

    .seach input,.tableTit input{
        width:16px;
        height:16px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin:0 6px 0 0 ;
    }
    .seach>span,.tableTit>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(61,73,102,1);
        vertical-align: top;
        width: 90px;
        margin-bottom: 40px;
        text-align: left;
    }
    .checkBox_btn{
        width:587px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
    }
    .checkBox_btn span{
        display: inline-block;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);float: right;
        margin-right: 25px;
        margin-top: 11px;
    }
</style>