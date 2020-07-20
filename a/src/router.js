import Vue from 'vue'
import Router from 'vue-router'
const mode = [];
/*外部帐号*/
import indexs from './views/public/index.vue'
mode['indexs'] = indexs
import indexs_list from './views/public/list.vue'
mode['indexs_list'] = indexs_list
import indexs_message from './views/public/userMessage.vue'
mode['indexs_message'] = indexs_message
import Home from './views/home.vue'
mode['Home'] = Home
import Index from './views/index.vue'
mode['Index'] = Index
/*素材库*/
import erro from './views/erro.vue'
mode['erro'] = erro
import AdminIndex from './views/admin/index.vue'
mode['admin'] = AdminIndex
import AdminNeed from './views/admin/advertising.vue'
mode['needList'] = AdminNeed
import MaterialResource from './views/admin/material_resource.vue'
mode['MaterialResource']=MaterialResource
import AD_templates from './views/admin/AD_templates.vue'
import dynamic from './views/admin/dynamic.vue'
import material_wallpaper from './views/admin/material_wallpaper.vue'
mode['AD_templates'] = AD_templates
mode['dynamic'] = dynamic
mode['material_wallpaper'] = material_wallpaper
import settags from './views/admin/set_tags'
mode['settags'] =settags
import library from './views/admin/library'
mode['library'] = library
import tags_details from './views/admin/tags_details'
mode['tags_details'] = tags_details
import mangement from './views/admin/management'
mode['mangement'] =mangement


import wallpaper from './views/admin/wallpaper.vue'
mode['wallpaper'] = wallpaper
import WLtemplate from './views/admin/wlTemplate.vue'
mode['WLtemplate'] = WLtemplate
import AdminMaterialLibs from './views/admin/materials.vue'
mode['library_pictures'] = AdminMaterialLibs
import AdminAD from './views/admin/AD_templates.vue'
mode['library_resources'] = AdminAD
import lockScreen from './views/admin/lockScreen.vue'
mode['lockScreen'] = lockScreen
import Ordinary_wallpaper from './views/admin/Ordinary_wallpaper'
mode['Ordinary_wallpaper']=Ordinary_wallpaper
import callShow from './views/admin/callShow'
mode['callShow'] = callShow
import AdminRole from './views/admin/level/role.vue'
mode['roles'] = AdminRole
import AdminInside from './views/admin/level/inside.vue'
mode['inside'] = AdminInside
import AdminExternal from './views/admin/level/external.vue'
mode['external'] = AdminExternal

import standard from './views/admin/standard'
mode['standard']=standard
import add_library from './views/admin/add_library'
mode['add_library'] = add_library
import details_library from './views/admin/details_library'
mode['details_library'] = details_library
import Other_details from './views/admin/Other_details'
mode['Other_details']=Other_details



//收益中心
import income from './views/income/index.vue'
mode['income'] = income
import earnings from './views/income/earnings_all'
mode['earnings'] = earnings
import Advertising from './views/income/Advertising'
mode['Advertising']=Advertising
import AdvertisingNoSettlement from './views/income/AdvertisingNoSettlement'
mode['AdvertisingNoSettlement']=AdvertisingNoSettlement
import settlement from './views/income/settlement'
mode['settlement'] = settlement
import money_details from './views/income/money_details'
mode['money_details'] = money_details
import cost_management from './views/income/cost_management'
mode['cost_management'] = cost_management
import divided_details from './views/income/divided_details'
mode['divided_details'] = divided_details
import data_details from './views/income/data_details'
mode['data_details'] = data_details
import divided_management from './views/income/divided_management'
mode['divided_management']=divided_management
import returns_detailed from './views/income/Returns_detailed'
mode['returns_detailed'] = returns_detailed
import advertiser from './views/income/advertiser'
mode['advertiser'] = advertiser
import Administration from './views/income/Receivables/Administration'
mode['Administration']=Administration
import ReceiverManagement from './views/income/Receivables/ReceiverManagement'
mode['ReceiverManagement']=ReceiverManagement
import ADDSettlement from './views/income/Receivables/ADDSettlement'
mode['ADDSettlement']=ADDSettlement
import SettlementDetails from './views/income/Receivables/SettlementDetails'
mode['SettlementDetails']=SettlementDetails
import establish from './views/income/Receivables/Establish'
mode['establish']=establish
import establish2 from './views/income/Receivables/Establish2'
mode['establish2']=establish2
import establish3 from './views/income/Receivables/Establish3'
mode['establish3']=establish3
import DetailsOfCollection from './views/income/Receivables/DetailsOfCollection'
mode['DetailsOfCollection']=DetailsOfCollection
import DetailsOfCollection2 from './views/income/Receivables/DetailsOfCollection2'
mode['DetailsOfCollection2']=DetailsOfCollection2
import DetailsOfCollection3 from './views/income/Receivables/DetailsOfCollection3'
mode['DetailsOfCollection3']=DetailsOfCollection3
import ChangeRecord from './views/income/Receivables/ChangeRecord'
mode['ChangeRecord']=ChangeRecord
import Record from './views/income/Receivables/Record'
mode['Record']=Record
import detailsSettlement from './views/income/Receivables/DetailsSettlement'
mode['detailsSettlement']=detailsSettlement
import projection from './views/income/projection'
mode['projection']=projection
import Administrations from './views/income/AdvanceCharge/Administration'
mode['Administrations']=Administrations
import YFdetails from './views/income/AdvanceCharge/YFdetails'
mode['YFdetails']=YFdetails
import change from './views/income/AdvanceCharge/change'
mode['change']=change
import ABilish from './views/income/Receivables/ABolish'
mode['ABilish']=ABilish
import ABilishs from './views/income/payment/ABolish'
mode['ABilishs']=ABilishs

import FKAdministration from './views/income/payment/Administration'
mode['FKAdministration']=FKAdministration
import FKReceiverManagement from './views/income/payment/ReceiverManagement'
mode['FKReceiverManagement']=FKReceiverManagement
import FKADDSettlement from './views/income/payment/ADDSettlement'
mode['FKADDSettlement']=FKADDSettlement
import FKSettlementDetails from './views/income/payment/SettlementDetails'
mode['FKSettlementDetails']=FKSettlementDetails
import FKestablish from './views/income/payment/Establish'
mode['FKestablish']=FKestablish
import FKestablish2 from './views/income/payment/Establish2'
mode['FKestablish2']=FKestablish2
import FKestablish3 from './views/income/payment/Establish3'
mode['FKestablish3']=FKestablish3
import FKDetailsOfCollection from './views/income/payment/DetailsOfCollection'
mode['FKDetailsOfCollection']=FKDetailsOfCollection
import FKDetailsOfCollection2 from './views/income/payment/DetailsOfCollection2'
mode['FKDetailsOfCollection2']=FKDetailsOfCollection2
import FKDetailsOfCollection3 from './views/income/payment/DetailsOfCollection3'
mode['FKDetailsOfCollection3']=FKDetailsOfCollection3
import FKChangeRecord from './views/income/payment/ChangeRecord'
mode['FKChangeRecord']=FKChangeRecord
import FKRecord from './views/income/payment/Record'
mode['FKRecord']=FKRecord
import FKdetailsSettlement from './views/income/payment/DetailsSettlement'
mode['FKdetailsSettlement']=FKdetailsSettlement
import SFAdministration from './views/income/SpecialFunds/SpecialFunds_Administration'
mode['SFAdministration']=SFAdministration
import ADDspecial from './views/income/SpecialFunds/ADDspecial'
mode['ADDspecial']=ADDspecial
import special_edit from './views/income/SpecialFunds/special_edit'
mode['special_edit']=special_edit
import AddEdit from './views/income/SpecialFunds/AddEdit'
mode['AddEdit']=AddEdit
import ADD from './views/income/AdvanceCharge/ADD'
mode['ADD']=ADD
import Record2 from './views/income/SpecialFunds/Record'
mode['Record2']=Record2;
import RecordDetailed from './views/income/SpecialFunds/RecordDetailed'
mode['RecordDetailed']=RecordDetailed
import YYAdministration from './views/income/Payment_operation/Administration'
mode['YYAdministration']=YYAdministration
import detailYY from './views/income/Payment_operation/details'
mode['detailYY']=detailYY
import Overview_of_the_contract from './views/income/Receivables/Overview_of_the_contract'
mode['Overview_of_the_contract']=Overview_of_the_contract
import scheduling from './views/income/Receivables/scheduling'
mode["scheduling"]=scheduling
import project_benefit from './views/income/project_benefit'
mode['project_benefit']=project_benefit


