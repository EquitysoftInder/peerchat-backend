
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
