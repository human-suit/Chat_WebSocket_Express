const ws = require('ws');

const wss = new ws.Server({
    port:8080,
}, ()=> console.log('Server Start on 8080'))

wss.on('connection', function connection(ws){
    // ws.id = Date.now() для создания комнат
    let id = Math.random();
    ws.on('message', function (message){
        message = JSON.parse(message)
        
        switch (message.event){
            case 'message':
                all(message)
                console.log(message)
                break
            case 'connection':
                all(message)
                console.log(message)
                break
        }
    })
    ws.on('close', function() {
        const message = {
            event: 'messahe/connection',
            id: 123,
            date: '21.01/2021',
            username: "",
            message: 'Пользователь покинул чат!',
        }
        all(message)
        console.log('соединение закрыто ' + id);
    });

})

const message = {
    event: 'messahe/connection',
    id: 123,
    date: '21.01/2021',
    username: 'vad',
    message: 'hi',
}

function all(message){
    wss.clients.forEach(client=>{
        client.send(JSON.stringify(message))
    })
}