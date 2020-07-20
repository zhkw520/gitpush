<template>
    <div>
        <ADD v-if="ADD" :id="id" :num="num" :ind="index" :hqUrl="hqUrl" :bindMid="bindMid" :material="0" :types="types" :typeName="typeName" :limit_size="limit_size" :limit_model="limit_model" @listID='listID'></ADD>
        <set v-if="sets"   @listenToChildEvent="listen" :material="0" :ids='ids'></set>
        <uplodWl v-if='up'  :id="id"  :status="status" @upDataLists="upDataLists"></uplodWl>
        <BDadd v-if="BD"  :index="index" :id="id" :status="status"></BDadd>
        <AddWL v-if="wl"  :id="id" @dataType="datatype" :types="types" :typeName="typeName" :limit_type="limit_type" :limit_size="limit_size"></AddWL>
        <scwl v-if="scwl"  :index="index" :id="id"></scwl>
        <sct v-if="set"  :index="index" :id="id" @dataType="datatype"></sct>
        <QD v-if="sh" :id="id" :status="status" @upDataLists="upDataLists"></QD>
        <BH v-if="bh" :dbid="dbid" :status="status" @upDataLists="upDataLists"></BH>
        <ywxq v-if="yw" :YWid="YWid"></ywxq>
        <scxq v-if="sc" :SCid="SCid"></scxq>
        <CK v-if='ck' :id="CkID"></CK>
        <WLp v-if="WLp" :id="wlID"></WLp>
        <BU v-if="BU" :id="id" :ind="index" :is_special='is_special'></BU>
        <ATR v-if="ADD_material" :id="id" :num="num" :ind="index" :typeList="typeList" :types='types' :status="status" @upDataLists="upDataLists" :typeName='typeName'></ATR>
        <ADDsc v-if="addSC" :index="index" :id="id"></ADDsc>
        <scREQ v-if="scR"  :id="id" :num="num" :status="status" @upDataLists="upDataLists"></scREQ>
        <Cm v-if="Cm" :id="id" :status_num='status_num'></Cm>
        <sett v-if="sett" :skID="skID" :skType="skType" :processor='processor'></sett>
        <sett2 v-if="sett2" :skID="skID" :skType="skType" :processor='processor'></sett2>
        <sett3 v-if="sett3" :skID="skID" :skType="skType"></sett3>
        <ADDscope v-if="scope" :skID="skID" :skType="skType" :status="status"></ADDscope>
        <fk v-if="fkjs"  :skID="skID" :skType="skType" :status="status"></fk>
        <fc v-if="fc"  :skID="skID"  :status="status"></fc>
        <Val v-if='val' :skID="skID" :skType="skType" :status='status'></Val>
        <div class="problem">
            <template>
                <el-table
                        :data="tableData"
                        header-align="center"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        :row-key="getRowKeys"
                        :expand-row-keys="expands"
                        @expand-change="expandChange"
                        style="width: 100%;color:#000">
                    <el-table-column
                            label="需求类型" prop="demand_type"
                            >
                    </el-table-column>
                    <el-table-column
                            label="需求ID" prop="did"
                           >
                    </el-table-column>
                    <el-table-column
                            label="需求名称" prop="demand_name"
                            >
                    </el-table-column>
                    <el-table-column
                            label="当前流程" prop="status_name"
                            >
                    </el-table-column>
                    <el-table-column
                            label="状态" prop="curent_status_name"
                            >
                    </el-table-column>
                    <el-table-column
                            label="当前流转人员" prop="processor"
                            :show-overflow-tooltip="true"
                            >
                        <template slot-scope="scope">
                           <span v-for="item in (tableData[scope.$index].processor)">
                               {{item}};
                           </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="截止时间" prop="endtime"
                            >
                        <template slot-scope="scope">
                            <el-button
                                    
                                   >{{(tableData[scope.$index].endtime)}}
                            </el-button>
                            <el-button v-if="tableData[scope.$index].isfinish!=1"
                                    
                            >{{(tableData[scope.$index].endtime_toast)}}
                            </el-button>
                            <el-button v-if="tableData[scope.$index].isfinish==1"
                                      
                            >{{(tableData[scope.$index].endtime_toast)}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"> 
                        <template slot-scope="props">
                            <el-button v-if="(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&tableData[props.$index].isfinish!=2&&tableData[props.$index].emails.indexOf(email)!=-1" @click="getCKz(tableData[props.$index].id,tableData[props.$index].demand_type,tableData[props.$index].status,tableData[props.$index].processor)">查看详情</el-button>
                            <el-button v-if="(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&tableData[props.$index].isfinish==2" @click="CKbh(tableData[props.$index].id,tableData[props.$index].status)">查看作废原因</el-button>
                            <el-button v-if="(tableData[props.$index].demand_type=='业务需求'||tableData[props.$index].demand_type=='素材需求')&&tableData[props.$index].isfinish==2" @click="CKbh(tableData[props.$index].did,tableData[props.$index].status)">查看作废原因</el-button>
                            <el-button v-if="(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&tableData[props.$index].status==4&&tableData[props.$index].isfinish!=2&&tableData[props.$index].emails.indexOf(email)!=-1" @click="ADDscope(tableData[props.$index].id,tableData[props.$index].demand_type,tableData[props.$index].status)">票据凭证</el-button>
                            <el-button v-if="(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&tableData[props.$index].status==5&&tableData[props.$index].isfinish!=2&&tableData[props.$index].emails.indexOf(email)!=-1" @click="ADDRemit(tableData[props.$index].id,tableData[props.$index].demand_type,tableData[props.$index].status)">结算汇款</el-button>
                            <el-button v-if="(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&tableData[props.$index].isfinish!=2&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2" @click="Abolish(tableData[props.$index].id,tableData[props.$index].status)">作废</el-button>

                            <el-button v-if="tableData[props.$index].status_name=='资源准备'&&tableData[props.$index].reject=='0'&&tableData[props.$index].isfinish!=2" @click="getYW(tableData[props.$index].bdid)">查看需求</el-button>
                            <el-button v-if="tableData[props.$index].status_name=='上传物料'&&tableData[props.$index].reject=='0'&&tableData[props.$index].isfinish!=2" @click="getYWSC(tableData[props.$index].bdid)">查看资源</el-button>
                            <el-button v-if="(tableData[props.$index].status_name=='发布审核'&&tableData[props.$index].reject=='0')||(tableData[props.$index].status_name=='项目发布'&&tableData[props.$index].reject=='0')" @click="getSC(tableData[props.$index].mdid)">查看需求</el-button>

                            <el-button v-if="(tableData[props.$index].status_name=='项目发布'&&tableData[props.$index].reject=='0'&&tableData[props.$index].is_project==1)" @click='look(tableData[props.$index].did,tableData[props.$index].status)'>查看项目</el-button>



                            <el-button @click='check(tableData[props.$index].demand_type,tableData[props.$index].did,tableData[props.$index].status-1)' v-if="(tableData[props.$index].status_name=='物料审核'&&tableData[props.$index].reject=='0'&&tableData[props.$index].isfinish!=2)||(tableData[props.$index].status_name=='测试验收'&&tableData[props.$index].reject=='0'&&tableData[props.$index].isfinish!=2)">查看物料</el-button>
                            <el-button @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,tableData[props.$index].status+1,tableData[props.$index].reject)" v-if="tableData[props.$index].reject=='1'&&tableData[props.$index].isfinish!=2">查看驳回原因</el-button>
                            <el-button @click="educe(tableData[props.$index].did,tableData[props.$index].check_status,tableData[props.$index].status)" v-if="(tableData[props.$index].status_name=='签字审核'&&tableData[props.$index].status==2)||(tableData[props.$index].status_name=='补充签字'&&tableData[props.$index].status==4)&&tableData[props.$index].emails.indexOf(email)!=-1">导出表格</el-button>
                            <el-button @click="uploadData(tableData[props.$index].did,tableData[props.$index].status)"  v-if="(tableData[props.$index].status_name=='签字审核'&&tableData[props.$index].status==2)||(tableData[props.$index].status_name=='补充签字'&&tableData[props.$index].status==4)&&tableData[props.$index].emails.indexOf(email)!=-1">上传文件</el-button>
                            <el-button @click="release(tableData[props.$index].did,tableData[props.$index].demand_type,tableData[props.$index].status)" v-if="tableData[props.$index].status_name=='需求发布'&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">发布需求</el-button>
                            <el-button @click='push(tableData[props.$index].did,tableData[props.$index].status)' v-if="tableData[props.$index].status_name=='确认入库'&&tableData[props.$index].isfinish!=2&&tableData[props.$index].is_put!=0" >

                                入库确认
                            </el-button>
                            <el-button @click='check(tableData[props.$index].demand_type,tableData[props.$index].did,tableData[props.$index].status)' v-if="tableData[props.$index].status_name=='素材入库'">查看素材</el-button>
                            <el-button  @click="AddMaterial(props.$index)" v-if="tableData[props.$index].status_name=='资源准备'&&tableData[props.$index].status==2&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">添加素材</el-button>



                            <!-- <el-button  @click="getscR(props.$index)" v-if="tableData[props.$index].status_name=='确认入库'&&tableData[props.$index].status==4&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">添加素材</el-button> -->

                            <el-button  @click="getscR(props.$index)" v-if="tableData[props.$index].demand_type=='素材需求'&&tableData[props.$index].status==5&&tableData[props.$index].isfinish==0&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">添加素材</el-button>
                            <el-button   @click="AddWl(props.$index)" v-if="tableData[props.$index].status_name=='上传物料'&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">上传物料</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="tableData[props.$index].status_name=='测试验收'&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">测试通过</el-button>
                            <el-button  @click="getSH(props.$index)" v-if="(tableData[props.$index].status_name=='物料审核'||tableData[props.$index].status_name=='发布审核')&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].isfinish!=2">审核通过</el-button>
                            <el-button  v-if="tableData[props.$index].status_name=='完成入库'">查看投放结果</el-button>
                            <el-button  @click="getBH(props.$index)" v-if="tableData[props.$index].status_name!='完成投放'&&tableData[props.$index].status_name!='需求发布'&&tableData[props.$index].status_name!='提现审核'&&tableData[props.$index].status_name!='签字审核'&&tableData[props.$index].status_name!='结算汇款'&&tableData[props.$index].status_name!='补充签字'&&tableData[props.$index].status_name!='素材入库'&&tableData[props.$index].status_name!='确认入库'&&tableData[props.$index].status_name!='提现完成'&&tableData[props.$index].status!=1&&tableData[props.$index].emails.indexOf(email)!=-1&&tableData[props.$index].demand_type!='收款结算'&&tableData[props.$index].demand_type!='付款结算'&&tableData[props.$index].isfinish!=2">驳回</el-button>

                            <el-button   v-if="tableData[props.$index].status_name=='完成入库'">查看投放结果</el-button>
                            <el-button  @click="withdraw(tableData[props.$index].did,tableData[props.$index].status)" v-if="((tableData[props.$index].status_name=='提现审核'||tableData[props.$index].status_name=='结算汇款')&&tableData[props.$index].reject=='0'&&tableData[props.$index].demand_type=='设计师结算')&&(tableData[props.$index].emails.indexOf(email)!=-1)">查看详情</el-button>
                            <el-button v-if="(tableData[props.$index].demand_type=='业务需求'||tableData[props.$index].demand_type=='素材需求')&&tableData[props.$index].isfinish!=1&&tableData[props.$index].isfinish!=2&&tableData[props.$index].emails.indexOf(email)!=-1" @click="Abolish(tableData[props.$index].did,tableData[props.$index].status)">作废</el-button>

                        </template>
                    </el-table-column>
                    <el-table-column type="expand" label="查看完整流程" width="200">
                        <template slot-scope="props">
                            <div>
                                <div class="step_box" v-for="(item,index) in tableData[props.$index].audit_process">
                                    <div class="step_wwc" v-if="item.did==undefined&&item.reject!='1'&&tableData[props.$index].status!=item.status">{{item.status}}</div>
                                    <div class="step_dq" v-if="tableData[props.$index].status==item.status&&item.isfinish!=1&&item.isfinish!=2">{{item.status}}</div>
                                    <div class="step_bh" v-if="(item.reject=='1'&&tableData[props.$index].status!=item.status)||(item.isfinish=='2'&&tableData[props.$index].status==item.status)">X</div>
                                    <div class="step" v-if="item.did!=undefined&&item.reject!='1'&&tableData[props.$index].status!=item.status">
                                        &radic;
                                    </div>
                                    <div class="step" v-if="tableData[props.$index].status==item.status&&item.isfinish==1">
                                        &radic;
                                    </div>
                                    <div class="bor" v-if="item.status!=tableData[props.$index].audit_process.length"></div>
                                    <div class="step_tit" :class="{active:item.did==undefined&&tableData[props.$index].status!=item.status}">{{item.status_name}}</div>
                                    <div class="step_time" v-if="item.creator!=''||tableData[props.$index].status==item.status&&item.isfinish!=1&&item.key==0">{{item.updated_at}}</div>
                                    <div class="step_time" v-if="item.key!=0&&tableData[props.$index].status==item.status">{{tableData[props.$index].updated_at}}</div>
                                   <div class="step_contnet" v-if="(item.creator!=''||tableData[props.$index].status==item.status)&&((tableData[props.$index].demand_type=='收款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='付款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='业务需求')||(tableData[props.$index].demand_type=='素材需求')||(tableData[props.$index].demand_type=='设计师结算')||(tableData[props.$index].demand_type=='分成金额审核'))">
                                        <span class="step_txt">状态</span>
                                        <span v-if="item.isfinish!='1'&&tableData[props.$index].status_name!='提现审核'&&tableData[props.$index].status!=item.status">{{item.msg}}</span>
                                        <span v-if="item.isfinish==1&&item.status_name!='提现完成'&&item.status_name!='素材入库'">已入库</span>
                                        <span v-if="item.isfinish==1&&item.status_name=='提现完成'">已完成</span>
                                        <span v-if="tableData[props.$index].demand_type=='素材需求'&&item.status==5&&tableData[props.$index].isfinish==0">部分入库</span>
                                        <span v-if="tableData[props.$index].demand_type=='素材需求'&&item.status==5&&tableData[props.$index].isfinish==1">全部入库</span>
                                        <span v-if="tableData[props.$index].status==item.status&&item.isfinish!='1'&&item.status_name!='素材入库'&&item.isfinish!=2">待处理</span>
                                       <span v-if="tableData[props.$index].status==item.status&&item.isfinish!='1'&&item.status_name!='素材入库'&&item.isfinish==2">已作废</span>
                                    </div>
                                    <div class="step_contnet" v-if="(item.creator!=''||tableData[props.$index].status==item.status)&&((tableData[props.$index].demand_type=='收款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='付款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='业务需求')||(tableData[props.$index].demand_type=='素材需求')||(tableData[props.$index].demand_type=='设计师结算')||(tableData[props.$index].demand_type=='分成金额审核'))">
                                        <span class="step_txt" v-if="item.status==1&&tableData[props.$index].status!=item.status">来源</span>
                                        <span class="step_txt" v-if="item.status==1&&tableData[props.$index].status==item.status">待处理人</span>
                                        <span class="step_txt" v-if="item.status!=1">处理人</span>
                                        <div class='clr' v-if="item.did!=undefined&&tableData[props.$index].status!=item.status">
                                            <span >{{item.user_name}}</span>
                                        </div>
                                        <div class='clr' v-if="item.did!=undefined&&tableData[props.$index].status==item.status&&item.isfinish!=2">
                                            <span  v-for="da in tableData[props.$index].processor">{{da}};</span>
                                        </div>
                                        <div class='clr' v-if="item.did!=undefined&&tableData[props.$index].status==item.status&&item.isfinish==2" >
                                            <span >{{item.user_name}};</span>
                                        </div>
                                        <div class='clr' v-if="item.did==undefined&&item.reject!='1'&&tableData[props.$index].status==item.status&&tableData[props.$index].status_name!='提现完成'">
                                            <span  v-for="da in tableData[props.$index].processor">{{da}};</span>
                                        </div>

                                    </div>
                                    <div class="step_contnet" v-if="(item.creator!=''||tableData[props.$index].status==item.status)&&((tableData[props.$index].demand_type=='收款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='付款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='业务需求')||(tableData[props.$index].demand_type=='素材需求')||(tableData[props.$index].demand_type=='设计师结算')||(tableData[props.$index].demand_type=='分成金额审核'))">
                                        <span class="step_txt" v-if="index=='0'">需求内容</span>
                                        <span class="step_txt" v-if="index!='0'">处理结果</span>
                                        <span class="dj" v-if="tableData[props.$index].demand_type=='设计师结算'&&item.status=='5'">已完成</span>

                                        <span class="dj" v-if="item.key==0&&item.status_name!='结算汇款'&&item.status_name!='确认入库'&&item.status_name!='物料审核'&&item.status_name!='测试验收'&&item.status_name!='发布审核'&&item.status_name!='项目发布'&&item.status_name!='素材入库'&&item.status_name!='提现完成'&&item.status_name!='素材入库'&&tableData[props.$index].demand_type!='收款结算'&&tableData[props.$index].demand_type!='付款结算'&&tableData[props.$index].demand_type!='分成金额审核'&&item.reject!='1'&&item.isfinish!=2" @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,item.status,item.reject)">查看详情</span>
                                        <span class="dj" v-if="item.reject!='1'&&item.isfinish!=2&&tableData[props.$index].demand_type=='分成金额审核'" @click='cashFC(tableData[props.$index])'>查看详情</span>

                                        <span v-if="tableData[props.$index].status==item.status&&item.key!=0&&((tableData[props.$index].demand_type=='收款结算'&&item.status!=6)||(tableData[props.$index].demand_type=='付款结算'&&item.status!=6))&&item.isfinish!=2">待处理</span>
                                        <span class="dj" v-if="item.isfinish==1&&item.status_name!='提现完成'&&item.status_name!='素材入库'&&item.isfinish!=2" @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,item.status)">查看详情</span>
                                        <span class="dj" v-if="item.status_name=='结算汇款'&&tableData[props.$index].demand_type=='设计师结算'" @click="withdraw(tableData[props.$index].did,item.status)">查看详情</span>
                                        <span class="dj" v-if="item.key=='0'&&(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&item.isfinish!=2" @click="getCK(tableData[props.$index].id,tableData[props.$index].demand_type,item.status,tableData[props.$index].processor)">查看详情</span>
                                        <span class="dj" v-if="(tableData[props.$index].demand_type=='收款结算'||tableData[props.$index].demand_type=='付款结算')&&item.isfinish==2" @click="CKbh(tableData[props.$index].did,item.status)">查看作废原因</span>
                                        <span class="dj" v-if="(tableData[props.$index].demand_type=='业务需求'&&item.status=='4'&&item.key==0&&item.reject!='1'&&item.isfinish!=2)">审核通过</span>
                                        <span class="dj" @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,tableData[props.$index].status+1,item.reject)"  v-if="item.reject=='1'&&tableData[props.$index].status!=item.status">查看驳回原因</span>
                                        <span class="dj" @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,tableData[props.$index].status,item.reject)"  v-if="item.reject=='1'&&tableData[props.$index].status==item.status">查看驳回原因</span>
                                        <span class="dj" v-if="(tableData[props.$index].demand_type=='素材需求'&&item.status=='2'&&item.key==0&&item.reject!='1'&&item.isfinish!=2)" >审核通过</span>
                                        <span class="dj" v-if="(tableData[props.$index].demand_type=='素材需求'&&item.status=='4'&&item.key==0&&item.reject!='1'&&item.isfinish!=2)" @click="push(tableData[props.$index].did,tableData[props.$index].status)">查看入库</span>
                                        <span class="dj" v-if="tableData[props.$index].demand_type=='业务需求'&&item.status=='5'&&item.key==0&&item.reject!='1'&&item.isfinish!=2">测试通过</span>
                                        <span  class="dj" v-if="tableData[props.$index].demand_type=='素材需求'&&item.status=='3'&&item.key==0&&item.reject!='1'&&item.isfinish!=2&&tableData[props.$index].is_project==1" @click='look(tableData[props.$index].did,tableData[props.$index].status)'>查看项目</span>
                                        <span class="dj" v-if="tableData[props.$index].demand_type=='素材需求'&&item.status=='5'&&item.isfinish==1" @click="check(tableData[props.$index].demand_type,tableData[props.$index].did,item.status)">查看素材</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class="bg" v-if="uploads">
            <div class="content_txt">
                <div class="tit">
                    <span>上传文件</span>
                    <img src="../../../public/img/gb.png" @click="heidUP">
                </div>
                <div class="up">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :http-request="upload"
                            :limit="1"
                            :on-remove="Remove"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </div>
                <div style="text-align: center" v-if="stops">
                    <span style="display:inline-block;width: 200px">
                        <el-progress :percentage="length"></el-progress>
                    </span>
                </div>
                <div class="btn">
                    <span @click="heidUP">取消</span>
                    <span class="tj" @click="audit">提交</span>
                </div>
            </div>
        </div>

        <div class="bg" v-if="reject_details">
                <div class="content" >
                    <div class="tit">
                        <span>查看驳回原因</span>
                        <img src="../../../public/img/gb.png" @click="heidRejDET()"/>
                    </div>
                    <div style="margin: 24px;height:250px;overflow-y: auto">
                        <template>
                            <el-table
                                    :data="tableData2"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        :show-overflow-tooltip="true"
                                        prop="creator"
                                        label="处理人"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="created_at"
                                        label="处理时间"
                                       >
                                </el-table-column>
                                <el-table-column
                                        prop="note"
                                        :show-overflow-tooltip="true"
                                        label="驳回原因">
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>

                    <div class="btn">
                        <span  @click="heidRejDET()">取消</span>
                    </div>
                </div>
        </div>
    </div>
        
