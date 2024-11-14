const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

// Handle WebSocket connections
wss.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (message) => {
        // Parse the incoming message as JSON
        const data = JSON.parse(message);

        // Broadcast the message to the other client
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    // Remove client on close
    ws.on('close', () => {
        clients = clients.filter((client) => client !== ws);
    });
});

console.log('WebSocket signaling server is running on ws://localhost:8080');



// const http = require('http');

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//   // Set the response header with status and content type
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   // Route handling
//   if (req.url === '/' && req.method === 'GET') {
//     res.end('Welcome to the Home Page!');
//   } else if (req.url === '/about' && req.method === 'GET') {
//     res.end('This is the About Page.');
//   } else if (req.url === '/contact' && req.method === 'GET') {
//     res.end('Contact us at contact@example.com');
//   } else {
//     res.end('hii there');
//   }
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
