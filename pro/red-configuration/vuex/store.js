import Vue from 'vue'
import Vuex from '../../../src'
import middlewares from './middlewares'

Vue.use(Vuex)

const state = {
   modalShow : false,
   modalTitle:'',
   editShow : false,
   storeShow : false,
   deletShow : false,
   openOrShow : '',
   itemInfo : {
      id:'',
      state:''
   },
   modalType:[
      {type:'0',text:'修改配置'},
      {type:'1',text:'提示'},
      {type:'2',text:'编辑规则'},
      {type:'3',text:'新增规则'},
      {type:'4',text:'指定门店'},
   ]
}

const mutations = {
   MODAL_SHOW(state,type){
      state.modalShow = !state.modalShow;
      if (type===undefined) {
         state.modalTitle == '';
      }else{
         state.modalTitle = state.modalType[type].text;
      }
   },
   ADD_RULES(state,uid){
      console.log(uid)
      if(uid === undefined){
         state.modalTitle = state.modalType[3].text;
         state.editShow = !state.editShow;
      }else{
         state.modalTitle = state.modalType[2].text;
         state.editShow = !state.editShow;
      }
   },
   STORE_MODAL(state){
      state.storeShow = !state.storeShow;
      state.modalTitle = state.modalType[4].text;
   },
   DELETE_ITEM(state,uid,t){
      if(t === 0){
         state.openOrShow = '停用'
      }
      if(t === 1){
         state.openOrShow = '启用'
      }
      state.itemInfo.id=uid;
      state.itemInfo.state=t;
      console.log(state.itemInfo)
      state.modalTitle = state.modalType[1].text;
      state.deletShow = !state.deletShow;
   }
}

export default new Vuex.Store({
   state,
   mutations,
   middlewares
})
