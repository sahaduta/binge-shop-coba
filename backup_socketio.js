const { Chat, User } = require('./database/models');
const socketio = require('socket.io');
const Op = require('Sequelize').Op
const io = socketio(server);

let users = [];

io.on('connection', async (socket) => {
    console.log('a user connected');

    // simpan socket id
    users[socket.handshake.query.sender_id] = socket.id;

    // ambil history chat dari tabel chats
    const chatHistory = await Chat.findAll({
        attributes: ["id","sender_id", "receiver_id", "message"],
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        {
                            sender_id: socket.handshake.query.sender_id,
                        },
                        {
                            receiver_id: socket.handshake.query.receiver_id
                        }
                    ]
                },
                {
                    [Op.and]: [
                        {
                            sender_id: socket.handshake.query.receiver_id,
                        },
                        {
                            receiver_id: socket.handshake.query.sender_id
                        }
                    ]
                }
            ]},
            order: [
                ['id', 'ASC'],
            ],
    })

    // ambil user dari tabel users
    const receiver = await User.findOne({
        attributes: ["id", "fullname"],
        where: {id: socket.handshake.query.receiver_id}
    })
    
    const sender = await User.findOne({
        attributes: ["id", "fullname"],
        where: {id: socket.handshake.query.sender_id}
    })

    // cek apakah sender dan receiver ada
    if (receiver && sender) {
        // listen event sendEvent
        socket.on('sendEvent', async (data) => {
            Chat.create({
                sender_id : socket.handshake.query.sender_id,
                receiver_id : socket.handshake.query.receiver_id,
                message: data
            })
            // mengirim pesan dengan event messageReceived
            io.to(users[receiver.id]).emit("messageReceived", data);
        });
    } else {
        socket.emit('error', "sender id atau receiver id tidak ditemukan");
        socket.disconnect();
    }

    // load chatHistory
    chatHistory.forEach(data => {
        message = data.message;

        if (data.sender_id == sender.id) {
            socket.emit("senderHistory", message)
        } else if(data.sender_id == receiver.id) {
            socket.emit("receiverHistory", message)
        }
    });
});









// const result = async () => {
//     const results = await Chat.findAll({
//         attributes: ["sender_id", "message"],
//         include: {
//             model: User,
//             attributes: ['fullname'],
//             as: 'owner'
//         }
//     })
//     console.log(results);
// } 

// result();