import { CheckSignFbmcClient, CheckSignFbmcServer } from "../src/main";

const option = {
	debug: true
};
const secret = `123456`;
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
	const client = new CheckSignFbmcClient(secret, option);
	const requestWithSign = client.addSignToRequest(request);
	expect(requestWithSign).toStrictEqual({
		q: "q",
		a: {
			s: "s",
			d: "d"
		},
		z: "z",
		sign: "d91698a8317ecee11b2e2ff7b0ce630e"
	});
	const server = new CheckSignFbmcServer(secret, option);
	const serverCheckSignResult = server.checkSign(requestWithSign);
	expect(serverCheckSignResult).toBeTruthy();

	const responseWithSign = server.addSignToResponse(response);
	expect(requestWithSign).toStrictEqual({
		q: "q",
		a: { s: "s", d: "d" },
		z: "z",
		sign: "d91698a8317ecee11b2e2ff7b0ce630e"
	});
	const clientCheckSignResult = client.checkSign(responseWithSign);
	expect(clientCheckSignResult).toBeTruthy();
});
