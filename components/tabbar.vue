<template>
	<view>
		<view class="tabbar">
			<view class="tabbar_list" v-for="(item,index) in tabbar" @click="tabbars(item.url)" :key="index">
				<view class="tabbar_icon">
					<image :src="item.icon"></image>
				</view>
				<view class="tabbar_name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabbar",
		data() {
			return {
				tabbar:[
					{
						name:'首页',
						icon:'../pageA/static/icon_home_on.png',
						url:'/pages/index/index'
					},
					{
						name:'发布',
						icon:'../pageA/static/icon_fb_on.png',
						url:'/pages/fabu/fabu'
					},
					{
						name:'我的',
						icon:'../pageA/static/icon_me_on.png',
						url:'/pages/mine/mine'
					}
				]
			};
		},
		methods:{
			tabbars(url){
				console.log(url)
				uni.switchTab({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		.tabbar_list{
			display: flex;
			flex-direction: column;
			.tabbar_icon{
				width: 50rpx;
				height: 50rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.tabbar_name{
				font-size: 26rpx;
				text-align: center;
				margin-top: 20rpx;
			}
		}
	}
</style>
