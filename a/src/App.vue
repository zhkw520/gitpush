<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
      data(){
          return{}
      },
      created(){
          // this.getLefNav()
      },
      methods:{
          // getLefNav(){
          //     this.api.perm_leftnav().then((res)=>{
          //         localStorage.setItem('letNav',JSON.stringify(res));
          //     })
          // }
      }
  }
</script>
<style >
  html{font-size:10px}
html,body,div,h1,ul,li,a,p,img{
	margin: 0;padding: 0;border: none;
}
html,body{
	width: 100%;
	min-height: 100%;
    background: rgba(239,244,248,1);
}
a{
  text-decoration:none;
}
#app{
	width: 100%;
	min-height: 100%;
}
 .tableBuee{
    position: absolute;
    top:140px;
    right: 40px
}
.tableBuee button{
  width: 82px;
  height: 28px;
  padding: 0!important;
}
.noeflow{
  position: absolute;
  top:40px;
  right: 34px
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background: #3377ff;
}
.pswp__caption__center{display: none}
#tab-3:hover{
  color: #453dff!important;
  border-bottom: 1px solid #453dff;
}
#tab-2:hover{
  color: #453dff!important;
  border-bottom: 1px solid #453dff;
}
#tab-1:hover{
  color: #453dff!important;
  border-bottom: 1px solid #453dff;
}
.el-textarea{
  display: inline-block;
  width: 87%;
}
.el-switch__core{
  margin-left: 28px;
}
.el-upload--picture-card{
  width: 230px;
  height: 205px;
}
.el-upload--picture-card i{
  margin-top: -50px;
  vertical-align: middle;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 104px;
  height: 104px;
}
.block .el-pagination{margin-top: 38px}

.block .el-pagination .btn-prev{
  margin-right: 10px;
}
/*.block .el-pagination .btn-next{*/
  /*margin-left: 10px;*/
/*}*/
.block .el-pagination .btn-prev,.block .el-pagination .btn-next{
  width: 40px;
  height:40px;
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  padding: 0!important;
}
.block .el-pagination .el-pager .number{
  width:40px;
  height:40px;
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  font-size:14px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  line-height: 40px;
  margin-right:10px;
}
.seach .btn{
  position: static!important;
}
.bg{z-index: 999!important;}
.block .el-pagination .el-pager .active{
  background:#3377ff!important;
  color:rgba(255,255,255,1)!important;
}
.block .el-pagination  .el-pagination__total{
  font-size:14px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  margin-left: 20px;
  line-height: 44px;
}
.block .el-pagination  .el-pagination__jump{
  display: inline-block;
  line-height: 44px;
  margin-left: 0;
}
.block .el-pagination__sizes{
  height: 36px;
  line-height: 36px;
}
.block .el-input--mini .el-input__inner{
  height: 36px;
  line-height: 36px;
}
.block .el-pagination  .el-pagination__jump .el-input__inner{
  width:50px;
  height:40px;
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  margin-left: 0px;
}
.AddIMG_switch .el-switch__core{
  margin-left: 0!important;
}
.AddIMG_input_box  .el-upload .el-button--small{
    width:106px!important;
    height:36px!important;
    background: transparent!important;
}
.AddIMG_input_box .el-button--primary{
    color:rgba(61,73,102,1)!important;
    border: 0!important;
}
.AddIMG_yl_upload .el-upload .el-button--small{
  width:110px;
  height:36px;
  background:rgba(242,246,252,1);
  border-radius:4px;
  border:1px solid #3377ff;
}
.AddIMG_yl_upload .el-upload .el-button--small span {
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: #3377ff;
}
.tags_con_1 .el-checkbox__label{
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;

}
.tags_con_1 .el-checkbox__inner{
  display: none;
}
.tags_con_1 .el-checkbox__input.is-checked+.el-checkbox__label{
  background: #3377ff;
  color: #fff;
  border: 0!important;
}
.AddIMG_bq_box_top_bq .el-checkbox__inner{
  opacity: 0;
}
.AddIMG_bq_box_top_bq .el-checkbox__label {
  padding-left: 0;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
}
.AddIMG_bq_box_top_bq  .el-checkbox{
  background:rgba(255,255,255,1);
  border:1px solid #e6e9f0;
  border-radius:5px;
  padding-right: 14px;
  margin-bottom: 14px!important;
  margin-left: 14px;
}
.AddIMG_bq_box_top_bq .el-checkbox__label{
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  padding: 5px 0px;
}

