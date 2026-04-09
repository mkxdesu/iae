const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/random' && req.method === 'GET') {
        fetch('https://dummyjson.com/quotes/random')
            .then(r => r.json())
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            })
            .catch(() => {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Gagal mengambil quote" }));
            });
        return;
    }

    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`Public API: http://localhost:${PORT}/api/random`);
});