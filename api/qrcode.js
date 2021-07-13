import Network from '../utils/network.js'
export default{
	getCode(data,success,fail) {
		Network.setGetMessage('getwxacod',data,'加载中', function (res) {
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