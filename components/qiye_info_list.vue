<template>
	<view>
		<view class="list_whole">
			<view class="list" v-for="(item,index) in qiye" :key="index" @click="listClick(item.id)">
				<view class="list_top">
					<text class="yticon icon-dianpu"></text>
					<text class="list_name">{{item.title}}</text>
				</view>
				<view class="list_bottom">
					<view class="list_pic">
						<image :src="item.resources.img"></image>
					</view>
					<view class="list_info">
						<view class="list_info_add">
							<view class="addss" v-html="item.content"></view>
						</view>
						<view class="list_info_adds">
							<view class="list_icon">
								<text class="yticon icon-dizhi"></text>
							</view>
							
							<text class="adds">{{item.address}}</text>
						</view>
						<view class="list_info_addss">
							<text class="add">{{item.price}}元 / 天 / 立方</text>
							<view class="dianhua_box">
								<text class="yticon icon-dianhua" style="color: white;" @click.stop="makePhone(item.mobile)"></text>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"qiye_info_list",
		data() {
			return {
				
			};
		},
		props:{
			qiye:{
				type:Array,
				default:[]
			}
		},
		methods:{
			listClick(id){
				uni.navigateTo({
					url:`/pageA/zhaomu_detail/zhaomu_detail?id=${id}`
				})
			},
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
	.list_whole{
		padding-bottom: 110rpx;
		display: flex;
		flex-direction: column;
		// padding-top: 100rpx;
		.list:nth-child(0){
			margin-top: 0;
		}
		.list{
			.dianpus{
				color: rgb(255,188,140);
			}
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-top: 10rpx;
			padding: 30rpx 30rpx;
			.list_top{
				flex-direction: row;
				align-items: center;
				display: flex;
				.list_icon{
					width: 40rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.list_name{
					font-size: 26rpx;
			
				}
			}
			.list_bottom{
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				.list_pic{
					width: 200rpx;
					height: 160rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list_info{
					padding-left: 30rpx;
					display: flex;
					max-width: 500rpx;
					flex-direction: column;
					.list_info_addss{
						display: flex;
						justify-content: space-between;
						align-items: center;
							.dianhua_box{
								border-radius: 50%;
								background-color: rgb(68,204,105);
								width: 55rpx;
								height: 60rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								}
							.add{
								padding-left: 10rpx;
								color: red;
								font-size: 22rpx;
								min-width: 400rpx;
							}
						
						
						.addss{
							padding-left: 15rpx;
							font-weight: bold;
							font-size: 26rpx;
						}
						.adds{
							margin-left: 25rpx;
							max-width: 580rpx;
						}
					}
					.list_info_add{
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						.add{
							padding-left: 10rpx;
							color: red;
							font-size: 22rpx;
						}
						.addss{
							padding-left: 15rpx;
							font-weight: bold;
							font-size: 26rpx;
						}
						.adds{
							margin-left: 25rpx;
							max-width: 580rpx;
						}
					}
					.list_info_adds{
						margin-top: 10rpx;
						display: flex;
						font-size: 24rpx;
						align-items: center;
						color: rgb(136,138,138);
						.add{
							padding-left: 20rpx;
						}
						.addss{
							padding-left: 15rpx;
							font-weight: bold;
							font-size: 26rpx;
						}
						.adds{
							margin-left: 25rpx;
							max-width: 500rpx;
							overflow: hidden;
							white-space: nowrap;
												
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>