import PM from './views/income/Receivables/PM'
mode['PM']=PM
import cooperator from './views/income/Receivables/cooperator'
mode['cooperator']=cooperator
import PM_details from './views/income/Receivables/PM_details'
mode['PM_details']=PM_details


import theme_payment from './views/income/content/theme_payment'
mode['theme_payment']=theme_payment
import Divided from './views/income/content/Divided'
mode['Divided']=Divided
import exports from './views/income/content/exports'
mode['exports']=exports
import Divided_details from './views/income/content/Divided_details'
mode['Divided_details']=Divided_details
import Divided_details_money from './views/income/content/Divided_details_money'
mode['Divided_details_money']=Divided_details_money
import theme_fk from './views/income/content/theme'
mode['theme_fk']=theme_fk
import call_show from './views/income/content/call_show'
mode['call_show']=call_show
import datas_details from './views/income/content/data_details'
mode['datas_details']=datas_details
import Other_payment from './views/income/content/Other_payment'
mode['Other_payment']=Other_payment
import Advance_management from './views/income/content/Advance_management'
mode["Advance_management"]=Advance_management
import Advance_details from './views/income/content/Advance_details'
mode['Advance_details']=Advance_details
import payee from './views/income/content/payee'
mode['payee']=payee
import payee_details from './views/income/content/payee_details'
mode['payee_details']=payee_details
import import_data from './views/income/content/import_data'
mode['import_data']=import_data
import  Material_payment from './views/income/content/Material_payment'
mode['Material_payment']=Material_payment
import money_detail from './views/income/content/money_details'
mode['money_detail']=money_detail
import money_details_divide from './views/income/content/money_details_divide'
mode['money_details_divide']=money_details_divide
import Divided_into_management from './views/income/content/Divided_into_management'
mode['Divided_into_management']=Divided_into_management
import Divided_into_management_details from './views/income/content/Divided_into_management_details'
mode['Divided_into_management_details']=Divided_into_management_details
import price from './views/income/content/price'
mode['price']=price
import AmendantRecord from './views/income/content/AmendantRecord'
mode['AmendantRecord']=AmendantRecord
import AmendantRecordDetails from './views/income/content/AmendantRecordDetails'
mode['AmendantRecordDetails']=AmendantRecordDetails
import data_manage from './views/income/content/data_manage'
mode['data_manage']=data_manage
import cz_record from './views/income/content/cz_record'
mode['cz_record']=cz_record
import Designer_settlement from './views/income/content/Designer_settlement'
mode['Designer_settlement']=Designer_settlement
import Designer_ADD from './views/income/content/Designer_ADD'
mode['Designer_ADD']=Designer_ADD
import Designer_record from './views/income/content/Designer_record'
mode['Designer_record']=Designer_record
import look_details from './views/income/content/look_details'
mode['look_details']=look_details
import theme_payee from './views/income/content/theme_payee'
mode['theme_payee']=theme_payee
import callShow_payee from './views/income/content/callShow_payee'
mode['callShow_payee']=callShow_payee
import Operation_details from './views/income/content/Operation_details'
mode['Operation_details']=Operation_details


//工作台
import workbench from './views/workbench/index'
mode['workbench'] = workbench
import workbenchPadding from './views/workbench/workbench_padding'
mode['workbenchPadding'] = workbenchPadding
import ALL from './views/workbench/all'
mode['ALL']=ALL
import Billing_details from './views/workbench/Billing_details'
mode['Billing_details'] = Billing_details
import withdraw from './views/workbench/tx_details'
mode['withdraw'] =withdraw
import user_details from './views/workbench/user_details'
mode['user_details'] =user_details
import MD5 from './views/workbench/MD5.vue'
mode['MD5'] = MD5;
import allocation from  './views/workbench/allocation'
mode['allocation'] =allocation
import resource from './views/workbench/resource'
mode['resource'] = resource
import has_replaced from './views/workbench/Has_replaced'
mode['has_replaced'] = has_replaced
import replace from './views/workbench/replace'
mode['replace'] =replace;
import theme from './views/workbench/theme'
mode['theme'] = theme
import theme_details from './views/workbench/theme_details'
mode['theme_details'] = theme_details
import theme_screen from './views/workbench/theme_screen'
mode['theme_screen'] =theme_screen
import processed from './views/workbench/processed'
mode['processed'] = processed
import ad_source from './views/workbench/ad_Source'
mode['ad_source']=ad_source
import ad_details from  './views/workbench/ad_details'
mode['ad_details']=ad_details
import ad_particulars from './views/workbench/ad_particulars'
mode['ad_particulars']=ad_particulars
import ad_select from './views/workbench/ad_select'
mode['ad_select']=ad_select
import ad_external_user from './views/workbench/ad_external_user'
mode['ad_external_user']=ad_external_user
import Jounrnal_ys from './views/workbench/Journal_ys'                       
mode['Jounrnal_ys']=Jounrnal_ys
import Journal_user from './views/workbench/Journal_user'
mode['Journal_user']=Journal_user
import Journal_details from './views/workbench/Journal_details'
mode['Journal_details']=Journal_details 
import journal_of_push from './views/workbench/Journal_of_push'
mode['journal_of_push'] = journal_of_push
import journal_list from './views/workbench/journal_list'
mode['journal_list']=journal_list
import journal_nb from './views/workbench/journal_nb'
mode['journal_nb']=journal_nb
import journal_Administrator from './views/workbench/Jounrnal_Administrator'
mode['journal_Administrator']= journal_Administrator
import wb_Journal from  './views/workbench/wb_Journal'
mode['wb_Journal']=wb_Journal
import userControl from './views/workbench/userControl'
mode['userControl']=userControl
import Offline_resources from './views/workbench/Offline_resources'
mode['Offline_resources']=Offline_resources
import record from './views/workbench/record'
mode['record']=record
import Offline_details from './views/workbench/Offline_details'
mode['Offline_details']=Offline_details
import channel_resource from './views/workbench/channel_resource'
mode['channel_resource']=channel_resource
import Channels_for_details from './views/workbench/Channels_for_details'
mode['Channels_for_details']=Channels_for_details
import Advertising_source_details from './views/workbench/Advertising_source_details'
mode['Advertising_source_details']=Advertising_source_details
import Advertising_for_details from './views/workbench/Advertising_for_details'
mode['Advertising_for_details']=Advertising_for_details
import External_pre_trial from './views/workbench/External_pre_trial'
mode['External_pre_trial']=External_pre_trial
import External_details from './views/workbench/External_details'
mode['External_details']=External_details
import Advertising_content_review from './views/workbench/Advertising_content_review'
mode['Advertising_content_review']=Advertising_content_review
import Advertising_review from './views/workbench/Advertising_review'
mode['Advertising_review']=Advertising_review

