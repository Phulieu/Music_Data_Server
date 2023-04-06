const express = require('express');
const cors = require('cors');

const db = require('./db/connect');

const backend = express();

backend.use(express.json());
backend.use(cors({
    origin: 'http://localhost:3000'
}))

const router = require('./routes/routes');

backend.use('/api', router );



//index route

backend.get('/',function(required,response){
    response.redirect('/api/music');
});

//listen for connections (on port 3001)

backend.listen(3001, function(){
    //send a message that we are listening
    console.log("Server started");
});