<template>
	<view>
		<van-tabs @change="change" v-model="active">
		  <van-tab :title="item.name" v-for="(item,index) in tab" :key="index">
			  <!-- 新闻模块 -->
			  <view class="news_part">
			  	<view class="news_whole">
			  		<view class="news_t">
			  			<text>最新资讯</text>
			  			<!-- <text class="more" @click="more">查看更多 ></text> -->
			  		</view>
			  		<view class="news_list" v-for="(item,index) in data" :key="index" @click="goNavigator(item)">
			  			<!-- 战报图标 -->
			  			<view class="zhanbao">
			  				<image src="../../static/zhanbao.png"></image>
			  			</view>
			  			<view class="news_l">
			  				<div class="news_l_t">{{item.name}}</div>
			  				<div class="news_l_b">
			  					<!-- <text>来源：南方都市报</text> -->
			  					<text>时间：{{item.created_at}}</text>
			  				</div>
			  			</view>
			  			<view class="news_r">
			  					<image :src="item.resources.img"></image>
			  			</view>
			  		</view>
			  	</view>
			  </view>
		  </van-tab>
		  <!-- <van-tab title="标签 2">内容 2</van-tab> -->
		</van-tabs>
	
	</view>
</template>

<script>
	import Article from '../../api/article'
	export default {
		data() {
			return {
				data:[],
				active:2,
				tab:[]
			}
		},
		onLoad(){
							console.log(this.active)
			this.getArticleType()
			this.loadData2()
		},
		onshow(){
			
		},
		methods: {
			goNavigator(item){
				uni.navigateTo({
					url: '../../pages/article/details?list=0&id='+item.id
				})
			},
			getArticleType(){
				return new Promise((resolve,reject)=>{
					console.log(444)
					var that=this
					Article.getArticleTypes({
						limit:4,
						page:1
					},function(res){
						resolve(res)
						that.tab=res.data
						// console.log(that.tab)
					})
				})
				
			},
		
			change(e){
				console.log(e)
				const that=this
				let index=e.detail.index
				let id=that.tab[index].id
				Article.getArticleList(id,{
					
				},function(res){
					that.data=res.paginate.data
				})
			},
			loadData2(){
					const that=this
					// console.log(id)
					that.getArticleType().then(res=>{
						console.log(res.data[0].id)
						Article.getArticleList(res.data[0].id,{},function(res){
							that.data=res.paginate.data
							console.log(that.data)
						})
					})
					
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	// 新闻模块
	.news_part{
		display: flex;
			padding: 35rpx 0rpx;
		flex-direction: column;
		// background-color: rgb(69,172,116);
		.news_whole{
			display: flex;
			flex-direction: column;
		    padding: 30rpx;
			// border-radius: 10rpx;
			background-color: #fff;
			.news_t{
				text-align: left;
				font-size: 30rpx;
				padding-bottom: 30rpx;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				.more{
					font-size: 24rpx;
					font-weight: normal;
				}
			}
			.news_list{
				display: flex;
				// padding: 0 30rpx 30rpx 30rpx;
				justify-content: space-between;
				flex-direction: row;
				padding: 30rpx 0;
				border-bottom: 2px solid rgb(245,245,245);
				.zhanbao{
					width: 60rpx;
					height: 30rpx;
					margin-right: 30rpx;
					margin-top: 15rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.news_l{
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					.news_l_t{
						min-width: 290rpx;
						margin-top: 10rpx;
						max-width: 290rpx;
					}
					.news_l_b{
						margin-top: 50rpx;
						display: flex;
						flex-direction: row;
						font-size: 19rpx;
						justify-content: space-between;
					}
				}
				.news_r{
					width: 200rpx;
					height: 130rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	
	}
</style>
