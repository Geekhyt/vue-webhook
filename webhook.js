let http = require('http');
let crypto = require('crypto');
let SECRET = '123456';
function sign(body) {
    return `sha1=` + crypto.createHmac('sha1', SECRET).update(body).digest('hex');
}
let server = http.createServer(function(req, res) {
    if(req.method == 'POST' && req.url == '/webhook') {
        let buffers = [];
        req.on('data', function(buffer) {
            buffers.push(buffer);
        });
        req.on('end', function(buffer) {
            let body = Buffer.concat(buffers);
            let event = req.header['x-github-event']; // event = push
            // github 请求来的时候，要传递请求体body、signature，你需要验签
            let signature = req.headers['x-hub-signature'];
            if(signature !== sign(body)) {
                return res.end('Not Allowed')
            }
        })
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ok: true}));
    } else {
        res.end('Not Found');
    }
});
server.listen(4000, () => {
    console.log('webhook 服务已经在4000端口上启动');
})