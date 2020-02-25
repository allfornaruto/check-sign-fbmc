import { createHmac, createSign, createVerify } from "crypto";

interface Option {
	debug: boolean;
}

class CheckSignFbmcClient {
	private readonly clientPrivatePem: string;
	private readonly serverPublicPem: string;
	private readonly secret: string;
	private readonly debug: boolean;

	constructor(secret: string, clientPrivatePem: string, serverPublicPem: string, option?: Option) {
		this.secret = secret;
		this.clientPrivatePem = clientPrivatePem;
		this.serverPublicPem = serverPublicPem;
		if (option && option.debug) this.debug = option.debug;
	}

	// 创建Hmac消息摘要
	private createHmac(content) {
		// 创建摘要的算法
		const algorithm = "md5";
		// 创建 hmac 实例
		const hmac = createHmac(algorithm, this.secret);
		// 使用 update 方法更新加密数据
		hmac.update(content);
		// 使用 digest 方法生成加密数据
		const digest = hmac.digest("hex");
		if (this.debug) console.log(`${content}对应的Hmac-MD5摘要是${digest}`);
		return digest;
	}

	// 客户端通过客户端私钥来对Hmac消息摘要生成签名
	private clientEncryptSign(hmacStr) {
		// 签名算法
		const algorithm = "RSA-SHA256";
		// 创建签名
		const sign = createSign(algorithm);
		// 使用 update 方法更新数据
		sign.update(hmacStr);
		// 生成签名 以 hex 格式输入数据
		const sig = sign.sign(this.clientPrivatePem, "base64");
		return sig;
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
		// 签名算法
		const algorithm = "RSA-SHA256";
		// 验证签名
		const verify = createVerify(algorithm);
		// 使用 updata 方法更新数据
		verify.update(serverDataHmac);
		// 验证签名的数据是否正确
		const result = verify.verify(this.serverPublicPem, serverDataSign, "base64");
		if (this.debug) console.log(`客户端验签:${result}`);
		return result;
	}

	// 为客户端的请求参数附带上签名
	public addSignToRequest(request) {
		// 请求JSON
		const requestBodyJSON = JSON.stringify(request);
		// 生成请求消息摘要
		const clientHmac = this.createHmac(requestBodyJSON);
		// 生成摘要签名PKCS1
		const clientSignPKCS1 = this.clientEncryptSign(clientHmac);
		// 把签名挂在请求对象的sign属性上
		request.sign = clientSignPKCS1;
		return request;
	}
}

class CheckSignFbmcServer {
	private readonly serverPrivatePem: string;
	private readonly clientPublicPem: string;
	private readonly secret: string;
	private readonly debug: boolean;

	constructor(secret: string, serverPrivatePem: string, clientPublicPem: string, option?: Option) {
		this.secret = secret;
		this.serverPrivatePem = serverPrivatePem;
		this.clientPublicPem = clientPublicPem;
		if (option && option.debug) this.debug = option.debug;
	}

	// 创建Hmac消息摘要
	private createHmac(content) {
		// 创建摘要的算法
		const algorithm = "md5";
		// 创建 hmac 实例
		const hmac = createHmac(algorithm, this.secret);
		// 使用 update 方法更新加密数据
		hmac.update(content);
		// 使用 digest 方法生成加密数据
		const digest = hmac.digest("hex");
		if (this.debug) console.log(`${content}对应的Hmac-MD5摘要是${digest}`);
		return digest;
	}

	// 服务端通过服务端私钥来对Hmac消息摘要生成签名
	private serverEncryptSign(hmacStr) {
		// 签名算法
		const algorithm = "RSA-SHA256";
		// 创建签名
		const sign = createSign(algorithm);
		// 使用 update 方法更新数据
		sign.update(hmacStr);
		// 生成签名 以 hex 格式输入数据
		const sig = sign.sign(this.serverPrivatePem, "base64");
		return sig;
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
		// 签名算法
		const algorithm = "RSA-SHA256";
		// 验证签名
		const verify = createVerify(algorithm);
		// 使用 updata 方法更新数据
		verify.update(clientDataHmac);
		// 验证签名的数据是否正确
		const result = verify.verify(this.clientPublicPem, serverDataSign, "base64");
		if (this.debug) console.log(`服务端验签:${result}`);
		return result;
	}

	// 为服务器的响应参数附带上签名
	public addSignToResponse(resposne) {
		// 响应JSON
		const resposneBodyJSON = JSON.stringify(resposne);
		// 生成请求消息摘要
		const clientHmac = this.createHmac(resposneBodyJSON);
		// 生成摘要签名PKCS1
		const clientSignPKCS1 = this.serverEncryptSign(clientHmac);
		// 把签名挂在请求对象的sign属性上
		resposne.sign = clientSignPKCS1;
		return resposne;
	}
}

export {
	CheckSignFbmcClient,
	CheckSignFbmcServer
};
