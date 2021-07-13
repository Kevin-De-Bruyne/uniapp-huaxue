<template>
	<view>
		<view class="top">
			<view class="form">
				<view class="destination" @click="areaClick">
					<view class="destination_l">出发地：</view>
					<view class="destination_r">必填,请选择目的省市区</view>
				</view>
				<view class="destination">
					<view class="destination_l">目的地：</view>
					<view class="destination_r">必填,请选择目的省市区</view>
				</view>
				<view class="t_bottom">
					<view class="goods_info">
						<view class="goods_info_l">车辆总体积：</view>
						<input class="goods_info_r" placeholder="必填,体积"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">车辆载重：</view>
						<input class="goods_info_r" placeholder="重量"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">车长：</view>
						<input class="goods_info_r" placeholder="请输入车长度"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">车型：</view>
						<input class="goods_info_r" placeholder="请输入车类型"/>
					</view>
					<view class="goods_info">
						<view class="goods_info_l">类型：</view>
						<van-dropdown-menu>
						 <van-dropdown-item v-model="value1" :options="option1" />
						 </van-dropdown-menu>
					</view>
				</view>
			</view>
			<!-- 省市区弹窗 -->
			<van-popup v-model="show" position="top" :style="{ height: '30%' }" class="pop">
					<!-- <van-area title="标题" :area-list="areaList" />	 -->
					<view>44444s</view>
				</van-popup>
		</view>
	
	</view>
</template>

<script>
	import driverInfoList from '../../components/driver_info_list.vue'
	export default {
		data() {
			return {
				show:false,
				value1: 0,
				value2: 0,
				value3: 0,
				value4: 0,
				 option1: [
				      { text: '全部商品', value: 0 },
				      { text: '新款商品', value: 1 },
				      { text: '活动商品', value: 2 },
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
						 province_list: {
						    110000: '北京市',
						    120000: '天津市',
						  },
						  city_list: {
						    110100: '北京市',
						    120100: '天津市',
						  },
						  county_list: {
						    110101: '东城区',
						    110102: '西城区',
						    // ....
						  }
					}
			}
		},
		components:{
			driverInfoList
		},
		methods: {
			areaClick(){
				this.show=true
			}
		}
	}
</script>

<style lang="scss" scoped>
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
						width: 180rpx;
						font-size: 28rpx;
						font-weight: bold;

					}
					.goods_info_r{
						padding: 15rpx;
						height: 75rpx;
						border: 1px solid rgb(215,215,215);
				}
			}
		}
	}
	}
</style>
