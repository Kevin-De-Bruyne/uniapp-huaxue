<template>
	<view class="qiye">
		<!-- 顶部 -->
		<view class="top">
			<view class="left">
				<!-- <text>企业门面</text> -->
				<image :src="detail.logo"></image>
			</view>
			<!-- <view class="right">
				<view class="rightList" v-for="(item,index) in 3" :key="index">
					<view class="fan_num">100</view>
					<view class="fan_name">粉丝</view>
				</view>
			</view> -->
		</view>
		<!-- 公司信息 -->
		<view class="company">
			<view class="copmany_t">
				<view class="company_name">{{detail.title}}</view>
				<view class="company_phone">
					<text class="yticon icon-dianhua" style="color: white;" @click="makePhone(detail.mobile)"></text>
				</view>
			</view>
			<view class="copmany_b">
				<text class="yticon icon-icon--"></text>
				<text class="name">
					{{detail.contacts}}
				</text>
			</view>
			<view class="copmany_c">
				 <view class="list_icon">
				 	<text class="yticon icon-dizhi"></text>
				 </view>
				 
				 <text class="adds">{{detail.address}}</text>
			</view>
			<!-- 服务和动态 -->
			
		</view>
		<!-- <productInfoList :product="product"></productInfoList> -->
		<!-- 为你推荐 -->
		<van-tabs v-model="active">
		  <van-tab title="产品">
			  <view class="guess-section">
			  	<view 
			  		v-for="(item, index) in detail.goodslist.data" :key="index"
			  		class="guess-item"
			  		@click="navToDetailPage(item)"
			  	>
			  		<view class="image-wrapper">
			  			<image :src="item.resources.img" mode="aspectFill" lazy-load></image>
			  		</view>
			  		<text class="title clamp">{{item.name}}</text>
			  		<!-- <text class="price">￥{{item.order_price | 1000}}</text> -->
			  		<text class="price">￥{{item.order_price}}</text>
			  	</view>
			  </view>
		  </van-tab>
		  <van-tab title="资讯">
			  <view class="news_part">
			  	<view class="news_list" v-for="(item,index) in detail.articlelist.data" :key="index" @click="goNavigator(item)">
			  		<view class="news_l">
			  			<div class="news_l_t">{{item.describes}}</div>
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
		  </van-tab>
		</van-tabs>

	</view>
</template>

<script>
	import Article from '../../api/article'
	import Product from '../../api/product'
	import productInfoList from '../../components/product_info_list.vue'
	export default {
		data() {
			return {
				product:[
										
				],
				detail:{},
				active:0,
				data:[]
			}
		},
		onLoad(options){
			this.id=options.id
			this.getDetail()
			this.loadData2()
		},
		methods: {
			goNavigator(item){
			uni.navigateTo({
				url: '../../pages/article/details?list=0&id='+item.id
			})
			},
			loadData2(type){
				const that = this
				Article.getList(4,{
					limit: 4,
					page: this.page
				},function(res){
					console.log(res.paginate)
					that.data = that.data.concat(res.paginate.data)
					if (res.paginate.last_page > that.page){
						that.page ++
						//判断是否还有数据， 有改为 more， 没有改为noMore
						that.loadingType = 'more'
					} else {
						that.loadingType = 'noMore'
					}
					if(type === 'pull'){
						setTimeout(function () {
							uni.stopPullDownRefresh();
						}, 1000)
					}
				})
			},
			getDetail(){
				var that=this
				Product.getDetail(this.id,{},function(res){
					that.detail=res
				})
			},
			navToDetailPage(item) {
				console.log(55)
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pageA/product_detail/product_detail?id=${id}`
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
		},
		components:{
			productInfoList
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .van-tabs__line{
   background-color: var(--tabs-bottom-bar-color,#44CC69);

	}
	.news_part{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.news_list{
			display: flex;
			padding: 25rpx 35rpx;
			justify-content: space-between;
			flex-direction: row;
			border-bottom: 2px solid rgb(245,245,245);
			.news_l{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				.news_l_t{
					min-width: 350rpx;
					margin-top: 10rpx;
					max-width: 360rpx;
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
				width: 250rpx;
				height: 180rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	/* 猜你喜欢 */
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 20rpx 30upx 30upx 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	.qiye{
		background-color: rgb(241,241,241);
	}
	.top{
		display: flex;
		background-color: #fff;
		// justify-content: space-between;
		padding: 15rpx 30rpx;
		.left{
			border-radius: 50%;
			// border:1px solid rgb(210,210,210);
			height: 180rpx;
			// width: 130rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			font-weight: bold;
			image{
				max-width: 100%;
				height: 100%;
			}
		}
		.right{
			display: flex;
			flex-direction: row;
			width: 500rpx;
			justify-content: space-between;
			padding-left: 50rpx;
			.rightList{
				justify-content: flex-end;
				display: flex;
				flex-direction: column;
				
			}
		}
	}
	// 公司信息
	.company{
		padding: 15rpx 30rpx;
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid rgb(238,238,240);
		flex-direction: column;
		.copmany_t{
			display: flex;
			justify-content: space-between;
			.company_name{
				font-weight: bold;
				font-size: 28rpx;
			}
			.company_phone{
				border-radius: 50%;
				background-color: rgb(68,204,105);
				width: 50rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.add{
					padding-left: 10rpx;
					color: red;
					font-size: 22rpx;
				}
			}
		}
		.copmany_b{
			display: flex;
			margin-top: 30rpx;
			flex-direction: row;
			align-items: center;
			.name{
				padding-left: 30rpx;
			}
		}
		.copmany_c{
			margin-top: 15rpx;
			display: flex;
			padding-bottom: 25rpx;
			flex-direction: row;
			color: rgb(151,134,185);
			.adds{
				// max-width: 500rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
	}
	}
	.serve_part{
		height: 85rpx;
		display: flex;
		background-color: #fff;
		align-items: center;
		border-bottom: 1px solid rgb(238,238,240);
		flex-direction: row;
		.serve{
			font-size: 26rpx;
			color: rgb(251,216,74);
			padding-left: 30rpx;
		}
		.activity{
			font-size: 26rpx;
			padding-left: 30rpx;
		}
	}
</style>
