<template>
	<view class="bus">
		<view class="search">
			<view class="top_search">
				<view class="search_icon">
					<view class="yticon icon-sousuo"></view>
				</view>
				<input class="search_input" placeholder="搜索公司"/>
			</view>
		</view>
		<!-- 企业列表 -->
		<view class="list_whole">
			<view class="list" v-for="(item,index) in 6" :key="index">
				<view class="list_top">
					<text class="yticon icon-dianpu"></text>
					<text class="list_name">广州鹰路物流有限公司</text>
				</view>
				<view class="list_bottom">
					<view class="list_pic">
						<image src="../../static/dianpu.png"></image>
					</view>
					<view class="list_info">
						<view class="list_info_add">
							<view class="list_icon">
								<text class="yticon icon-dianpu dianpus"></text>
							</view>
							<text class="addss">广州八方六元点</text>
						</view>
						<view class="list_info_add">
							<view class="list_icon">
								<text class="yticon icon-dianhua"></text>
							</view>
							
							<text class="adds">广州八方六元点</text>
						</view>
						<view class="list_info_add">
							<view class="list_icon">
								<text class="yticon icon-dizhi"></text>
							</view>
							
							<text class="add">广州八方六元点</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		// padding:15rpx 30rpx;
		position: fixed;
		z-index: 1300;
		background-color: rgb(251,216,74);
		// top: 20rpx;
		// width: 100%;
		width: 100%;
		height: 100rpx;
		.top_search{
			display: flex;
			flex-direction: row;
			background-color: white;
			padding: 15rpx 30rpx;
			margin: 0 28upx;
			position: fixed;
			z-index: 1300;
			top: 20rpx;
			width: 93%;
			border-radius: 30rpx;
			align-items: center;
			.search_icon{
				
			}
			.search_input{
				width: 100%;
				height: 100%;
				outline: none;
				border:none;
				padding-left: 30rpx;
			}
		}
	}
	.list_whole{
		
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
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
			padding: 10rpx 30rpx;
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
					width: 180rpx;
					height: 120rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list_info{
					padding-left: 30rpx;
					display: flex;
					flex-direction: column;
					.list_info_add{
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						.add{
							padding-left: 20rpx;
						}
						.addss{
							padding-left: 15rpx;
						}
						.adds{
							margin-left: 25rpx;
						}
					}
				}
			}
		}
	}
</style>
