import Network from '../utils/network.js'
export default{
	getList(data,success,fail) {
		Network.setGetMessage('companylist',data,'加载中', function (res) {
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
	Network.setPostMessage('company',data,'处理中', function (res) {
	  success(res)
	}, function (res) {
	  uni.showToast({
		title: res.message,
		icon: 'none',
		duration: 2000
	  })
	})
	},
	getDetail(id,data,success,fail) {
			Network.setGetMessage('company/'+id,data,'处理中', function (res) {
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