import theme_screenshots from './views/workbench/theme_screenshots'
mode['theme_screenshots']=theme_screenshots
import theme_screenshots_xq from './views/workbench/theme_screenshots_xq'
mode['theme_screenshots_xq']=theme_screenshots_xq

import Advertising_managing from './views/workbench/Advertising_managing'
mode['Advertising_managing']=Advertising_managing
import projectList from './views/workbench/projectList'
mode['projectList']=projectList
import projectStorage from './views/workbench/projectStorage'
mode['projectStorage']=projectStorage
import projectStorage_xq from './views/workbench/projectStorage_xq'
mode['projectStorage_xq']=projectStorage_xq
import Advertising_review_fs from './views/workbench/Advertising_review_fs'
mode['Advertising_review_fs']=Advertising_review_fs
import news from './views/workbench/news'
mode['news']=news
import news_add from './views/workbench/news_add'
mode['news_add']=news_add
// import Push_the_management from './views/workbench/Push_the_management'
// mode['Push_the_management']=Push_the_management
// import Push_account from './views/workbench/Push_account'
// mode['Push_account']=Push_account
import Audio_configuration_management from './views/workbench/Audio_configuration_management'
mode['Audio_configuration_management']=Audio_configuration_management


import axios from 'axios'
import api from './api/index'


/*数据*/
import data from './views/datas/index'
mode['data'] = data
import Material_data from './views/datas/Material_data'
mode['Material_data'] = Material_data
import Material_related from './views/datas/Material_related'
mode['Material_related'] = Material_related

// 个人中心
import infoIndex from './views/userinfo/index.vue'
mode['info'] = infoIndex
import userinfo from './views/userinfo/user_info.vue'
mode['userinfo'] = userinfo
import passWord from './views/userinfo/password'
mode['passWord'] = passWord
import message from './views/userinfo/message'
mode['message'] = message
import messageDetails from './views/userinfo/messageDetails'
mode['messageDetails'] = messageDetails
import MyPerm from './views/userinfo/MyPermission'
mode['MyPerm'] = MyPerm
import account from  './views/userinfo/account'
mode['account'] = account
import roleManagement from './views/userinfo/role_management'
mode['roleManagement'] = roleManagement
import AddRole from './views/userinfo/AddRole'
mode['AddRole'] = AddRole
import AccounAudit from  './views/userinfo/AccounAudit'
mode['AccounAudit'] = AccounAudit
import feedback from  './views/userinfo/feedback'
mode['feedback'] = feedback
import Details from './views/userinfo/details'
mode['Details'] = Details
import quantuty from './views/userinfo/quantity'
mode['quantuty'] = quantuty
import Process from './views/userinfo/process'
mode['Process'] = Process

//主题中心
import ThemeCenter from './views/ThemeCenter/index'
mode['ThemeCenter'] = ThemeCenter
import themeCook from './views/ThemeCenter/themeCook'
mode['themeCook']=themeCook
import themeUp from './views/ThemeCenter/theme_up'
mode['themeUp']=themeUp
import themeDetails from './views/ThemeCenter/themeDetails'
mode['themeDetails']=themeDetails
import themeLock from './views/ThemeCenter/theme_lock'
mode['themeLock']=themeLock
import themelock_up from './views/ThemeCenter/themelock_up'
mode['themelock_up']=themelock_up
import theme_icon from './views/ThemeCenter/theme_icon'
mode['theme_icon']=theme_icon
import theme_two from './views/ThemeCenter/theme_two'
mode['theme_two']=theme_two
import themeSc_details from './views/ThemeCenter/themenSC_details'
mode['themeSc_details']=themeSc_details
import sheleRecord from './views/ThemeCenter/Shele_record'
mode['sheleRecord']=sheleRecord
import packList from './views/ThemeCenter/pack/pack_list'
mode['packList']=packList
import upPack from './views/ThemeCenter/pack/up_pack'
mode['upPack']=upPack
import pack_icon from './views/ThemeCenter/pack/pack_icon'
mode['pack_icon']=pack_icon
import pack_two from './views/ThemeCenter/pack/pack_two'
mode['pack_two']=pack_two
import pack_details from './views/ThemeCenter/pack/pack_details'
mode['pack_details']=pack_details
import propaganda_img from './views/ThemeCenter/propaganda_img'
mode['propaganda_img']=propaganda_img
import propaganda_details from './views/ThemeCenter/propaganda_details'
mode['propaganda_details']=propaganda_details
import Scheduling_management from './views/ThemeCenter/scheduling/Scheduling_management'
mode['Scheduling_management']=Scheduling_management
import themeDetailsQd from './views/ThemeCenter/themeDetailsQd'
mode['themeDetailsQd']=themeDetailsQd
import details from './views/ThemeCenter/scheduling/details'
mode['details']=details
import xqDetails from './views/ThemeCenter/scheduling/xqDetails'
mode['xqDetails']=xqDetails;
import select_theme from './views/ThemeCenter/scheduling/select_theme'
mode['select_theme']=select_theme;
import select_theme_two from './views/ThemeCenter/scheduling/select_thenme_two'
mode['select_theme_two']=select_theme_two
import AllData from './views/ThemeCenter/data/AllData'
mode['AllData']=AllData;
import ranking from './views/ThemeCenter/data/ranking'
mode['ranking']=ranking;
import Profit from './views/ThemeCenter/data/Profit'
mode['Profit']=Profit
import Settlement from './views/ThemeCenter/dataAdministration/Settlement'
mode['Settlement']=Settlement
import dataSettlement from './views/ThemeCenter/dataAdministration/dataSettlement'
mode['dataSettlement']=dataSettlement
import tags from './views/ThemeCenter/configurationManagement/tags'
mode['tags']=tags
import themenRecord from './views/ThemeCenter/scheduling/Record'
mode['themenRecord']=themenRecord
import recordDetails from './views/ThemeCenter/scheduling/record_details'
mode['recordDetails']=recordDetails



