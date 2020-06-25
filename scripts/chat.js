//add a chat room
class Chatroom{
    constructor(room,username){
        this.username=username;
        this.room=room;
        this.chats=db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        // make an object for chat
        const now=new Date();
        const newchat={
            create_at:firebase.firestore.Timestamp.fromDate(now),
            message:message,
            username:this.username,
            room:this.room,
        }
        const reponse=await this.chats.add(newchat);
        return reponse;
    }
    getChat(callback){
        this.unsub=this.chats
        .where('room','==',this.room)
        .orderBy("create_at")
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change => {
                if (change.type ==='added') {
                    //update the ui
                    callback(change.doc.data());
                } 
            });
        })
    }
    updateName(username){
        this.username=username;
        localStorage.setItem('username',username); 
    }
    updateRoom(room){
        this.room=room;
        console.log('room updated');
        if (this.unsub) {
            this.unsub();
        }
    }
}
