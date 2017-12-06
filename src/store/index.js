import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const ADDR = "ADDR";
export const ADDRFLAG = "ADDRFLAG";
export const CONFIRMFLAG = "CONFIRMFLAG";
export const LOADINGFLAG = "LOADINGFLAG";
export const ADDCARTFLAG = "ADDCARTFLAG";
const store = new Vuex.Store({
	state:{
		loadingFlag:false,    //加载标志
		addrFlag:false,       //地址标志
		confirmFlag:false,    //提交标志
		addCartFlag:false,    //加入购物车标志
		addr:'',              //地点(省)
		shopCart:JSON.parse(localStorage.getItem("cart")) || {},   //购物车列表(id跟数量)
		loginInfo:JSON.parse(localStorage.getItem("person")) || {}   
	},
	mutations:{
		[ADDR](state,data){
			state.addr = data;
		},
		[ADDRFLAG](state,data){
			state.addrFlag = data;
		},
		[ADDCARTFLAG](state,data){
			state.addCartFlag = data;
		},
		[CONFIRMFLAG](state,data){
			state.confirmFlag = data;
		}
	},
	actions:{
		[ADDR]({commit},data){
			commit(ADDR,data);
		},
		[ADDRFLAG]({commit},data){
			commit(ADDRFLAG,data);
		},
		[ADDCARTFLAG]({commit},data){
			commit(ADDCARTFLAG,data);
		},
		[CONFIRMFLAG]({commit},data){
			commit(CONFIRMFLAG,data);
		}
	}
})
export default store
