<template>
	<view>
		<van-tabs v-model="active">
		  <van-tab title="货源">
			  <view class="banner">
			  	<image src="../../pageA/static/farm.png"></image>
			  	<view class="renzheng_box">
			  		认证司机
			  	</view>
			  </view>
			  <!-- 分类筛选 -->
			  <van-dropdown-menu>
			    <van-dropdown-item v-model="value1" :options="option1"/>
			    <van-dropdown-item v-model="value2" :options="option2" />
			     <van-dropdown-item v-model="value3" :options="option3" />
			  </van-dropdown-menu>
			  <!-- 司机列表 -->
			  <sourceInfoList :source="source"></sourceInfoList>
		  </van-tab>
		  <van-tab title="司机信息">
			  <!-- 分类筛选 -->
			  <view class="dropdown">
			  	<van-dropdown-menu>
			  	  <van-dropdown-item v-model="value1" :options="option1"/>
			  	  <van-dropdown-item v-model="value2" :options="option2" />
			  	   <van-dropdown-item v-model="value3" :options="option3" />
			  	</van-dropdown-menu>
			  </view>
			  <!-- 司机列表 -->
			  <driverInfoList :source="driver">
				  <template v-slot:car>
					  <text>赵丽颖啊啊啊啊</text>
				  </template>
			  </driverInfoList>
		  </van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import Source from '../../api/source'
	import sourceInfoList from '../../components/source_info_list.vue'
	import driverInfoList from '../../components/driver_info_list.vue'
	export default {
		data() {
			return {
				 active: 1,
				 value1: 0,
				 value2: 0,
				 value3:0,
			option1: [
				{ text: '出发地', value: 0},
			   { text: '广州', value: 1 },
			   { text: '佛山', value: 2 },
			   { text: '东莞', value: 3 },
								  { text: '深圳', value: 4 },
								   { text: '中山', value: 5 },
			 ],
			 option2: [
			{ text: '目的地', value: 0 }, 
			{ text: '广州', value: 1 },
			{ text: '佛山', value: 2 },
			{ text: '东莞', value: 3 },
			 { text: '深圳', value: 4 },
			  { text: '中山', value: 5 },
			 ],
			 option3: [
			   { text: '时间排序', value: 0 }
			],
				   source:[],
				   driver:[]
			}
		},
		components:{
			sourceInfoList,
			driverInfoList
		},
		onLoad(){
			this.getList()
			this.getList2()
		},
		methods: {
			getList(){
				var that=this
				Source.getList({},function(res){
					that.source=res.data
				})
			},
			getList2(){
				var that=this
				Source.getList2({},function(res){
					that.driver=res.data
					console.log(that.driver)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .van-tabs__line{
	background-color: var(--tabs-bottom-bar-color,#44CC69);
	
		}
	.banner{
		width: 100%;
		position: relative;
		height: 400rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.renzheng_box{
			position: absolute;
			right: 50rpx;
			bottom: 20rpx;
			padding:30rpx 30rpx;
			background-color: #fff;
	}
	}
	/deep/ .van-dropdown-menu{
		  position: relative;
		  top: 0;
		  width: 100%;
		  z-index: 1000;
	}
	.dropdown{
		  height: 90rpx;
	}
</style>
