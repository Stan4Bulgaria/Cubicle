const jwt = require('../utils/jsonwebtoken');
const SECRET = require('../config/config').SECRET;
exports.authentification = async(req , res, next) =>{
    const token = req.cookies['auth'];
    if (token) {
        try{
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true;
        }
        catch(err){
            console.log(err);
            res.clearCookie('auth');
            res.render('404');
        }
    }
    next();
    
}
exports.isAuthenticated = (req, res, next) =>{
    if(!req.isAuthenticated){
           res.render('auth/login');
    }
    next();
}