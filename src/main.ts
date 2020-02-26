import hex_hmac_md5 from "./md5";

interface Option {
	debug: boolean;
}

class CheckSignFbmcClient {
	private readonly secret: string;
	private readonly debug: boolean;

	constructor(secret: string, option?: Option) {
		this.secret = secret;
		if (option && option.debug) this.debug = option.debug;
	}

	// 创建Hmac消息摘要
	private createHmac(content) {
		const digest = hex_hmac_md5(this.secret, content);
		if (this.debug) console.log(`${content}对应的Hmac-MD5摘要是${digest}`);
		return digest;
	}

	// 客户端通过服务端公钥来对Hmac消息摘要进行验签
	public checkSign(response): Boolean {
		// 获取服务器响应签名
		const serverDataSign = response.sign;
		// 获取服务器响应对象（移除了sign字段）
		delete response.sign;
		const resDataWithoutSign = response;
		// 获取服务器响应对象JSON
		const resDataWithoutSignJSON = JSON.stringify(resDataWithoutSign);
		// 生成响应摘要
		const serverDataHmac = this.createHmac(resDataWithoutSignJSON);
		const result = serverDataSign === serverDataHmac;
		if (this.debug) console.log(`客户端验签:${result}`);
		return result;
	}

	// 为客户端的请求参数附带上签名
	public addSignToRequest(request) {
		// 请求JSON
		const requestBodyJSON = JSON.stringify(request);
		// 生成请求消息摘要
		const clientHmac = this.createHmac(requestBodyJSON);
		request.sign = clientHmac;
		return request;
	}
}

class CheckSignFbmcServer {
	private readonly secret: string;
	private readonly debug: boolean;

	constructor(secret: string, option?: Option) {
		this.secret = secret;
		if (option && option.debug) this.debug = option.debug;
	}

	// 创建Hmac消息摘要
	private createHmac(content) {
		const digest = hex_hmac_md5(this.secret, content);
		if (this.debug) console.log(`${content}对应的Hmac-MD5摘要是${digest}`);
		return digest;
	}

	// 服务端通过客户端公钥来对Hmac消息摘要进行验签
	public checkSign(request): Boolean {
		if (!request.sign) throw new Error("checkSign方法的参数缺少sign字段");
		// 获取服务器响应签名
		const serverDataSign = request.sign;
		// 获取服务器响应对象（移除了sign字段）
		delete request.sign;
		const resDataWithoutSign = request;
		// 获取服务器响应对象JSON
		const resDataWithoutSignJSON = JSON.stringify(resDataWithoutSign);
		// 生成响应摘要
		const clientDataHmac = this.createHmac(resDataWithoutSignJSON);
		const result = serverDataSign === clientDataHmac;
		if (this.debug) console.log(`服务端验签:${result}`);
		return result;
	}

	// 为服务器的响应参数附带上签名
	public addSignToResponse(resposne) {
		// 响应JSON
		const resposneBodyJSON = JSON.stringify(resposne);
		// 生成请求消息摘要
		const clientHmac = this.createHmac(resposneBodyJSON);
		// 把签名挂在请求对象的sign属性上
		resposne.sign = clientHmac;
		return resposne;
	}
}

export {
	CheckSignFbmcClient,
	CheckSignFbmcServer
};
