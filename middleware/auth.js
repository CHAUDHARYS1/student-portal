const jwt = require("jsonwebtoken");

// create auth function
function auth(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }

    const parts = authHeader.split(' ');

    if(parts.length !== 2){
        return res.status(401).json({message: "Token error"});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).json({message: "Token malformatted"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
    
        req.user = decoded;
        next();
      });

}

module.exports = auth;


// NOTE: The auth middleware function is used to protect routes that require authentication. 
// It checks if the user is authenticated by verifying the JWT token in the request header. 
// If the token is valid, it decodes the token and attaches the user object to the request object. 
// If the token is invalid, it returns a 401 Unauthorized response. You can use this middleware 
// function to protect routes that require authentication. For example, in the userRoutes.js file, 
// you can use this middleware to protect routes that require authentication. For example, you 
// can use it to protect the "protected" route that requires authentication. If the user is not 
// authenticated, they will receive a 401 Unauthorized response. If the user is authenticated,
//  they will have access to the protected route.

// EXAMPLE USAGE:
// const auth = require('./middleware/auth');

// app.get('/protected', auth, (req, res) => {
//   // This route is protected
// });

// In this example, the /protected route is protected by the auth middleware. 
// Only requests that include a valid JWT token in the
// Authorization header will be able to access this route.