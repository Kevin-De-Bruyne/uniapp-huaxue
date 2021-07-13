import Network from '../utils/network.js'
export default{
	getList(data,success,fail) {
		Network.setGetMessage('exhibitsell',data,'加载中', function (res) {
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
		Network.setGetMessage('exhibitsell/'+id,data,'加载中', function (res) {
		  success(res)
		}, function (res) {	
		  uni.showToast({
			title: res.message,
			icon: 'none',
			duration: 2000
		  })
		})
	},
}