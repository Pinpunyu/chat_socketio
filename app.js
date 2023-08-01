
const socket = io('ws://localhost:8080');
var myName = null;

var element = document.getElementById("chat-wrap");
element.style.display = 'none';

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});


/*登入成功*/
socket.on('loginSuccess', function(data){
    if(data.name === myName){
        checkIn();
    }else{
        alert('Wrong username:( Please try again!');
    }
})

/*登入失敗*/
socket.on('loginFail', function(){
    alert('Duplicate name already exists:0')
})


document.getElementById('login').onclick = () => {

    const name = document.getElementById("name").value;
    myName = name;
    console.log(`myName = ${myName}`);
    socket.emit('login', name)
    
}

document.getElementById('submit').onclick = () => {

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    socket.emit('message', name, message)
    
}

/*隱藏登入頁，顯示聊天頁*/
function checkIn(data){

    var element = document.getElementById("login-wrap");
    element.style.display = "none";


    var element = document.getElementById("chat-wrap");
    element.style.display = 'block';
}

// document.querySelector('button').onclick = () => {

//     const name = document.getElementById("name").value;
//     const message = document.getElementById("message").value;
//     socket.emit('message', name, message)
    
// }