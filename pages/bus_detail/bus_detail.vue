<template>
	<view class="bus_detail">
		<!-- 轮播图 -->
		<view class="swiper_image">
			<image :src="detail.img"></image>
		</view>
		<view class="contact">
			<text class="yticon icon-dianpu" style="margin-left: 20rpx;"></text>
			<text>{{detail.company_name}}</text>
		</view>
		<view class="info_box">
			<view class="phone">
				<view class="phone_l">联系人:</view>
				<view class="phone_r">{{detail.contacts}}</view>
			</view>
			<view class="address">
				<view class="address_l">联系方式:</view>
				<view class="address_r">{{detail.contacts_mobile}}</view>
			</view>
			<view class="bus_intro">
				<view class="bus_intro_l">地址:</view>
				<view class="bus_intro_r">{{detail.province_name+detail.city_name+detail.region_name}}</view>
			</view>
		</view>
		<!-- 公司介绍 -->
		<view class="intro_box">
			<view class="intro_t">公司介绍</view>
			<view class="intro_content" v-html="detail.content"></view>
		</view>
	</view>
</template>

<script>
	import ZhaoMu from '../../api/zhaomu'
	export default {
		data() {
			return {
				id:'',
				detail:{}
			}
		},
		onLoad(options){
			console.log(options.id)
			this.id=options.id
			this.getDetail()
		},
		methods: {
			async getDetail(){
				var that=this
				ZhaoMu.getDetail(this.id,{},function(res){
					that.detail=res
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper_image{
		margin-top: 5rpx;
		width: 100%;
		height: 500rpx;
		image{
		  width: 100%;
		  height: 100%;
		}
	}
	.contact{
		height: 90rpx;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		flex-direction: row;
	}
	.info_box{
		padding: 30rpx;
		display: flex;
		margin-top: 7rpx;
		background-color: #fff;
		flex-direction: column;
		.phone{
			display: flex;
			flex-direction: row;
			.phone_l{
				width: 120rpx;
				text-align: left;
				font-size: 26rpx;
			}
			.phone_r{
				font-size: 23rpx;
				font-weight: bold;
			}
		}
		.address{
			display: flex;
			flex-direction: row;
			margin-top: 25rpx;
			align-items: center;
			.address_l{
				width: 120rpx;
				text-align: left;
				font-size: 26rpx;
			}
			.address_r{
				font-size: 23rpx;
				font-weight: bold;
			}
		}
		.bus_intro{
			display: flex;
			flex-direction: row;
			margin-top: 25rpx;
			.bus_intro_l{
				width: 120rpx;
				text-align: left;
				font-size: 26rpx;
			}
			.bus_intro_r{
				font-size: 23rpx;
				font-weight: bold;
			}
		}
		
	}
	.intro_box{
		padding: 30rpx;
		display: flex;
		background-color: #fff;
		margin-top: 7rpx;
		flex-direction: column;
		.intro_t{
			font-size: 23rpx;
		}
		.intro_content{
			margin-top: 30rpx;
			font-size: 21rpx;
			font-weight: bold;
		}
	}
</style>
