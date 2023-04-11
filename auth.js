const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');

const User = require('./db/models/User');

passport.use(new LocalStrategy(User.authenticate()));

//set up sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const SECRET_KEY = 'jhadsfiuqyw4ihaskjhlseqyr39pqcyew9';

const getToken = (user) => {
    return jwt.sign(user, SECRET_KEY, {expiresIn: 3600});

};

// set up JWT options
const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
};

passport.use(new JwtStrategy(opt, (jwt_payload, done)=> {
    User.findById(jwt_payload._id).then((user) => {
        if(user) {
            return done(null, user);
        }
        return done(null, false);
    }).catch((err) => {
        return done((err,false))
    });
}));

const verifyUser = passport.authenticate('jwt',{session: false})

module.exports = {
    getToken,
    verifyUser
};