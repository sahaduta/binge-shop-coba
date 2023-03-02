const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helpers/error.helper');

const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            throw new ErrorResponse(401, "jwt token not found!")
        }
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        result = jwt.verify(bearerToken, process.env.JWT_KEY, (err, decoded) =>{
            if(err) {
                throw new ErrorResponse(401, "the jwt token is false!")
            }
            req.decodedJWT = decoded;
        });
        
        next();
    } catch (error) {
        next(error)
    }

}

module.exports = verifyToken;