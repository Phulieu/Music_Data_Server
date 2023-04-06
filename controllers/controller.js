

const Album = require('../db/models/Albums');

const getAllMusic  = async  (req,res) => {
    Album.find().then((albums) => {
        if(!albums.length){
            return res.status(404).json({success:false, error: "No album found."})
        }
        return res.status(200).json({success: true, data:albums })
    }).catch((err) => {
        return res.status(400).json({success: false, error: err})
    });
};

const getMusiceById = async (req,res) => {
    Album.findById(req.params.id).then((album)=>{
        return res.status(200).json({success:true, data: album});
    }).catch((err) => {
        return res.status(400).json({succes: false,error: err});
    });
};

const createAlbum = async (req,res)=> {
    const body = req.body;
    if (req.body.constructor === Object  && Object.keys(req.body).length === 0){
        return res.status(400).json({success: false, error: "You must provide album information"});
    }
    const album = new Album(body);
    if(!album){
        return res.status(400).json({success: false, error: "The album was not created."})
    }

    album.save().then(()=> {
        return res.status(200).json({success: true, message: "Album is created"})
    }).catch((err)=> {
        return res.status(400).json({success: false, error: err})
    });

};

const updateAlbum = async (req, res) => {
    //get client info(what are they trying to update)
    const id = req.params.id;
    //get the info we are updating the album to
    const body = req.body;
    if(body.constructor === Object && Object.keys(body).length === 0){
        return res.status(400).json({success: false, error: "provide album info"});
    }
    //use mongoose to find the album we are updating
    Album.findById(id).then((album) => {
        album.album = body.album;
        album.artist = body.artist;
        album.year = body.year;
        album.artwork = body.art;
    //save updated info
        album.save().then(() => {
            return res.status(200).json({success: true, id: album['_id'], message : "album was updated"})
        }).catch((err) => {
            return res.status(400).json({success: false, error : err})
        });
    }).catch((err) => {
        return res.status(400).json({success: false, error : err})
        });
};

const deleteAlbum = async (req,res) => {
    Album.findById(req.params.id).then(( album) => {
        if(!album) {
            return res.status(400).json({success: false, error: "Can not find album with this id"})
         }
         else {
             album.deleteOne();
             return res.status(200).json({success: true, id: album['_id'], message : "album was deleted"})
         }
         
    }
 
    ).catch((err) => {
     return res.status(400).json({success: false, error : err})
     });
 };

 module.exports = {
    getAllMusic,
    getMusiceById,
    createAlbum,
    updateAlbum,
    deleteAlbum
 };