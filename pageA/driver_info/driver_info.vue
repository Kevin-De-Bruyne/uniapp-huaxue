<template>
	<view>
		<!-- 分类筛选 -->
<!-- 		<view class="dropdown">
			<van-dropdown-menu>
			  <van-dropdown-item v-model="value1" :options="option1"/>
			  <van-dropdown-item v-model="value2" :options="option2" />
			   <van-dropdown-item v-model="value3" :options="option3" />
			</van-dropdown-menu>
		</view> -->
		<view class="content">
		
			<LiFilter @change="change" @select="select" :datalist="datalist" :height="height" class="filter"></LiFilter>
			<LiFilter @change="change2" @select="select2" :datalist="datalist2" :height="height"></LiFilter>
			<view 
				v-bind:key="item.value" 
				v-for="item in testList">
				<!-- {{ item.text }} -->
			</view>
		</view>
		<!-- 司机列表 -->
	    <driverInfoList :source="source"></driverInfoList>
	</view>
</template>

<script>
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue';
	import Source from '../../api/source'
	import driverInfoList from '../../components/driver_info_list.vue'
	export default {
		data() {
			return {
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
				  datalist: {},
				  datalist2: {},
				  testList: {},
				  height: 0.6,
				  title: 'Hello',
				  chufa_id:'',
				  daoda_id:''
			}
		},
		components:{
			driverInfoList,
			LiFilter
		},
		onLoad(){
			this.getList2()
			let tempdata = {
				filterType: 1,
				data: []
			};
			let tempdata2 = {
				filterType: 1,
				data: []
			};
			let areaData = require('../static/area.json');
			let areaData2 = require('../static/area.json');
			let typeData = require('../static/type.json');
			let AreaItem = {
				title: '出发地', //排序头的名称
				value: 'c',
				type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
				data: areaData
			};
			let AreaItem2 = {
				title: '目的地', //排序头的名称
				value: 'c',
				type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
				data: areaData2
			};
			tempdata.data.push(AreaItem)
			tempdata2.data.push(AreaItem2)
			this.datalist = tempdata;
			this.datalist2 = tempdata2;
		},
		methods: {
			getList2(){
				var that=this
				Source.getList2({},function(res){
					that.source=res.data
				})
			},
			change(e) {
				console.log('----------change----------');
				console.log(e);
			},
			select(e) {
				var that=this
				console.log('----------select----------');
				console.log(e);
				that.chufa_id=e.data.value
				console.log(that.chufa_id)
				Source.getList2({
					region_id:that.chufa_id
				},function(res){
					that.source=res.data
				})
			},
			change2(e) {
				console.log('----------change----------');
				console.log(e);
			},
			select2(e) {
				console.log('----------select----------');
				console.log(e);
				var that=this
				that.daoda_id=e.data.value
				console.log(that.daoda_id)
				Source.getList({
					end_region_id:that.daoda_id
				},function(res){
					that.source=res.data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
  /deep/ .van-dropdown-menu{
	  position: fixed;
	  top: 0;
	  width: 100%;
	  z-index: 1000;
  }
  .dropdown{
	  height: 90rpx;
  }
  .content{
  	display: flex;
  	flex-direction: row;
  }
</style>
