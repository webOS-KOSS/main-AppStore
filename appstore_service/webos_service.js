// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');
const luna = require("./luna_service");
const service = new Service(pkgInfo.name); // Create service by service name on package.json
const logHeader = "[" + pkgInfo.name + "]";
const PWD = __dirname

service.register("install", function(msg) {
    
    luna.init(service);
    luna.tts(msg.payload.app + "앱이 설치됩니다.");
    luna.toast(msg.payload.app + "앱이 설치됩니다.");
    luna.appDownload(msg.payload.appid, msg.payload.appname, PWD + "/app/" + msg.payload.appname)
    msg.respond({reply : "install success"})

    //------------------------- heartbeat 구독 -------------------------
    const sub = service.subscribe(`luna://${pkgInfo.name}/heartbeat`, {subscribe: true});
    const max = 100; //heart beat 횟수 /// heart beat가 꺼지면, 5초 정도 딜레이 생김 --> 따라서 이 녀석도 heart beat를 무한히 돌릴 필요가 있어보임.
    let count = 0;
    sub.addListener("response", function(msg) {
        console.log(JSON.stringify(msg.payload));
        if (++count >= max) {
            sub.cancel();
        }
    });
    //------------------------- heartbeat 구독 -------------------------

});

service.register("remove", function(msg) {
    
    luna.init(service);
    luna.tts(msg.payload.app + "앱이 삭제됩니다");
    luna.toast(msg.payload.app + "앱이 삭제됩니다.");
    luna.appRemove(msg.payload.appname)
    msg.respond({reply: "remove success"})

    //------------------------- heartbeat 구독 -------------------------
    const sub = service.subscribe(`luna://${pkgInfo.name}/heartbeat`, {subscribe: true});
    const max = 100; //heart beat 횟수 /// heart beat가 꺼지면, 5초 정도 딜레이 생김 --> 따라서 이 녀석도 heart beat를 무한히 돌릴 필요가 있어보임.
    let count = 0;
    sub.addListener("response", function(msg) {
        console.log(JSON.stringify(msg.payload));
        if (++count >= max) {
            sub.cancel();
        }
    });
    //------------------------- heartbeat 구독 -------------------------

});

//----------------------------------------------------------------------heartbeat----------------------------------------------------------------------
// handle subscription requests
const subscriptions = {};
let heartbeatinterval;
let x = 1;
function createHeartBeatInterval() {
    if (heartbeatinterval) {
        return;
    }
    console.log(logHeader, "create_heartbeatinterval");
    heartbeatinterval = setInterval(function() {
        sendResponses();
    }, 1000);
}

// send responses to each subscribed client
function sendResponses() {
    console.log(logHeader, "send_response");
    console.log("Sending responses, subscription count=" + Object.keys(subscriptions).length);
    for (const i in subscriptions) {
        if (Object.prototype.hasOwnProperty.call(subscriptions, i)) {
            const s = subscriptions[i];
            s.respond({
                returnValue: true,
                event: "beat " + x
            });
        }
    }
    x++;
}

var heartbeat = service.register("heartbeat");
heartbeat.on("request", function(message) {
    console.log(logHeader, "SERVICE_METHOD_CALLED:/heartbeat");
    message.respond({event: "beat"}); // initial response 
    if (message.isSubscription) { 
        subscriptions[message.uniqueToken] = message; //add message to "subscriptions" 
        if (!heartbeatinterval) {
            createHeartBeatInterval();
        }
    } 
}); 
heartbeat.on("cancel", function(message) { 
    delete subscriptions[message.uniqueToken]; // remove message from "subscriptions" 
    var keys = Object.keys(subscriptions); 
    if (keys.length === 0) { // count the remaining subscriptions 
        console.log("no more subscriptions, canceling interval"); 
        clearInterval(heartbeatinterval);
        heartbeatinterval = undefined;
    } 
});