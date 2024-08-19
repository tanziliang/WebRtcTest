var ws = require("nodejs-websocket")
var port = 8099;

var server = ws.createServer(function(conn)
{
    console.log("创建新连接");

    conn.on("text",function(str)
    {
        console.log("recv msg:"+str);
    });

    conn.sendText("收到连接");

}).listen(port);