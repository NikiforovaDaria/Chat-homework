import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import {version} from '../package.json';
import WebSocketServer, {Server} from 'uws';

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({ exposedHeaders: '*'}));
app.use(bodyParser.json({ limit: '500mb' }));

app.get('/', (req, res) => {
    res.json({
        version: version
    })
})

app.wss = new Server({ server: app.server })

let clients = [];

app.wss.on('connection', (connection)=> {

    //when we find a new client
    const userId = clients.length + 1;
    connection.userId = userId

    const newClient = {
        ws: connection,
        userId: userId,
    };

    clients.push(newClient);
    console.log('New client connected with userId: ', userId)

    connection.on('message', (message)=>{
        console.log('Message from ', message)
    })

    connection.on('close', ()=> {
        console.log('Client with ID', userId, ' is disconnected')

        clients = clients.filter((client)=> { 
            return client.userId !== userId 
        })
    })

    
})

app.set('root', __dirname);

app.get('/api/all_connection', (req, res, next)=>{
    return res.json({
        people: clients,
    })
})


setInterval(()=> {
    //each 3 sec this function will be executed
    console.log(`There ${clients.length} people in connection!`)
    if(clients.length > 0){
        clients.forEach((client)=> {
            console.log('Client ID', client.userId);

            //send message from server to each person in the connection
            const msg = `Hey ID: ${client.userId}: you got new message from server`
            client.ws.send(msg)
        });
    }
}, 3000)

app.server.listen(process.env.PORT || PORT, ()=> {
    console.log(`App is running on port ${app.server.address().port}`);
});

export default app;