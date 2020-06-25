//dom query
const chatList = document.querySelector('.chat-list');
const newchat =document.querySelector('.new-chat');
const newname=document.querySelector('.new-name');
const updatemessage=document.querySelector('.update-mesg');
const nameuser=document.getElementById('nameuser');
const chatroom=document.querySelector('.chat-rooms');
//check localstorage
const username=localStorage.username? localStorage.username : 'some one';
nameuser.textContent=username;
//class instances 
const chat=new Chatroom('public',username);
const chatUI=new ChatUI(chatList);
chat.getChat(data=>chatUI.render(data));
//add new chat


// chat.updateRoom('public');

//add new chat 
newchat.addEventListener('submit',e=>{
    e.preventDefault();
    let message=newchat.message.value.trim();
    chat.addChat(message)
        .then(()=>newchat.reset())
        .catch(err=>{console.log('chat not added'+err)});
});
//update the name of user
newname.addEventListener('submit',e=>{
    e.preventDefault();
    let name=newname.name.value.trim();
    chat.updateName(name);
    newname.reset();
    updatemessage.textContent='the name has been upDated'
    updatemessage.classList.remove('d-none');
    nameuser.textContent=name;
    setInterval(() => {
        updatemessage.classList.add('d-none');
    }, 2000);
});

chatroom.addEventListener('click',e=>{
    if (e.target.tagName =='BUTTON') {
        chatUI.clear()
        const room=e.target.getAttribute('id');
        chat.updateRoom(room);
        chat.getChat(data=>chatUI.render(data));
    }
})