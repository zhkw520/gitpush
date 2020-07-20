<template>
    <div>
        <div class="bg" >
            <div class="AddIMG">
                <div class="AddIMG_tit">
                    <span>{{title}}</span>
                </div>
                <div class="AddIMG_content">
                    <div class="AddIMG_content_left">
                        <div>
                            <span>绑定素材预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <!--<img :src="hqUrl" v-if="hqUrl!=''"/>-->
                            <img :src="hqUrl" v-if="hqUrl!=''&&(hqUrl.split('.'))[(hqUrl.split('.')).length-1]!='mp4'&&(hqUrl.split('.'))[(hqUrl.split('.')).length-1]!='MP4'"/>
                            <video :src="hqUrl" controls="controls" v-if="(hqUrl!=''&&(hqUrl.split('.'))[(hqUrl.split('.')).length-1]=='mp4')||(hqUrl!=''&&(hqUrl.split('.'))[(hqUrl.split('.')).length-1]=='MP4')"/>
                        </div>
                        <div class="AddIMG_box_txt">
                            <span>{{bindMid}}</span>
                        </div>
                        <div>
                            <span>上传素材预览图</span>
                        </div>
                        <div class="AddIMG_box">
                            <img :src="prev_uri" v-if="this.prev_uri!=''&&this.arr[this.arr.length-1]!='mp4'&&this.arr[this.arr.length-1]!='MP4'"/>
                            <video id="video" :src="prev_uri" controls="controls" v-if="(this.prev_uri!=''&&this.arr[this.arr.length-1]=='mp4')||(this.prev_uri!=''&&this.arr[this.arr.length-1]=='MP4')" />
                        </div>
                    </div>
                    <div class="AddIMG_content_right">
                        <div class="AddIMG_input">
                            <span class="tit" style="vertical-align: top">附件:</span>
                            <!--<span class="AddIMG_input_box">上传</span>-->
                            <!--<input type="file" />-->
                            <div class="AddIMG_input_box">
                                <el-upload
                                        class="upload-demo"
                                        :before-upload="beforeAvatarUploads"
                                        :on-remove="handleRemove"
                                        :http-request="uploadF"
                                        action="111"
                                >
                                    <el-button size="small" type="primary">上传</el-button>
                                </el-upload>
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts" v-if="attach.name!=undefined">
                                    <div slot="content" class="text">{{this.attach.name}}</div>
                                    <span  class="text" style="overflow: hidden;width: 200px;height: 20px;line-height: 28px">{{this.attach.name}}</span>
                                </el-tooltip>

                            </div>
                            <img src="../../../public/img/msg.png" @click="showHint" style="vertical-align: top"/>
                            <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate" >
                                <div class="strip" :style="{width:aaa+'%'}" style="background: blue;height: 5px"></div>
                                <div style="text-align: center;font-size: 10px">当前附件上传{{aaa}}%</div>
                            </div>
                            <span class="content_xz" @click="dels()" v-if="attach.name!=undefined">删除</span>
                        </div>
                        <div class="AddIMG_sc">
                            <span class="tit">绑定素材:</span>
                            <input type="text" placeholder="请输入素材ID" v-model="bind_mid" :disabled="(this.message.mid!=undefined)" @change="IDchanges"/>
                            <span class="AddIMG_sc_btn" @click="XSset" :class="{AddIMG_sc_btn_jy:(this.message.mid!=undefined)}">从素材库选择</span>
                            <input type="checkbox" class="AddIMG_sc_cjeckbox" v-model="is_bind_mid" :disabled="(this.message.mid!=undefined)"/><span>与素材库内已有素材无关</span>
                            <p>若由素材库内文件处理后上传，必须填写对应的素材ID，仅可填写一个</p>
                        </div>
                        <div class="AddIMG_zp">
                            <span class="tit">绑定设计师:</span>
                            <el-autocomplete
                                v-if='is_internal==false'
                                class="inline-input"
                                :disabled="(this.message.mid!=undefined)"
                                v-model="state1"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                >
                            </el-autocomplete>
                            <!-- <input type="text" class="AddIMG_zp_text" v-model="bind_workid" :disabled="(this.message.mid!=undefined)"/> -->
                            <input type="checkbox" class="AddIMG_sc_cjeckbox" v-model="is_internal" :disabled="(this.message.mid!=undefined)"  @change="tagge()"/>
                            <span>与狮圈儿无关</span>
                            <!-- <p>由设计师站获得的素材，必须填写对应的作品ID</p> -->
                        </div>
                        <div class='AddIMG_select' v-if='is_internal==false'>
                            <span class="tit">结算类型:</span>
                            <select v-model="settle_type" :disabled="(this.message.mid!=undefined)">
                                <option value="1">买断结算</option>
                                <option value="2">分成结算</option>
                            </select>
                            <span class="tit" v-if='settle_type==1'>买断价格:</span>
                            <input type="number" v-if='settle_type==1' placeholder="请输入" v-model="settle_value" style="width: 100px;height: 30px;border-radius: 5px" :disabled="(this.message.mid!=undefined)">
                            <span class="tit" v-if='settle_type==2' style="width:120px">分成比例:<span style="color:#ddd">(合作方)</span></span>
                            <input type="number" v-if='settle_type==2' placeholder="请输入" v-model="settle_value" style="width: 100px;height: 30px;border-radius: 5px" :disabled="(this.message.mid!=undefined)">
                            <span v-if='settle_type==2'>%</span>
                        </div>
                        <div class='AddIMG_sc'  v-if='is_internal==false'>
                            <span class="tit">合同归档号:</span>
                            <input type="text" :disabled="(this.message.mid!=undefined)" @blur='getHT()' v-model="contract_id">
                            <img :src="error" alt="" style="width:16px;margin:0 10px" v-if='contract_id'>
                            <span style="color:red" v-if='this.error=="/img/err.png"'>数据异常</span>
                        </div>
                        <div class="AddIMG_select">
                            <span class="tit">素材类型:</span>
                            <select v-model="type"  :disabled="(this.message.mid!=undefined)">
                                <option :value="types" >{{lx}}</option>
                            </select>
                        </div>
                        <div class="AddIMG_switch" v-if="sw&&this.status!=1101">
                            <span  class="tit">是否启用:</span>
                            <el-switch
                                    @change="open"
                                    v-model="value2"
                                    active-color="#409EFF"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        <div class="AddIMG_yl">
                            <span class="tit">尺寸:</span>
                            <input class="AddIMG_yl_size" v-model="sjSize" placeholder="上传预览图后自动获取" disabled v-if="this.arr[this.arr.length-1]!='mp4'&&this.arr[this.arr.length-1]!='MP4'">
                            <select v-model="sjSize" v-if="this.arr[this.arr.length-1]=='mp4'||this.arr[this.arr.length-1]=='MP4'">
                                <option :value="item.size" v-for="item in sizeList">{{item.size}}</option>
                            </select>
                            <div class="AddIMG_yl_upload">
                                <el-upload
                                        
                                        :http-request="uploadFile"
                                        :on-remove="Remove"
                                        class="upload-demo"
                                        action="111"
                                        :before-upload="beforeAvatarUpload"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">上传预览图</el-button>
                                </el-upload>
                            </div>
                            <div class="progress" style="width: 100px;height: 5px;opacity: 0.5;display: inline-block " v-if="initiate2" >
                                <div class="strip" :style="{width:bbb+'%'}" style="background: blue;height: 5px"></div>
                                <div style="text-align: center;font-size: 10px">当前附件上传{{bbb}}%</div>
                            </div>
                        </div>
                        <div class="AddIMG_bq">
                            <span class="tit TIT">选择标签:</span>
                            <div class="AddIMG_bq_box">
                                <div class="AddIMG_bq_box_top">
                                    <div class="AddIMG_bq_box_top_tit">预置标签:</div>
                                    <div class="AddIMG_bq_box_top_bq">
                                        <!--<span class="bq" v-for="(item,index) in preset_tags">{{item.name}}</span>-->
                                        <template>
                                            <el-checkbox-group
                                                    v-model="preinstall">
                                                <el-checkbox v-for="(item,index) in preset_tags" :label="item.name" >{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                                <div class="AddIMG_bq_box_bottom">
                                    <div class="AddIMG_bq_box_top_tit">个性标签:
                                        <input type="text" placeholder="创建或搜索个性标签" maxlength="6" v-model="tagsName" @input="getTagsList()"/>
                                    </div>
                                    <div class="AddIMG_bq_box_top_bq AddIMG_bq_box_top_zdy">
                                        <span class="CJ" v-if="tagsName!=''" @click="ADDtags()">创建“{{tagsName}}”标签</span>
                                        <template>
                                            <el-checkbox-group v-model="bardian">
                                                <el-checkbox v-for="(item,index) in self_tags" :label="item.name">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg_btn">
                            <span class="bg_btn_up" @click="AddMatter" v-if="this.message.mid==undefined">上传</span>
                            <span class="bg_btn_up" @click="AddMatter" v-if="this.message.mid!=undefined">保存</span>
                            <span @click="heidSc">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['message','bindMid','hqUrl','material','types','lx'],
        name: "content_component",
        data(){
            return {
                title:'添加素材',
                preinstall:[],
                bardian:[],
                value2:true,
                fileList:[],
                prev_uri:'',
                attach:{
                
                },
                bind_mid:'',
                bind_workid:'',
                self_tags:[],
                tags:[],
                sjSize:'',
                preset:[0,1],
                preset_tags:[],
                type:this.types,
                sw:false,
                size:'',
                scUrl:'',
                scType:'',
                tagsName:'',
                is_bind_mid:false,
                // is_bind_workid:false,
                file:{},
                aaa:0,
                bbb:0,
                initiate:false,
                initiate2:false,
                status:'',
                arr:[],
                is_internal:false,
                sizeList:[],
                restaurants:[],
                state1:"",
                open_id:"",
                settle_type:"",
                settle_value:"",
                error:'',
                contract_id:'',
               
            }
        },
        mounted(){
            this. getType();
            if(this.message.mid!=undefined){
                this.title='编辑素材'
            }else{
                this.title='添加素材'
            }
            if(this.bindMid!=undefined){
                this.bind_mid=this.bindMid;
                this.scUrl=this.hqUrl;
            }
        },
        methods:{
            dels(){
                this.attach={}
            },
            heidSc(){
                this.$parent.heidSc()
            },
            tagge(){
                if(this.is_internal==true){
                    this.state1="";
                    this.open_id="";
                    this.settle_type="";
                    this.settle_value='';
                    this.error='';
                    this.contract_id='';
                   
                }
            },
            getHT(){
                    if(this.contract_id==''){
                        this.error='';
                        return
                    }
                    let params={contract_id:this.contract_id};
                    this.api.common_contract({params}).then((res)=>{
                        if(res.length>0){
                            this.error='/img/yes.png'
                           
                        }else{
                            this.error='/img/err.png'
                            
                        }
                    })
            },
            showHint(){
                this.$parent.ShowHint()
            },
            XSset(){
                if(this.message.mid!=undefined){
                    return
                }
                if(this.is_bind_mid==true){
                    return
                }else{
                    this.$parent.XSset();
                }
            },
            beforeAvatarUpload(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isPSD = file.type === 'image/psd';
                const isBMP = file.type === 'image/bmp';
                const isGIF = file.type === 'image/gif';
                const isTIF = file.type === 'image/tiff';
                const isVideo = file.type ==='video/mp4';
                if (!isJPG&&!isPNG&&!isPSD&&!isBMP&&!isGIF&&!isTIF&&!isVideo) {
                    this.$message.error('只支持JPG、PNG、psd、bmp、gif、tif、mp4格式!');
                }
                return isPNG || isJPG ||isPSD||isBMP||isGIF||isTIF||isVideo;
            },
             beforeAvatarUploads(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isXzip = file.type === 'application/x-zip-compressed';
                const iszip = file.type === 'application/zip';
               
                if (!isJPG&&!isPNG&&!isGIF&&!isXzip&&!iszip) {
                    this.$message.error('只支持JPG、PNG、psd、bmp、gif、tif、zip格式!');
                }
                return isPNG || isJPG ||isGIF||iszip||isXzip;
            },
            // setTags(){
            //     let formData = new FormData;
            //     formData.append('mid',this.message.mid);
            //     formData.append('tags',this.preinstall);
            //     formData.append('self_tags',this.bardian)
            //     this.api.material_edit_tags(formData).then((res)=>{
            //
            //     })
            // },
            open(){
                let formData = new FormData;
                formData.append('mid',this.message.mid);
                formData.append('status',this.status);
                formData.append('valid',this.value2==true?1:0);
                this.api.material_status_change(formData).then((res)=>{
                    this.$emit('dataUpdating',0,true);
                })
            },

            IDchanges(){
               if(this.bind_mid=='') {
                   this.hqUrl='';
                   this.bindMid='';
               }else{
                   let params ={p:10000000,page:1,type:this.type,search:''};
                   this.api.material_search({params}).then((res)=>{
                    for(var i =0 ;i<res.data.length;i++){
                        if(res.data[i].mid==this.bind_mid){
                            this.hqUrl = res.data[i].prev_uri;
                            this.bindMid = this.bind_mid
                        }
                    }
                   })
               }

            },
            time(){
                var _this=this;
                _this.aaa=0;
                var timer = setInterval(function () {
                    if(_this.aaa<99){
                        _this.aaa++
                    }
                },100);
            },
            time1(){
                var _this=this;
                _this.bbb=0;
                var timer = setInterval(function () {
                    if(_this.bbb<99){
                        _this.bbb++
                    }
                },100);
            },
            uploadF(file){
                if(this.status==1101){
                    return
                }else{
                    this.initiate=true;
                    this.time();
                    let formData = new FormData;
                    formData.append('file',file.file);
                    this.api.file_upload(formData).then((res)=>{
                        this.aaa=100;
                        this.initiate=false;
                        // this.attach.name = res.name;
                        // this.attach.size = res.size;
                        // this.attach.ext = res.ext;
                        // this.attach.md5 = res.md5;
                        // this.attach.url = res.url;
                        this.attach=res;
                    })
                }

            },
            getType(){
                let params={material:this.material};
                this.api.config_material_type({params}).then((res)=>{
                    this.scType=res;
                    this.getTagsList();
                    this.getData();
                })
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate=false;
            },
            Remove(file, fileList) {
                this.file = '';
                this.initiate2=false;
            },
            uploadFile(file){
                if(this.status==1101){
                    return
                }else{
                    this.initiate2=true;
                    this.time1();
                    let formData = new FormData;
                    formData.append('file',file.file);
                    this.api.file_upload(formData).then((res)=>{
                        this.bbb=100;
                        this.initiate2=false;
                        this.prev_uri = res.url;
                        this.arr=this.prev_uri.split('.');
                         
                        if(this.arr[this.arr.length-1]=='mp4'||this.arr[this.arr.length-1]=='MP4'){
                            this.getSize()
                        }
                        var image = new Image();
                        var _this=this;
                        image.onload=function(){
                            var width = image.width;
                            var height = image.height;
                            _this.sjSize = (width+"*"+height)
                        };
                        image.src= res.url;
                    })
                }

            },
            getSize() {
                this.api.config_size().then((res) => {
                    this.sizeList = res
                })
            },
            getTagsList(){
                let params = {preset:this.preset,material:this.material,type:this.types,search:this.tagsName,p:50,page:1};
                this.api.tags_search({params}).then((da)=>{
                    this.preset_tags = da.data.tags;
                    this.self_tags = da.data.self_tags;
                    if(this.message.mid!=undefined){
                        this.getMatterDetails();
                    }
                   
                })
            },
            ADDtags(){
                this.bardian.push(this.tagsName);
                let formData = new FormData;
                formData.append('name',this.tagsName);
                formData.append('preset',0);
                formData.append('material',this.material);
                formData.append('type',this.types);
                this.api.tags_add(formData).then((res)=>{
                    this.tagsName='';
                    this. getTagsList();
                })
            },
            setMatter(){
                if(this.preinstall.length<=0){
                    this.$message('预置标签不能为空');
                    return
                }
                let formData = new FormData;
                formData.append('mid',this.message.mid);
                formData.append('type',this.type);
                formData.append('prev_uri',this.prev_uri);
                formData.append('attach',JSON.stringify(this.attach));
                formData.append('tags',this.preinstall);
                formData.append('self_tags',this.bardian);
                formData.append('size',this.sjSize);
                formData.append('is_bind_mid',this.is_bind_mid==true?1:0);
                formData.append('is_internal',this.is_internal==true?0:1);
                formData.append('bind_mid',this.bind_mid);
                formData.append('contracts',JSON.stringify([this.contract_id]));
                formData.append('settle_type',this.settle_type);
                formData.append('settle_value',this.settle_value);
                this.api.material_edit(formData).then((res)=>{
                    if(res!=false){
                         this.getTagsList();
                        this.$emit('dataUpdating',0,true);
                        this. heidSc();
                    }
                   
                })
            },
            AddMatter(){
                if(this.message.mid==undefined){

                    if(!this.type){
                        this.$message.error('类型不能为空')
                        return
                    }
                    if(!this.prev_uri){
                        this.$message.error('未上传预览图')
                        return
                    }
                    if(!this.attach.name){
                        this.$message.error('未上传文件')
                        return
                    }
                    if(this.preinstall.length<=0){
                        this.$message.error('预置标签不能为空')
                        return
                    }

                    if(!this.bind_mid&&this.is_bind_mid!=true){
                        this.$message.error('未绑定素材ID')
                        return
                    }
                    if(!this.open_id&&this.is_internal==false){
                        this.$message.error('绑定设计师ID不能为空')
                        return
                    }
                     if(!this.settle_value&&this.is_internal==false){
                        this.$message.error('买断价格或分成比例不能为空')
                        return
                    }
                     if(this.settle_value<=0&&this.is_internal==false&&this.settle_type==1){
                        this.$message.error('买断价格必须大于零')
                        return
                    }
                     if(this.settle_value<=0&&this.is_internal==false&&this.settle_type==2){
                        this.$message.error('分成比例必须大于零')
                        return
                    }
                    if(this.settle_value>100&&this.is_internal==false&&this.settle_type==2){
                        this.$message.error('分成比例必须小于100')
                        return
                    }
                     if(!this.settle_type&&this.is_internal==false){
                        this.$message.error('结算类型不能为空')
                        return
                    }
                     if(!this.contract_id&&this.is_internal==false){
                        this.$message.error('绑定合同不能为空')
                        return
                    }
                    let formData = new FormData;
                    formData.append('type',this.type);
                    formData.append('status',(this.value2==true?1:0));
                    formData.append('prev_uri',this.prev_uri);
                    formData.append('attach',JSON.stringify(this.attach));
                    formData.append('tags',this.preinstall);
                    formData.append('self_tags',this.bardian);
                    formData.append('bind_mid',this.bind_mid);
                    formData.append('open_id',this.open_id);
                    formData.append('size',this.sjSize);
                    formData.append('is_bind_mid',this.is_bind_mid==true?1:0);
                    formData.append('is_internal',this.is_internal==true?1:0);
                    formData.append('contracts',JSON.stringify([this.contract_id]));
                    formData.append('settle_type',this.settle_type);
                    formData.append('settle_value',this.settle_value);
                    this.api.material_add(formData).then((res)=>{
                        this.getTagsList();
                      if(res!=false){
                          this.$emit('dataUpdating',0,true);
                          this.heidSc();
                      }
                    })
                }else{
                    this.setMatter();
                }

            },
            getMatterDetails(){
                let params ={mid:this.message.mid};
                this.api.material_detail({params}).then((res)=>{
                    this.sw=true;
                    this.prev_uri=res.prev_uri;
                    for (var j=0;j<res.tags.length;j++){
                        if(this.preset_tags.indexOf(res.tags[j])==-1){
                            this.preinstall= res.tags.splice(j);
                        }
                    }
                    for (var e=0;e<res.self_tags.length;e++){
                        if(this.self_tags.indexOf(res.self_tags[e])==-1){
                            this.bardian=res.self_tags.splice(e);
                        }
                    }
                    this.sjSize=res.size;
                    this.attach = res.attach;
                    this.type=res.type;
                    this.arr=res.prev_uri.split('.')
                    if(this.arr[this.arr.length-1]=='mp4'||this.arr[this.arr.length-1]=='MP4'){
                            this.getSize()
                        }
                    this.is_bind_mid=res.is_bind_mid==1?true:false;
                    this.is_internal=res.is_internal==1?true:false;
                    if(this.is_internal==false){
                        if(res.contract.length>0){
                            this.contract_id=res.contract[0].archive_id;
                        }
                        
                        this.settle_type=res.settlement_info.settle_type;
                        this.settle_value=res.settlement_info.settle_value;
                        this.open_id=res.settlement_info.open_id;
                        if(res.settlement_info.id_card){
                             this.state1=res.settlement_info.name+' '+res.settlement_info.id_card
                        }
                        if(res.settlement_info.code){
                            this.state1=res.settlement_info.name+' '+res.settlement_info.code
                        }
                       
                        // if(this.open_id){
                        //     this.api.designer_settlement_list({open_id:this.open_id}).then((res)=>{
                        //         alert(this.open_id)
                        //          if(res.length>0){
                        //              if(res.contribute_type==1){
                        //                  this.state1 =res.name+res.id_card
                        //              }
                        //              if(res.contribute_type==2){
                        //                  this.state1 =res.company_name+res.code
                        //              }
                        //          }
                                

                        //     })
                        // }
                    }
                    for(let i=0;i<res.bind_mid.length;i++){
                        this.bind_mid=res.bind_mid[i].mid;
                        this.hqUrl = res.bind_mid[i].prev_uri;
                    }
                    if(res.status==1201){
                        this.value2=false;
                    }else{
                        this.value2=true;
                    };
                    this.status = res.status;
                })
            },

             getData(){
                    this.api.designer_settlement_list().then((res)=>{
                        this.restaurants=res;

                    })
                },
             querySearch(queryString, cb) {
                    for(var i =0;i<this.restaurants.length;i++){
                        if(this.restaurants[i].contribute_type==1){
                            this.restaurants[i].value=this.restaurants[i].name+' '+this.restaurants[i].id_card
                        }
                        if(this.restaurants[i].contribute_type==2){
                            this.restaurants[i].value=this.restaurants[i].company_name+' '+this.restaurants[i].code
                        }
                    }
                    var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants;
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                handleSelect(item) {
                    this.open_id=item.open_id
                }

        },
        watch: {
            'bindMid': function(newVal){
                this.bind_mid=newVal;
            },
            'hqUrl': function (newVal) {
                this.scUrl=newVal;
            },
            'is_bind_mid':function(newVal){
                if(newVal==true){
                    this.bind_mid='';
                    this.bindMid='';
                    this.hqUrl='';
                    this.$emit('dataId');
                }
            },
            'bind_mid':function(newVal){
                if(newVal==''){
                    this.bindMid='';
                    this.hqUrl='';
                    this.$emit('dataId');
                }
            },
        },
    }
</script>

<style scoped>
    input{
        margin-left: 0;
        padding-left: 10px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .AddIMG{
        position: absolute;
        left: 50%;
        top:15px;
        transform: translateX(-50%);
        width:1115px;
        height:884px;
        background:rgba(255,255,255,1);
        border-radius:4px;
    }
    .AddIMG_tit{
        text-align: left;
        height: 55px;
        border-bottom: 1px solid #E6E9F0;

        margin-bottom: 24px;
    }
    .AddIMG_tit span{
        display: inline-block;
        margin-left: 24px;
        color:rgba(54,54,54,1);
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
        line-height: 55px;
    }
    .AddIMG_content_right{
        display: inline-block;
        width: 750px;
        margin-top: 25px;
    }
    .AddIMG_content_left{
        margin-left: 24px;
        display: inline-block;
        margin-right: 20px;
        vertical-align: top;
    }
    .AddIMG_content_left span,.AddIMG_content_right span{
        display: inline-block;
        margin-bottom: 10px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);

    }
    .AddIMG_content_left img,.AddIMG_content_left video{
        max-width: 228px;
        max-height: 328px;
        border:0px!important;
       position: relative;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .AddIMG_content_right span{
        margin-bottom: 0px;
    }
    .AddIMG_box{
        width:228px;
        padding: 0 17px;
        height:328px;
        background:#f7f9fc;
        border-radius:4px;
    }
    .AddIMG_box_txt{
        margin-left: 45px;
        width:141px;
        text-align: center;
        margin-top: 19px;
    }
    .AddIMG_box_txt span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(54,54,54,1);
        background:rgba(0,153,255,.1);
    }
    .AddIMG_input,.AddIMG_sc,.AddIMG_zp,.AddIMG_select,.AddIMG_yl{
        margin-bottom: 15px;
    }
    .AddIMG_switch{
        display: inline-block;
    }
    .AddIMG_sc input{
        width:254px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin: 0 11px 0 0 !important;
    }
    .AddIMG_input input{
        width:140px;
        height:50px;
        margin-left: 0;
        position: relative;
        left: -140px;
        padding: 0;
        opacity:0;
        top:-14px;
    }
    .AddIMG_input img{
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
    .AddIMG_input_box{
        display: inline-block;
        width:106px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1)!important;
    }
    .tit{
        display: inline-block;
        width:117px;
        margin-right: 16px;
        vertical-align: middle;
        text-align: right;
    }
    .TIT{
        vertical-align:top!important;
    }
    .AddIMG_sc_cjeckbox{
        width: 14px!important;
        height: 14px!important;
        margin:2px  11px 0 0!important;
        padding-left: 0!important;
    }
    .AddIMG_sc_btn{
        display: inline-block;
        margin-right: 10px;
        width:124px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1)!important;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .AddIMG_sc_btn_jy{
        background:rgba(153,153,153,1)!important;
        color:rgba(255,255,255,1)!important;
    }
    .AddIMG_sc p,.AddIMG_zp p ,.AddIMG_yl p,.AddIMG_input p{
        margin:10px 0 0 133px;
        padding: 0;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#8b9bb3;
    }
    .AddIMG_zp_text{
        width:254px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-right: 21px;
    }
    .AddIMG_select{
        display: inline-block;
    }
    .AddIMG_select select{
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(61,73,102,1);
    }
    .AddIMG_yl_size{
        display: inline-block;
        width:190px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgb(229, 227, 235);
    }
    .AddIMG_yl select{
        display: inline-block;
        width:200px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgb(229, 227, 235);
    }
    .AddIMG_yl_upload{
        width: 150px;
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        text-align: center;
        vertical-align: top;
        margin-left: 20px;
    }
    .AddIMG_yl_upload>span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(19,159,248,1);
        line-height: 50px;
    }
    .AddIMG_bq_box{
        display: inline-block;
        width:560px;
        height:258px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        overflow-y: auto;
    }
    .AddIMG_bq_box_top{
        border-bottom: 1px solid rgba(230,230,230,1);
    }
    .AddIMG_bq_box_top_tit{
        margin: 14px 0 14px 14px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(143,155,179,1);
    }
    .AddIMG_bq_box_top_bq,.AddIMG_bq_box_top_zdy{
        margin:0 20px 0px 0px ;

    }


    .AddIMG_bq_box_top_tit input{
        display: block;
        width:326px;
        padding-left: 10px;
        height:28px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-top: 10px;
    }
    .bg_btn{
        margin: 40px 0;
    }
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
        margin-left: 133px;
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
    .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1)!important;
        margin-left: 10px;
        cursor: pointer;
    }
    .inline-input{
        width:266px!important;
        margin-right: 10px;
    }
</style>