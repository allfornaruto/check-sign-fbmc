import { CheckSignFbmcClient, CheckSignFbmcServer } from "../src/main";

const option = {
	debug: true
};

const clientPrivatePem = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCknxTFJQg3NRTFeLsO4jf9wC/CLTIfJtLqrAiDxfiBvXFlvReS
J+QFAMgphfLeng8CKgSS11U3oJPcAc+xVeoq803I7d67yEhpR9t6OHmzYha0Iju1
x2jyc4O3gjybgKJ5aiaWZJ/LZIUIG80NcMM1DsgvqqPuWGsXvAMhF49DGwIDAQAB
AoGATQrCPq1hFe06plwlNwb560CZWUerkFasGPWgGoN5FMbjHhkLwfP3S7wc8Qnm
KvdP0NR3RX2PPTRiXnFekQDDUMrRkSVXSpdfcWXPobD5eodAkG2IGWRG7u+psJh0
oiSs3eGjYtahIEzkMZ28U703mYclDlOfTs/fpILqj2AXtTECQQC03fLvPUKvYcJB
IPRYYgG+u91/KHhnj2sOaaX4G5Oe6mFYoZ0D9Flr4uwMPYZBglGpDnKmwj7+GeVU
CcsoQVRpAkEA6QGEwewEexDL7LhfqMtrBPWySVxqWfIodqqSZNWUmGKpVEpVv/SP
+i581RfGVtBRtXKlYVEmm7FSb5gHLcDa4wJATYhvobsDISepHD5CQLkSwm7KTr5M
jyhd3jnP2gIIUDFtNY9iPdW7l5IZWk3thZuV4gC9iVrvogH72wCvxDvtMQJACIwJ
tqNVtr3y/Qf2Wla74j6w/4foTsxXN6MiI5jCDqTv2Suw4Y2zClZSNe7dU6nolWNT
NbKoW+WxRG6rNL5ySQJASl80O+YseBUaf7gx3ssiQv9KVWiBTVlKS60PJuMb3P4d
++ju4pnoXsVhbuBfOBpEE3CXF0i+vOpvQr0lg6gVGA==
-----END RSA PRIVATE KEY-----
`;
const serverPublicPem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBXP+9B2n/1XFJeA6B9tkNIntK
DImkZYK4FWQ6KDMVvdQtu/PoLN20SqhoOKXYqpGs9t07f66+Uwa8uhue+opQR0rX
JKapS1gV5ijdKhaEeQTAuqiYt3vxEO3N+JdwtY1QyO3zsPNhGX7K7jA8fuL1Phok
JYWPpDmvNJ2GQdttEQIDAQAB
-----END PUBLIC KEY-----
`;
const secret = `123456`;
const serverPrivatePem = `-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMFc/70Haf/VcUl4
DoH22Q0ie0oMiaRlgrgVZDooMxW91C278+gs3bRKqGg4pdiqkaz23Tt/rr5TBry6
G576ilBHStckpqlLWBXmKN0qFoR5BMC6qJi3e/EQ7c34l3C1jVDI7fOw82EZfsru
MDx+4vU+GiQlhY+kOa80nYZB220RAgMBAAECgYEAh5x8s4semVGNyVQNALMqGN8l
DpLqecTDv+0oxOzqnwXqaETYU+4bc1Wk9Ks+DU3bKy5bjF4JJOw/3l67/myCUYDb
7kIPxyeIJhZDbc8U3M1opBhTCb6CEDAUCurU8bTMKlAZjSKQaN2lCroVGlEMTmY7
nRyjUI72Qn6P341iFNECQQDmL6pnETYRxUDy+gUjsF6Mj/9UU8q5wN2LxOot65CM
aieqkIay8UaGXPR7QHqKhzGTb1BzxHHS3JNyiT5K+MJFAkEA1wwye6NsWxFqndXs
WJISSIxt8CFig+ULrV8k7hQncXA0pA4eFe6/KLOLYq33VWsIsF1x+P0IwG7Ob1yR
z8QSXQJBANXG1OoNuPp+CFjgTF+dz+GZZlcpzq/+54KEKbzl9oQBnr8wpHiRzZ7B
u6iv9F6tOiSkD8LEYbWkdye7QGgeaUUCQQDQrpBqtIrY0Mzif46L4KwHZObmiK8e
CO3M/zBKLJqeFWGv9dcyN22fZKQVTXZfmK9k3jlUgs+0VZLUNEN3F/EtAkAHOOZk
Dhx2wMEeJS1uSQHlbEO2vi8FmEqsKydgcWTI859fEY+SOgUR03PdEf40Itq8ck67
aJczfLxN6LFJaWye
-----END PRIVATE KEY-----
`;
const clientPublicPem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCknxTFJQg3NRTFeLsO4jf9wC/C
LTIfJtLqrAiDxfiBvXFlvReSJ+QFAMgphfLeng8CKgSS11U3oJPcAc+xVeoq803I
7d67yEhpR9t6OHmzYha0Iju1x2jyc4O3gjybgKJ5aiaWZJ/LZIUIG80NcMM1Dsgv
qqPuWGsXvAMhF49DGwIDAQAB
-----END PUBLIC KEY-----
`;
const request = {
	q: "q",
	a: {
		s: "s",
		d: "d"
	},
	z: "z"
};
const response = request;

test("检查签名、验签数据是否准确、成功", async () => {
	const client = new CheckSignFbmcClient(secret, clientPrivatePem, serverPublicPem, option);
	const requestWithSign = client.addSignToRequest(request);
	expect(requestWithSign).toStrictEqual({
		q: "q",
		a: {
			s: "s",
			d: "d"
		},
		z: "z",
		sign:
			"Wghf0wqiZJiBa2BHOVk3E3ik7EWGETmigb2XD240UTTH2r6bGIUd4IvgY71GJWvuUdEFcG4MUDCPU3lLPf39AoZSgD3+CtC7bqXpMl0xAjOpSBjBHIhVNwbR/59eRcBR9IFIdlQlMq+fcSd31C/gEKX1/vd18b21AK48b83856w="
	});
	const server = new CheckSignFbmcServer(secret, serverPrivatePem, clientPublicPem, option);
	const serverCheckSignResult = server.checkSign(requestWithSign);
	expect(serverCheckSignResult).toBeTruthy();

	const responseWithSign = server.addSignToResponse(response);
	expect(requestWithSign).toStrictEqual({
		q: "q",
		a: { s: "s", d: "d" },
		z: "z",
		sign:
			"h9Cj/k7OOhfVag9OQIPdwWfjYfXcD3LDMcRC6qNFzOYH4OIWDkTt49n1POVk1ksFXBAjcEQ9X8AWNrxWLnt9JhrxvhSU0lccVkmVSbpluMDtOaaeT949lzoqKLReLb+G9ZrxSNXkYbIaqcyoe9KWD8yP9wludKzZOuYVYSLGx0Y="
	});
	const clientCheckSignResult = client.checkSign(responseWithSign);
	expect(clientCheckSignResult).toBeTruthy();
});
