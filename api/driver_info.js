	import Network from '../utils/network.js'	
	export default{
		driver_post(data,success,fail) {
		Network.setPostMessage('useredit',data,'处理中', function (res) {
		  success(res)
		}, function (res) {
		  uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		  })
		})
		},
		qiye_post(data,success,fail) {
		Network.setPostMessage('useredit',data,'处理中', function (res) {
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
