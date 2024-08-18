var ws = require("nodejs-websocket")
var port = 8099;

var server = ws.createServer(function(conn)
{
    console.log("创建新连接");

    conn.sendText("收到连接");

});