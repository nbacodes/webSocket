import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Connection Event
wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData) => {
        const message = rawData.toString();
        console.log({ rawData });

        // here raw data will come in binary so we use .tosrting
        wss.clients.forEach((client) => {
            if (client.readyState == WebSocket.OPEN) client.send(`Server Broadcast: ${message}`);
        })
    });

    socket.on('error', (err) => {
        console.log(`Error: ${err.message}: ${ip}`);
    })

    socket.on('close', () => {
        console.log('Client disconnected');
    })
});

console.log("WebSocket Server is live in ws://localhost:8080");