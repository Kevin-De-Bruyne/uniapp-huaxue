<template>
	<view>
		<!-- 司机列表 -->
		<view class="driver">
			<view class="driver_list" v-for="(item,index) in source" :key="index">
				<view class="driver_c">
	<!-- 				<view class="left">
						<view class="pic">
							<image :src="item.user.portrait"></image>
						</view>
						<text style="margin-left:30rpx;">{{item.user.nickname}}</text>
					</view> -->
				
					<view class="dianhua_box" @click.stop="makePhone(item.contacts_mobile)">
						<text class="yticon icon-dianhua" style="color: white;"></text>
					</view>
				</view>
				<view style="margin-top: -40rpx;">
					<view class="driver_t">
						<text class="position">名称: {{item.name}}</text>
						<text class="time">体积: {{item.volume}} / 库温: {{item.temperature}}</text>
					</view>
					<view class="driver_b">
						<text class="material">地址: {{item.province_name+item.city_name+item.region_name}}</text>
						<!-- <view class="long">4分钟</view> -->
					</view>
					<view class="driver_b">
						<text class="material">联系人: {{item.contacts}}</text>
						<!-- <view class="long">4分钟</view> -->
					</view>
					<view class="driver_b">
						<text class="material">联系电话: {{item.contacts_mobile}}</text>
						<!-- <view class="long">4分钟</view> -->
					</view>
					<view class="driver_b2">
							<text class="category">存放物品: {{item.goods}}</text>
					</view>
					<view class="driver_pic">
						<image :src="item.resources.img"></image>
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
				
			};
		},
		props:{
			source:{
				type:Array,
				default:[]
			}
		},
		methods:{
			makePhone(name){
				console.log(555)
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
			position: relative;
			margin-top: 10rpx;
			.driver_t{
				display: flex;
				flex-direction: row;
				// justify-content: space-between;
				.position{
					font-size: 28rpx;
					font-weight: bold;
				}
				.time{
					// color: rgb(171,147,134);
					font-size: 24rpx;
					padding-left: 30rpx;
				}
			}
			.driver_b{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 20rpx;
				.material{
					font-size: 24rpx;
					// font-weight: bold;
					color: rgb(171,147,134);
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
		.driver_pic{
			position: absolute;
			right:50rpx;
			width: 140rpx;
			height: 140rpx;
			// background-color: red;
			bottom: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.driver_c{
			display: flex;
			flex-direction: row;
			margin-top: 20rpx;
			// width: 60rpx;
			// height: 60rpx;
			justify-content: flex-end;
			// float: right;
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
