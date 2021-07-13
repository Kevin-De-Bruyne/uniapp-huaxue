	import Network from '../utils/network.js'	
	export default{
		user_post(data,success,fail) {
		Network.setPostMessage('user',data,'处理中', function (res) {
		  success(res)
		}, function (res) {
		  uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		  })
		})
		},
		getList(data,success,fail) {
			Network.setGetMessage('user',data,'加载中', function (res) {
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
