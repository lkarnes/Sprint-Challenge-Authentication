/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    console.log(req.headers.authorization)
    if(req.decodedJwt) {
        console.log('line 8', req.decodedJwt);
        next();
    }else if(token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
            if(err) {
                res.status(401).json({access:"denied on line 11"})
            } else {
                req.decodedJwt = decodedJwt; 
                next();
            }
        })
    } else {
        res.status(401).json({access:"denied on line 18"})
    }
}

