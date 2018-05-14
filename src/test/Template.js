export let loginjoin = 
{
    accountID:1,
    appID:10000,
    appServerID:16,
    logAppServerID:2,
    logDate:1517055807,
    loginJoinID:1,
    roomID:0,
    type:"login",
    userID:1,
    data:`{"appInfo": {"appID": 10000},"roomInfo": null,"userInfo": {"userID": 4,"userName": "张三","userDesc": "","remoteAddress": "::1","remotePort": 55607,"remoteFamily": "IPv6","terminalType": "chrome"},"appServerInfo": {"appServerID": 16,"appServerUrl": "https://localhost:8445","mediaServerWsUri": "ws://192.168.0.86:8888/ms","startDate": 1517188679,"startDateString": "2018-1-29 9:17:59"}}`
};

export let pinstats = 
{
    accountID:1,
    appID:10000,
    appServerID:12,
    logAppServerID:2,
    logDate:1517055807,
    roomID:1,
    pinBaseInfo:`{"pinID":10,"appID":10000,"appName":"DemoApp","roomID":1,"roomName":"Demo Room","pinType":"UserPublishPin","publisherID":10,"publisherName":"张三","publisherIP":"::1","streamID":1,"streamType":"video","streamName":"e2eSoft VCam 03"}`,
    pinMediaInfo:`{"videoStats":{"52cd068f-281e-40a7-8d1b-d6f92a674824":{"__module__":"kurento","__type__":"RTCInboundRTPStreamStats","associateStatsId":"","bytesReceived":1463634,"codecId":"","firCount":1,"fractionLost":0,"id":"52cd068f-281e-40a7-8d1b-d6f92a674824","isRemote":false,"jitter":0.002288888907060027,"mediaTrackId":"","nackCount":0,"packetsLost":0,"packetsReceived":19778,"pliCount":0,"remb":66890,"sliCount":0,"ssrc":"938697880","timestamp":1517287039,"transportId":"","type":"inboundrtp"},"7c2d9c3a-5524-4fac-a640-df33a677cfb9":{"__module__":"kurento","__type__":"RTCOutboundRTPStreamStats","associateStatsId":"","bytesSent":0,"codecId":"","firCount":0,"fractionLost":0,"id":"7c2d9c3a-5524-4fac-a640-df33a677cfb9","isRemote":false,"mediaTrackId":"","nackCount":0,"packetsLost":0,"packetsSent":0,"pliCount":0,"remb":0,"roundTripTime":0,"sliCount":0,"ssrc":"2749361215","targetBitrate":0,"timestamp":1517287039,"transportId":"","type":"outboundrtp"}},"audioStats":null}`,
    data:`{"accountInfo":{"accountName":"demo","accountDesc":null,"email":null,"mobile":null,"password":"96e79218965eb72c92a549dd5a330112","registerDate":1517283076,"lastLoginDate":null,"loginTimes":null,"moneyRemain":null,"discount":100,"accountID":1},"appInfo":{"appName":"DemoApp","appSecret":"demoappsecret","appDesc":null,"accountID":1,"createDate":1517283076,"appID":10000},"roomInfo":{"roomName":"DemoRoom","roomDesc":null,"accountID":1,"appID":10000,"createDate":1517283076,"roomID":1},"appServerInfo":{"appServerID":12,"appServerUrl":"https://localhost:8445","mediaServerWsUri":"ws://192.168.0.87:17821/ms","startDate":1517285930,"startDateString":"2018-1-3012:18:50"}}`
};

