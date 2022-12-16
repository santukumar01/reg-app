const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');

const user_collection1 = require("./userdatabase/userdata");
require("./userdatabase/mongoose_connection");

const port = 8000;
const mainFolder = path.join(__dirname, "../")

//making all folder static so that css can load
app.use(express.static(mainFolder));

app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(express.json());

// function(how to use bcrypt ){
//     // const hashedpassword = async (password)=>{
//         //     const hashkey = await bcrypt.hash(password,12);
//         //     return hashkey;
//         // }
//     }

app.get("/", (req, res) => {
    res.send("your app is getting served");
})

app.get("/register", (req, res) => {
    res.sendFile(mainFolder + "frontend/reg.html");
})

app.post("/register", async (req, res) => {
    let req_userdata = await new user_collection1(req.body);

    // function(comment ){
    //     //     // console.log(req_userdata.password);
    //     //     // console.log(req.body);
    //     //     // console.log(req_userdata);
    //     //     // console.log(req.body.password);

    //     //     // console.log(req.body.confirm_password);
    //     }
    if (req.body.password == req.body.confirm_password) {

        const salt = await bcrypt.genSalt(10);
        req_userdata.password = await bcrypt.hash(req_userdata.password, salt);
        req_userdata.confirm_password = await bcrypt.hash(req_userdata.confirm_password, salt);
        
        req_userdata.save();
        
        res.send("registre succesfully");
    }
    else {
        res.send("password do not same");
    }

})

app.get("/login", (req, res) => {
    res.sendFile(mainFolder + "frontend/login.html");
})

app.post("/login", async (req, res) => {
    let useremail = await req.body.email;
    let userpassword =await req.body.password;
    // console.log(username);
    // console.log(userpassword);
    let req_userdata = await user_collection1.findOne({ email: useremail });

    // {
    //     // let mykey_password = await hashedpassword(userpassword); 
    //     // console.log(mykey_password);
    // }

    if (req_userdata != null) {
        const valid_password = await bcrypt.compare(userpassword, req_userdata.password);
        //   {
        // console.log(valid_password);
        // console.log(userpassword);
        // console.log(req_userdata.password);
        //   }
        
        if (valid_password) {
            res.send("logged in");
        }
        else {
            res.send("wrong passwod");
        }

    }
    else {
        res.send("User does not exit");
    }
})
app.listen(port, () => {
    console.log("server is running ");
})