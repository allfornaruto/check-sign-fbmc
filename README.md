# check-sign-fbmc

> 使用Hmac-MD5和RSA-SHA256函数来对请求和相应增加签名、验签，包体积106KB

## 客户端使用方法

```javascript
import { CheckSignFbmcClient } from "check-sign-fbmc";

(async function(){
	const secret = `123456`;
	const clientPrivatePem = `...`;
	const serverPublicPem = `...`;
	const client = new CheckSignFbmcClient(secret, clientPrivatePem, serverPublicPem, { debug: true });
	const request = { a: "1" };
	const requestWithSign = client.addSignToRequest(request);
	const responseWithSign = await axios.post("/api", requestWithSign);
	const clientCheckSignResult = client.checkSign(responseWithSign);
})();
```

## 服务端使用方法

```javascript
import { CheckSignFbmcServer } from "check-sign-fbmc";

(async function(requestWithSign){
	const secret = `123456`;
	const serverPrivatePem = `...`;
	const clientPublicPem = `...`;
	const server = new CheckSignFbmcServer(secret, serverPrivatePem, clientPublicPem, { debug: true });
	const serverCheckSignResult = server.checkSign(requestWithSign);
	const response = { a: "1" };
	const responseWithSign = server.addSignToResponse(response);
})();
```