.AddIMG_bq_box_top_bq .is-checked {
 background:  rgba(51,119,255,1);
  border: 0px!important;
}

.AddIMG_bq_box_top_bq .el-checkbox span{
  border: 0!important;
}
.box_select .el-radio{
  height: 237px;
  vertical-align: top;
}
.box_select .el-radio .el-radio__input{
  line-height: 237px;

}
.block .el-pagination .el-pagination__jump .el-input__inner{
  width: 38px!important;
  height: 34px!important;
}
.box_select .el-radio .el-radio__label,.boxCheck .el-radio__label{
  opacity: 0;
}
.box_select .el-radio .el-radio__input .el-radio__inner{
  border-radius:0px!important;
}
.box_select .el-radio .is-checked .el-radio__inner::after{
  border: 0px solid #fff;
  box-sizing: content-box;
  content: "";
  border-left: 0;
  border-top: 0;
  height: 0;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 0px;
  transform: rotate(45deg) scaleY(1);
}
.top_name{
  width:100%;
  height:63px;
  border-top:1px solid #ededed;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  position: fixed;
  left: 256px;
  top:63px;
  z-index: 8 !important;
}
.inner{
  margin-left: 18px;
  color:rgba(19,159,248,1);
  margin-right: 10px;
  border-radius:2px;
}
.top_name>span{
  display: inline-block;
  line-height: 50px;
}
.top_txt{
  font-size:12px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:36px;
}
.content{
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  margin-top: 152px;
}
.Search{
  margin-left: 24px;
}
.Search>img{
  width: 28px;
  position: relative;
  left: -246px;
  top: 10px;
  cursor: pointer;
}
.Search input{
  width:160px;
  height:32px;
  padding-left: 40px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  margin-left: 0;
  margin-right: 50px;
  margin-top: 24px;
}
.Search select{
  width:200px;
  height:36px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.Search_tit{
  display: inline-block;
  width:144px;
  height:36px;
  line-height: 36px;
  background:rgba(242,246,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(61,73,102,1);
  float: right;
  text-align: center;
  margin-top: 29px;
  margin-right: 40px;
  cursor: pointer;
}
.label{
  margin:18px 0 18px 24px;
}
.labelName{
  display: inline-block;
  height:28px;
  background:rgba(255,255,255,1);
  border-radius:5px;
  font-size:12px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(31,46,77,1);
  margin-right: 24px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  margin-top: 10px;
}
.label_txt{
  display: inline-block;
  vertical-align: top;
  font-size:14px;
  line-height: 40px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(143,155,179,1);
  margin-right: 16px;
  margin-top: 5px;

}
.contentImg .label .active,.labelName:hover{
  display: inline-block;
  padding: 0 3px;
  background: #3377ff;
  border-radius: 4px;
  margin-right: 10px!important;
  color: #fff!important;
  font-size: 12px!important;
}
/*.active{*/
  /*background:rgba(255,255,255,1);*/
  /*border:1px solid rgba(19,159,248,1);*/
/*}*/
.box{
  margin-top: 24px;
}
.boxImg{
  display: inline-block;
  width:48%;
  height:353px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  padding: 14px 0 14px 14px;
  box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
  margin: 0px 23px 24px 0;
  position: relative;
}
.boxImg:nth-child(2n){
  margin-right: 0!important;
}

.boxImg .img_box{
  display: inline-block;
  width:252px;
  height:326px;
  background:#e3e7eb;
  border-radius:4px;
  margin-right: 24px;
  text-align: center;
}
.boxImg img,.boxImg video{
  max-width:218px;
  max-height:326px;
  position: relative;
  top:50%;
  transform: translateY(-50%);
}
.boxImg_right{
  display: inline-block;
  vertical-align: top;
}
.boxImg_right_1 .img{
  vertical-align: top;
  display: inline-block;
  width:58px;
  height:28px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}
.boxImg_right_1{
  max-width: 450px;
}
.boxImg_right_1,.boxImg_right_2{
  display: inline-block;
  vertical-align: top;
}
.boxImg_xz_yz{
  display: inline-block;
  max-width: 200px !important;
  height:35px;
  overflow: hidden;
}
.boxImg_text{
  display: inline-block;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(143,155,179,1);
  margin-bottom: 15px;
}
.boxImg_content{
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(31,46,77,1);
}
.boxImg_right_1 .boxImg_text{
  width: 110px;
  margin-right: 11px;
  text-align: right;
}
.boxImg_right_2 .boxImg_text{
  width: 100px;
  margin-right: 12px;
}
.ck{
  color:#3377ff;
  cursor: pointer;
}
.box_box{
  display:inline-block;
  background:rgba(247,249,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  padding: 5px 10px;
  margin-right: 12px;
  margin-bottom: 8px;
}
/*.box_box:nth-child(3){*/
  /*margin-right:0!important;*/
/*}*/
.boxImg_xz{
  display: inline-block;
  width: 260px;
  max-height: 35px;
  overflow: hidden;
}
.boxImg_bq{
  vertical-align: top;
}
.dowload{
  display: inline-block;
  width:44px;
  height:28px;
  background:rgba(247,249,252,1);
  border-radius:4px;
  border:1px solid #3377ff;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#3377ff;
  text-decoration: none;
  text-align: center;
  line-height: 28px;
  margin-left: 20px;
}
.bjImg{
  width:252px;
  height:40px;
  background:rgba(134,134,134,0.503);
  border-radius:0px 0px 4px 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  bottom: 42px;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height: 38px;
}

.block{
  text-align: right;
  margin-bottom: 60px;
}
.zt,.cc,.xgsc,.dx{
    display: inline-block;
}
.zt>.boxImg_content,.xgsc>.ck{
    display: inline-block;
    width: 100px;
}
.boxCheck .el-checkbox__label{
    display: none;
}
.work_tab .el-table th{
  height: 40px!important;
}
  .time .el-input__inner{
    width:400px!important;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
  .times .el-input__inner{
    width:514px!important;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
.input_type .el-textarea{
  width: 60%;
}
.input_type .el-textarea__inner{
  display: inline-block!important;
  width:400px!important;
  height:92px!important;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.box_uploading .el-upload--picture-card{
  width:104px;
  height:104px;
  background:rgba(247,249,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.table_material .el-button--text{
  height:36px;
  background:rgba(51,119,255,1);
  border-radius:4px;
  padding: 10px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.cell .el-button--text{
  color: #3377ff;
}
  .problem .el-button{
    display: inline-block;
    padding: 0!important;
    border: 0!important;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(48,144,240,1)
  }
  .block .el-range-editor.el-input__inner{
    width:318px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
  .up .el-button--primary{
    width:106px;
    height:36px;
    background:rgba(255,255,255,1)!important;
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1)!important;
  }
  .timesDate .times .el-input__inner{
    width:318px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
.timesDate  .el-date-editor .el-range-input{
  vertical-align: top;
}
 .block .el-pagination .btn-prev, .block .el-pagination .btn-next{
    width:40px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);

  }
.block .el-pagination .el-pager .number{
  width:40px;
  height:36px;
  line-height: 36px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.AddIMG_bq_box_top_bq .el-checkbox__input.is-checked+.el-checkbox__label{
  color:rgba(255,255,255,1)!important;
}
.content .el-table--border, .el-table--group{
  margin-bottom: 24px!important;
}
  .problem .el-table__expanded-cell{
    background:#F7F9Fa;
  }
.problem .el-table__expanded-cell:hover{
  background:#F7F9Fa!important;
}
  .tags_name .el-checkbox__input{
    display: none;
  }
select{
  color: #8b9bb3;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color:#8b9BB3;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:#8b9BB3;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#8b9BB3;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:#8b9BB3;
}
  .times .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 512px;
  }
.time .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 400px;
}
.tags{
  display: inline-block;
  max-width: 1090px;
  max-height: 50px;
  overflow: hidden;
  vertical-align: top;
}
.ALLtags{
  max-height: 100%!important;
}
.tagsAll{
  display: inline-block;
  color:rgba(51,119,255,1);
  cursor: pointer;
  vertical-align: top;
  font-size: 12px;
  line-height: 36px;
  margin-top: 5px;
}
  .table_material .el-checkbox__label{opacity: 0;position: absolute;}
.activeHeid{
  display: none!important;
}
.el-button{
  /* background: rgba(0,0,0,0)!important; */
}
  .uplaod .el-button{
    background: rgba(51,119,255,1)!important;
  }
  .up_img .el-button{
    background: rgba(51,119,255,1)!important;
    width: 101px;
  }
.el-upload-list__item:first-child{
  margin-top: 0!important;
}
.table_material_tit .el-checkbox-group{
  display: inline-block;
}

.load .el-button--primary{color:rgba(51,119,255,1)}
.select_img .el-checkbox__label{opacity: 0}
.tit_top_url,.tit_top_con{
  padding:20px 0 0 24px;
}
.log_url,.new_url{
  display: inline-block;
  font-family: "Microsoft YaHei";
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
}
.log_url{color: #acadb0}
.new_url{color: #3377ff}
.tit_top_con .tit_name{
  display: inline-block;
  font-size:18px;
  font-family:PingFang-SC;
  font-weight:500;
  color:rgba(50,50,50,1);
}
.content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:286px;
  height:36px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.content_table .el-button{
  border: 0;
  cursor: pointer;
  color: #3377ff;
  padding:0;
}
  .load .el-upload-list{
    display: none;
  }
 .tags_name .el-checkbox__input.is-checked+.el-checkbox__label,.contents .el-checkbox__input.is-checked+.el-checkbox__label{
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 5px;
  background:#4f4cf1 ;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  border:0!important;
}

 .tags_name .el-checkbox__label,.contents .el-checkbox__label{
  width: 100%;
  height: 100%;
  padding: 5px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  text-align: center;
}
.load_up .el-button--primary{
  color: #000;
}
.up_img .el-upload-list{
  display: none;
}
  .icon .el-button{
    width: 100px;
    height: 100px;
    display: none;
  }
.icon:hover .el-button{
  display:block;
  border: 1px dotted #000!important;
  background:rgba(0,0,0,0.2)!important; ;
}
  .icon .el-upload-list{
    display: none;
  }
 .select_check .el-select__tags{
   max-height: 50px;
   overflow-y: scroll;
 }
.elSelect .el-select__tags{
  max-height: 30px;
  overflow-y: scroll;
}
.select_check .el-select__tags::-webkit-scrollbar { width: 0 !important }
.elSelect .el-select__tags::-webkit-scrollbar { width: 0 !important }
.box_2 .el-button--primary{
  color:#3377ff!important;
}
.filtrate .timesDate .content_table .time .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 310px;
}
  .title_left{
    font-size:18px;
    font-family:PingFang-SC;
    font-weight:500;
    color:rgba(50,50,50,1);
  }
  .radio .el-radio__input.is-checked+.el-radio__label{
    color: #fff!important;
  }
.radio .el-radio__label{
  color: #fff!important;
  font-size:12px;
  font-family:PingFangSC;
  font-weight:400;
}
  .tags_box .el-checkbox__input{
    display: none;
  }
.tags_box .el-checkbox__label{
  display: inline-block;
  background: white;
  border: 1px solid #e6e9f0;
  border-radius: 5px;
  padding:5px 10px;
  margin-bottom: 14px !important;
}
.tags_box  .el-checkbox__input.is-checked+.el-checkbox__label{
  background: #3377ff!important;
  color: #fff!important;
  border: 0!important;
}
.tags_box .el-checkbox+.el-checkbox,.tags_box .el-checkbox{
  margin-left: 0!important;
  margin-right: 24px;
}


.uploadTxt .el-upload{
  background: #3377ff!important;
}
  .tags_con_1 .el-checkbox__label{
    margin-bottom: 10px;
  }
.tags_con_1 .el-checkbox{
  margin-right: 20px;
}
.tags_con_1 .el-checkbox+.el-checkbox{
  margin-left:0px;
}
.upPreview .el-upload-list{
  display: none;
}

.demo  .el-upload-list__item-name{
  display: none;
}

  #lime .upload-demo .el-upload-list__item{
    display: none;
  }
  .fill .uplaod .upload-demo .el-upload-list__item {
    display: none;
  }
  .themeUpLeft .el-upload-list__item {
    display: none;
  }
  .AddIMG_input_box .el-upload-list__item {
    display: none;
  }
.contract el-table__expanded-cell{
  padding: 0!important;
}
/*.AddIMG_input_box .upload-demo .el-upload-list__item{*/
  /*display: inline-block;*/
/*}*/
  .AddIMG_yl_upload .upload-demo-sc .el-upload-list__item{
    display: none;
  }
.ups .el-upload-list__item-name{
    display: none;
  }
.upBox .el-upload-list__item-name{
    display: none;
  }


  .fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.tx .el-select  .el-select__tags{
        height: 28px!important;
        overflow: hidden!important;
    }
    .aaa .el-button{
      background: #3377ff!important
    }
    .aaa .el-upload-list__item-name,.ext .el-upload-list__item-name,.upyc,.qdTh .el-upload-list__item .el-upload-list__item-name,.AddIMG_yl_upload .el-upload-list__item-name,.upFJ .el-upload-list__item-name{
      display: none;
    }
     .bb .el-checkbox__input{
        vertical-align: top;
    }
    .footerBox_2 {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: 1300px;
    height: 70px;
    background: #fff;
    font-size: 14px;
    color: #666;
    line-height: 60px;
    text-align: center;
    box-shadow: 3px 3px 5px #666;
    z-index: 8;
}
.footerBox_2>a, .footerBox_2>span {
    line-height: 75px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    margin: 0 25px;
    
}
.footerBox_2>a {
    cursor: pointer;
}
.footer_ga {
    display: inline-block;
    vertical-align: top;
    width: 20px;
    margin-top: 26px;
    margin-right: 5px;
}
#padd .cell{
  padding: 0 !important
}
.top_tit{
    z-index: 8 !important;
}
.porject_up .el-upload--picture-card{
  width: 128px!important;
  height: 192px!important;
  margin-left:16px;
}
.porject_up .el-upload--picture-card i{
  margin-top:25px!important
}
.porject_up .el-upload-list--picture-card .el-upload-list__item{
  width: 128px!important;
  height: 192px!important;
  margin-right:0px!important;
   margin-left:16px;
}


.times .el-input__inner{
         width:200px!important
    }
  .file_ADD .el-upload-list__item-name{
    display: none;
  }  


.top_name .el-icon-time{
  line-height: 3!important;
}

 .examine .el-input__inner{
       border:0!important;
        background: rgba(247,248,250,1)!important;
   }



  .htTC .el-input__inner{
    width: 400px!important;
  }

.times .el-input__inner{
         width:200px!important
    }
  .file_ADD .el-upload-list__item-name,.box_right .el-upload-list__item,.tit4 .el-upload-list__item-name{
    display: none;
  }  


  .htTC .el-input__inner{
    width: 400px!important;
  }
</style>
