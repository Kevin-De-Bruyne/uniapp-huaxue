<template>
	<view class="container">
		<!-- 引导添加小程序 -->
		<!-- #ifdef MP-WEIXIN -->
<!-- 		<view class="guidance-my" v-if="guidanceMy">
			<view class="triangle-top"></view>
			<view @click="popupBoot()" class="bg-black padding-sm margin-top flex">
				<view><span @click.stop="setGuidanceMy" class="icon cuIcon-close text-gray"></span></view>
				<view class="flex-twice text-center">添加到我的小程序，<span class="text-bold">红包、优惠券不错过</span></view>
				<view><span class="icon cuIcon-right text-gray"></span></view>
			</view>
		</view> -->
		<view class="cu-modal" :class="modalName=='guidanceMy'?'show':''">
			<view class="guidance-modal">
				<view class="triangle-top"></view>
				<view class="title bg-red text-xl padding">点<image style="height: 60upx;position: relative;top:0;margin: 0 auto;" mode="heightFix" src="../../static/guidance-white.png"></image>添加小程序</view>
				<view @tap="modalName = null" class="guidance-modal-close">
					<view class="cuIcon-roundclose"></view>
				</view>
			</view>
			
		</view>
		<official-account v-if="!wechat"></official-account>
		<!-- #endif -->
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<!-- 搜索栏 -->
			<view class="search">
				<view class="top_search">
					<view class="search_icon">
						<view class="yticon icon-sousuo"></view>
					</view>
					<input class="search_input" placeholder="搜索公司" v-model="searchinput" @confirm="searchGo"/>
				</view>
			</view>
	
			<view class="backtop">
				
			</view>
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" style="backgroundColor:rgb(203, 87, 60)"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToWwiperPage({item})">
					<image :src="item.resources.img" @click="navTo(item.url)"/>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
	<!-- 		<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view> -->
		</view>
		<!-- 分类 -->
	<view class="cate-section">
		<view v-for="(item,index) in navList" :key="index" class="cate-item" @click="navTos(item.url,item.id,item.name)">
			<image v-if="navList" :src="item.icon || smallImage(80)" lazy-load></image>
			<text>{{item.name}}</text>
		</view>
	</view>
		<!-- 企业列表 -->
		<view class="list_whole">
			<view class="list" v-for="(item,index) in companyList" :key="index" @click="zm_detail(item.id)">
				<view class="list_top">
					<text class="yticon icon-dianpu"></text>
					<text class="list_name">{{item.company_name}}</text>
				</view>
				<view class="list_bottom">
					<view class="list_pic">
						<image :src="item.img"></image>
					</view>
					<view class="list_info">
			<!-- 			<view class="list_info_add">
							<view class="list_icon">
								<text class="yticon icon-dianpu dianpus"></text>
							</view>
							<text class="addss">{{item.company_name}}</text>
						</view> -->
				
						<view class="list_info_add">
							<view class="list_icon">
								<text class="yticon icon-dizhi"></text>
							</view>
							
							<text class="add">{{item.province_name+item.city_name+item.region_name}}</text>
						</view>
						<view class="list_info_add" @click.stop="makePhone(item.contacts_mobile)">
							<view class="list_icon">
								<text class="yticon icon-dianhua"></text>
							</view>
							
							<text class="adds">{{item.contacts_mobile}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="ruzhu_btn">
				<view class="ruzhu_button" @click="apply">招募申请入驻</view>
			</view>
		</view>
		<!-- 入驻按钮 -->
		<tabbar></tabbar>
	</view>
</template>

<script>
import Good from '../../api/good'
import Banner from '../../api/banner'
import ZhaoMu from '../../api/zhaomu'
import tabbar from '../../components/tabbar.vue'
	export default {

		data() {
			return {
				modalName: null,
				wechat: null,
				guidanceMy: false,
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				adData: {},
				ctegory:[],
				companyList:[],
				searchinput:'',
	navList:[
		{
			icon:require('../../pageA/static/icon_cc.png'),
			name:'冷链仓储',
			url:'/pageA/sell_list/sell_list',
			id:1
		},
		{
			icon:require('../../pageA/static/lenglian.png'),
			name:'冷链物流',
			url:'/pageA/sell_list/sell_list',
			id:2
		},
		{
			icon:require('../../pageA/static/icon_jg.png'),
			name:'生产加工',
			url:'/pageA/sell_list/sell_list',
			id:3
		},
		{
			icon:require('../../pageA/static/icon_xs.png'),
			name:'销售流通',
			url:'/pageA/sell_list/sell_list',
			id:4
		},
		{
			icon:require('../../pageA/static/icon_ny.png'),
			name:'数字农业',
			url:'/pageA/sell_list/sell_list',
			id:5
		}
	]
			};
		},
		components:{
			tabbar
		},
		onReachBottom(){
			uni.showLoading({
				title:"",
				icon:'none',
				duration:700
			})
		},
		onLoad() {
			this.loadData()
			this.getZhaomu()
			// #ifdef MP-WEIXIN 
			this.wechat=uni.getStorageSync('dsshopUserInfo').wechat
			// #endif
			if(!uni.getStorageSync('applyDsshopGuidanceMy')){
				this.guidanceMy = true
			}
		},
		onShow(){
			getApp().showDsshopCartNumber()
			
		},
		methods: {
			/**
			 * 请求数据
			 */
			searchGo(){
				var that=this
				ZhaoMu.getList({
					title:this.searchinput
				},function(res){
					// console.log(res.data)
					that.companyList=res.data
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
			},
			navTos(url,id,name){
				if(url){
					uni.navigateTo({
						url:`${url}?id=${id}&name=${name}`
					})  
				}
				
			},
			apply(){
				uni.navigateTo({
					url:'/pageA/apply_ruzhu/apply_ruzhu'
				})
			},
			zm_detail(id){
				uni.navigateTo({
					url:`/pages/bus_detail/bus_detail?id=${id}`
				})
			},
			async getZhaomu(){
				var that=this
				let token=uni.getStorageSync("dsshopApplytoken")
				await ZhaoMu.getList({
					'apply-secret':token
				},function(res){
					console.log(res.data)
					that.companyList=res.data
				})
				
			},
			async loadData() {
				const that = this
				// 轮播
				await Banner.getList({
					limit: 5,
					type: 3,
					sort: '+sort'
				},function(res){
					that.carouselList = res.data
					that.swiperLength = res.data.length
				})
				// 首页广告
				await Banner.getList({
					type: 1,
					limit: 1,
					sort: '+sort'
				},function(res){
					that.adData = res.data[0]
				})
				// 推荐商品
				await Good.getList({
					limit: 10,
					is_recommend: 1,
				},function(res){
					that.goodsList = res.data
				})
				// 推荐分类
				await Good.goodCategory({
					is_recommend: 1
				},function(res){
					that.ctegory = res
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			//轮播跳转
			navToWwiperPage(item) {
				console.log(item)
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// #ifdef MP-WEIXIN
			//弹出引导页
			popupBoot(){
				this.modalName = 'guidanceMy'
				this.guidanceMy = false
				uni.setStorageSync('applyDsshopGuidanceMy', true)
			},
			// 引导添加小程序
			setGuidanceMy(){
				this.guidanceMy = false
				uni.setStorageSync('applyDsshopGuidanceMy', true)
			},
			// #endif
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	.ruzhu_btn{
		width: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		bottom: 130rpx;
		.ruzhu_button{
			padding: 25rpx 140rpx;
			background-color: rgb(69,172,116);
			color: white;
			text-align: center;
			
		}
	}
	.list_whole{
		position: relative;
		display: flex;
		padding-bottom: 110rpx;
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
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}
	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16upx 16upx 0 0;
			// margin-top:-20upx;
		}
		.carousel-section{
			padding: 0;
			position: relative;
			.search{
				// padding:15rpx 30rpx;
				position: fixed;
				z-index: 1300;
					// top: 20rpx;
				background-color: #44CC69;
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
			
			.backtop{
				width: 100%;
				height: 300rpx;
				background-image: linear-gradient(to bottom,#0FBD3E,white);
				border-bottom-left-radius:40rpx;
				border-bottom-right-radius:40rpx;
			}
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				position: absolute;
				top: 100rpx;
				z-index: 1200;
				.carousel-item{
					// padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	
	page {
		background: #f5f5f5;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 250upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 10rpx 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 30upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		margin-top: 50rpx;
		padding: 20rpx;
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 20upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
	}
	
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
	/* 团购楼层 */
	.group-section{
		background: #fff;
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
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
	/* #ifdef MP-WEIXIN */
	.guidance-my{
		position: relative;
		background-color: #FFFFFF;
		.triangle-top{
			position: absolute;
			right: 120upx;
			top: -39upx;
			width: 0;
			height: 0;
			border: 20upx solid;
			border-color: transparent transparent #333333;
		}
		.icon{
			line-height: 40upx;
		}
	}
	.guidance-modal{
		position: relative;
		display: inline-block;
		margin-left: auto;
		margin-right: auto;
		top:40upx;
		width: 90%;
		max-width: 100%;
		background-color: #f8f8f8;
		-webkit-border-radius: 5px;
		border-radius: 10rpx;
		padding-bottom: 60upx;
		.title{
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
			padding-bottom: 40upx;
		}
		.min-title{
			padding-left: 120upx;
		}
		.triangle-top{
			position: absolute;
			right: 100upx;
			top: -39upx;
			width: 0;
			height: 0;
			border: 20upx solid;
			border-color: transparent transparent #e54d42;
			z-index: 1;
		}
	}
	.guidance-modal-close{
		position: absolute;
		width: 100%;
		bottom: -120upx;
		text-align: center;
		.cuIcon-roundclose{
			font-size: 80upx;
			color: #FFFFFF;
		}
	}
	/* #endif */
</style>
