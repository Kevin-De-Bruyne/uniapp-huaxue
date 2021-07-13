<template>
	<view>
		<view class="top" :style="{backgroundImage:'url('+bgcImage1+')'}" @click="fabuhuoyuan">
			<view class="huos">
				<text class="huo">发布货运信息</text>
				<text class="huozhu">货主发布货源信息</text>
			</view>
		
		</view>
		<view class="top" :style="{backgroundImage:'url('+bgcImage2+')'}" @click="fabuLenglian">
			<view class="huos">
				<text class="huo">发布供车信息</text>
				<text class="huozhu">物流公司发布供车信息</text>
			</view>
		
		</view>
		<view class="top" :style="{backgroundImage:'url('+bgcImage3+')'}" @click="fabuL">
			<view class="huos">
				<text class="huo">发布冷库信息</text>
				<text class="huozhu">冷库公司发布冷库信息</text>
			</view>
		
		</view>
	</view>
</template>

<script>
	import UserInfo from '../../api/user_info'
	export default {
		data() {
			return {
				bgcImage1:'https://hx.juaiweb.com/storage/static/images/banner1.png',
				bgcImage2:'https://hx.juaiweb.com/storage/static/images/banner2.png',
				bgcImage3:'https://hx.juaiweb.com/storage/static/images/banner3.png'
			}
		},
		onLoad(){
			this.getUserInfo()
			  uni.setNavigationBarTitle({
			            title:'发布'
			        });
		},
		onShow(){
			
		},
		methods: {
			fabuhuoyuan(){
				let cargo=uni.getStorageSync('cargo')
				let is_shimin=uni.getStorageSync('is_shimin')
				if(is_shimin==0){
					this.$api.msg('未实名，请去实名认证')
				}else if(is_shimin==2){
					this.$api.msg('实名审核中')
				}else if(is_shimin==3){
					this.$api.msg('实名审核中')
				}else{
					if(cargo==0){
						this.$api.msg('货主认证审核中')
					}else if(cargo==2){
						this.$api.msg('货主认证不通过')
					}else if(cargo==3){
						this.$api.msg('货主未认证')
					}else{
						uni.navigateTo({
							url:"/pageA/fabu_form/fabu_form"
						})
					}
				}
			},
			fabuLenglian(){
				let driver=uni.getStorageSync('driver')
				let is_shimin=uni.getStorageSync('is_shimin')
				if(is_shimin==0){
					this.$api.msg('未实名，请去实名认证')
				}else if(is_shimin==2){
					this.$api.msg('实名审核中')
				}else if(is_shimin==3){
					this.$api.msg('实名审核中')
				}else{
					if(driver==0){
						this.$api.msg('司机认证审核中')
					}else if(driver==2){
						this.$api.msg('司机认证不通过')
					}else if(driver==3){
						this.$api.msg('司机未认证')
					}else{
					uni.navigateTo({
						url:"/pageA/fabu_lenglian/fabu_lenglian"
					})
					}
				}
		
		},
		fabuL(){
			uni.navigateTo({
				url:"/pageA/fabu_lengku/fabu_lengku"
			})
		},
		getUserInfo(){
			var that=this
			UserInfo.getList({},function(res){
				if(res.userinformation==null){
					uni.setStorageSync('is_shimin',0)
				}else if(res.userinformation && res.userinformation.idcardcheck==0){
					uni.setStorageSync('is_shimin',2)
				}else if( res.userinformation && res.userinformation.idcardcheck==1){
					uni.setStorageSync('is_shimin',1)
				}else{
					uni.setStorageSync('is_shimin',3)
				}
				// ------------------
				if(res.userinformation && res.userinformation.cargocheck==0 && res.userinformation.business_license!=null){
					uni.setStorageSync('cargo',0)
				}else if(res.userinformation && res.userinformation.cargocheck==1){
					uni.setStorageSync('cargo',1)
				}else if(res.userinformation && res.userinformation.cargocheck==2){
					uni.setStorageSync('cargo',2)
				}else{
					uni.setStorageSync('cargo',3)
				}
				// ----------
				if(res.userinformation && res.userinformation.drivingcheck==0 && res.userinformation.driving_number!=null){
					uni.setStorageSync('driver',0)
				
				}else if(res.userinformation && res.userinformation.drivingcheck==1){
					uni.setStorageSync('driver',1)
				}else if(res.userinformation && res.userinformation.drivingcheck==2){
					uni.setStorageSync('driver',2)
				}else{
					uni.setStorageSync('driver',3)
				}
			})
		}
	},
	}
</script>

<style lang="scss" scoped>
	.top:first-child{
		margin-top: 0;
	}
	.top{
		width: 100%;
		height: 300rpx;
		margin-top: 30rpx;
		background-repeat:no-repeat ;
		background-size: 100%;
	}
	.huos{
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		.huo{
			color: white;
			font-size: 30rpx;
			font-weight: bold;
		}
		.huozhu{
			color: white;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}
</style>
