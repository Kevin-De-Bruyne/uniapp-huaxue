<template>
	<view>
		<view class="list_whole">
				<view class="list u-skeleton" v-for="(item,index) in product" :key="index" @click="listDetail(item.id)">
					<!-- <view class="list_top">
						<text class="yticon icon-dianpu"></text>
						<text class="list_name">{{item.name}}</text>
					</view> -->
					<view class="list_bottom">
						<view class="list_pic">
							<image :src="item.resources.img"></image>
						</view>
						<view class="list_info">
							<view class="list_info_add">
								<text class="addss u-skeleton-fillet">{{item.title}}</text>
							</view>
						
							<view class="list_info_addss">
								<text class="add">主营:{{item.business}}</text>
								<view class="dianhua_box">
									<text class="yticon icon-dianhua" style="color: white;" @click.stop="makePhone(item.mobile)"></text>
								</view>
								
							</view>
							<view class="list_info_adds">
								<view class="list_icon">
									<text class="yticon icon-dizhi"></text>
								</view>
								
								<text class="adds">{{item.address}}</text>
							</view>
						</view>
					</view>
				</view>
			<!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"product_info_list",
		data() {
			return {
				loading: true
			};
		},
		onLoad() {
					// 通过延时模拟向后端请求数据，调隐藏骨架屏
					setTimeout(() => {
						this.loading = false;
					}, 2000)
	     },
		props:{
			product:{
				type:Array,
				default:[]
			}
		},
		methods:{
			listDetail(id){
				this.$emit('listDetail',id)
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
		.list:first-child{
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
				// margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				.list_pic{
					width: 200rpx;
					height: 130rpx;
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
						width: 480rpx;
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
								max-width: 400rpx;
								font-size: 24rpx;
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
						min-width: 400rpx;
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
