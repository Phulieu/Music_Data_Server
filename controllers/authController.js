const passport = require('passport');
const User = require('../db/models/User');
const auth = require('../auth');

const register = async(req,res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err,user) => {
        if(err){
            res.status(500).json({success: false, error: err})
        }

        passport.authenticate('local')(req,res, () => {
            res.status(200).json({success: true, message: "Account created"})
        });

    })
};

const login = async (req, res) => {
    const token = auth.getToken({_id: req.user._id});
    res.status(200).json({success: true, token: token, message: "logged in"})
};

module.exports = {
    register,
    login
};
