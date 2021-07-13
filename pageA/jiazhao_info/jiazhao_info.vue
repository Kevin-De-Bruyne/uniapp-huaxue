<template>
	<view>
<!-- 		<view class="top">
			<image src="../../static/jiazhao_info.png"></image>
		</view> -->
		<view class="center">
			<view class="center_t">上传驾驶证 (必填)</view>
			<view class="center_b">
				<view class="jiashi1" @click="jiashi_zheng" v-if="file1==''">
					<text class="yticon icon-jiahao"></text>
					<text class="idcard">驾驶证正面照片</text>
					<text class="wenzi">(文字,清晰,四角齐全)</text>
				</view>
				<view class="jiashi1" v-else @click="jiashi_zheng">
					<image :src="file1"></image>
				</view>
				
				<view class="jiashi2"  @click="jiashi_zheng2" v-if="file2==''">
					<text class="yticon icon-jiahao"></text>
					<text class="idcard">驾驶证反面照片</text>
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
					姓名
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="姓名必须和身份证上姓名一样" v-model="name"/>
				</view>
			</view>
			<view class="form_cs">
				<view class="form_c_l">
					驾驶证号
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="请输入驾驶证" v-model="driver_zheng"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<view class="form_cs">
				<view class="form_c_l">
					准驾车型
				</view>
				<view class="form_c_r">
					<input type="text" placeholder="准驾车型" v-model="car_type"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<view class="form_cs" @click="show=true">
				<view class="form_c_l">
					初次领证日期
				</view>
				<text v-if="first!=''">{{first}}</text>
				<view class="form_c_r">
					<input type="text" placeholder="请选择初次领证日期" v-if="first==''"/>
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<view class="form_cs" @click="show2=true">
				<view class="form_c_l">
					有效起始日期
				</view>
				<text v-if="end!=''">{{end}}</text>
				<view class="form_c_r">
					<input type="text" placeholder="请选择有效起始日期" v-if="end==''"/>
					
					<text class="yticon icon-youjiantou_huaban"></text>
				</view>
			</view>
			<!-- 选择时间 -->
<!-- 			<u-popup v-model="show" mode="bottom" length="80%"> -->
				<u-calendar v-model="show" :mode="mode" :min-date="minDate" :max-date="maxDate"
				@change="change"></u-calendar>
				<u-calendar v-model="show2" :mode="mode" :min-date="minDate" :max-date="maxDate2"
				@change="change2"></u-calendar>
			<!-- </u-popup> -->
			
			<!-- 下一步 -->
			<view class="next" @click="next">
				下一步
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
				maxDate2:'2030-01-01',
				first:'',
				end:'',
				name:'',
				driver_zheng:'',
				car_type:'',
				js_zheng_photo:'',
				js_fan_photo:''
			}
		},
		watch:{
			jazhao(news,old){
				console.log(news)
			}
		},
		onLoad(){
			
		},
		methods: {
			next(){
				if(this.js_zheng_photo==''){
					this.$api.msg('请上传驾驶证正面')
				}else if(this.js_fan_photo==''){
					this.$api.msg('请上传驾驶证反面')
				}else if(this.name==''){
					this.$api.msg('请输入姓名')
				}else if(this.driver_zheng==''){
					this.$api.msg('请上传驾驶证号')
				}else if(this.car_type==''){
					this.$api.msg('请上传车型')
				}else if(this.first==''){
					this.$api.msg('请选择初次领证日期')
				}else if(this.end==''){
					this.$api.msg('请选择有效领证日期')
				}else{
					let data={}
					data[0]=this.name
					data[1]=this.driver_zheng
					data[2]=this.car_type
					data[3]=this.first
					data[4]=this.end
					data[5]=this.js_zheng_photo
					data[6]=this.js_fan_photo
					console.log(data)
					uni.setStorageSync('jiashi_info',data)
					uni.navigateTo({
						url:`/pageA/cheliang_info/cheliang_info`
					})
				}
				// Driver.driver_post({
				// 	// realname:
				// },function(res){
					
				// })
			},
		
			    afterRead(file) {
			      // 此时可以自行将文件上传至服务器
			      console.log(file);
				  this.fileList=file.url
				  console.log(this.fileList)
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
			change(e) {
					console.log(e);
					this.first=e.result
			},
			change2(e) {
					console.log(e);
					this.end=e.result
			}
		}
	}
</script>

<style lang="scss" scoped>
	van-uploader__upload{
		flex-direction: column;
		justify-content: center;
		display: flex;
	}
	/deep/.van-uploader__upload {
		background-color: var(--uploader-upload-background-color,white);
		width: 250rpx!important;
		height: 150rpx!important;
		border: 1px solid rgb(170,170,170);
		border-radius: 20rpx;
		white-space: nowrap;
		.van-uploader__slot{
			flex-direction: column;
			justify-content: center;
			display: flex;
			.idcard{
				text-align: center;
			}
			.wenzi{
				text-align: center;
				color: rgb(199,192,192);
			}
		};
		
	}
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
				padding: 20rpx 0rpx 20rpx 20rpx;
				display: flex;
				color: rgb(215,215,215);
				flex-direction: row;
				input{
					width: 100%;
					height: 50rpx;
					color: black;
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
					color: black;
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
