import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		alen:555,
		is_login:false
	},
	getters:{
		
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'dsshopUserInfo',  
			    data: provider  
			}) 
			// console.log(state.userInfo);
		},
		changeAlen(state,key){
			state.alen=key
		},
		logout(state) {
			uni.removeStorageSync('dsshopApplytoken')
			uni.removeStorageSync('applyDsshopSession_key')
			uni.removeStorageSync('applyDsshopOpenid')
			uni.removeStorageSync('dsshopUserInfo')
			uni.removeStorageSync('dsshopCartList')
			state.hasLogin = false;
			state.userInfo = {};
		},
		// 登录验证
		loginCheck(state){
			if(!state.hasLogin){
				uni.showToast({
					title:'请授权和登录',
					icon:'none',
					success:(res)=>{
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pageA/login/login'
							}) 
						},1500)
					}
				})
				
			}
		}
	},
	actions: {
	
	}
})

export default store
