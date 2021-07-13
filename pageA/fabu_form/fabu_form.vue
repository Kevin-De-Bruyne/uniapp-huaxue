<template>
	<view>
		<view class="top">
			<view class="form">
				<view class="destination" @click="areaClick">
					<view class="destination_l">出发地：</view>
					<view class="destination_r" v-if="address==''">必填,请选择出发省市区</view>
					<view v-else>{{address}}</view>
				</view>
				<view class="destination" @click="areaClick2">
					<view class="destination_l">目的地：</view>
					<view class="destination_r" v-if="end_address==''">必填,请选择目的省市区</view>
					<view v-else>{{end_address}}</view>
				</view>
				<view class="t_bottom">
					<view class="goods_info">
						<view class="goods_info_l">货物信息：</view>
						<input class="goods_info_r" placeholder="必填,请输入货物信息" v-model="goods_info"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">体积：</view>
						<input class="goods_info_r" placeholder="必填,体积" v-model="tiji"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">重量：</view>
						<input class="goods_info_r" placeholder="重量" v-model="weight"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">车长：</view>
						<input class="goods_info_r" placeholder="请输入车长度" v-model="length"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">车型：</view>
						<input class="goods_info_r" placeholder="请输入车型" v-model="car_type"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">是否需要冷链：</view>
						<van-dropdown-menu>
						 <van-dropdown-item v-model="value1" :options="option1" @change="change"/>
						 </van-dropdown-menu>
					</view>
					<!-- 提交按钮 -->
					<view class="submit">
						<view class="submit_btn" @click="submit">提交</view>
					</view>
				</view>
			</view>
		</view>
	
<!-- 		<view class="bottom">
			<van-dropdown-menu>
			  <van-dropdown-item v-model="value2" :options="option2" @change="dropdownClick"/>
			  <van-dropdown-item v-model="value3" :options="option3" />
			   <van-dropdown-item v-model="value4" :options="option4" />
			</van-dropdown-menu>
			 <driverInfoList></driverInfoList>
		</view> -->
		<!-- 省市区弹窗 -->
	<u-popup v-model="show" mode="bottom" length="60%">
	<van-area title="标题" :area-list="areaList" :value="value" @confirm="confirm" @cancel="cancel"/>
	</u-popup>
	
	<u-popup v-model="show2" mode="bottom" length="60%">
	<van-area title="标题" :area-list="areaList" :value="value" @confirm="confirm2"  @cancel="cancel2"/>
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
				closeable:true,
				maskcloseable:true,
				mask:true,
				value2: 0,
				value:'',
				value3: 0,
				value4: 0,
				 option1: [
				      { text: '是', value: 0 },
				      { text: '否', value: 1 },
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
					length:'',
					weight:'',
					car_type:'',
					cold_chain:1,
					province:'',
					city:'',
					country:'',
					proId:'',
					cityId:'',
					countryId:'',
					address:'',
					
					end_province:'',
					end_city:'',
					end_country:'',
					end_proId:'',
					end_cityId:'',
					end_countryId:'',
					end_address:''
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
				console.log(4)
				Source.zhaomu_post({
					province_id:this.proId,
					city_id:this.cityId,
					region_id:this.countryId,
					province_name:this.province,
					city_name:this.city,
					region_name:this.country,
					end_province_id:this.end_proId,
					end_city_id:this.end_cityId,
					end_region_id:this.end_countryId,
					end_province_name:this.end_province,
					end_city_name:this.end_city,
					end_region_name:this.end_country,
					car_type:this.car_type,
					volume:this.tiji,
					weight:this.weight,
					car_length:this.length,
					cold_chain:this.cold_chain,
					cargo_info:this.goods_info
					
				},function(res){
					console.log(res)
				if(res=='添加成功'){
					uni.showToast({
						title:'添加成功',
						icon:'none',
						success:(res)=>{
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pageA/source/source'
								})
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
		min-width: 70px;
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
