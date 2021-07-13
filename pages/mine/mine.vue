<template>
	<view>
		<view class="top">
			 <view class="user_info">
			      <view class="left">
			        <view class="icon">
			          <image :src="portrait"></image>
			        </view>
			        <view class="info">
			          <view class="nameAndVip">
			            <text class="name">{{phone}}</text>
			          </view>
			          <view class="invited_code">
						<text class="yticon icon-renzheng"></text>
						<text style="font-size: 25rpx;color:red;">{{user_text}}</text>
			          </view>
			        </view>
			      </view>
		<!-- 	      <view class="user_right">
			        <text style="padding-right:15rpx;">编辑资料</text>
					<view class="user_right_icon">
						<text class="yticon icon-youjiantou_huaban"></text>
					</view>
			      </view> -->
			    </view>
		</view>
		<view class="bottom">
			<view class="bottom_list" @click="shimin">实名认证({{shimin_text}})</view>
			<view class="bottom_list" @click="wuliu">物流认证({{driver_text}})</view>
			<view class="bottom_list" @click="huozhu">货主认证({{cargo_text}})</view>
			<button class="bottom_list2" open-type="contact">联系客服</button>
		</view>
	</view>
</template>

<script>
	import qr_code from '../../api/qrcode'
	import UserInfo from '../../api/user_info'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				phone:'',
				nickname:'',
				portrait:'',
				shimin_text:'',
				user_text:'',
				driver_text:'',
				cargo_text:''
			}
		},
		onLoad(){
			// console.log(uni.getStorageSync('portrait'))
			
			this.getCode()
			

		},
		onShow(){		
			console.log(this.$store.state.alen)
			this.loginCheck()
			this.getUserInfo()
			
		},
		computed:{
			// phone(){
			// 	this.phone=uni.getStorageSync('cellphone')
			// 	let index=String(this.phone).substring(3,7)
			// 	let replace=String(this.phone).replace(index,"****")
			// 	return replace
			// }
		},
		methods: {
			...mapMutations(['loginCheck']),
			getCode(){
				return new Promise((resolve,reject)=>{
					// console.log(555)
					qr_code.getCode({
						path:'/pages/index/index'
					},function(res){
						console.log(res)
						uni.setStorageSync('qrcode',res.path)
						resolve(res)
					})
				})
			
			},
			shimin(){
				uni.navigateTo({
					url:'/pageA/shimin/shimin'
				})
			},
			watch(){
		
			},
			getUserInfo(){
				var that=this
				UserInfo.getList({},function(res){
					uni.setStorageSync('nickname',res.nickname)
					
					uni.setStorageSync('portrait',res.portrait)
					console.log(uni.getStorageSync('portrait'))
					that.nickname=uni.getStorageSync('nickname')
					that.portrait=uni.getStorageSync('portrait')
					let phone=uni.getStorageSync('cellphone')
					let index=String(phone).substring(3,7)
					let replace=String(phone).replace(index,"****")
					that.phone=replace
					if(res.userinformation==null){
						that.shimin_text='未实名'
						uni.setStorageSync('is_shimin',0)
					}else if(res.userinformation && res.userinformation.idcardcheck==0){
						that.shimin_text='审核中'
						uni.setStorageSync('is_shimin',2)
					}else if( res.userinformation && res.userinformation.idcardcheck==1){
						that.shimin_text='审核通过'
						uni.setStorageSync('is_shimin',1)
					}else{
						that.shimin_text='审核不通过'
						uni.setStorageSync('is_shimin',3)
					}
					
					if(res.userinformation && res.userinformation.drivingcheck==0 && res.userinformation.driving_number!=null){
						that.driver_text='审核中'
						uni.setStorageSync('driver',0)
					
					}else if(res.userinformation && res.userinformation.drivingcheck==1){
						that.driver_text='审核通过'
						uni.setStorageSync('driver',1)
					}else if(res.userinformation && res.userinformation.drivingcheck==2){
						that.driver_text='审核不通过'
						uni.setStorageSync('driver',2)
					}else{
						that.driver_text='未认证'
						uni.setStorageSync('driver',3)
					}
					
					if(res.userinformation && res.userinformation.cargocheck==0 && res.userinformation.business_license!=null){
						that.cargo_text='审核中'
						uni.setStorageSync('cargo',0)
					
					}else if(res.userinformation && res.userinformation.cargocheck==1){
						that.cargo_text='审核通过'
						uni.setStorageSync('cargo',1)
					}else if(res.userinformation && res.userinformation.cargocheck==2){
						that.cargo_text='审核不通过'
						uni.setStorageSync('cargo',2)
					}else{
						that.cargo_text='未认证'
						uni.setStorageSync('cargo',3)
					}
					
					if(res.type==null){
						that.user_text='普通用户'
					}else if(res.type==1){
						that.user_text='司机'
					}else if(res.type==2){
						that.user_text='货主'
					}
					console.log(that.user_text)
				})
			},
			wuliu(){
				let is_shimin=uni.getStorageSync("is_shimin")
				if(is_shimin==0){
					uni.showToast({
						title:'请先实名',
						icon:'none',
						success:(res)=>{
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pageA/shimin/shimin'
								},2000)
							})
						}
					})
				}else if(is_shimin==2){
					this.$api.msg('实名审核中')
				}else if(is_shimin==3){
					this.$api.msg('实名不通过')
				}else{
					uni.navigateTo({
						url:'/pageA/jiazhao_info/jiazhao_info'
					})
				}
		
			},
			huozhu(){
				let is_shimin=uni.getStorageSync("is_shimin")
				if(is_shimin==0){
					uni.showToast({
						title:'请先实名',
						icon:'none',
						success:(res)=>{
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pageA/shimin/shimin'
								},2000)
							})
						}
					})
				}else if(is_shimin==2){
					this.$api.msg('实名审核中')
				}else if(is_shimin==3){
					this.$api.msg('实名不通过')
				}else{
					uni.navigateTo({
						url:'/pageA/qiye_renzheng/qiye_renzheng'
					})
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.top{
		background-color: #44CC69;
	}
.user_info{
  padding: 30rpx 8%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left{
  display: flex;
  flex-direction: row;
}
.icon{
  width: 110rpx;
  height: 110rpx;
}
.icon image{
  width: 100%;
  height: 100%;
  border-radius: 50%;

}
.info{
  padding-left: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nameAndVip{
  display: flex;
  flex-direction: row;
}
.name{
  font-size: 30rpx;
  font-weight: bold;
  color: white;
}
.vip{
  padding-left: 30rpx;
  
}
.suggest{
  font-size: 20rpx;
  color: white;
  margin-top: 30rpx;
}
.vip text{
  padding: 2rpx 15rpx;
  color: white;
  font-size: 17rpx;
  border-radius: 15rpx;
  border: 1px solid white;
}
.invited_code{
  margin-top: 20rpx;
  display: flex;
  padding: 10rpx 30rpx;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border-radius: 40rpx;
}
.user_right{
	color: white;
	display: flex;
	height: 40rpx;
	flex-direction: row;
	align-items: center;
	.user_right_icon{
		border-radius: 50%;
		width: 35rpx;
		height: 35rpx;
		
		border: 1px solid white;
	}
}
.invited_l{
  font-size: 20rpx;
  color:white;
}
.invited_r{
  font-size: 21rpx;
  color:white;
}
.bottom{
	.bottom_list{
		background-color: #fff;
		padding:35rpx 65rpx;
		font-weight: bold;
		font-size: 28rpx;
		border-bottom: 2px solid rgb(235,235,235);
	}
	.bottom_list2{
		background-color: #fff;
		/* padding:35rpx 65rpx; */
		font-weight: bold;
		height: 100rpx;
		padding-left: 65rpx;
		line-height: 100rpx;
		text-align: left;
		font-size: 28rpx;
		border-bottom: 2px solid rgb(235,235,235);
	}
	
}
</style>
