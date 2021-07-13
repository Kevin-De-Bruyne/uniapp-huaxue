import Network from '../utils/network.js'
export default{
	getList(data,success,fail) {
		Network.setGetMessage('cargo',data,'加载中', function (res) {
		  success(res)
		}, function (res) {
		  uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		  })
		})
	},
	getList2(data,success,fail) {
		Network.setGetMessage('car',data,'加载中', function (res) {
		  success(res)
		}, function (res) {
		  uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		  })
		})
	},
	getLengKu(data,success,fail) {
		Network.setGetMessage('coldstore',data,'加载中', function (res) {
		  success(res)
		}, function (res) {
		  uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		  })
		})
	},
	zhaomu_post(data,success,fail) {
	Network.setPostMessage('cargo',data,'处理中', function (res) {
	  success(res)
	}, function (res) {
	  uni.showToast({
		title: res.message,
		icon: 'none',
		duration: 2000
	  })
	})
	},
	zhaomu_post2(data,success,fail) {
	Network.setPostMessage('car',data,'处理中', function (res) {
	  success(res)
	}, function (res) {
	  uni.showToast({
		title: res.message,
		icon: 'none',
		duration: 2000
	  })
	})
	},
	zhaomu_post3(data,success,fail) {
	Network.setPostMessage('coldstore',data,'处理中', function (res) {
	  success(res)
	}, function (res) {
	  uni.showToast({
		title: res.message,
		icon: 'none',
		duration: 2000
	  })
	})
	}
	}