<template>
	<view class="container">
		<view class="" style="height: 50rpx;">
			<view class="bg"></view>
		</view>
		<uni-nav-bar fixed backgroundColor="#424141" left-icon="arrowleft" color="#ffffff" @clickLeft="back"></uni-nav-bar>
		<view class="bg"></view>
		<view class="main">
			<view class="userinfo">
				<view style="height: 100rpx;"></view>
				<view class="username">取餐</view>
			</view>
			<view v-if="show1" class="code-section">
				<view class="mb-20">请输入4位取餐号码</view>
				<!-- qrcode begin -->
<!-- 				<canvas canvas-id="memberCode" style="width: 350rpx; height: 350rpx;"></canvas>
 -->				<!-- qrcode end -->
				<view class="user-form">
				
					<view class="form-item">
						
						<input type="number" style="height: 100rpx;
							background-color: #666666; 
							color: white;
							" />
						
					</view>
					
					<button type="primary" style="margin-top: 20rpx; height: 80rpx" @click="buttonclick1">确认</button>
				
				</view>
				<view style="height: 60rpx; "></view>
				<view class="tips">若有多个外卖，请逐一取餐</view>
			</view>
			
			<view v-if="show2" class="code-section">
				<view class="mb-20" style="color: red;">*当前您有多个外卖取餐</view>
				<view class="mb-20">请输入全部手机号取餐</view>
				<!-- qrcode begin -->
<!-- 				<canvas canvas-id="memberCode" style="width: 350rpx; height: 350rpx;"></canvas>
 -->				<!-- qrcode end -->
				<view class="user-form">
				
					<view class="form-item">
						
						<input type="number" style="height: 100rpx;
							background-color: #666666; 
							color: white;
							" />
						
					</view>
					
					<button type="primary" style="margin-top: 20rpx; height: 80rpx" @click="buttonclick2">确认</button>
				
				</view>
				<view style="height: 60rpx; "></view>
				<view class="tips">若有多个外卖，请逐一取餐</view>
				
				
				
			</view>	
			
			<uni-popup ref="popup" :type="type" :animation="true" :maskClick="false" @change="change">
				<view style="padding: 50px; background-color: #fff;">
					<view class="code-section" style="">
						<view style="font-size: 60rpx;">外卖柜号</view>
						<view style="font-size: 80rpx; font-weight: bold;">15</view>
						<view class="user-form">
							
							<button type="primary" style="margin-top: 120rpx; height: 80rpx; width: 300rpx;" @click="close">确认</button>
							
						</view>
						<view style="height: 60rpx; "></view>
						<view class="tips">注意：点击确认后柜门将打开且将无法再次获取号码</view>
					</view>
				</view>
			</uni-popup>
			
			<uni-popup ref="popup2" :type="type2" :animation="true" :maskClick="false" @change="change">
				<view style="padding: 50px; background-color: #fff;">
					<view class="code-section" style="">
						<view style="font-size: 60rpx;">外卖柜号</view>
						<view style="font-size: 80rpx; font-weight: bold;">15</view>
						<view class="user-form">
							
							<button type="primary" style="margin-top: 120rpx; height: 80rpx; width: 300rpx;" @click="close2">确认</button>
							
						</view>
						<view style="height: 60rpx; "></view>
						<view class="tips">注意：点击确认后将无法再次获取号码</view>
					</view>
				</view>
			</uni-popup>
			
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import listCell from '@/components/list-cell/list-cell.vue'
	import modal from '@/components/modal/modal.vue'
	
	export default {
		components: {
			uniNavBar,
			listCell,
			modal
		},
		data() {
			return {
				type: 'top',
				type2: 'top',
				show1: true,
				show2: false
			}
		},
		onShow() {
			let i = 1
			this.makeMemberCode(i)
			
			setInterval(() => {
				i++
				this.makeMemberCode(i)
			}, 30000)
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			makeMemberCode(i) {
				uQRCode.make({
					canvasId: 'memberCode',
					componentInstance: this,
					text: `memberCode${i}`,
					size: uni.upx2px(350),
					margin: 20,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.defaults.correctLevel,
					success: res => {
					}
				})
			},
			buttonclick1() {
				console.log(123);
				let test = 2;
				if (test == 1) {//("接口回传数据是--》只有一个外卖"
					this.toggle('center');
				} else if(test == 2) {
					uni.showToast({
						icon:'error',
						title:'您有多个外卖取件，请输入完整手机号再取餐'
					})
					this.show1 = false;
					this.show2 = true;
					
				}
			},
			
			toggle(type) {
						this.type = type;
						this.$refs['popup'].open();
			},
			close() {
				this.$refs['popup'].close();
			},
			buttonclick2() {
				this.toggle2('center');
			},
			toggle2(type) {
						this.type2 = type;
						this.$refs['popup2'].open();
			},
			close2() {
				this.$refs['popup2'].close();
			},
		}
	}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
}

.bg {
	background-color: #424141;
	height: 25vh;
	/* #ifdef H5 */
	height: calc(25vh - 44px);
	/* #endif */
}

.main {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.userinfo {
	display: flex;
	flex-direction: column;
	align-items: center;
	// border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
	
	.avatar {
		position: relative;
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		margin-top: -70rpx;
		margin-bottom: 20rpx;
	}
	
	.username {
		font-size: $font-size-extra-lg;
		font-size: 60rpx;
		font-weight: bold;
		margin-bottom: 50rpx;
	}
	
	.desc {
		font-size: $font-size-sm;
		color: $text-color-assist;
		margin-bottom: 20rpx;
	}
}

.code-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: $font-size-base;
	color: $font-size-base;
	
	.tips {
		font-size: $font-size-sm;
		color: $text-color-assist;
	}
}
</style>

<style lang="scss" scoped>
.brand {
	background-color: $bg-color-white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
	margin-bottom: 20rpx;
	
	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		margin-bottom: 30rpx;
	}
	
	.username {
		color: $font-size-medium;
		font-weight: bold;
	}
}

.user-form {
	.form-item {
		width: 100%;
		display: flex;
		align-items: center;
		
		.label {
			width: 160rpx;
		}
		
		input {
			flex: 1;
		}
		
		.radio {
			display: flex;
			margin-right: 50rpx;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
}

.save-btn {
	padding: 0 30rpx;
	margin-top: 60rpx;
	
	button {
		width: 100%;
		font-size: $font-size-extra-lg;
	}
}

.telphone-modal {
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		font-size: $font-size-extra-lg;
		font-weight: bold;
		margin-bottom: 30rpx;
		
		.close-icon {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 0;
		}
	}
	
	.tips {
		color: $text-color-grey;
		line-height: 1.2rem;
		margin-bottom: 50rpx;
	}
	
	.telphone-form {
		font-size: $font-size-base;
		
		.telphone-input {
			width: 100%;
			display: flex;
			align-items: center;
			
			.prefix {
				color: $color-primary;
				display: flex;
				align-items: center;
				padding-right: 20rpx;
				position: relative;
				margin-right: 10rpx;
				
				&::after {
					content: " ";
					position: absolute;
					width: 4rpx;
					background-color: $border-color;
				}
			}
			
			input {
				flex: 1;
			}
		}
		
		.verfiycode-input {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.countdown {
				font-size: $font-size-base;
			}
		}
	}
	
	.footer {
		margin-top: 30rpx;
		button {
			font-size: $font-size-lg;
		}
	}
}
</style>