</template>

<script>
    import BU from './Batch_upload'
    import dc from '../../api/commonality'
    import scxq from './sc_details'
    import ywxq from './yw_details'
    import BH from './reject'
    import QD from './workBench_auditor'
    import AddWL from './AddWl'
    import BDadd from './native_upload'
    import sct from './selectMaterial'
    import ADD from './ADD_material'
    import uplodWl from './uploadWL'
    import CK from './CKmaterial'
    import WLp from './WLparticulars'
    import scwl from './wuliao'
    import ATR from './Add_the_resource'
    import ADDsc from './ADD_SC'
    import scREQ from './sc_requirements'
    import set from '../admin/Select_material'
    import Cm from './Check_material'
    import sett from './Settlement'
    import sett2 from './Settlement2'
    import sett3 from './Settlement3'
    import ADDscope from './voucher'
    import fk from './Remittance'
    import fc from './Abolish'
    import Val from'./validation'
    export default {
        components:{QD,BH,ADDsc,sct,BDadd,AddWL,ywxq,scxq,CK,uplodWl,scwl,WLp,ATR,scREQ,ADD,set,Cm,BU,sett,sett2,sett3,ADDscope,fk,fc,Val},
        props:['tableData','active'],
        name: "workbench-table",
        data(){
            return {
                sh:false,
                userData:'',
                bh:false,
                sets:false,
                dbid:'',
                id:'',
                ADD:false,
                ADD_material:false,
                wl:false,
                set:false,
                BU:false,
                BD:false,
                yw:false,
                sc:false,
                val:false,
                scMessage:[],
                wlMessage:[],
                num:'',
                rolesList:[],
                YWid:'',
                SCid:'',
                index:'',
                type:'',
                types:'',
                typeName:"",
                ck:false,
                CkID:'',
                up:false,
                scwl:false,
                WLp:false,
                wlID:'',
                Keys:[],
                uploads:false,
                stops:false,
                Cm:false,
                length:0,
                shID:'',
                url:'https://shiquaner.zookingsoft.com/#/',
                attach:{},
                reject_details:false,
                tableData2:[],
                addSC:false,
                scR:false,
                email:'',
                typeList:null,
                bindMid:[],
                limit_type:'',
                limit_size:'',
                limit_model:'',
                hqUrl:[],
                sett:false,
                sett2:false,
                sett3:false,
                scope:false,
                fkjs:false,
                fc:false,
                skID:'',
                skType:"",
                status:'',
                ids:"",
                is_special:"",
                processor:[],
                status_num:"",
                getRowKeys(row) {
                    return row.did;
                },
                expands: [],
            }
        },
        created(){
            this.email = localStorage.getItem('userAd');
        },
        mounted(){
            this.getData();
            this.expands.push(this.tableData[0].did);
        },
        methods:{
            expandChange(row,expandedRows) {
                let that = this
                console.log(expandedRows);
                //只展开一行
                if (expandedRows.length) {//说明展开了
                    that.expands = []
                    if (row) {
                        that.expands.push(row.did)//只展开当前行id
                    }
                } else {//说明收起了
                    that.expands = []
                }
            },
            format(percentage) {
                return percentage === 100 ? '完成' : `${percentage}%`;
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
            CKbh(id,status){
                this.skID=id;
                this.status=status;
                this.fc=true;
            },
            getCK(id,type,scope,processor){
                    if(scope==1){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett=true;
                        return
                    }
                    if(scope==2){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett=true;
                        return
                    }
                    if(scope==3){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett=true;
                        return
                    }
                    if(scope==4){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett2=true;
                        return
                    }
                    if(scope==5){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett3=true;
                        return
                    }
            },
            cashFC(data){
                this.$router.push({
                    path:'../income/content/Divided_details',
                    query:{
                        type:data.type,
                        tdate:data.tdate,
                        siid:data.did
                    },
                })
            },
             getCKz(id,type,scope,processor){
                    if(scope==2){
                        this.skID=id;
                        this.status=scope;
                        this.skType=type;
                        this.processor=processor;
                        this.val=true;
                        return
                    }
                    if(scope==3){
                        this.skID=id;
                        this.status=scope;
                        this.skType=type;
                        this.processor=processor;
                        this.val=true;
                        return
                    }
                    if(scope==4){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett=true;
                        return
                    }
                    if(scope==5){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett2=true;
                        return
                    }
                     if(scope==6){
                        this.skID=id;
                        this.skType=type;
                        this.processor=processor;
                        this.sett3=true;
                        return
                    }
            },
            heidFkCK(){
                this.sett=false;
                this.sett2=false;
                this.sett3=false;
            },
            ADDscope(id,type,scope){
                this.scope=true;
                this.skID=id;
                this.skType=type;
                this.status=scope;
            },
            listID(data){
                this.ids=data;
                this.XSset();
            },
            ADDRemit(id,type,scope){
                this.fkjs=true;
                this.skID=id;
                this.skType=type;
                this.status=scope;
            },
            heidADDRemit(){
                this.fkjs=false;
            },
            heidADDscope(){
                this.scope=false;
            },
            Abolish(id,scope){
               this.skID=id;
               this.status=scope;
               this.fc=true;
            },
            heidAbolish(){
                this.fc=false;
            },
            getSH(index){
                this.sh=true;
                this.id=this.tableData[index].did;
                this.status=this.tableData[index].status;
                this.stop()
            },
            getBU(index,data){
                if(index!=undefined){
                    this.index = index;
                }
                this.is_special=data;
                this.BU=true;
                this.stop()
            },
            heidBU(){
                this.BU=false;
                this.move()
            },
            getWl(data,name){
                this.wl = true;
                this.types=data;
                this.typeName=name;
                this.stop()
            },
            HeidWl(){
                this.wl = false;
                this.move()
            },
            getscR(index){
                this.scR = true;
                this.status=this.tableData[index].status;
                this.id = this.tableData[index].did;
                this.num = this.tableData[index].num;
                this.stop()
            },
            heidscR(){
                this.scR = false;
                this.move()
            },
            heidVal(){
                this.val=false;
                this.move()
            },
            getCm(id,num){
                this.Cm=true;
                this.id = id;
                this.status_num=num;
                this.stop();
            },
            heidCm(){
                this.Cm=false;
                this.move()
            },
            XSset(){
                this.sets = true;
                this.stop();
            },
            YCset(){
                this.sets = false;
                this.move()
            },
            GgtAddSC(index){
                if(index!=undefined){
                    this.index = index;
                }
                this.addSC = true;
                this.stop()
            },
            heidAddSC(){
                this.addSC = false;
                this.move()
            },
            getRejDET(id,status){
                this.reject_details = true;
                let params = {id:id,status:status};
                this.api.demand_reject_logs({params}).then((res)=>{
                    this.tableData2 = res;
                })
            },
            heidRejDET(){
                this.reject_details = false;
            },
            Getscwl(){
                this.scwl=true;
                this.stop()
            },
            heidSCwl(){
                this.scwl=false;
                this.move()
            },
            getWLp(id){
                this.WLp=true;
                this.wlID=id;
                this.stop()
            },
            heidWLp(){
                this.WLp=false;
                this.move()
            },
            AddMaterial(index){
                this.ADD_material =true;
                this.status=this.tableData[index].status;
                this.id = this.tableData[index].did;
                this.num = this.tableData[index].num;
                this.types = this.tableData[index].type;
                this.typeName = this.tableData[index].type_name;
                if(this.this.tableData[index].putlib!=null){
                    this.limit_size=this.tableData[index].putlib.size;
                    this.limit_type=this.tableData[index].putlib.put_type;
                }
                this.stop();
            },
            AddWl(index){
                this.up = true;
                this.status=this.tableData[index].status;
                this.id = this.tableData[index].did;
                this.types = this.tableData[index].type;
                this.typeName = this.tableData[index].type_name;
                this.limit_size=this.tableData[index].size;
                this.limit_model=this.tableData[index].model;
                this.stop()
            },
            heidAddWl(){
                this.up = false;
                this.move()
            },
            heidAddMaterial(){
                this.ADD_material = false;
                this.move()
            },
            getSet(index){
                this.index = index;
                this.set = true;
                this.stop()
            },

            SCsc(){
                this.set = false;
                this.move()
            },
            getBD(index){
                if(index!=undefined){
                    this.index = index;
                }
                this.BD = true;
                this.stop()
            },
            heidBD(){
                this.BD = false;
                this.move()
            },
            getCon(index){
                if(index!=undefined){
                    this.index = index;
                }
                this.ADD = true;
                this.stop()
            },
            getADD(index){
                if(index!=undefined){
                    this.index = index;
                }
                this.ADD = true;
                this.stop()
            },
            heidADD(){
                this.ADD = false;
                this.bindMid='';
                this.hqUrl='';
                this.move();
            },
            getBH(index){
                this.bh = true;
                this.status=this.tableData[index].status;
                this.stop()
            },
            heidBH(){
                this.bh = false;
                this.move()
            },
            heidSH(){
                this.sh=false;
                this.move()
            },
            getYW(id){
                this.yw = true;
                this.YWid = id;
                this.stop()
            },
            heidYW(){
                this.yw = false
                this.move()
            },
            getSC(id){
                this.sc = true;
                this.SCid = id;
                this.stop()
            },
            heidSC(){
                this.sc = false;
                this.move()
            },
            getBH(index){
                this.bh = true;
                this.dbid=this.tableData[index].did;
                this.status=this.tableData[index].status;
                this.stop()
            },
            listen(msg,ddd){
                this.bindMid=msg;
                this.hqUrl=ddd;
                console.log(this.bindMid,this.hqUrl);
            },
            heidBH(){
                this.bh = false;
                this.move()
            },
            withdraw(id,status){
               
                this.$router.push({
                    query:{
                        id:id,
                        status:status,
                    },
                    path:'/workbench/Billing_details'
                })
            },
            stop(){
                document.body.style.overflow='hidden';
                document.body.style.position='fixed';
                document.body.style.width='100%';
            },
            move(){
                document.body.style.overflow='';//出现滚动条
                document.body.style.position='initial';
                document.body.style.height='1006px';
            },
            educe(id,check_status,status){
              let url = '/demand/apply/export?all='+(status>3?0:1)+'&id='+id+'&check_status='+check_status;
                dc.downloadImg(url)
            },
            datatype(data){
                this.typeList = data;
                console.log(this.typeList)
            },
            heidUP(){
                this.uploads = false;
                this.stops = false;
                this.move();
            },
            uploadData(ID,status){
                this.shID = ID;
                this.uploads = true;
                this.status=status;
                this.stop()
            },
            time(){
                var _this=this;
                _this.aaa=0;
                var timer = setInterval(function () {
                    if(_this.length<99){
                        _this.length++
                    }
                },100);
            },
            upload(file){
                this.stops = true;
                this.time();
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.length=100;
                    this.attach = res;
                })
            },
            Remove(file, fileList) {
                this.stops=false
            },
            audit(){
                let formData = new FormData;
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('id',this.shID);
                formData.append('status',this.status);
                this.api.demand_audit(formData).then((res)=>{

                })
            },
            upDataLists(){
                this.$emit('upDataList');
            },
            getData(){
                let params = {
                    email:localStorage.getItem('userAd'),
                };
                this.api.get_account({params}).then((datas)=>{
                    this.userData = datas;
                    var rolesList=[];
                    for(let i=0;i<this.userData.roles.length;i++){
                        rolesList.push(this.userData.roles[i].role_name);
                    }
                    this.rolesList=rolesList;
                });
            },

            // listenToChildEvent(a,index,type){
            //     this.scMessage.push(a);
            //     this.index = index;
            //     this.type = type;
            //     console.log(this.scMessage);
                // },

            release(id,type,status){
                if(type=='业务需求'){
                    this.$parent.getYW(id,status);
                }else {
                    this.$parent.getSC(id,status);
                }
            },
            check(type,id,status,reject){
                if(type=='业务需求'){
                    if(status ==1){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getYW(id);
                        }
                    }
                    if(status ==2){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getYWSC(id);
                        }

                    }
                    if(status ==3){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getWLp(id)
                        }

                    }
                    if(status ==4){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getWLp(id);

                        }
                    }
                    if(status ==5){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getWLp(id)
                        }
                    }
                    if(status ==6){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getWLp(id)
                        }

                    }
                }
                if(type=='素材需求'){
                    if(status ==1){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this. getSC(id);
                        }

                    }
                    if(status ==2){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }
                    }
                    if(status ==3){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }
                    }
                    if(status ==4){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getCm(id)
                        }
                    }
                    if(status ==5){
                        if(reject==1){
                            this.getRejDET(id,status)
                        }else{
                            this.getCm(id,5)
                        }
                    }
                }
                if(type=='设计师结算'){
                    if(status ==1){
                        this.$router.push({
                            query:{
                                id:id,
                                status:1,
                            },
                            path:'/workbench/Billing_details'
                        })
                    }
                    if(status ==3){
                        this.$router.push({
                            query:{
                                id:id,
                                status:3,
                            },
                            path:'/workbench/Billing_details'
                        })
                    }
                }

            },
            getYWSC(id){
                this.ck=true;
                this.CkID= id;
            },
            heidCK(){
                this.ck=false;
                this.move();
            },
            look(id,status){
                this.$router.push({
                    path:"./projectList",
                    query:{
                        did:id,
                        status:status
                    }
                })
            },
            push(id,status){
                this.$router.push({
                    path:"./projectStorage",
                      query:{
                        did:id,
                        status:status
                    }
                })
            },
        },
        watch:{
            scMessage:function (oldval) {
                console.log(oldval)
            }
        }
    }
