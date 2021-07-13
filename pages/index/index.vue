<template>
	<view class="container">
		<!-- 引导添加小程序 -->
		<!-- #ifdef MP-WEIXIN -->
	<!-- 	<view class="guidance-my" v-if="guidanceMy">
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
	<!-- 			<view class="list">
					<view class="padding text-left min-title">
						<span class="text-red">1、</span>
						点右上
						<image style="height: 60upx;position: relative;top:0;" mode="heightFix" src="../../static/guidance.png"></image>
						添加到“我的小程序”
					</view>
					<view>
						<image src="../../static/guidance-1.png" style="height: 100upx;" mode="aspectFit"></image>
					</view>
					<view class="padding text-left min-title">
						<span class="text-red">2、</span>
						回到微信首页，向下拉动
					</view>
					<view>
						<image src="../../static/guidance-2.png" style="height: 140upx;" mode="aspectFit"></image>
					</view>
					<view class="padding text-left min-title">
						<span class="text-red">3、</span>
						从“我的小程序”中，进入
					</view>
					<view>
						<image src="../../static/guidance-3.png" style="height: 140upx;" mode="aspectFit"></image>
					</view>
				</view> -->
				<view @tap="modalName = null" class="guidance-modal-close">
					<view class="cuIcon-roundclose"></view>
				</view>
			</view>
			
		</view>
		<official-account v-if="!wechat"></official-account>
		<!-- #endif -->
		<!-- 头部轮播 -->
		<view class="carouselAndCate">
			<view class="carousel-section">
				<!-- 标题栏和状态栏占位符 -->
				<!-- 搜索栏 -->
