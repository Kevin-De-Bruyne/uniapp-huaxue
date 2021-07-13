<template>
	<view class="login">
		<view class="whole">
			<view class="logo">
				<image src="../../static/hx_logo.png"></image>
			</view>
			<view class="center">
				<text class="center_t">华雪云链平台</text>
				<text class="center_b">一家为农业服务的平台</text>
			</view>
			<view class="bottom">
				<button v-if="type==0" class="shouquan_phone" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">手机号登录</button>
				<button v-if="type==1" class="shouquan_wx" @click="getUserInfo">微信登录</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import UserInfo from '../../api/user_info'
	import Login from '../../api/login'
	import { getPlatform,getLogin } from '../../utils'
	import {  
	    mapMutations,mapState
	} from 'vuex';
	export default {
		data() {
			return {
				modalName:'',
				type:''
			}
		},
		computed:{
			...mapState(['is_login'])
		},
		onLoad(options){
			let cellphone=uni.getStorageSync('cellphone')
			if(cellphone==''){
				this.type=0
			}else{
				this.type=1
			}
		},
		methods: {
			...mapMutations(['login']),
			//授权登录
			decryptPhoneNumber(e){
				getLogin()
							  this.modalName = ''
							  const that = this
							  if(e.detail.iv){
								  Login.authorization({
									iv: e.detail.iv,
									encryptedData: e.detail.encryptedData,
									session_key: uni.getStorageSync('applyDsshopSession_key'),
									platform: getPlatform()
								  },function(res){
									uni.setStorageSync('dsshopApplytoken', res.api_token)
									uni.setStorageSync('cellphone', res.cellphone)
									// that.login(res)
									that.$store.state.is_login=true
									// this.state.hasLogin=true
									// that.$api.msg(`登录成功`)
									uni.showToast({
										title:'登录成功',
										icon:'none',
										success:(res)=>{
											setTimeout(()=>{
												uni.navigateBack()
											},800)
										}
									})
									that.show2=true
								  })
							  }else{
								  that.$api.msg(`您选择了拒绝授权，无法完成登录`)
							  }
							  
			},
			getUserInfo(){
				const that=this
				  wx.getUserProfile({
				       desc:'正在获取',//不写不弹提示框
				        success:function(res){
				          console.log('获取成功: ',res)
						  UserInfo.user_post({
							   portrait:res.userInfo.avatarUrl,
							   nickname:res.userInfo.nickName
						  },function(res){
							  that.login(res)
							  uni.switchTab({
							  	url:'/pages/mine/mine'
							  })
						  })
						
				      },
				       fail:function(err){
				         console.log("获取失败: ",err)
				       }
				    })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		width: 100%;
		// background-color: red;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		.whole{
			display: flex;
			margin-top: -40%;
			flex-direction: column;	
			align-items: center;
			.logo{
				border-radius: 50%;
				border:1px solid rgb(203,203,203);
				width: 250rpx;
				height: 250rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.center{
				display: flex;
				flex-direction: column;
				text-align: center;
				.center_t{
					font-weight: bold;
					font-size: 32rpx;
					margin-top: 50rpx;
				}
				.center_b{
					// font-weight: bold;
					font-size: 25rpx;
					margin-top: 40rpx;
				}
			}
			.bottom{
				display: flex;
				flex-direction: row;
				width: 100%;
				margin-top: 60rpx;
				button{
					padding: 0;
				}
				.shouquan_phone{
					// padding: 20rpx 80rpx;
					background-color: rgb(250,79,81);
					color: white;
					width: 280rpx;
					font-size: 26rpx;
					border-radius: 40rpx;
					margin-right: 30rpx;
				}
				.shouquan_wx{
					// padding: 20rpx 80rpx;
					background-color: rgb(108,174,12);
					color: white;
					width: 250rpx;
					font-size: 26rpx;
					border-radius: 40rpx;
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
