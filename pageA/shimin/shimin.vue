<template>
	<view class="shimin">
		<view class="banner">
			<!-- <image src="../../pageA/static/shimin_banner.png"></image> -->
			<text>请先实名</text>
		</view>
<!-- 		<van-notice-bar
		  wrapable
		  :scrollable="false"
		  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
		/> -->
		<view class="center">
			<view class="center_t">上传身份证 (必填)</view>
			<view class="center_b">
				<view class="jiashi1" @click="jiashi_zheng" v-if="file1==''">
					<text class="yticon icon-jiahao"></text>
					<text class="idcard">身份证正面照片</text>
					<text class="wenzi">(文字,清晰,四角齐全)</text>
				</view>
				<view class="jiashi1" v-else @click="jiashi_zheng">
					<image :src="file1"></image>
				</view>
				
				<view class="jiashi2"  @click="jiashi_zheng2" v-if="file2==''">
					<text class="yticon icon-jiahao"></text>
					<text class="idcard">身份证反面照片</text>
					<text class="wenzi">(文字,清晰,四角齐全)</text>
				</view>
				
				<view class="jiashi2" v-else @click="jiashi_zheng2">
					<image :src="file2"></image>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="form_t">
				<view class="form_t_l">填写本人信息</view>
				<view>
					<!-- <text class="yticon icon-xiangji"></text> -->
					<!-- <text style="color:rgb(225,115,41);font-size: 24rpx;">拍身份证自动填</text> -->
				</view>
				
			</view>
			<view class="form_c">
				<view class="form_c_l">
					姓名
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="姓名必须和身份证上姓名一样" v-model="name"/>
				</view>
			</view>
		<view class="form_cs">
			<view class="form_c_l">
				身份证
			</view>
			<view class="form_c_r">
				<input type="text" placeholder="请输入身份证号" v-model="idCard"/>
				<text class="yticon icon-youjiantou_huaban"></text>
			</view>
		</view>
		</view>
		<!-- 底部 -->
		<view class="bottom">
			<view class="zanbu" @click="zanbu">暂不认证</view>
			<view class="tijiao" @click="submit">提交审核</view>
		</view>
	</view>
</template>

<script>
	import Driver from '../../api/driver_info'
	export default {
		data() {
			return {
				file1:'',
				file2:'',
				idCard:'',
				name:'',
				js_zheng_photo:'',
				js_fan_photo:''
			}
		},
		methods: {
			zanbu(){
				uni.navigateBack()
			},
			jiashi_zheng(){
				var that=this
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        that.file1=res.tempFilePaths[0]
						console.log(that.file1)
						uni.uploadFile({
						  url: that.configURL.BaseURL + 'uploadPictures',
						  filePath: res.tempFilePaths[0],
						  name: 'file',
						  header: {
							'apply-secret': that.configURL.secret,
							'Authorization': 'Bearer ' + uni.getStorageSync('dsshopApplytoken')
						  },
						  formData: {
							type: 1,
							size: 1024 * 500
						  },
						  success:(res)=>{
							 that.js_zheng_photo=res.data
						  }
						})
				    }
				})
			
			},
			jiashi_zheng2(){
				var that=this
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        that.file2=res.tempFilePaths[0]
						uni.uploadFile({
						  url: that.configURL.BaseURL + 'uploadPictures',
						  filePath: res.tempFilePaths[0],
						  name: 'file',
						  header: {
							'apply-secret': that.configURL.secret,
							'Authorization': 'Bearer ' + uni.getStorageSync('dsshopApplytoken')
						  },
						  formData: {
							type: 1,
							size: 1024 * 500
						  },
						  success:(res)=>{
						  	 that.js_fan_photo=res.data
						  }
						})
				    }
				})
			
			},
			submit(){
				if(this.js_zheng_photo==''){
					this.$api.msg('请上传身份证正面')
				}else if(this.js_fan_photo==''){
					this.$api.msg('请上传身份证反面')
				}else if(this.name==''){
					this.$api.msg('请填写真实名字')
				}else if(this.idCard==''){
					this.$api.msg('请填写身份证号码')
				}else{
					Driver.driver_post({
						realname:this.name,
						idcard:this.idCard,
						idcard_front:this.js_zheng_photo,
						idcard_back:this.js_fan_photo
					},function(res){
						if(res=='更新成功'){
							uni.showToast({
								title:'提交成功',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.navigateBack();
									},2000)
							
								}
							})
							
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center{
		margin-top: 7rpx;
		background-color: #fff;
		padding: 30rpx 30rpx 60rpx 30rpx;
		display: flex;
		flex-direction: column;
		.center_t{
			font-weight: bold;
			font-size: 32rpx;
			
		}
		.center_b{
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;
			.jiashi1{
				border-radius: 20rpx;
				// background-color: red;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border: 1px solid rgb(170,170,170);
				width: 47%;
				.idcard{
					margin-top: 20rpx;
					text-align: center;
				}
				.wenzi{
					text-align: center;
					color: rgb(199,192,192);
				}
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
			.jiashi2{
				border-radius: 20rpx;
				// background-color: red;
				height: 180rpx;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				border: 1px solid rgb(170,170,170);
				width: 47%;
				.idcard{
					margin-top: 20rpx;
					text-align: center;
				}
				.wenzi{
					text-align: center;
					color: rgb(199,192,192);
				}
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
			
		}
	}
	.shimin{
		position: relative;
		height: 100vh;
	}
	.icon-xiangji{
		padding-right: 15rpx;
	}
	.banner{
		width: 100%;
		height: 400rpx;
		background-color: rgb(68,204,105);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 36rpx;
		font-weight: bold;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.form{
		padding:30rpx 60rpx;
		display: flex;
		background-color: #fff;
		flex-direction: column;
		.form_t{
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			.form_t_l{
				font-size: 28rpx;
				font-weight: bold;
			}
		}
		.form_c{
			display: flex;
			flex-direction: row;
			margin-top: 60rpx;
			align-items: center;
			border-bottom: 2px solid rgb(170,170,170);
			.form_c_l{
				width: 30%;
			}
			.form_c_r{
				width: 70%;
				padding: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				flex-direction: row;
				input{
					width: 100%;
				}
			}
		}
		.form_cs{
			display: flex;
			flex-direction: row;
			// margin-top: 60rpx;
			align-items: center;
			border-bottom: 2px solid rgb(170,170,170);
			.form_c_l{
				width: 30%;
			}
			.form_c_r{
				width: 65%;
				padding: 20rpx 20rpx 20rpx 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				.input{
					width: 100%;
				}
			}
		}
	}
	.bottom{
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 10rpx 40rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		.zanbu{
			height: 80rpx;
			width: 35%;
			line-height: 80rpx;
			text-align: center;
			color: rgb(68,204,105);
			border: 2px solid rgb(68,204,105);
			border-radius: 20rpx;
			font-size: 30rpx;
		}
		.tijiao{
			height: 80rpx;
			width: 35%;
			line-height: 80rpx;
			text-align: center;
			color: white;
			width: 60%;
			background-color: rgb(68,204,105);
			border-radius: 20rpx;
			font-size: 30rpx;
		}
	}
</style>