</script>

<style scoped>
.step_box{
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.step,.step_bh,.step_dq,.step_wwc{
    width:32px;
    height:32px;
    background:rgba(51,119,255,0.2);
    line-height: 32px;
    text-align: center;
    color: #2E5BFF;
    border-radius: 50%;
    margin-bottom: 12px;
    display: inline-block;
}
.step_wwc{
    line-height: 30px!important;
}
.step_bh{
    background:#E4393C!important;
    color: #fff!important;
}
.step_dq{
    background:rgba(51,119,255,1)!important;
    color: #fff!important;
}
.step_wwc{
    background: transparent!important;
    border:2px solid rgb(178, 188, 191);
    color: rgba(178, 188, 191,1)!important;
}
.step_tit{
    width:96px;
    height:22px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#3377ff;
}
.step_time{
    width:130px;
    height:22px;
    font-size:12px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(143,155,179,1);
    margin-bottom: 10px;
}
.step_contnet{
    margin-bottom: 10px;
}
.step_txt{
    display: inline-block;
    width:56px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    margin-right: 16px;
    vertical-align: top
}
    .dj{
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#3377ff;
        cursor: pointer;
    }
    .active{
        color: #8f9bb3!important;
        background: transparent!important;
    }
    .bor{
        border: 0.5px solid #e6e9f0;
        width: 204px;
        display: inline-block;
        margin: 0 18px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 999;
        bottom: 0;
        right: 0;
    }
    .content_txt{
        width:588px;
        height:420px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding: 20px;
    }
    .up{
        margin: 20px 30px;
        text-align: center;
    }
    .tit{
        width: 100%;
        height: 38px;
        border-bottom: 1px solid #E6E9F0;
    }
    .tit span{
        line-height: 38px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .content_txt img{
        width: 16px;
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
    .btn{
        position: absolute;
        bottom: 0;
        width:588px;
        height:58px;
        background:rgba(247,249,252,1);
        border-radius:0px 0px 4px 4px;
        text-align: right;
    }
    .btn span{
        display: inline-block;
        margin-top: 11px;
        width:68px;
        height:36px;
        line-height: 36px;
        text-align: center;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        cursor: pointer;
    }
    .tj{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        margin-left: 14px;
    }


.content{
    position: absolute;
    left: 50%;
    top:30%;
    transform: translate(-50%,-50%);
    width:588px;
    height:380px;
    background:rgba(255,255,255,1);
    border-radius:4px;
}
.tit{
    height: 56px;
    border-bottom: 1px solid #ddd;
}
.tit>span{
    display: inline-block;
    line-height: 56px;
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    margin-left: 24px;
}
.tit>img{
    display: inline-block;
    margin-top: 20px;
    width:16px;
    height:16px;
    float: right;
    margin-right: 24px;
    cursor: pointer;
}

.title_name{
    display: inline-block;
    width:60px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin: 24px 50px 0 24px;
}
.title_content{
    display: inline-block;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(143,155,179,1);
    max-width: 300px;
}
.btn{
    margin-top: 50px;
    text-align: right;
    margin-bottom: 10px;
}
.btn span{
    display: inline-block;
    width:68px;
    height:36px;
    line-height: 36px;
    text-align: center;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    margin-right: 24px;
    cursor: pointer;
}
.btn_qd{
    background:rgba(51,119,255,1)!important;
    border: 0!important;
    color:rgba(255,255,255,1)!important;
    margin-right: 14px!important;
}
.clr{
    display: inline-block;
    width: 200px;
    white-space:normal; 
    word-break:break-all;
    overflow:hidden;
}

</style>