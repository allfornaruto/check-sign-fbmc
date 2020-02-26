interface Option {
    debug: boolean;
}
declare class CheckSignFbmcClient {
    private readonly secret;
    private readonly debug;
    constructor(secret: string, option?: Option);
    private createHmac;
    checkSign(response: any): Boolean;
    addSignToRequest(request: any): any;
}
declare class CheckSignFbmcServer {
    private readonly secret;
    private readonly debug;
    constructor(secret: string, option?: Option);
    private createHmac;
    checkSign(request: any): Boolean;
    addSignToResponse(resposne: any): any;
}
export { CheckSignFbmcClient, CheckSignFbmcServer };
