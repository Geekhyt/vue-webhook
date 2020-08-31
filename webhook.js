let http = require('http');
http.createServer(function(req, res) {
    if(req.method == 'POST' && req.url == '/webhook') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ok: true}));
        
    } else {
        res.end('Not Found');
    }
});
server.listen(4000, () => {
    console.log('webhook 服务已经在4000端口上启动');
})