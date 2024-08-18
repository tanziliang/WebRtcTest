

var localStream = null;

var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector("#remoteVideo");


var rtcEngine;
var RTCEngine = function(wsurl)
{
    this.init(wsUrl);
    rtcEngine = this;
    return this;
}

RTCEngine.prototype.init = function(wsurl)
{
    // 设置websocket  url
    this.wsurl = wsurl;
    /** websocket对象 */
    this.signaling = null;
}

RTCEngine.prototype.createWebSocket = function()
{
    var rtcEngine = this;
    rtcEngine.signaling = new WebSocket(this.wsUrl);
    rtcEngine.signaling.onopen = function(ev)
    {
        rtcEngine.onOpen();
    }

    rtcEngine.signaling.onclose = function(ev)
    {
        rtcEngine.onClose();
    }

    rtcEngine.signaling.onmessage = function(ev)
    {
        rtcEngine.onMessage();
    }

    rtcEngine.signaling.onerror = function(ev)
    {
        rtcEngine.onError();
    }
}

RTCEngine.prototype.onOpen = function(event)
{
    console.info('websocket open');
}

RTCEngine.prototype.onClose = function(event)
{
    console.info('websocket close');
}

RTCEngine.prototype.onMessage = function(event)
{
    console.info('onMessage:'+event.data);
}

RTCEngine.prototype.onError = function(event)
{
    console.info('websocket onError');
}



function openLocalStream(stream)
{
    console.log('Open local video stream');
    localVideo.srcObject = stream;
    localStream = stream;
}

function initLocalStream()
{
    navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true,
    }).then(openLocalStream)
        .catch(function(e)
        {
            alert('getUserMedio() error')
        });
}


document.getElementById('joinBtn').onclick=function(){
    console.log("加入按钮被点击")
    //初始化本地码流
    initLocalStream();
}

document.getElementById('leaveBtn').onclick=function(){
    console.log("离开按钮被点击")
}