Vue.use(Router)
const router = new Router({routes: []});
let wb = [
	{
		path:'/indexs',name:'indexs',component:mode['indexs'],
		children:[
			{path:'/indexs/list',name:'indexs_list',component:mode['indexs_list']},
			{path:'/indexs/message',name:'indexs_message',component:mode['indexs_message']},
		],
	}		
];	
router.addRoutes(wb);
let nb = [
    {path:'*',redirect: '/index',},
	{path:'/',name:'首页',component:Index},
    {path:'/erro',name:'cuwi',component:erro},
	{path:'/index',name:'首页',component:Index},
	{path:'/admin',name:'素材中心',component:mode['admin'],
		children:[			

			{path:'/admin/advertising',name:'广告图',component: mode['needList']},
			{path:'/admin/AD_templates',name:'广告图模板',component: mode['AD_templates']},
			{path:'/admin/wallpaper',name:'壁纸',component: mode['wallpaper']},
			{path:'/admin/dynamic',name:'动效',component: mode['dynamic']},
            {path:'/admin/MaterialResource',name:'广告图',component: mode['MaterialResource']},
            // {path:'/admin/MD5',name:'锁屏壁纸MD5库',component: mode['MD5']},

			{path:'/admin/standard',name:'设计规范库',component: mode['standard']},
			{path:'/admin/settags',name:'标签管理',component: mode['settags']},
			{path:'/admin/library',name:'投放库',component: mode['library'],},
            // {path:'/admin/journal_of_push',name:'杂志锁屏推送管理',component: mode['journal_of_push'],},
            // {path:'/admin/userControl',name:'杂志锁屏用户管理',component: mode['userControl'],},
            // {path:'/admin/journal_Administrator',name:'杂志锁屏推送管理删除',component: mode['journal_Administrator'],},
            // {path:'/admin/wb_Journal',name:'外部杂志锁屏推送管理删除',component: mode['wb_Journal'],},
			{path:'/admin/WLtemplate',name:'广告模版',component: mode['WLtemplate']},
            {path:'/admin/lockScreen',name:'广告壁纸',component: mode['lockScreen']},
            {path:'/admin/Ordinary_wallpaper',name:'普通壁纸',component: mode['Ordinary_wallpaper']},
            {path:'/admin/callShow',name:'广告壁纸',component: mode['callShow']},
			{path:'/admin/add_library',name:'添加投放库',component: mode['add_library']},
			{path:'/admin/details_library',name:'详情库',component: mode['details_library']},
			{path:'/admin/tags_details',name:'标签管理',component: mode['tags_details']},
            {path:'/admin/mangement',name:'投放库管理',component:mode['mangement']},
            {path:'/admin/Other_details',name:'详情',component:mode['Other_details']},
            


		]
	},
	{path:'/data',name:'数据中心',component:mode['data'],children:[	
		{path:'/data/Material_data',name:'物料数据',component:mode['Material_data']},
		{path:'/data/Material_related',name:'物料相关素材详情',component:mode['Material_related']},


	]},


	{path:'/workbench',name:'工作台',component:mode['workbench'],children:[
		{path:'/workbench/workbenchPadding',name:'待审核',component:mode['workbenchPadding']},
        {path:'/workbench/processed',name:'我的已处理',component:mode['processed']},
		{path:'/workbench/ALL',name:'全部',component:mode['ALL']},
        {path:'/workbench/Billing_details',name:'全部',component:mode['Billing_details']},
		{path:'/workbench/withdraw',name:'提现',component:mode['withdraw']},
        {path:'/workbench/user_details',name:'提现详情',component:mode['user_details']},
            {path:'/workbench/allocation',name:'聚合内容配置',component: mode['allocation']},
            {path:'/workbench/replace',name:'资源待替换',component: mode['replace']},
            {path:'/workbench/resource',name:'资源待替换',component: mode['resource']},
            {path:'/workbench/has_replaced',name:'资源已替换',component: mode['has_replaced']},
            {path:'/workbench/MD5',name:'锁屏壁纸MD5库',component: mode['MD5']},
            {path:'/workbench/theme',name:'官方物料投放库',component: mode['theme']},
            {path:'/workbench/theme_details',name:'官方物料投放库详情',component: mode['theme_details']},
            {path:'/workbench/theme_screen',name:'主题壁纸-标签定投',component: mode['theme_screen']},
            {path:'/workbench/ad_source',name:'广告源列表',component: mode['ad_source']},
            {path:'/workbench/ad_details',name:'广告源详情',component: mode['ad_details']},
            {path:'/workbench/ad_particulars',name:'广告源详情',component: mode['ad_particulars']},
            {path:'/workbench/ad_select',name:'广告源详情',component: mode['ad_select']},
            {path:'/workbench/ad_external_user',name:'账号管理',component: mode['ad_external_user']},
            {path:'/workbench/Jounrnal_ys',name:'杂志锁屏物料预审',component: mode['Jounrnal_ys']},
            {path:'/workbench/Journal_user',name:'杂志锁屏物料预审用户',component: mode['Journal_user']},
            {path:'/workbench/Journal_details',name:'杂志锁屏物料预审详情',component: mode['Journal_details']},
            {path:'/workbench/journal_of_push',name:'杂志锁屏推送管理',component: mode['journal_of_push'],},
            {path:'/workbench/userControl',name:'杂志锁屏用户管理',component: mode['userControl'],},
            {path:'/workbench/journal_Administrator',name:'杂志锁屏推送管理',component: mode['journal_Administrator'],},
            {path:'/workbench/journal_list',name:'杂志锁屏推送管理列表',component: mode['journal_list'],},
            {path:'/workbench/journal_nb',name:'内部杂志锁屏推送管理列表',component: mode['journal_nb'],},
            {path:'/workbench/wb_Journal',name:'外部杂志锁屏推送管理',component: mode['wb_Journal'],},
            {path:'/workbench/Offline_resources',name:'线下资源替换',component: mode['Offline_resources'],},
            {path:'/workbench/record',name:'操作记录',component: mode['record'],},
            {path:'/workbench/Offline_details',name:'线下详情',component: mode['Offline_details'],},
            {path:'/workbench/channel_resource',name:'线上审核资源替换',component: mode['channel_resource'],},
            {path:'/workbench/Channels_for_details',name:'渠道详情',component: mode['Channels_for_details'],},
            {path:'/workbench/Advertising_source_details',name:'渠道源详情',component: mode['Advertising_source_details'],},
            {path:'/workbench/Advertising_for_details',name:'广告详情',component: mode['Advertising_for_details'],},
            {path:'/workbench/External_pre_trial',name:'外部杂志锁屏推送管理',component: mode['External_pre_trial'],},
            {path:'/workbench/External_details',name:'外部杂志锁屏推送管理详情',component: mode['External_details'],},
            {path:'/workbench/Advertising_content_review',name:'广告内容审核',component: mode['Advertising_content_review'],},
            {path:'/workbench/Advertising_review',name:'广告内容审核首页',component: mode['Advertising_review'],},
            {path:'/workbench/theme_screenshots',name:'截图物料审核',component: mode['theme_screenshots'],},
            {path:'/workbench/theme_screenshots_xq',name:'截图物料审核详情',component: mode['theme_screenshots_xq'],},
            {path:'/workbench/Advertising_managing',name:'广告内容审核管理',component: mode['Advertising_managing'],},
            {path:'/workbench/projectList',name:'查看项目',component: mode['projectList'],},
            {path:'/workbench/projectStorage',name:'上传确认',component: mode['projectStorage'],},
            {path:'/workbench/projectStorage_xq',name:'上传确认详情',component: mode['projectStorage_xq'],},
            {path:'/workbench/Advertising_review_fs',name:'AI标签复审',component: mode['Advertising_review_fs'],},
            {path:'/workbench/news',name:'新闻模板',component: mode['news'],},
            {path:'/workbench/news_add',name:'新增新闻模板',component: mode['news_add'],},
            // {path:'/workbench/Push_the_management',name:'杂志锁屏推送管理',component: mode['Push_the_management'],},
            // {path:'/workbench/Push_account',name:'账号管理',component: mode['Push_account'],},
            {path:'/workbench/Audio_configuration_management',name:'内部音频配置管理',component: mode['Audio_configuration_management'],},
            
            
           
	]},
    {path:'/income',name:'收益中心',component:mode['income'],children:[
            {path:'/income/earnings',name:'收益总览',component:mode['earnings']},
            {path:'/income/project_benefit',name:'项目收益',component:mode['project_benefit']},
            {path:'/income/Advertising',name:'广告结算数据',component:mode['Advertising']}, //有结算方
            {path:'/income/AdvertisingNoSettlement',name:'广告业务结算数据',component:mode['AdvertisingNoSettlement']}, //无结算方
            {path:'/income/settlement',name:'设计师结算管理',component:mode['settlement']},
            {path:'/income/money_details',name:'收益详情',component:mode['money_details']},
            {path:'/income/cost_management',name:'设计师成本管理',component:mode['cost_management']},
            {path:'/income/divided_details',name:'分成详情',component:mode['divided_details']},
            {path:'/income/data_details',name:'分成详细数据',component:mode['data_details']},
            {path:'/income/divided_management',name:'分成管理 ',component:mode['divided_management']},
            {path:'/income/returns_detailed',name:'分成成本管理 ',component:mode['returns_detailed']},
            {path:'/income/advertiser',name:'广告主收益明细 ',component:mode['advertiser']},
            {path:'/income/Receivables/Administration',name:'收款结算 ',component:mode['Administration']},
            {path:'/income/Receivables/ReceiverManagement',name:'收款方结算 ',component:mode['ReceiverManagement']},
            {path:'/income/Receivables/ADDSettlement',name:'添加结算方',component:mode['ADDSettlement']},
            {path:'/income/Receivables/SettlementDetails',name:'结算方详情',component:mode['SettlementDetails']},
            {path:'/income/Receivables/establish',name:'新增结算',component:mode['establish']},
            {path:'/income/Receivables/establish2',name:'新增结算2',component:mode['establish2']},
            {path:'/income/Receivables/establish3',name:'新增结算3',component:mode['establish3']},
            {path:'/income/Receivables/DetailsOfCollection',name:'收益结算详情',component:mode['DetailsOfCollection']},
            {path:'/income/Receivables/DetailsOfCollection2',name:'收益结算详情2',component:mode['DetailsOfCollection2']},
            {path:'/income/Receivables/DetailsOfCollection3',name:'收益结算详情2',component:mode['DetailsOfCollection3']},
            {path:'/income/Receivables/ChangeRecord',name:'变更记录',component:mode['ChangeRecord']},
            {path:'/income/Receivables/Record',name:'变更记录',component:mode['Record']},
            {path:'/income/Receivables/DetailsSettlement',name:'结算方详情',component:mode['detailsSettlement']},
            {path:'/income/AdvanceCharge/Administration',name:'预付款管理',component:mode['Administrations']},
            {path:'/income/AdvanceCharge/YFdetails',name:'预付款详情',component:mode['YFdetails']},
            {path:'/income/AdvanceCharge/change',name:'预付款变更详情',component:mode['change']},
            {path:'/income/AdvanceCharge/ADD',name:'添加记录',component:mode['ADD']},
            {path:'/income/Receivables/PM',name:'项目管理 ',component:mode['PM']},
            {path:'/income/Receivables/cooperator',name:'合作公司管理 ',component:mode['cooperator']},
            {path:'/income/Receivables/PM_details',name:'项目管理详情 ',component:mode['PM_details']},
            {path:'/income/Receivables/Overview_of_the_contract',name:'合同概览',component:mode['Overview_of_the_contract']},
            {path:'/income/Receivables/scheduling',name:'结算进度查询',component:mode['scheduling']},
            
    
            {path:'/income/projection',name:'预计结算数据',component:mode['projection']},

            {path:'/income/payment/Administration',name:'付款结算 ',component:mode['FKAdministration']},
            {path:'/income/Payment_operation/Administration',name:'付款方结算 ',component:mode['YYAdministration']},
            {path:'/income/Payment_operation/details',name:'付款方结算详情 ',component:mode['detailYY']},
            {path:'/income/payment/ReceiverManagement',name:'付款方结算 ',component:mode['FKReceiverManagement']},
            {path:'/income/payment/ADDSettlement',name:'添加结算方',component:mode['FKADDSettlement']},
            {path:'/income/payment/SettlementDetails',name:'结算方详情',component:mode['FKSettlementDetails']},
            {path:'/income/payment/establish',name:'新增结算',component:mode['FKestablish']},
            {path:'/income/payment/establish2',name:'新增结算2',component:mode['FKestablish2']},
            {path:'/income/payment/establish3',name:'新增结算3',component:mode['FKestablish3']},
            {path:'/income/payment/DetailsOfCollection',name:'收益结算详情',component:mode['FKDetailsOfCollection']},
            {path:'/income/payment/DetailsOfCollection2',name:'收益结算详情2',component:mode['FKDetailsOfCollection2']},
            {path:'/income/payment/DetailsOfCollection3',name:'收益结算详情2',component:mode['FKDetailsOfCollection3']},
            {path:'/income/payment/ChangeRecord',name:'变更记录',component:mode['FKChangeRecord']},
            {path:'/income/payment/Record',name:'变更记录',component:mode['FKRecord']},
            {path:'/income/payment/DetailsSettlement',name:'结算方详情',component:mode['FKdetailsSettlement']},
            {path:'/income/SpecialFunds/SpecialFunds_Administration',name:'特殊款管理',component:mode['SFAdministration']},
            {path:'/income/SpecialFunds/ADDspecial',name:'特殊款管理',component:mode['ADDspecial']},
            {path:'/income/SpecialFunds/special_edit',name:'特殊款详情',component:mode['special_edit']},
            {path:'/income/SpecialFunds/AddEdit',name:'添加特殊款',component:mode['AddEdit']},
            {path:'/income/SpecialFunds/Record',name:'特殊款变更列表',component:mode['Record2']},
            {path:'/income/SpecialFunds/RecordDetailed',name:'特殊款变更列表详情',component:mode['RecordDetailed']},

            
            {path:'/income/content/theme_fk',name:'主题付款',component:mode['theme_fk']},
            {path:'/income/content/call_show',name:'来电秀付款',component:mode['call_show']},
            {path:'/income/content/theme_payment',name:'主题付款',component:mode['theme_payment']},
            {path:'/income/content/Divided',name:'分成管理',component:mode['Divided']},
            {path:'/income/content/exports',name:'导入数据',component:mode['exports']},
            {path:'/income/content/Divided_details',name:'分成详情',component:mode['Divided_details']},
            {path:'/income/content/Divided_details_money',name:'分成金额详情',component:mode['Divided_details_money']},
            {path:'/income/content/datas_details',name:'金额详情',component:mode['datas_details']},
            {path:'/income/content/Other_payment',name:'其他付款',component:mode['Other_payment']},
            {path:'/income/content/Advance_management',name:'预付金管理',component:mode['Advance_management']},
            {path:'/income/content/Advance_details',name:'预付金管理详情',component:mode['Advance_details']},
            {path:'/income/content/payee',name:'收款',component:mode['payee']},
            {path:'/income/content/payee_details',name:'收款详情',component:mode['payee_details']},
            {path:'/income/content/import_data',name:'收款导入',component:mode['import_data']},
            {path:'/income/content/Material_payment',name:'素材付款',component:mode['Material_payment']},
            {path:'/income/content/money_detail',name:'金额详情',component:mode['money_detail']},
            {path:'/income/content/money_details_divide',name:'分成金额详情',component:mode['money_details_divide']},
            {path:'/income/content/Divided_into_management',name:'分成管理',component:mode['Divided_into_management']},
            {path:'/income/content/Divided_into_management_details',name:'分成详情',component:mode['Divided_into_management_details']},
            {path:'/income/content/price',name:'价格管理',component:mode['price']},
            {path:'/income/content/AmendantRecord',name:'修改记录',component:mode['AmendantRecord']},
            {path:'/income/content/AmendantRecordDetails',name:'修改记录详情',component:mode['AmendantRecordDetails']},
            {path:'/income/content/data_manage',name:'数据管理',component:mode['data_manage']},
            {path:'/income/content/cz_record',name:'操作记录',component:mode['cz_record']},
            {path:'/income/content/Designer_settlement',name:'设计师结算',component:mode['Designer_settlement']},
            {path:'/income/content/Designer_ADD',name:'设计师结算',component:mode['Designer_ADD']},
            {path:'/income/content/Designer_record',name:'操作记录',component:mode['Designer_record']},
            {path:'/income/content/Operation_details',name:'操作记录详情',component:mode['Operation_details']},
            {path:'/income/content/look_details',name:'查看详情',component:mode['look_details']},
            {path:'/income/content/theme_payee',name:'主题收款',component:mode['theme_payee']},
            {path:'/income/content/callShow_payee',name:'来电秀收款',component:mode['callShow_payee']},




        ]},
    {path:'/userinfo',name:'个人中心',component:mode['info'],
		children:[
            {path:'/userinfo/user_info',name:'基本信息',component:mode['userinfo']},
            {path:'/userinfo/passWord',name:'修改密码',component:mode['passWord']},
            {path:'/userinfo/message',name:'消息通知',component:mode['message']},
            {path:'/userinfo/messageDetails',name:'消息通知详情',component:mode['messageDetails']},
            {path:'/userinfo/user_info',name:'退出',component:mode['userinfo']},
            {path:'/userinfo/MyPerm',name:'修改密码',component:mode['MyPerm']},
            {path:'/userinfo/account',name:'账号管理',component:mode['account']},
            {path:'/userinfo/roleManagement',name:'角色管理',component:mode['roleManagement']},
            {path:'/userinfo/AddRole',name:'添加角色',component:mode['AddRole']},
            {path:'/userinfo/AccounAudit',name:'账户审核',component:mode['AccounAudit']},
            {path:'/userinfo/feedback',name:'意见反馈',component:mode['feedback']},
            {path:'/userinfo/Details',name:'反馈详情',component:mode['Details']},
            {path:'/userinfo/quantuty',name:'账号数量',component:mode['quantuty']},
            {path:'/userinfo/Process',name:'流程管理',component:mode['Process']},
        ]
	},
    {path:'/ThemeCenter',name:'主题中心',component:mode['ThemeCenter'],children:[
            {path:'/ThemeCenter/themeCook',name:'主题库',component:mode['themeCook']},
            {path:'/ThemeCenter/PackageDetails',name:'打包件详情',component:mode['PackageDetails']},
            {path:'/ThemeCenter/themeUp',name:'上传主题',component:mode['themeUp']},
            {path:'/ThemeCenter/themeDetails',name:'主题详情',component:mode['themeDetails']},
			{path:'/ThemeCenter/themeLock',name:'锁屏',component:mode['themeLock']},
            {path:'/ThemeCenter/themelock_up',name:'锁屏上传',component:mode['themelock_up']},
            {path:'/ThemeCenter/theme_icon',name:'图标',component:mode['theme_icon']},
            {path:'/ThemeCenter/theme_two',name:'二级页面',component:mode['theme_two']},
            {path:'/ThemeCenter/themeSc_details',name:'主题素材详情',component:mode['themeSc_details']},
            {path:'/ThemeCenter/sheleRecord',name:'添加上架记录',component:mode['sheleRecord']},
            {path:'/ThemeCenter/pack/packList',name:'打包件',component:mode['packList']},
            {path:'/ThemeCenter/pack/upPack',name:'上传打包件',component:mode['upPack']},
            {path:'/ThemeCenter/pack/pack_icon',name:'图标打包件',component:mode['pack_icon']},
            {path:'/ThemeCenter/pack/pack_two',name:'二级界面打包件',component:mode['pack_two']},
            {path:'/ThemeCenter/pack/pack_details',name:'打包件详情',component:mode['pack_details']},
            {path:'/ThemeCenter/propaganda_img',name:'宣传图',component:mode['propaganda_img']},
            {path:'/ThemeCenter/propaganda_details',name:'宣传图详情',component:mode['propaganda_details']},
            {path:'/ThemeCenter/scheduling/Scheduling_management',name:'排期',component:mode['Scheduling_management']},
            {path:'/ThemeCenter/themeDetailsQd',name:'主题渠道详情',component:mode['themeDetailsQd']},
            {path:'/ThemeCenter/scheduling/details',name:'详情',component:mode['details']},
            {path:'/ThemeCenter/scheduling/xqDetails',name:'详情',component:mode['xqDetails']},
            {path:'/ThemeCenter/scheduling/select_theme',name:'选择主题',component:mode['select_theme']},
            {path:'/ThemeCenter/scheduling/select_theme_two',name:'选择主题2',component:mode['select_theme_two']},
            {path:'/ThemeCenter/scheduling/Record',name:'变更详情',component:mode['themenRecord']},
            {path:'/ThemeCenter/scheduling/record_details',name:'变更详情2',component:mode['recordDetails']},
            {path:'/ThemeCenter/data/AllData',name:'全景数据',component:mode['AllData']},
            {path:'/ThemeCenter/data/ranking',name:'排行',component:mode['ranking']},
            {path:'/ThemeCenter/data/Profit',name:'收益',component:mode['Profit']},
            {path:'/ThemeCenter/dataAdministration/Settlement',name:'结算数据管理',component:mode['Settlement']},
            {path:'/ThemeCenter/dataAdministration/dataSettlement',name:'日报收益管理',component:mode['dataSettlement']},
            {path:'/ThemeCenter/configurationManagement/tags',name:'管理标签',component:mode['tags']},
        ]},

];
router.addRoutes(nb);
/*动态生成左边菜单*/

