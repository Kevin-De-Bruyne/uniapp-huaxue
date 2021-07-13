<template>
	<view>
		<view class="top">
			<view class="phone_edit">
				<view class="phone">
					<view class="phone_l">手机号</view>
					<view class="phone_r">
						<text class="num">18928704486</text>
						<text class="edit">编辑</text>
					</view>
					
				</view>
			</view>
			<view class="phone_edit">
				<view class="phone">
					<view class="phone_l">联系电话</view>
					<view class="phone_r">
						<text class="num" style="color: rgb(217,217,217);">您可以添加多个电话</text>
						<text class="edit">编辑</text>
					</view>
					
				</view>
			</view>
			<!-- 身份证信息 -->
			<view class="ID_card_box">
				<view class="idcard_t">身份证信息</view>
				<view class="idcard_b">
					<view class="add_card">+添加身份证</view>
					<view class="card_tips">信息齐全,发货更方便</view>
				</view>
			</view>
			
			<view class="ID_card_box">
				<view class="idcard_t">工作资料信息</view>
				<view class="idcard_b">
					<view class="add_card">+添加身份证</view>
					<view class="card_tips">信息齐全,发货更方便</view>
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
 .top{
	 display: flex;
	 flex-direction: column;
	 .phone_edit{
		 padding: 30rpx 20rpx;
		 padding-bottom: 20rpx;
		 border-bottom: 1px solid rgb(247,247,247);
		 background-color: #fff;
		 .phone{
			display: flex;
			justify-content: space-between; 
			
			align-items: center;
			
			
			.phone_l{
				font-weight: bold;
				font-size: 28rpx;
			}
			.phone_r{
				display: flex;
				flex-direction: row;
				font-size: 28rpx;
				align-items: center;
			}
		 }
		 .num{
			 font-weight: bold;
			 padding-right: 35rpx;
		 }
		 .edit{
			 font-size: 28rpx;
			 color: rgb(68,204,105);
		 }
	 }
	 // 身份证信息
	 .ID_card_box{
		 margin-top: 30rpx;
		 background-color: #fff;
		 display: flex;
		 flex-direction: column;
		 .idcard_t{
			 border-bottom: 1px solid rgb(241,241,241);
			 padding: 30rpx 20rpx;
			 font-size: 33rpx;
			 font-weight: bold;
		 }
		 .idcard_b{
			 display: flex;
			 flex-direction: column;
			 padding: 30rpx 0;
			 align-items: center;
			 .add_card{
				 border-radius: 20rpx;
				 background-color: rgb(68,204,105);
				 text-align: center;
				 text-align: center;
				 color:white;
				 padding: 20rpx 90rpx;
			 }
			 .card_tips{
				 font-size: 24rpx;
				 color: rgb(217,217,217);
				 margin-top: 30rpx;
				 
		 }
		 
	 }
 }
 }
</style>
