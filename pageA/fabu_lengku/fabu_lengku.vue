<template>
	<view>
		<view class="top">
			<view class="form">
				<view class="t_bottom">
					<view class="goods_info">
						<view class="goods_info_l">名称：</view>
						<input class="goods_info_r" placeholder="请输入冷库名称" v-model="name"/>
					</view>
				</view>
			
				<view class="destination" @click="areaClick">
					<view class="destination_l">地点：</view>
					<view class="destination_r" v-if="address==''" style="margin-left: 120rpx;">必填,请选择省市区</view>
					<view v-else style="margin-left: 120rpx;">{{address}}</view>
				</view>
	<!-- 			<view class="destination" @click="areaClick2">
					<view class="destination_l">目的地：</view>
					<view class="destination_r" v-if="end_address==''">必填,请选择目的省市区</view>
					<view v-else>{{end_address}}</view>
				</view> -->
				<view class="t_bottom">
					<view class="goods_info">
						<view class="goods_info_l">详细地址：</view>
						<input class="goods_info_rs" placeholder="请输入详细地址" v-model="address_detail"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">体积：</view>
						<input class="goods_info_r" placeholder="必填,体积" v-model="tiji"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">温度：</view>
						<input class="goods_info_r" placeholder="温度" v-model="temperature"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">联系人：</view>
						<input class="goods_info_r" placeholder="请输入联系人" v-model="contact_mobile"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">联系人电话：</view>
						<input class="goods_info_r" placeholder="请输入联系人电话" v-model="contact"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">存放物体：</view>
						<input class="goods_info_r" placeholder="请输入存放物" v-model="cunfang"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">请上传冷库图片：</view>
						<view class="jiashi1" @click="jiashi_zheng" v-if="file1==''">
							<text class="yticon icon-jiahao"></text>
							<text class="idcard">冷库图片</text>
						</view>
						<view class="jiashi1" v-else @click="jiashi_zheng">
							<image :src="file1"></image>
						</view>
					</view>

					<!-- 提交按钮 -->
					<view class="submit">
						<view class="submit_btn" @click="submit">提交</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="bottom">
		</view>
		<!-- 省市区弹窗 -->
	<u-popup v-model="show" mode="bottom" length="60%">
	<van-area title="标题" :area-list="areaList" :value="value" @confirm="confirm" @cancel="cancel"/>
	</u-popup>
	
	<u-popup v-model="show2" mode="bottom" length="60%">
	<van-area title="标题" :area-list="areaList" :value="value" @confirm="confirm2" @cancel="cancel2"/>
	</u-popup>
	</view>
</template>

