<template>
	<view class="apply">
		<view class="swiper_image">
			<image :src="urlHeader+img"></image>
		</view>
		<view class="intro">
			广东冷链仓储物流交流平台火热招募
			为贯彻《中共中央、国务院关于抓好“三农"领域重点工
			作确保如期实现全面小康的意见》(中发(2020] 1
			号)、《关于做好2020年国家骨干冷 链物流基地建设工
			作的通知》(发改经贸 ( 2020 ) 1066号)精神和省
			委、省政府工作部署，着力保障重要农产品有效供给
			和促进农民持续增收，有效支撑农产品仓储保鲜冷链
			物流设施建设,依据《广东省人民政府办公厅印发关于
			支持省级现代农业产业园建设政策措施的通知》(粵
			办函(2019] 289号)和《广东省人民政府办公厅关于
			加快推进生猪家禽产业转型升级的意见》(粵府办
			[2019] 25号)，拟建设”广东省农产品冷链仓储物流
			交流平台"，并在广东农产品”保供稳价安心”数字平台
			宣传推广使用。以市场需求为导向，促进农户生产、
			企业加工、客户营销和终端消费连成一-体、协同运
			作，增强供给侧对需求侧的适应性和灵活性。借助互
			联网信息交互高效、低成本的优势，探索线上线下一
			体化仓储保鲜冷链物流创新新模式，进- -步打通供需
			交易的各个环节，为行业提供新的发展方向。针对工
			作的要求和开展情况，现招募冷链仓储物流企业入驻
			平台:
		</view>
		<view class="share">
			--信息填报--
	<!-- 		<view class="share_btn">
				<text class="yticon icon-fenxiang1"></text>
				<text>分享</text>
			</view> -->
		</view>
		<view class="form">
			<view class="form_list">
				<view class="form_list_t">您的姓名?</view>
				<view class="form_list_b">
					<input type="text" placeholder="输入" v-model="name"/>
				</view>
			</view>
			<view style="margin-top:20rpx;font-size:23rpx;font-weight: bold;">请上传公司图片</view>
			<view class="form_image" v-if="file1==''" @click="jiashi_zheng">
				<text class="yticon icon-jiahao"></text>
				<!-- <text class="idcard">驾驶证正面照片</text> -->
				<text class="wenzi">(文字,清晰,四角齐全)</text>
			</view>
			<view class="form_image" v-else @click="jiashi_zheng">
				<image :src="file1"></image>
			</view>
			<!-- 请上传公司介绍 -->
			<view class="form_list">
				<view class="form_list_t">请输入详细内容</view>
				<view class="form_list_b">
					<textarea name="" id="" cols="30" rows="10"></textarea>
				</view>
			</view>
			<!-- 手机号码 -->
			<view class="form_list">
				<view class="form_list_t">您的手机联系号码?</view>
				<view class="form_list_b">
					<input type="text" placeholder="输入" v-model="phone"/>
				</view>
			</view>
			<!-- 企业名称 -->
			<view class="form_list">
				<view class="form_list_t">您企业名称?</view>
				<view class="form_list_b">
					<input type="text" placeholder="输入" v-model="company"/>
				</view>
			</view>
			<!-- 企业所在区县 -->
			<view class="form_list">
				<view class="form_list_t">您的企业所在区县?</view>
				<view class="form_list_b" @click="show=true">
					<view>{{address}}</view>
				</view>
			</view>
			<!-- 企业类型 -->
			<view class="form_list">
				<view class="form_list_t">您的企业类型?</view>
				<!-- <view class="form_list_b">
					<input type="text" placeholder="单行输入"/>
				</view> -->
			</view>
			<!-- 复选框组 -->
			  <van-checkbox v-model="item.isActive"  checked-color="#008000" v-for="(item,index) in navList"
			  :key="index" @change="activeFun(item)">{{item.text}}</van-checkbox>
