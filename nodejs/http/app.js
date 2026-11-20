const http = require('http');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Home Page');

    } else if (method === 'GET' && url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');

    } else if (method === 'GET' && url === '/users') {
        const users = [
            { id: 1, name: 'Sandeep' },
            { id: 2, name: 'John' },
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));

    } else if (method === 'POST' && url === '/users') {
        let body = '';

        req.on('data', chunk => { body += chunk; });

        req.on('end', () => {
            const newUser = JSON.parse(body);
            console.log('Created user:', newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created', user: newUser }));
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

server.listen(3001, () => {
    console.log('Listening on port 3001...');
    console.log('Try:');
    console.log('  GET  http://localhost:3001/');
    console.log('  GET  http://localhost:3001/about');
    console.log('  GET  http://localhost:3001/users');
    console.log('  POST http://localhost:3001/users  body: {"name":"Alice"}');
});
