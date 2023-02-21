const dotenv = require('dotenv');

dotenv.config()

const app = require('./app');

const port = process.env.PORT

const server = app.listen(port, () => {
    console.log(`server now running on port ${port}`);
})




// -----------------------------------------------------------------



// socket.io
const socketio = require('socket.io');
const io = socketio(server);
const fileIo = require('./socketio')(io);