<!-- 				<view class="search">
					<view class="top_search">
						<view class="search_icon">
							<view class="yticon icon-sousuo"></view>
						</view>
						<input class="search_input" placeholder="搜索公司"/>
					</view>
				</view> -->
				
				<view class="backtop">
					
				</view>
				<!-- <view class="titleNview-placing"></view> -->
				<!-- 背景色区域 -->
				<!-- <view class="titleNview-background" style="backgroundColor:rgb(203, 87, 60)"></view> -->
				<swiper class="carousel" circular @change="swiperChange">
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToWwiperPage({item})">
						<image :src="item.resources.img" @click="navTo(item.url)"/>
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
			<!-- 分类 -->
	<!-- 		<view class="cate-section">
				<view v-for="(item,index) in navList" :key="index" class="cate-item" @click="navTos(item.url)">
					<image v-if="navList" :src="item.icon || smallImage(80)" lazy-load></image>
					<text>{{item.name}}</text>
				</view>
			</view> -->
		</view>
		
		
	<!-- 	<view class="ad-1">
			<image v-if="adData.resources" :src="adData.resources.img" mode="scaleToFill" lazy-load  @click="navTo(adData.url)"></image>
		</view> -->
		<!-- 遮罩层 -->
		<view class="zhezhaoAndact">
			<view class="zhezhao">
				<view class="zhezhao_t">
					<view class="zhao_ls">
										<text style="font-size: 32rpx;font-weight: bold;">指导单位</text>
										<swiper :vertical="vertical" autoplay>
											<swiper-item v-for="(item,index) in guide.data" :key="index">
												<text style="font-size: 22rpx;text-align: left;">{{item.title}}</text>
					<!--                  <text style="font-size: 24rpx;text-align: center;">广东省农业农村厅</text>
												<text style="font-size: 24rpx;text-align: center;">广东省农业农村厅</text>
												<text style="font-size: 24rpx;text-align: center;">广东省农业农村厅</text>
												<text style="font-size: 24rpx;text-align: center;">广东省农业农村厅</text>
												<text style="font-size: 24rpx;text-align: center;">广东省农业农村厅</text> -->
											</swiper-item>
										</swiper>
				    </view>
					<view class="zhao_r">
						<text style="font-size: 32rpx;font-weight: bold;">支持单位</text>
						<swiper :vertical="vertical" autoplay>
							<swiper-item v-for="(item,index) in support.data" :key="index">
								<text style="font-size: 22rpx;text-align:left;">{{item.title}}</text>
							</swiper-item>
						</swiper>
					</view>
									
									
				</view>
			
				<view class="zhezhao_b">
					<view class="zhao_l">
						<text style="font-size: 32rpx;font-weight: bold;">主办单位</text>
						 <maoScroll  v-if="sponsor.length!=0" :data="sponsor" :showNum="showNum" :lineHeight="lineHeight" :animationScroll="animationScroll" :animation="animation">
						   <template v-slot="{lines}">
						    <view class="line">{{lines.title}}</view>
						   </template>
						 </maoScroll>
					</view>
				</view>
		
			</view>
			<!-- 广告轮播图 -->
			<view class="advertisment">
				<view class="ad_whole">
					<swiper autoplay>
						<swiper-item v-for="(item,index) in activity_part" :key="index" @click="activity(item.url)">
							<image :src="item.resources.img"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="act_whole">
				<view class="act_part">
					<view class="act_l" @click="act_lenglian">
						<!-- <image :src="urlHeader+url1"></image> -->
						 <u-image :src="urlHeader+url1" :fade="true" duration="450" height="300rpx"></u-image>
						<view class="act_l_box">
							<text style="font-size: 29rpx;">找冷库</text>
							<text style="font-size: 25rpx;">保质保量，新鲜方便</text>
							<!-- <text>{{fullName}}</text> -->
						</view>
					</view>
					<view class="act_r">
						<view class="act_r_t" @click="act_r">
							<image :src="urlHeader+url2"></image>
							<view class="act_l_box">
								<text style="font-size: 29rpx;">找货源</text>
								<text style="font-size: 25rpx;">海量资源 服务可评</text>
							</view>
						</view>
						<view class="act_r_b" @click="act_l">
							<image :src="urlHeader+url3"></image>
							<view class="act_l_box">
								<text style="font-size: 29rpx;">找物流</text>
								<text style="font-size: 25rpx;">方便快捷,准时到达</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	
		<!-- 五个专区 -->
		<view class="hx_part">
			<!-- <view class="hx_title">企业名录</view> -->
			<view class="hx_part_t">
				<view class="list" v-for="(item,index) in navList" :key="index" @click="navClick(item.url)"
				:style="{backgroundImage:'url('+item.bgc+')'}">
					<!-- <image :src="item.icon"></image> -->
					<text class="list_text">{{item.name}}</text>
					<text class="yticon icon-tiaozhuan tz"></text>
				</view>
			</view>
			<view class="hx_part_b">
				
			</view>
		</view>
		<!-- 新闻模块 -->
		<view class="news_part">
			<view class="news_whole">
				<view class="news_t">
					<text>最新资讯</text>
					<text class="more" @click="more">查看更多 ></text>
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
		<!-- 企业名录 -->
		<view class="company_minglu">
			<view class="hx_title">企业推荐</view>
<!-- 			<view class="company_minglu_t">
				<view class="company_t_list" @click="company(item.url,item.id,item.name)" v-for="(item,index) in qiye_minglu" :key="index">{{item.name}}</view>
			</view> -->
			<view class="company_minglu_b">
				<view class="company_b_list" v-for="(item,index) in product" :key="index" @click="productClick(item.id)">
					<image :src="item.logo" mode="aspectFill"></image>
				</view>
			</view>
		</view>

		<!-- 为你推荐 -->
<!-- 		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">为你推荐</text>
				<text class="tit2">Recommend To You</text>
			</view>
		</view>
		
		<view class="guess-section">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="guess-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="item.resources.img | smallImage(250)" mode="aspectFill" lazy-load></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<text class="price">￥{{item.order_price | 1000}}</text>
			</view>
		</view> -->
		

	</view>
</template>

