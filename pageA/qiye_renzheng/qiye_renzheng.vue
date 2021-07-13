<template>
	<view class="qiye_renzheng">
		<view class="qiye_list">
			<view class="qiye_list_l">企业全称</view>
			<view class="qiye_list_r">
				<input type="text" placeholder="请按照营业执照上的名字填写" v-model="name"/>
			</view>
		</view>
		<!-- 企业资料上传 -->
		<view class="qiye_info_box">
			<view class="qiye_info_box_t">企业资料上传</view>
		<view class="center_b">
			<view class="jiashi1" @click="jiashi_zheng" v-if="file1==''">
				<text class="yticon icon-jiahao"></text>
				<text class="idcard">营业执照</text>
				<text class="wenzi">请上传原件 且填写一致</text>
			</view>
			<view class="jiashi1" v-else @click="jiashi_zheng">
				<image :src="file1"></image>
			</view>
			
	<!-- 		<view class="jiashi2">
				<text class="yticon icon-jiahao"></text>
				<text class="idcard">驾驶证反面照片</text>
				<text class="wenzi">(文字,清晰,四角齐全)</text>
			</view> -->
			
		<!-- 	<view class="jiashi2" v-else @click="jiashi_zheng2">
				<image :src="file2"></image>
			</view> -->
		</view>
		</view>
		<view class="qiye_list">
			<view class="qiye_list_l">经营者</view>
			<view class="qiye_list_r">
				<input type="text" placeholder="请输入经营者" v-model="contacts"/>
			</view>
		</view>
		<view class="qiye_list">
			<view class="qiye_list_l">手机号</view>
			<view class="qiye_list_r">
				<input type="text" placeholder="请填写手机号" v-model="phone"/>
			</view>
		</view>
		<!-- 负责声明 -->
		<view class="shengming_box">
			<view class="shengming_t">免费声明：</view>
			<view class="shengming_b">提交资料即默认您承诺您提交的申请资料均真实准确，合法有效，并且
			您理解与同意，华雪云链的认证审核仅限于对申请资料进行形式审查，不失为华雪云链对通过认证审核的用户
			及其账号的真实性。合法性负责，华雪云链不对此承担任何法律责任。</view>
		</view>
		<view class="submit" @click="submit">确认提交</view>
	</view>
</template>

<script>
	import Driver from '../../api/driver_info'
	export default {
		data() {
			return {
				file1:'',
				name:'',
				js_zheng_photo:'',
				contacts:'',
				phone:''
			}
		},
		methods: {
			submit(){
				Driver.qiye_post({
					type:2,
					company_name:this.name,
					business_license:this.js_zheng_photo,
					contacts:this.contacts,
					contacts_mobile:this.phone
				},function(res){
					if(res=='更新成功'){
						uni.showToast({
							title:'添加成功',
							icon:'none',
							success:(res)=>{
								setTimeout(()=>{
								 uni.navigateBack()
								},1500)
							}
						})
					
					}
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
							 console.log(res.data)
						  }
						})
				    }
				})
			
			},
		}
	
	}
</script>

<style lang="scss" scoped>
 .qiye_renzheng{
	 display: flex;
	 height: 100vh;
	 flex-direction: column;
	 .qiye_list{
		 display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		 flex-direction: row;
		 height: 90rpx;
		 .qiye_list_l{
			  background-color: rgb(250,250,250);
			 color: rgb(126,126,126);
			 font-size: 30rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			width: 180rpx;
			line-height: 90rpx;
		 }
		 .qiye_list_r{
			 width: 70%;
			 background-color: #fff;
			 input{
				 width: 100%;
				 height: 100%;
		 }
	 }
 }
 .qiye_info_box{
	 display: flex;
	 flex-direction: column;
	 background-color: #fff;
	 padding: 30rpx;
	 .qiye_info_box_t{
		 font-size: 30rpx;
		 color: rgb(126,126,126);
	 }
	 .qiye_info_box_b{
		 margin-top: 30rpx;
	 }
	.center_b{
		display: flex;
		justify-content:center;
		margin-top: 40rpx;
		.jiashi1{
			border-radius: 20rpx;
			// background-color: red;
			height: 230rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1px solid rgb(170,170,170);
			width: 65%;
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
 .shengming_box{
 	padding: 40rpx 30rpx;
 	.shengming_t{
 		color:rgb(152,152,152);
 		font-size: 26rpx;
 	}
	.shengming_b{
		color:rgb(152,152,152);
		font-size: 26rpx;
	}
 }
 .submit{
	 height: 100rpx;
	 background-color: rgb(76,169,140);
	 color: white;
	 width: 100%;
	 line-height: 100rpx;
	 text-align: center;
	 position: absolute;
	 bottom: 0;
 }
 }
</style>
