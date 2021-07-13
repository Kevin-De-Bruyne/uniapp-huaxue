<template>
	<view>
		<view class="center">
			<view class="center_t">上传行驶证 (必填)</view>
			<view class="center_b">
				<view class="jiashi1" @click="jiashi_zheng" v-if="file1==''">
					<text class="yticon icon-jiahao"></text>
					<text class="idcard">行驶证正面</text>
					<text class="wenzi">(文字,清晰,四角齐全)</text>
				</view>
				<view class="jiashi1" v-else @click="jiashi_zheng">
					<image :src="file1"></image>
				</view>
				
				<view class="jiashi2"  @click="jiashi_zheng2" v-if="file2==''">
					<text class="yticon icon-jiahao"></text>
					<text class="idcard">行驶证反面</text>
					<text class="wenzi">(文字,清晰,四角齐全)</text>
				</view>
				
				<view class="jiashi2" v-else @click="jiashi_zheng2">
					<image :src="file2"></image>
				</view>
			</view>
		</view>
		<view class="form">
			<view class="form_c">
				<view class="form_c_l">
					车牌号
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="请输入车牌号" v-model="chepai"/>
				</view>
			</view>
			<view class="form_cs">
				<view class="form_c_l">
					车辆颜色
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="请输入车牌颜色" v-model="car_color"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<view class="form_cs">
				<view class="form_c_l">
					车辆持有人
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="请输入车辆持有人" v-model="owner"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<view class="form_cs">
				<view class="form_c_l">
					品牌型号
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="请输入品牌型号" v-model="pin_type"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<view class="form_cs">
				<view class="form_c_l">
					车型车长
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="请输入车型车长" v-model="long"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<!-- 下一步 -->
			<view class="next" @click="submit">
				提交审核
			</view>
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
			 show:false,
			 show2:false,
			 mode: 'date',
			 fileList:[],
			 jazhao:'',
			 minDate:'1970-01-01',
			 first:'',
			 end:'',
			 chepai:'',
			 car_color:'',
			 owner:'',
			 pin_type:'',
			 long:'',
			 js_zheng_photo:'',
			 js_fan_photo:'',
			 data:{}
			}
		},
		onLoad(opitons){
			// console.log(opitons.data)
			this.data=uni.getStorageSync('jiashi_info')
			console.log(this.data[0])
		},
		methods: {
			next(){
				uni.navigateTo({
					url:'/pages/car_info/car_info'
				})
			},
			jiashi_zheng(){
				var that=this
				uni.chooseImage({
				    count: 1, //上传图片的数量，默认是9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        that.file1=res.tempFilePaths[0]
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
				this.$api.msg('请输入行驶证正面')
			}else if(this.js_fan_photo==''){
				this.$api.msg('请输入行驶证反面')
			}else if(this.chepai==''){
				this.$api.msg('请输入车牌号')
			}else if(this.car_color==''){
				this.$api.msg('请输入车牌颜色')
			}else if(this.owner==''){
				this.$api.msg('请输入车辆持有人')
			}else if(this.car_color==''){
				this.$api.msg('请输入车牌颜色')
			}else if(this.pin_type==''){
				this.$api.msg('请输入品牌型号')
			}else if(this.long==''){
				this.$api.msg('请输入车型车长')
			}else{
				console.log(this.data[0])
				 Driver.driver_post({
				 	realname:this.data[0],
					driving_number:this.data[1],
					driving_car:this.data[2],
					driving_first:this.data[3],
					driving_valid:this.data[4],
					car_number:this.chepai,
					car_color:this.car_color,
					car_belong:this.owner,
					car_brand:this.pin_type,
					car_length:this.long,
					driving_back:this.data[6],
					driving_front:this.data[5],
					travel_front:this.js_zheng_photo,
					travel_back:this.js_fan_photo,
					type:1
				 },function(res){
					if(res=='更新成功'){
						uni.showToast({
							title:'提交成功',
							icon:'none',
							success:(res)=>{
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/mine/mine'
									})
								},700)
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
	.top{
		width: 100%;
		height: 150rpx;
		image{
			width: 100%;
			height: 100%;
		};
	}
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
	.form{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		margin-top: 30rpx;
		padding: 10rpx 30rpx 50rpx 30rpx;
		.form_c{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgb(170,170,170);
			.form_c_l{
				width: 30%;
				padding-left: 15rpx;
			}
			.form_c_r{
				// width: 70%;
				width: 450rpx;
				text-align: center;
				padding-left: 50rpx;
				padding: 20rpx 0rpx 20rpx 20rpx;
				display: flex;
				color: rgb(215,215,215);
				flex-direction: row;
				input{
					width: 100%;
					height: 50rpx;
					color:black;
				}
			}
		}
		.form_cs{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			// margin-top: 60rpx;
			align-items: center;
			border-bottom: 1px solid rgb(170,170,170);
			.form_c_l{
				width: 30%;
				padding-left: 15rpx;
			}
			.form_c_r{
				// width: 65%;
				padding: 20rpx 0 20rpx 20rpx;
				display: flex;
				flex-direction: row;
				color: rgb(215,215,215);
				justify-content: space-between;
				align-items: center;
				input{
					width: 100%;
					height: 50rpx;
					color:black;
				}
			}
		}
		.next{
			background-color: rgb(68,204,105);
			border-radius: 20rpx;
			height: 95rpx;
			line-height: 95rpx;
			text-align: center;
			color: white;
	
			font-size: 28rpx;
			margin-top: 30rpx;
		}
	}
</style>