<script>
import Text from '../../api/text'
import Product from '../../api/product'
import Article from '../../api/article'
import UserInfo from '../../api/user_info'
import Good from '../../api/good'
import Banner from '../../api/banner'
import maoScroll from '@/components/mao-scroll/mao-scroll.vue';
import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		components:{
			 maoScroll
		},
		data() {
			return {
				modalName: null,
				showNum: 5,
				lineHeight: 50,
			    animationScroll: 800,
				animation: 2000,
				wechat: null,
				guidanceMy: false,
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				product:[],
				guide:[],
				datas:[
					{
						title:'草泥马',
					},
					{
						title:'草泥马',
					},
					{
						title:'草泥马',
					},
					{
						title:'草泥马',
					},
					{
						title:'草泥马',
					},
					{
						title:'草泥马',
					},
					{
						title:'草泥马',
					}
				],
				sponsor:[],
				support:[],
				adData: {},
				vertical:true,
				page:1,
				activity_part:[],
				data:[],
				wz:'',
				firstName:'曼城',
				lastName:'欧冠冠军',
				ctegory:[],
				urlHeader:'',
				url1:'/storage/static/images/index1.png',
				url2:'/storage/static/images/index2.png',
				url3:'/storage/static/images/index3.png',
				navList:[
					{
						icon:require('../../pageA/static/lenglian.png'),
						name:'产业专区',
						url:'/pageA/product_part/product_part',
						bgc:require('../../static/nav4.png')
					},
					{
						icon:require('../../pageA/static/zhanxiao.png'),
						name:'展销专区',
						url:'/pageA/sell_part/sell_part',
						bgc:require('../../static/nav2.png')
					},
					{
						icon:require('../../pageA/static/zhaomu2.png'),
						name:'招募专区',
						url:'/pageA/zhaomu_part/zhaomu_part',
						bgc:require('../../static/nav3.png')
					},
					{
						icon:require('../../pageA/static/chanye.png'),
						name:'活动专区',
						url:'/pageA/article_list/article_list',
						bgc:require('../../static/nav1.png')
					},
					// {
					// 	icon:require('../../pageA/static/dongtai.png'),
					// 	name:'动态专区',
					// 	url:'/pages/article/column'
					// }
				],
				qiye_minglu:[
					{
						name:'冷链仓储',
						url:'/pageA/sell_list/sell_list',
						id:1,
						name:'冷链仓储'
					},
					{
						name:'冷链物流',
						url:'/pageA/sell_list/sell_list',
						id:2,
						name:'冷链物流'
					},
					{
						name:'生产加工',
						url:'/pageA/sell_list/sell_list',
						id:3,
						name:'生产加工'
					},
					{
						name:'销售流通',
						url:'/pageA/sell_list/sell_list',
						id:4,
						name:'销售流通'
					},
					{
						name:'数字农业',
						url:'/pageA/sell_list/sell_list',
						id:5,
						name:'数字农业'
					},
				]
			};
		},
		computed:{
			...mapState(['alen']),
			     fullName: {
	                   get: function () {
			          return this.firstName + ' ' + this.lastName
			          },
			          set: function (fullName) {
			            var arr = fullName.split(' ');
			            // 以空格来分，将一个字符串分割成了两个字符串
			            this.firstName = arr[0]
			            this.lastName = arr[1]
			         }
			     }
		},
		onLoad() {
			// this.changeAlen('好酸啊')
			console.log(this.$url)
			this.urlHeader=this.$url
			this.getText()
			this.loadData().then(res=>{
				// console.log(res)
			})
			this.loadData2()
			this.getProduct()
			// #ifdef MP-WEIXIN 
			this.wechat=uni.getStorageSync('dsshopUserInfo').wechat
			// #endif
			if(!uni.getStorageSync('applyDsshopGuidanceMy')){
				this.guidanceMy = true
			}
		},
		mounted(){
			
		},
		onShow(){
			let str = 'this is a test'
			console.log(str.split('s'))
			this.zly().then(res=>{
				console.log(res)
			})
			getApp().showDsshopCartNumber()
			
		},
		methods: {
			/**
			 * 请求数据
			 */
			async zly(){
				return '赵丽颖好美啊'
			},
			...mapMutations(['changeAlen']),
			activity(url){
				if(url!=null){
					uni.navigateTo({
						url: '../../pages/article/details?list=0&id='+url
					})
				}
				
			},
			     createData: function(){
			                for(let i = 1; i <= this.count; i++){
			                    this.data.push({
			                        author: 'MaoUI',
			                        subject: 'OnePlus手机 * ' + i + '部'
			                    })
			                }
			            },
			group(array, subGroupLength) {
			      let index = 0;
			      let newArray = [];
			      while(index < array.length) {
			          newArray.push(array.slice(index, index += subGroupLength));
			      }
			      return newArray;
			  },
			getText(){
				var that=this
				let dd={title:'犯得上发生'}
				that.datas.push(dd)
				Text.getList({},function(res){
					that.sponsor=res.sponsor.data
					that.sponsor.forEach((item,index)=>{
						that.datas.push(item)
					})
					
					console.log(that.datas)
					
					that.guide=res.guide
					 
					that.support=res.support
				})
			},
			productClick(id){
				this.changeAlen('赵丽颖')
				console.log(this.alen)
				uni.navigateTo({
					url:`/pageA/qiye_detail/qiye_detail?id=${id}`
				})
			},
			company(url,id,name){
				uni.navigateTo({
					url:`/pageA/sell_list/sell_list?id=${id}&name=${name}`
				})
			},
			more(){
				uni.navigateTo({
					url:'/pageA/article_list/article_list'
				})
			},
			goNavigator(item){
				uni.navigateTo({
					url: '../../pages/article/details?list=0&id='+item.id
				})
			},
			navClick(url){
				uni.navigateTo({
					url
				})
			},
			getProduct(){
				var that=this
				Product.getList({},function(res){
					that.product=res.data
					that.product=that.product.slice(0,12)
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
			act_l(){
				uni.navigateTo({
					url:'/pageA/driver_info/driver_info'
				})
			},
			act_r(){
				uni.navigateTo({
					url:'/pageA/source/source'
				})
			},
			act_lenglian(){
				uni.navigateTo({
					url:'/pageA/lengku_part/lengku_part'
				})
			},
			async loadData() {
				const that = this
				// 轮播
				await Banner.getList({
					limit: 5,
					type: 0,
					sort: '+sort'
				},function(res){
					that.carouselList = res.data
					that.swiperLength = res.data.length
					console.log(111)
				})
				// 活动专区
				await Banner.getList({
					limit: 5,
					type: 4,
					sort: '+sort'
				},function(res){
					that.activity_part=res.data
				})
				// 首页广告
				await Banner.getList({
					type: 1,
					limit: 1,
					sort: '+sort'
				},function(res){
					that.adData = res.data[0]
					console.log(333)
				})
				// 推荐商品
				await Good.getList({
					limit: 10,
					is_recommend: 1,
				},function(res){
					that.goodsList = res.data
					console.log(444)
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
				console.log(55)
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					// url: `/pages/product/product?id=${id}`
					url: `/pageA/product_detail/product_detail?id=${id}`
					
				})
			},
			//跳转
			// navTo(url){
			// 	if(url){
			// 		uni.navigateTo({
			// 			url
			// 		})  
			// 	}
				
			// }, 
			navTos(url){
				console.log(url)
				uni.navigateTo({
					url
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
		onShareAppMessage: function( options ){
		　　var that = this;
		　　// 设置菜单中的转发按钮触发转发事件时的转发内容
		　　var shareObj = {
		　　　　title: "华雪云链",    // 默认是小程序的名称(可以写slogan等)
		　　　　path: '/pages/index/index',    // 默认是当前页面，必须是以‘/'开头的完整路径
		　　　　imageUrl: '',   //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		　　　　success: function(res){
		　　　　　　// 转发成功之后的回调
		　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
		　　　　　　}
		　　　　},
		　　　　fail: function(){
		　　　　　　// 转发失败之后的回调
		　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
		　　　　　　　　// 用户取消转发
		　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
		　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
		　　　　　　}
		　　　　},
		// 　　　　complete: fucntion(){
		// 　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
		// 　　　　}
		complete:function(){
			
		}
		　　};
		　　// 来自页面内的按钮的转发
		// 　　if( options.from == 'button' ){
		// 　　　　var eData = options.target.dataset;
		// 　　　　console.log( eData.id);   // shareBtn
		// 　　　　// 此处可以修改 shareObj 中的内容
		// 　　　　shareObj.path = '/pages/goods/goods?goodId='+eData.id;
		// 　　}
		　　// 返回shareObj
		　　return shareObj;
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
	.u-icon{
		font-size: 100rpx!important;
	}
	.maoScroll-main{
		font-size: 22rpx!important;
	}
	.zhezhaoAndact{
		// background-color: rgb(69,172,116);
		position: relative;
		top: 600rpx;
			z-index: 1400;
	}
	.zhezhao{
		margin: 0 35rpx;
		border-radius: 30rpx;
		background-color: black;
		padding: 30rpx 30rpx 30rpx 30rpx;
		height: 320rpx;
	
		// margin-top: 300rpx;
		display: flex;
		flex-direction: row;
		// justify-content:center;
		// align-items: center;
		color: white;
		opacity: 0.4;
		.zhezhao_t{
			display: flex;
			flex-direction:column;
			justify-content: flex-start;
			width: 265rpx;
		}
		.zhezhao_b{
			display: flex;
			flex-direction:row ;
		}
		.zhao_l{
			// height: 50rpx;
			font-size: 26rpx;
			// white-space: nowrap;
			display: flex;
			flex-direction: column;
			swiper{
				width: 360rpx;
				height: 145rpx;
				swiper-item{
					display: flex;
					flex-direction: column;
				}
				.swipe{
						// height: 200rpx!important;
						line-height: 55rpx;
				}
				.line{
					white-space: nowrap;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 22rpx;
				}
			}
	}
	.zhao_ls{
			// height: 50rpx;
			font-size: 26rpx;
			// white-space: nowrap;
			display: flex;
			width: 265rpx;
			flex-direction: column;
			swiper{
				width: 265rpx;
				height: 65rpx;
				swiper-item{
					display: flex;
					flex-direction: column;
				}
			}
	}
	.zhao_r{
			font-size: 26rpx;
			white-space: nowrap;
			display: flex;
			margin-top: 40rpx;
			width: 265rpx;
			flex-direction: column;
			swiper{
				width: 320rpx;
				// height: 65rpx;
				swiper-item{
					display: flex;
					flex-direction: column;
				}
				
			}
			.swipe{
					height: 200rpx;
			}
	}
	}
	.advertisment{
		padding: 0 35rpx 15rpx 35rpx;
		// height: 380rpx;
		background-color: rgb(68,169,113);
		.ad_whole{
			background-color: #fff;
			// margin-top: -65rpx;
			position: relative;
			top: -50rpx;
			padding: 30rpx;
			swiper-item{
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
	}
	// 新闻模块
	.news_part{
		display: flex;
			padding: 10rpx 35rpx 10rpx 35rpx;
		flex-direction: column;
		background-color: rgb(69,172,116);
		.news_whole{
			display: flex;
			flex-direction: column;
		    padding: 30rpx;
			border-radius: 10rpx;
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
	// 企业名录
	.company_minglu{
		display: flex;
		flex-direction: column;
		background-color: rgb(71,172,116);
		padding: 10rpx 35rpx 35rpx 35rpx;
	    .hx_title{
			font-size: 30rpx;
			font-weight: bold;
			color: white;
			// margin-left: 30rpx;
			margin-left: 5rpx;
			margin-bottom: 15rpx;
		}
		.company_minglu_t{
			display: flex;
			justify-content: space-between;
			.company_t_list{
				padding:10rpx;
				color: white;
				// background-color: rgb(236,118,104);
				background-image: linear-gradient(to right,rgb(250,117,104),rgb(253,145,134));
				border-radius: 10rpx;
			}
		}
		.company_minglu_b{
			display: flex;
			flex-wrap: wrap;
			margin-top:15rpx;
			.company_b_list{
				border-radius: 10rpx;
				padding:15rpx 36rpx;
				// width: 31%;
				margin: 10rpx 7rpx 10rpx 9rpx;
				background-color: #fff;
				display: flex;
				margin-bottom: 15rpx;
				justify-content: center;
				// flex: 0 0 31%;
				image{
					width: 140rpx;
					height: 50rpx;
				}
			}
		}
	}
	.hx_part{
		// margin-top: 30rpx;
		padding: 0rpx 35rpx 30rpx 35rpx;
		padding-top:630rpx;
		// margin-left: 30rpx;
		// padding-left: 40rpx;
		// padding-right: 40rpx;
		background-color: rgb(69,172,116);
		display: flex;
		// flex-direction: column;
	
		.tz{
			position: absolute;
			right: 30rpx;
			bottom: 30rpx;
			font-size: 40rpx;
			color: white;
		}
		.hx_part_t{
			display: flex;
			padding: 0rpx;
			flex-wrap: wrap;
			align-content: center;
			justify-content: space-between;
			.list{
				margin: 10rpx 0;
				// padding: 20rpx;
				// width: 55%;
				width: 330rpx;
				position: relative;
				height: 150rpx;
				background-size: 100%;
				border-radius: 10rpx;
				background-color: rgb(237,247,210);
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				image{
					width: 90rpx;
					height: 90rpx;
					border-radius: 25rpx;
				}
				.list_text{
					position: absolute;
					bottom: 10rpx;
					left: 30rpx;
					color: white;
					font-size: 28rox;
					font-weight: bold;
				}
			}
		}
	}
	.container{
		// background-color: green;
	}
	.act_whole{
		padding:30rpx 35rpx 0 35rpx;
	    // margin-top: 200rpx;
		height: 340rpx;
		// margin-top: 30rpx;
		// position: relative;
		background-color: rgb(68,169,113);
	}
	.act_part{
		display: flex;
		width: 100%;
		// position: absolute;
		justify-content: space-between;
		flex-direction: row;
		// top: -30rpx;
			z-index: 1500;
		position: relative;
		top:-60rpx;
		// margin-top: 15rpx;
	background-color: #fff;
		padding: 30rpx 30rpx 30rpx 30rpx;

		// z-index: 2000;

		.act_l{
			height:300rpx;
			width: 49%;
			position: relative;
			image{
				width: 100%;
				// filter: blur(2px);
				height: 100%;
			}
			.act_l_box{
				font-weight: bold;
				font-size: 28rpx;
				// color: rgb(251,248,85);
				color: white;
				text-shadow: 3px 3px 3px black;
				display: flex;
				flex-direction: column;
				position: absolute;
				transform: translate(-50%,-50%);
				top: 30%;
				left: 50%;
				text{
							white-space: nowrap;
				}
			}
		}
		.act_r{
			display: flex;
			width: 49%;
			flex-direction: column;
			justify-content: flex-end;
			.act_r_t{
				height: 145rpx;
				margin-bottom: 15rpx;
				position: relative;
				image{
					width: 100%;
				
					height: 100%;
				}
				.act_l_box{
					font-weight: bold;
					font-size: 28rpx;
					color: white;
					text-shadow: 3px 3px 3px black;
					display: flex;
					flex-direction: column;
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
					text{
								white-space: nowrap;
					}
					}
			}
			.act_r_b{
				height: 145rpx;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.act_l_box{
					font-weight: bold;
					font-size: 28rpx;
					color: white;
					text-shadow: 3px 3px 3px black;
					display: flex;
					flex-direction: column;
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
					text{
								white-space: nowrap;
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
		.carouselAndCate{
			background-image: linear-gradient(to bottom,#0FBD3E,white);
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
				background-color: rgb(68,204,105);
					// background-color: rgb(251,216,74);
					
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
				
				.backtop{
					width: 100%;
					height: 10rpx;
					
					
					border-bottom-left-radius:40rpx;
					border-bottom-right-radius:40rpx;
				}
				.titleNview-placing {
					padding-top: 0;
					height: 0;
				}
				.carousel{
					position: absolute;
					top: 0;
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
		height: 930upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 0;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			// border-radius: 30upx;
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
		// background: #fff;
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