let leftNav =
localStorage.getItem('letNav');
// 	[
// 	{title:'素材中心',default:'/admin',defaultopen:['1'],
// 	children:[
// 		{title:'素材库',url:'1', img:'&#xe615;',list:[
// 			{title:'广告图',url:'/admin/advertising'},
// 			{title:'广告模板',url:'/admin/AD_templates'}],
// 			children:[
// 			{title:'杂志锁屏',url:'1-3',list:[
//                  {title:'动效',url:'/admin/dynamic'},
//                  {title:'壁纸',url:'/admin/wallpaper'},
//                     ]},
// 			]},

// 		{title:'物料库',url:'3',img:'&#xe617;',list:[
// 			{title:'广告图',url:'/admin/MaterialResource'},
// 			{title:'广告模版',url:'/admin/WLtemplate'},
//             {title:'来电秀',url:'/admin/callShow'}
//         ],
//             children:[
//                 {title:'杂志锁屏',url:'3-3',list:[
//                      {title:'广告壁纸',url:'/admin/lockScreen'},
//                      {title:'普通壁纸',url:'/admin/Ordinary_wallpaper'},
//                         ]},
//                 ]},
// 		{title:'配制管理',url:'4',img:'&#xe60e;',list:[
// 			{title:'设计规范库',url:'/admin/standard'},
// 			{title:'标签管理',url:'/admin/settags'},
// 			// {title:'外部帐号管理',url:'/admin/external'},
// 		]},
// 		{title:'投放库',url:'5',img:'&#xe60e;',list:[
// 				{title:'投放库',url:'/admin/library'},
//                 // {title:'杂志锁屏推送管理',url:'/admin/journal_of_push'},
//                 // {title:'杂志锁屏推送管理',url:'/admin/wb_Journal'}

