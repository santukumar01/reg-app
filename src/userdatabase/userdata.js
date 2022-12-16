//creating schema and model
const bcrypt =  require('bcryptjs');
const moongoose= require('mongoose');
// const { nextTick } = require('process');

//creatinsg a schema 
const user_schema = new moongoose.Schema({
    fullname :{
        type:String,
        required : true,
        lowercase : true
    } ,
    email : String,
    phone : Number,
    password : {
        type: String,
        required :true,
    },
    confirm_password :{
        type : String,
        required: true,

    }
    
})

// making passowrd hashed
// user_schema.pre('save',  async (next) =>{
//     this.password = await bcrypt.hash(this.password, 12);
//     this.confirm_password = await bcrypt.hash(this.confirm_password, 12);

// })


//creating a collection/model
const user_collection1 = new moongoose.model("user_collection1",user_schema);

//export the collection 
module.exports = user_collection1;