<script>
	import Address from '../../api/address'
	import driverInfoList from '../../components/driver_info_list.vue'
	import Source from '../../api/source'
	export default {
		data() {
			return {
				show:false,
				show2:false,
				value1: 0,
				file1:'',
				closeable:true,
				maskcloseable:true,
				mask:true,
				value2: 0,
				value:'',
				value3: 0,
				value4: 0,
				 option1: [
				      { text: '普通冷藏', value: 0 },
				      { text: '普通', value: 1 },
				    ],
					option2: [
					     { text: '全部商品', value: 0 },
					     { text: '新款商品', value: 1 },
					     { text: '活动商品', value: 2 },
					   ],
					 option3: [
					        { text: '全部商品', value: 0 },
					        { text: '新款商品', value: 1 },
					        { text: '活动商品', value: 2 },
					      ],
					 option4: [
						       { text: '全部商品', value: 0 },
						       { text: '新款商品', value: 1 },
						       { text: '活动商品', value: 2 },
						     ],
					areaList:{
						 // province_list: {
						 //    110000: '北京市',
						 //    120000: '天津市',
						 //  },
						 //  city_list: {
						 //    110100: '北京市',
						 //    120100: '天津市',
						 //  },
						 //  county_list: {
						 //    110101: '东城区',
						 //    110102: '西城区',
						 //    // ....
						 //  }
					},
					goods_info:'',
					tiji:'',
					temperature:'',
					contact:'',
					contact_mobile:'',
					cunfang:'',
					province:'',
					city:'',
					country:'',
					proId:'',
					cityId:'',
					countryId:'',
					address:'',
					name:'',
					end_province:'',
					end_city:'',
					end_country:'',
					end_proId:'',
					end_cityId:'',
					end_countryId:'',
					end_address:'',
					address_detail:'',
					js_zheng_photo:''
			}
		},
		components:{
			driverInfoList
		},
		onLoad(){
			this.getAddress()
		},
		onShow(){
			let cellphone=uni.getStorageSync('cellphone')
			console.log(cellphone)
			if(cellphone==''){
				uni.showToast({
					title:'请授权获取手机号',
					icon:'none',
					duration:2000,
					success:(res)=>{
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pageA/login/login?type=phone'
							})
						},1500)
					}
				})
			
			}
		},
		methods: {
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
			change(e){
				console.log(e)
				if(e.detial==1){
					this.cold_chain=1
				}else{
					this.cold_chain=0
				}
			},
			getAddress(){
				var that=this
				Address.getList({},function(res){
					that.areaList=res
					
				})
			},
			areaClick(){
				this.show=true
			},
			areaClick2(){
				this.show2=true
			},
			close(){
				this.show=false
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
			confirm2(e){
				console.log(e)
				this.show2=false
				let arr,SelectProvinceName,SelectCityName,SelectCountyName,SelectProvinceCode,SelectCityCode,SelectCountyCode;
				arr=e.detail.values
				this.end_province = arr[0].name;   // 省
				this.end_city= arr[1].name;   // 市
				this.end_country = arr[2].name;  // 区
				this.end_address=this.end_province+this.end_city+this.end_country
				this.end_proId = arr[0].code;   // 省id
				this.end_cityId = arr[1].code;   // 市id
				this.end_countryId = arr[2].code;  // 区id
			},
			cancel(){
				this.show=false
			},
			cancel2(){
				this.show2=false
			},
			submit(){
				Source.zhaomu_post3({
					province_id:this.proId,
					city_id:this.cityId,
					region_id:this.countryId,
					province_name:this.province,
					city_name:this.city,
					region_name:this.country,
					temperature:this.temperature,
					volume:this.tiji,
					goods:this.cunfang,
					contacts:this.contact,
					contacts_mobile:this.contact_mobile,
					name:this.name,
					address:this.address_detail,
					img:this.js_zheng_photo
				},function(res){
					if(res=='添加成功'){
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .van-dropdown-menu__item{
		min-width: 90px;
	}
	.pop{
		height: 500px;
	}
	.top{
		padding: 15rpx;
		.form{
			display: flex;
			flex-direction: column;
			.destination{
				display: flex;
				flex-direction: row;
				border-bottom: 1px solid rgb(245,245,245);
				height: 85rpx;
				background-color: #fff;
				padding: 0 30rpx;
				align-items: center;
				.destination_l{
					font-size: 28rpx;
					font-weight: bold;
				}
				.destination_r{
					color:rgb(147,140,134);
					font-size: 25rpx;
				}
			}
			.t_bottom{
				padding: 30rpx;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				.goods_info:first-child{
					margin-top: 0;
				}
				.goods_info{
					display: flex;
					flex-direction: row;
					// justify-content: space-between;
					margin-top: 30rpx;
					align-items: center;
					.goods_info_l{
						font-size: 28rpx;
						font-weight: bold;
						min-width: 200rpx;

					}
					.goods_info_r{
						padding: 15rpx;
						height: 75rpx;
						border: 1px solid rgb(215,215,215);
				}
				.goods_info_rs{
						padding: 15rpx;
						height: 75rpx;
						border: 1px solid rgb(215,215,215);
						width: 500rpx;
				}
			}
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
			.submit{
				padding: 60rpx 20%;
				.submit_btn{
					border-radius: 30rpx;
					background-color: rgb(68,204,105);
					color:white;
					 padding: 20rpx 50rpx;
					 text-align: center;
				}
			}
		}
	}
	}
</style>
