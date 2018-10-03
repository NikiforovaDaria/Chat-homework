const WebSocket = require('uws')

const ws = new WebSocket('ws://localhost:3000/');

ws.on('open', ()=> {
    console.log('Client sucessfull connected client1 to server...')

    //send new mesage from this client to server
    ws.send('Hello Server! My name is a Client1')

    //listen new message
    ws.on('message', (message)=> {
        console.log(message)
    })
})

