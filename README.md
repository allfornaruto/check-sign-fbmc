# check-sign-fbmc-light

> 使用Hmac-MD5对请求和相应增加签名、验签

## 客户端使用方法

```javascript
(async function(){
	const secret = `123456`;
	const client = new CheckSignFbmcClient(secret, { debug: true });
	const requestWithSign = client.addSignToRequest(request);
	const responseWithSign = await axios.post("/api", requestWithSign);

	const clientCheckSignResult = client.checkSign(responseWithSign);
})();
```

## 服务端使用方法

```javascript
(async function(requestWithSign){
	const secret = `123456`;
	const server = new CheckSignFbmcServer(secret, { debug: true });
	const serverCheckSignResult = server.checkSign(requestWithSign);
	const response = { a: "1" };
	const responseWithSign = server.addSignToResponse(response);
})();
```