// 			]}
// 	]},
// 	{title:'工作台',default:'/workbench',defaultopen:['1'],
//         children:[
//             {title:'任务中心',url:'1',img:'&#xe610;',list:[
//                     {title:'待处理',url:'/workbench/workbenchPadding'},
//                     {title:'我的已处理',url:'/workbench/processed'},
//                     {title:'全部',url:'/workbench/ALL'},
// 					],},
//             {title:'运营工具',url:'2',img:'&#xe610;',list:[
//                     {title:'锁屏壁纸MD5库',url:'/workbench/MD5'},
//                     {title:'聚合内容配置',url:'/workbench/allocation'},
//                     {title:'资源待替换',url:'/workbench/replace'},
// 					{title:'官方物料投放库',url:'/workbench/theme'},
//                     {title:'主题壁纸-标签定投',url:'/workbench/theme_screen'},
//                     {title:'物料预审管理',url:'/workbench/ad_source'},
//                     {title:'杂志锁屏物料预审',url:'/workbench/Jounrnal_ys'},
//                     {title:'杂志锁屏推送管理',url:'/workbench/journal_list'},
//                     {title:'线下资源替换',url:'/workbench/Offline_resources'},
//                     {title:'线上审核资源替换',url:'/workbench/channel_resource'},
//                     {title:'杂志锁屏物料预审',url:'/workbench/External_pre_trial'},
//                     {title:'广告内容审核',url:'/workbench/Advertising_review'},
//                     {title:'TX新闻模板管理',url:'/workbench/news'},
//                     ],
//             },

