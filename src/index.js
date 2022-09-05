const express = require('express');
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const User = require('./models/user.model');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { inherits } = require('util');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/**
 * Setup the mongodb connection and create on Admin user
 */
mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("Mongodb is connected.");
    // Initialization
    init();
})
async function init(){
    var user = await User.findOne({userId: 'admin'});
    if(user){
        return;
    }else{
        //create the admin user.
        const user = await User.create({
            name: "Vishal",
            userId: "admin",
            email: "vishalrajput1312@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Pass@123", 8)
        });
        console.log("admin user is created.", user);
    }
}
require('./routes/auth.routes')(app);
require("./routes/user.routes")(app);
require("./routes/ticket.routes")(app);
module.exports = app.listen(serverConfig.PORT, ()=>{
    console.log("Application has started on port ", serverConfig.PORT);
})