//this folder -making connnection

const mongoose  = require('mongoose');


//setting a connection
//with nams of data base -> myuserdata
mongoose.connect('mongodb://localhost:27017/RegAppdb')
.then(()=>{
    console.log("moongoose is connected");
}).catch((err)=>{
    console.log(err);
})