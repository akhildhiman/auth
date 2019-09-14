var User = require("../models/user")



// if the user has a session, grab the user by its userid and set the user to both request and the template, else set it to null

exports.checkLoggedUser = (req, res, next) => {
    if (req.session && req.session.userId) { // if session is present and userid is present
    User.findById(req.session.userId, (err, user) => { 
        req.user = user;
        res.locals.user = user;
        next();
    })} else {
        req.user = null;
        res.locals.user = null;
        next();
    }
}


