const express = require('express');

const musicController = require('../controllers/controller');

const router = express();




// routes
    //GET ALL
    router.get('/music', musicController.getAllMusic )
    
    
    
    //Get by id
    
    router.get('/music/:id', musicController.getMusiceById)
    
    //create album
    
    router.post('/music', musicController.createAlbum);
    
    //update album
    //make put request
    //we need an id from client
    router.put('/music/:id', musicController.updateAlbum );
        //use mongoose to validate the data and save it to the database
    
    //delete route
    
    router.delete('/music/:id', musicController.deleteAlbum );

module.exports = router;