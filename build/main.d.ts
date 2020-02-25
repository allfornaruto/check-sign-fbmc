interface Option {
    debug: boolean;
}
declare class CheckSignFbmcClient {
    private readonly clientPrivatePem;
    private readonly serverPublicPem;
    private readonly secret;
    private readonly debug;
    constructor(secret: string, clientPrivatePem: string, serverPublicPem: string, option?: Option);
    private createHmac;
    private clientEncryptSign;
    checkSign(response: any): Boolean;
    addSignToRequest(request: any): any;
}
declare class CheckSignFbmcServer {
    private readonly serverPrivatePem;
    private readonly clientPublicPem;
    private readonly secret;
    private readonly debug;
    constructor(secret: string, serverPrivatePem: string, clientPublicPem: string, option?: Option);
    private createHmac;
    private serverEncryptSign;
    checkSign(request: any): Boolean;
    addSignToResponse(resposne: any): any;
}
export { CheckSignFbmcClient, CheckSignFbmcServer };
