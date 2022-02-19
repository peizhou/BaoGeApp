import { baseUrl } from '../common/config.js'
//通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
export function accessTemporaryCode(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/user/code`,
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
//调用 auth.code2Session 接口，换取 用户唯一标识 OpenID
export function authLogin(data) {
	return new Promise(function(reslove, reject) {
		uni.request({
			url: `${baseUrl}/user/authLogin`,
			method: 'POST',
			data: data,
			success: res => {
				let result = res;
				console.log('通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程', result.data);
				reslove(result.data);
			},
			fail: () => {},
			complete: () => {}
		})
	})
}