//         ]
// 	},
// 	{title:'数据中心',default:'/data',defaultopen:['1'],
// 	children:[
//         {title:'素材数据',url:'1',img:'&#xe60b;',list:[
//                 {title:'物料数据', url:'/data/Material_data'},
// 			]}
//         ]
// },
//     {title:'个人中心',default:'/userinfo/user_info',defaultopen:['1'],
//         children:[
//             {title:'个人中心',url:'1',img:'&#xe60b;',list:[
//             {title:'基本信息', url:'/userinfo/user_info'},
//             {title:'修改密码', url:'/userinfo/passWord'},
//             {title:'消息通知', url:'/userinfo/message'},
//                 ]},
// 			{title:'账号权限',url:'1-2',img:'&#xe619;',list:[
// 			{title:'我的权限',url:'/userinfo/MyPerm'},
//             {title:'账号管理',url:'/userinfo/account'},
//             {title:'角色管理',url:'/userinfo/roleManagement'},
//             {title:'账号审核',url:'/userinfo/AccounAudit'},
// 			{title:'流程管理',url:'/userinfo/Process'},
//                 ]},
// 			{title:'意见反馈',url:"1-3",img:'&#xe618;',list:[
// 			{title:'意见反馈',url:'/userinfo/feedback'}
// 				]}
//         ]
// 	},
//     {title:'收益中心',default:'/income',defaultopen:['1'],
//         children:[
//             {title:'收益数据',url:'1',img:'&#xe612;',list:[
//                 {title:'收益总览',url:'/income/earnings'},
//                 {title:'项目收益',url:'/income/project_benefit'},
// 				{title:'渠道收益',url:'/income/returns_detailed'},
//                 {title:'广告主收益',url:'/income/advertiser'},
//                 {title:'广告结算数据',url:'/income/Advertising'},
//                 {title:'广告业务结算数据',url:'/income/AdvertisingNoSettlement'}
//             ]},
//             {title:'收益管理',url:'2',img:'&#xe611;',list:[
//                     {title:'设计师成本管理',url:'/income/cost_management'}
//                 ]},
//             {title:'结算管理',url:'3',img:'&#xe60d;',list:[      
//                 ],
//             children:[
//                 {title:"广告业务",url:"3-1",list:[
//                     {title:'设计师结算管理',url:'/income/settlement'},
// 					{title:'收款结算',url:'/income/Receivables/Administration'},
//                     {title:'付款结算',url:'/income/payment/Administration'},
//                     {title:'广告业务付款结算',url:'/income/Payment_operation/Administration'},
//                     {title:'预付款管理',url:'/income/AdvanceCharge/Administration'},
//                     {title:'特殊款管理',url:'/income/SpecialFunds/SpecialFunds_Administration'},
//                 ]},
//                 {title:"内容业务",url:"3-2",list:[
//                     {title:'预付金管理',url:'/income/content/Advance_management'},
//                     {title:'主题付款',url:'/income/content/theme_fk'},
//                     {title:'主题收款',url:'/income/content/theme_payee'},
//                     {title:'来电秀收款',url:'/income/content/callShow_payee'},
//                     {title:'来电秀付款',url:'/income/content/call_show'},
//                     {title:'其他付款',url:'/income/content/Other_payment'},
//                     {title:'素材付款',url:'/income/content/Material_payment'},
//                     {title:'设计师结算',url:'/income/content/Designer_settlement'},                 
//                 ]}
//             ]
//         },


//         ]
//         },


//         {title:'主题中心',default:'/ThemeCenter',defaultopen:['1'],
//             children:[
//                 {title:'数据中心',url:'1',img:'&#xe614;',list:[
//                         {title:'全景数据',url:'/ThemeCenter/data/AllData'},
//                         {title:'收益数据',url:'/ThemeCenter/data/Profit'},
//                         {title:'排名数据',url:'/ThemeCenter/data/ranking'},
//                     ]},
//                 {title:'主题库',url:'2',img:'&#xe625;',list:[
//                         {title:'主题库',url:'/ThemeCenter/themeCook'},
//                     ]},

