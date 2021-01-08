const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const app = express();
const PORT = process.env.PORT || 4000;
const {MONGOURI} = require("./config/keys");

// Connect to the mongodb
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Check if the connection has been established
mongoose.connection.on('connected', () => {
    console.log("Connected to mongodb atlas!");
});

//Check if an error occured
mongoose.connection.on('error', (err) => {
    console.log("Error in connecting : " + err);
})

//Middle-Wares
app.use(express.json());
app.use(router);



app.listen(PORT, (err) => {
    if(err)
        console.log("Error : " + err);
    else{
        console.log("Listening on Port : " + PORT);
    }
});