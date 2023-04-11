const express = require('express');
const passport = require('passport');

const musicController = require('../controllers/controller');
const authController = require('../controllers/authController');

const auth = require('../auth');

const router = express();


// routes


//auth
router.post('/register', authController.register);
router.post('/login', passport.authenticate('local',{session:false}) ,authController.login);


//GET ALL
router.get('/music', auth.verifyUser ,musicController.getAllMusic );



//Get by id

router.get('/music/:id',auth.verifyUser , musicController.getMusiceById);

//create album

router.post('/music',auth.verifyUser , musicController.createAlbum);

//update album
//make put request
//we need an id from client
router.put('/music/:id',auth.verifyUser , musicController.updateAlbum );
    //use mongoose to validate the data and save it to the database

//delete route

router.delete('/music/:id',auth.verifyUser , musicController.deleteAlbum );

module.exports = router;