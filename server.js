
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let users = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    // 登入
    socket.on("login", ( name ) => {
        const sameUser = users.find((user) => {
            return user.name === name;
        });
        console.log(`Fail: ${sameUser}`)

        if (sameUser) {
            socket.emit("loginFail", {
                message: "使用者名稱重複",
            });
        } else {
            // 只發事件給這個使用者
            socket.emit("loginSuccess", {
                message: "歡迎加入！連線成功"
             });

            // 給除了這個使用者外的其他人
            socket.broadcast.emit("loginSuccess", {
                message: `歡迎使用者 ${name} 連線成功`,
            });

            // 發事件給所有人，包括這個使用者
            io.emit("loginSuccess", {
                message: "即刻起免費使用聊天室直到～永遠",
            });

            users.push(name);
        }
    });




    socket.on('message', (name, message) => {
        
        console.log(`${name} said ${message}`);
        io.emit('message', `${name} said ${message}` );   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );


 