<!-- 			  <van-checkbox name="b"  checked-color="#008000">复选框 b</van-checkbox>
			  <van-checkbox name="c"  checked-color="#008000">复选框 c</van-checkbox> -->
			  <u-popup v-model="show" mode="bottom" length="60%">
			  <van-area title="标题" :area-list="areaList" :value="value" @confirm="confirm"
			  @cancel="cancel"/>
			  </u-popup>
			<view class="submit">
				<view class="submit_btn" @click="submit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Address from '../../api/address'
	import ZhaoMu from '../../api/zhaomu'
	export default {
		data() {
			return {
				  result: ['b'],
				   navList: [
				      {text: '冷库存储', isActive: true,id:1},
				      {text: '冷连物流', isActive: false,id:2},
				      {text: '生产加工', isActive: false,id:3},
					  {text: '销售流通', isActive: false,id:4},
					  {text: '数字农业', isActive: false,id:5}
				    ],
					name:'',
					phone:'',
					urlHeader:'',
					company:'',
					show:false,
					areaList:[],
					// checked:true
					address:'',
					province:'',
					city:'',
					country:'',
					proId:'',
					cityId:'',
					countryId:'',
					activeId:1,
					file1:'',
					js_zheng_photo:'',
					img:'/storage/static/images/apply_banner.png'
			}
		},
		onLoad(){
			this.urlHeader=this.$url
			this.getAddress()
		},
		methods: {
	    getAddress(){
				var that=this
				Address.getList({},function(res){
					that.areaList=res
					
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
						  }
						})
				    }
				})
			
			},
		activeFun(data){
			 this.navList.forEach(function(obj){
			     obj.isActive = false;
			    });
			    data.isActive = !data.isActive;
				this.activeId=data.id
		},
		submit(){
			ZhaoMu.zhaomu_post({
				'company_name':this.company,
				'contacts':this.name,
				'contacts_mobile':this.phone,
				'company_type':this.activeId,
				'is_need':1,
				"content":'dsdsdsds',
				'img':this.js_zheng_photo,
				province_name:this.province,
				city_name:this.city,
				region_name:this.country,
				province_id:this.proId,
				city_id:this.cityId,
				region_id:this.countryId
			},function(res){
				console.log(res)
				if(res=='添加成功'){
					uni.navigateTo({
						url:'/pageA/zhaomu_part/zhaomu_part'
					})
				}
			})
		},
		confirm(e){
			console.log(e)
			this.show=false
			let arr,SelectProvinceName,SelectCityName,SelectCountyName,SelectProvinceCode,SelectCityCode,SelectCountyCode;
			arr=e.detail.values
		    this.province = arr[0].name;   // 省
		    this.city= arr[1].name;   // 市
			this.country = arr[2].name;  // 区
			this.address=this.province+this.city+this.country
			this.proId = arr[0].code;   // 省id
			this.cityId = arr[1].code;   // 市id
			this.countryId = arr[2].code;  // 区id
		},
		cancel(){
			this.show=false
		}
		}
	}
</script>

<style lang="scss" scoped>
	.van-dropdown-menu{
		background-color: #fff!important;
	}
	.swiper_image{
		margin-top: 5rpx;
		width: 100%;
		height: 500rpx;
		image{
		  width: 100%;
		  height: 100%;
		}
	}
	.intro{
		padding:30rpx;
		
	}
	.share{
		margin-top: 20rpx;
		text-align: center;
		width: 100%;
		position: relative;
		// height: 80rpx;
		.share_btn{
			display: flex;
			flex-direction: column;
			position: absolute;
			right: 40rpx;
			top: -10rpx;
			font-size: 22rpx;
		}
	}
	.form{
		padding:30rpx;
		display: flex;
		flex-direction: column;
		.form_image{
			width: 450rpx;
			height: 200rpx;
			// padding: 30rpx;
			border: 2px solid rgb(216,216,216);
			border-radius: 20rpx;
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
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
		.form_list{
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;
			.form_list_t{
				font-size: 23rpx;
				font-weight: bold;
			}
			.form_list_b{
				width: 100%;
				border:2px solid rgb(216,216,216);
				margin-top: 20rpx;
				padding: 10rpx 30rpx;
				input{
					width: 100%;
				}
				view{
					height: 35rpx;
				}
			}
		}
		/deep/ .van-checkbox{
			margin-top: 20rpx;
		}
	}
	.submit{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
		.submit_btn{
			padding: 15rpx 50rpx;
			background-color: green;
			color: white;
			border-radius: 40rpx;
		}
	}
		
	
</style>
