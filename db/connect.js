const mongoose = require('mongoose');

mongoose.set('strictQuery',true);

const username = "parkerlieu1999";
const password = "cssH8EqLx3QsOFYh";
const dbname = "music_app";
const uri = `mongodb+srv://${username}:${password}@cluster0.5pclhcr.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri).then(
    (con) => {
        console.log("connected to MongoDB");
    }
).catch(
    (error) => {
        console.log("got error: " + error);
    }
);

const db = mongoose.connection;

module.exports = db;