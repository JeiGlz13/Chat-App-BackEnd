import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import messageRouter from './routes/message.js';

dotenv.config();
// Configuracion mongoose
const url = process.env.MONGO_CONNECTION;

mongoose.Promise = global.Promise;

const app = express();
const port = 4000;

// Crear server HTTP
const server = http.createServer(app);

// Configuracion socket io
const io = new SocketServer(server, {
    cors: {
      origin: '*',
    },
});

// Middlewares
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', messageRouter);

// Socket io
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('message', (message, nickname, createdAt) => {
        // Envio al resto de clientes
        socket.broadcast.emit('message', {
            body: message,
            from: nickname,
            createdAt,
        });
    })
})

// Connection DB and listenn port
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo');
        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        })
    })

