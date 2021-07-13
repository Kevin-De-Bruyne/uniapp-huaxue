<template>
	<view class="bus_detail">
		<!-- 轮播图 -->
		<view class="swiper_image">
			<image :src="detail.resources.img"></image>
		</view>
		<view class="contact">
			<view class="contact_t">
				<text class="yticon icon-dianpu" style="margin-left: 20rpx;"></text>
				<text>{{detail.title}}</text>
			</view>
			<view class="contact_b">
				15元 / 天 / 立方
			</view>
		</view>
		<view class="info_box">
			<view class="phone">
				<view class="phone_l">联系人:</view>
				<view class="phone_r">{{detail.contacts}}</view>
			</view>
			<view class="address">
				<view class="address_l">联系方式:</view>
				<view class="address_r">{{detail.mobile}}</view>
			</view>
			<view class="bus_intro">
				<view class="bus_intro_l">地址:</view>
				<view class="bus_intro_r">{{detail.address}}</view>
			</view>
		</view>
		<!-- 公司介绍 -->
		<view class="intro_box">
			<view class="intro_t">公司介绍</view>
			<view class="intro_content" v-html="detail.content"></view>
			<!-- 拨打电话按钮 -->
			<view class="call_btn" @click="makePhone(detail.mobile)">拨打电话</view>
		</view>
		
	</view>
</template>

<script>
	import Sell from '../../api/sell_part'
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
			getDetail(){
				var that=this
				console.log(this.id)
				Sell.getDetail(this.id,{},function(res){
					that.detail=res
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
		// height: 90rpx;
		width: 100%;
		display: flex;
		align-items: flex-start;
		background-color: #fff;
		padding: 20rpx 0;
		flex-direction: column;
		.contact_t{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.contact_b{
			padding-left: 30rpx;
			font-size: 23rpx;
			color: red;
			// margin-top: 30rpx;
		}
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
		.call_btn{
			margin: 50rpx auto 0 auto;
			width: 90%;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 30rpx;
			font-weight: bold;
			background-color: rgb(68,204,105);
			color: white;
			text-align: center;
			border-radius: 20rpx;
		}
	}
</style>