//                 {title:'主题素材库',url:'3',img:'&#xe626;',list:[
//                         {title:'锁屏',url:'/ThemeCenter/themeLock'},
//                         {title:'图标',url:'/ThemeCenter/theme_icon'},
//                         {title:'二级页面',url:'/ThemeCenter/theme_two'},
//                         {title:'宣传图',url:'/ThemeCenter/propaganda_img'},
//                     ]},
//                 {title:'打包件库',url:'4',img:'&#xe621;',list:[
//                         {title:'锁屏',url:'/ThemeCenter/pack/packList'},
//                         {title:'图标',url:'/ThemeCenter/pack/pack_icon'},
//                         {title:'二级页面',url:'/ThemeCenter/pack/pack_two'},
//                     ]},
//                 {title:'运营管理',url:'5',img:'&#xe627;',list:[
//                         {title:'排期管理',url:'/ThemeCenter/scheduling/Scheduling_management'},
//                     ],
//                     children:[
//                         {title:'数据管理',url:'5-2',list:[
//                                 {title:'结算数据管理',url:'/ThemeCenter/dataAdministration/Settlement'},
//                                 {title:'日报数据管理',url:'/ThemeCenter/dataAdministration/dataSettlement'},
//                             ]},
//                     ]
// 				},
//                 {title:'配置管理',url:'6',img:'&#xe622;',list:[
//                         {title:'标签管理',url:'/ThemeCenter/configurationManagement/tags'}
//                     ]},
//             ]
//         },
// ];

// localStorage.setItem('letNav',JSON.stringify(leftNav));
import utils from './api/Utils';
router.beforeEach((to, from, next) => {
	/*登录过期*/
	// console.log(window.location.href.split('#').slice(1));
	// const Nav = localStorage.getItem('letNav')
	// if(Nav){
	// 	for(var i=0;i<Nav.length;i++){
	// 		if(Nav[i].children.length!=0){
	// 			for(var j=0;j<Nav[i].children.length;j++){
	// 				if(Nav[i].children[i]==window.location.href.split('#').slice(1)){
    //
	// 				}
	// 			}
	// 		}
	// 	}
    // }
    
    let tonek = localStorage.getItem('token');
	if(+localStorage.getItem('logintime')+(24*60*60*1000)<=Date.parse(new Date())){
		localStorage.setItem("token","");
		tonek=false;
	}	
	if(tonek) {// 判断是否登录
		if(localStorage.getItem('status')==0){
			if(to.fullPath!='/erro'){
				next({ path: '/erro'});				
				return
			}
			next();	
			return
		}
		if(localStorage.getItem('role')==1){
			if(localStorage.getItem('letNav')){
                // if(to.fullPath.substring(0,7)!='/admin/'){
                //     next({ path: '/admin/wb_Journal'});
                //     return;
                // }
                // if(to.fullPath.substring(0,11)!='/workbench/'){
                //     next({ path: '/workbench/ad_source'});
                //     return;
                // }
			}
			next();
			return;
		}
		if(to.fullPath=='/'){
			next({ path: '/index'});
			return
		}
        if(to.fullPath=='/index'){
            document.title = '掌屿平台(Zoosalos)-聚合，连接，生态';
		}
        if(to.fullPath=='/data'){
            document.title = '数据中心-掌屿平台(Zoosalos)';
		}
        if(to.fullPath=='/income'){
            document.title = '收益中心-掌屿平台(Zoosalos)';
        }
		if(to.fullPath=='/admin'){
			if(JSON.parse(localStorage.getItem('letNav'))[0].children.length>0){
                next({ path: '/admin/advertising'});
                document.title = '素材中心-掌屿平台(Zoosalos)';
			}
		}
		if(to.fullPath=='/user'){
			if(JSON.parse(localStorage.getItem('letNav'))[1].children.length>0){
                next({ path: '/user/user_need'});
                document.title = '个人中心-掌屿平台(Zoosalos)';
			}
		}
        if(to.fullPath=='/userinfo'){
            // next({ path: '/userinfo/user_info'});
            document.title = '个人中心-掌屿平台(Zoosalos)';
        }
        if (to.fullPath=='/api/logout'){
            next({ path: '/erro'});
		}
        if(to.fullPath=='/indexs'){
			next({ path: '/indexs/list'});
		}
        if(to.fullPath=='/workbench'){
            // next({ path: '/workbench/workbenchPadding'});
            document.title = '工作台-掌屿平台(Zoosalos)';
        }
        if(to.fullPath=='/ThemeCenter'){
            document.title = '主题中心-掌屿平台(Zoosalos)';
        }
						
		// let params ={'url':to.fullPath.split('&')[0]} ;
		// if(to.fullPath!='index'){
		// 	 api.create_menu(params);
		// }
		next();
		return
    }
	
	let cent = 'center',
    urld = 'https://c.zookingsoft.com/api/login',
    accountUrl = "http://account.zookingsoft.com/login?from=";

	if(window.location.host=='ts-centerweb.idatachain.cn'){
		cent = 'center_dev';
        urld ='http://ts-i.idatachain.cn/api/login';
        accountUrl = "http://ts-account.idatachain.cn/login?from=";
	}
    if(window.location.host=='c2.zookingsoft.com'){
        cent = 'center_dev2';
        urld ='https://c2.zookingsoft.com/api/login';
        accountUrl = "http://account.zookingsoft.com/login?from=";
    }
	if(window.location.host=='localhost:8080'){
		cent = 'center_local';
		urld ='http://ts-i.idatachain.cn/api/login';
        accountUrl = "http://ts-account.idatachain.cn/login?from=";
    }

    let suuid  = utils.uuid(16, 32);
	if(to.query.ticket){	
        if(!localStorage.getItem('uuid')){
            localStorage.setItem('uuid', suuid);
            window.location.href= accountUrl + cent;
            return;
        }
        
		axios({
			method: 'post',
			timeout: 10000,
			url: urld,
			data:{ticket:to.query.ticket, uuid:suuid}
		}).then((msg)=>{
            console.log(msg);
            localStorage.setItem('token',msg.data.data.token);
            localStorage.setItem('logintime',Date.parse(new Date()));
            localStorage.setItem('userAd',msg.data.data.user.email);
            localStorage.setItem('userType',msg.data.data.user.type);
            localStorage.setItem('userName',msg.data.data.user.name);
            localStorage.setItem('status',msg.data.data.user.status);
            if(msg.data.data.role.length != '0'){
                localStorage.setItem('role',msg.data.data.role[0].type);
                localStorage.setItem('icon',msg.data.data.role[0].icon); 
            }
            if(msg.data.data.user.type=='1'){
                next({ path: '/admin/wb_Journal'});
                return;
            }
            if(msg.data.data.user.status=='0'){
                // alert("没有权限，请联系管理员添加角色或启用账号");
                next({ path: '/erro'});
                return;
            }
            api.account_apply_status().then((datas)=>{					
                if(datas.status != 3){
                    next({ path: '/erro'});
                    return
                }
                next({ path: '/index'});
            })
            next({ path: '/index'});
		}).catch(()=>{
            alert("账户异常，请联系管理员添加角色或启用账号");
            // window.location.href=accountUrl + cent;
		});
			
	}else{
        localStorage.setItem('uuid', suuid);
		window.location.href= accountUrl + cent;
	}
})
export default router
