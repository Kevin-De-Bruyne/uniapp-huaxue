<template>
	<view>
		<!-- 司机列表 -->
		<view class="driver">
			<view class="driver_list" v-for="(item,index) in source" :key="index">
				<view class="driver_t">
					<view class="position">{{item.city_name}}-{{item.end_city_name}}</view>
					<view class="time">{{item.start_time}}</view>
				</view>
				<view class="driver_b">
					<view class="material">{{item.car_length}}-平板 / 高栏-{{item.weight}}吨</view>
					<!-- <view class="long">距离-10km</view> -->
				</view>
				<view class="driver_b2">
					<view class="category">{{item.remark}}</view>
				</view>
				<view class="driver_c">
					<view class="left">
						<view class="pic">
							<image :src="item.user.portrait"></image>
						</view>
						<text style="margin-left:30rpx;">{{item.user.nickname}}</text>
					</view>
				
					<view class="dianhua_box">
						<text class="yticon icon-dianhua" style="color: white;" @click="makePhone(item.user.name)"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"driver_info_list",
		data() {
			return {
				phone:''
			};
		},
		props:{
			source:{
				type:Array,
				default:[]
			}
		},
		onLoad(){
			this.phone=uni.getStorageSync('cellphone')
			console.log(this.phone)
		},
		methods:{
			makePhone(name){
				wx.makePhoneCall({
				      phoneNumber: name, //仅为示例，并非真实的电话号码
				      success() {
				        console.log('接口调用成功的回调函数')
				      },
				      fail() {
				        console.log('接口调用失败的回调函数')
				      },
				      complete() {
				        console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
				      }
				    })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.driver{
		display: flex;
		// margin-top: 80rpx;
		flex-direction: column;
		.driver_list{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 25rpx 50rpx;
			margin-top: 10rpx;
			.driver_t{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.position{
					font-size: 28rpx;
					font-weight: bold;
				}
				.time{
					color: rgb(171,147,134);
					font-size: 24rpx;
				}
			}
			.driver_b{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 20rpx;
				.material{
					font-size: 24rpx;
					font-weight: bold;
				}
				.long{
					color: rgb(171,147,134);
					font-size: 24rpx;
				}
		}
		.driver_b2{
			margin-top: 20rpx;
			.category{
				color: rgb(171,147,134);
				font-size: 24rpx;
			}
		}
		.driver_c{
			display: flex;
			flex-direction: row;
			margin-top: 20rpx;
			justify-content: space-between;
			.left{
				display: flex;
				flex-direction: row;
				.pic{
					width: 50rpx;
					height: 50rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.dianhua_box{
				border-radius: 50%;
				background-color: rgb(68,204,105);
				width: 55rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				}
			
	}
	}
	}
</style>
