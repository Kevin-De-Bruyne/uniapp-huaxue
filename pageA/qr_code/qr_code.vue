<template>
	<view class="demo">
		<canvas :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="myCanvas" id="myCanvas"></canvas>
		<button @click="saveImgToLocal">保存图片</button>
	</view>
</template>
<script>
	import qr_code from '../../api/qrcode'
	export default {
		components: {},
		data() {
			return {
				canvasW:0, // 画布宽
				canvasH:0, // 画布高
				SystemInfo:{}, // 设备信息
				goodsImg: {}, // 商品主图
				ewmImg:{}, // 二维码图片
				ewmW:200, // 二维码大小
				title:'COCOSILIYA抖音爆款男女士鎏金沙香水持久自然淡香流沙金香水', // 商品标题
				price:'158.00', // 价格
				Oldprice:'350.00', // 原价
				name:'天涯过客', // 推荐人，
				photo:''
			}
		},
		async onLoad() {
			this.getCode().then(res=>{
				console.log(res.path)
			})
			let qrcode=uni.getStorageSync('qrcode')
			 // 获取设备信息，主要获取宽度，赋值给canvasW 也就是宽度：100%
			this.SystemInfo = await this.getSystemInfo();
			// 获取商品主图，二维码信息，APP端会返回图片的本地路径（H5端只能返回原路径）
			this.goodsImg = await this.getImageInfo('https://huaxue.juaiweb.com/storage/static/images/index1.png');
			this.ewmImg = await this.getImageInfo(qrcode);
			this.canvasW = this.SystemInfo.windowWidth; // 画布宽度
			this.canvasH = this.goodsImg.height + this.ewmW + 50;  // 画布高度 = 主图高度+二维码高度 + 文字图片的间距（大概50）
			// this.canvasH=600
			// 如果主图，二维码图片，设备信息都获取成功，开始绘制海报，这里需要用setTimeout延时绘制，否则可能会出现图片不显示。
			if(this.goodsImg.errMsg == 'getImageInfo:ok' && this.ewmImg.errMsg == 'getImageInfo:ok' && this.SystemInfo.errMsg == 'getSystemInfo:ok'){
				console.log('ok')
				uni.showToast({
					icon:'loading',
					mask:true,
					duration:10000,
					title: '海报绘制中',
				});
				setTimeout(()=>{
					var ctx = uni.createCanvasContext('myCanvas', this);
					// 填充背景色，白色
					ctx.setFillStyle('#fff'); // 默认白色
					ctx.fillRect(0, 0, this.canvasW, this.canvasH) // fillRect(x,y,宽度，高度)
					
					// 绘制商品主图，二维码
					ctx.drawImage(this.goodsImg.path, 0, 0, this.canvasW, this.canvasW) // drawImage(图片路径,x,y,绘制图像的宽度，绘制图像的高度)
					ctx.drawImage(this.ewmImg.path, this.canvasW-300, this.canvasW-300, this.ewmW, this.ewmW) // drawImage(图片路径,x,y,绘制图像的宽度，绘制图像的高度,二维码的宽,高)
					
					// 3、绘制商品标题，多余文字自动换行
					ctx.setFontSize(16); // setFontSize() 设置字体字号
					ctx.setFillStyle('#333'); // setFillStyle() 设置字体颜色
					
					/* str 这段代码是我百度找的，参考别人的。canvas不能自动换行，需要自行计算 */
					// let _strlineW = 0;
					// let _strLastIndex = 0; //每次开始截取的字符串的索引
					// let _strHeight = this.canvasW +30; //绘制字体距离canvas顶部的初始高度
					// let _num = 1;
					// for (let i = 0; i < this.title.length; i++) {
					// 	_strlineW += ctx.measureText(this.title[i]).width;
					// 	if (_strlineW > this.canvasW-155) {
					// 		if(_num == 2 && 2){
					// 			//文字换行数量大于二进行省略号处理
					// 			ctx.fillText(this.title.substring(_strLastIndex, i-5)+'...', 10, _strHeight);
					// 			_strlineW = 0;
					// 			_strLastIndex = i;
					// 			_num++;
					// 			break;
					// 		}else{
					// 			ctx.fillText(this.title.substring(_strLastIndex, i), 10, _strHeight);
					// 			_strlineW = 0;
					// 			_strHeight += 20;
					// 			_strLastIndex = i;
					// 			_num++;
					// 		}
					// 	}else if (i == this.title.length - 1) {
					// 		ctx.fillText(this.title.substring(_strLastIndex, i + 1), 10, _strHeight);
					// 		_strlineW = 0;
					// 	}
					// }
					// /* end */
					
					// //4、商品价格
					// ctx.setFontSize(16) // 字号
					// ctx.setFillStyle('#e31d1a') // 颜色
					// ctx.fillText('￥'+this.price, 10, this.canvasW +75); // （文字，x，y）
					// ctx.setFontSize(12)
					// ctx.setFillStyle('#b8b8b8')
					// ctx.fillText('原价￥'+this.Oldprice, 100, this.canvasW +75);
					
					// // 5、邀请信息
					// ctx.setFontSize(16)
					// ctx.setFillStyle('#333')
					// ctx.fillText(this.name+'推荐给你', 10, this.canvasW +100);
					
					// ctx.setFontSize(14)
					// ctx.setFillStyle('#b8b8b8')
					// ctx.fillText('长按或扫描识别二维码', 10, this.canvasW +this.ewmW);

					
					ctx.draw(true,(ret)=>{ // draw方法 把以上内容画到 canvas 中。
						console.log(ret) 
						uni.showToast({
							icon:'success',
							mask:true,
							title: '绘制完成',
						});
						var that=this
						uni.canvasToTempFilePath({ // 保存canvas为图片
							canvasId: 'myCanvas',
							quality: 1,
							complete: function(res) {
								// 在H5平台下，tempFilePath 为 base64, // 图片提示跨域 H5保存base64失败，APP端正常输出临时路径
								console.log(res)
								that.photo=res.tempFilePath
							} ,
						})
					});
				},1500)
			}else{
				console.log('err')
			}
		},
		onShow(){
			this.getCode()
		},
		methods: {
			// 获取图片信息
			getCode(){
				return new Promise((resolve,reject)=>{
					// console.log(555)
					qr_code.getCode({
						path:'/pages/index/index'
					},function(res){
						console.log(res)
						resolve(res)
					})
				})
			
			},
			getImageInfo(image) {
				return new Promise((req, rej) => {
					uni.getImageInfo({
						src: image,
						success: function(res) {
							req(res)
						},
					});
				})
			},
			        saveImgToLocal:function(e){
			            console.log(this.photo)
			            uni.showModal({
			                title: '提示',
			                content: '确定保存到相册吗',
			                success: (res)=> {
								var that=this
		                          // console.log(res)
			                    if (res.confirm) {
			                        console.log(this.photo)
									uni.uploadFile({
									  url: that.configURL.BaseURL + 'uploadPictures',
									  filePath: this.photo,
									  name: 'file',
									  header: {
										'apply-secret': that.configURL.secret,
										'Authorization': 'Bearer ' + uni.getStorageSync('dsshopApplytoken')
									  },
									  formData: {
										type: 1,
										size: 1000000000000
									  },
									  success:(res)=>{
										console.log(res.data)
										this.photo=res.data
										// console.log(this.photo)
									}
									})
										uni.downloadFile({
										        url: this.photo,//图片地址
										        success: (res) =>{
													console.log(res)
										            if (res.statusCode === 200){
										                uni.saveImageToPhotosAlbum({
										                    filePath: res.tempFilePath,
										                    success: function() {
										                        uni.showToast({
										                            title: "保存成功",
										                            icon: "none"
										                        });
										                    },
										                    fail: function(e) {
																// console.log(e)
										                        uni.showToast({
										                            title: "保存失败",
										                            icon: "none"
										                        });
										                    }
										                });
										            } 
										        }
										    })
									
			              
			                        
			                        
			                    } else if (res.cancel) {
			                        
			                    }
			                }
			            });
			            
			        },
			// 获取设备信息
			getSystemInfo(){
				return new Promise((req, rej) => {
					uni.getSystemInfo({
					    success: function (res) {
					        req(res)
					    }
					});
				})
			}
		}
	}
</script>
<style>
		.demo{
			width: 100%;
			height: 100vh;
			background-color: #fff;
		}
</style>
