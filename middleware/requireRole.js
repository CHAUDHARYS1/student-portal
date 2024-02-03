function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to access this resource",
        });
    }
    next();
  };
}

module.exports = requireRole;

// NOTE: This middleware function is used to restrict access to certain routes based on the user's role. 
// It takes a role as an argument and returns a middleware function that checks if the user's role matches 
// the required role. If the user's role does not match, it returns a 403 Forbidden response. 
// If the user's role matches, it calls the next middleware function. 
// This middleware function can be used in the routes to restrict access to certain routes based on the 
// user's role. For example, in the userRoutes.js file, you can use this middleware to restrict access to 
// certain routes based on the user's role. For example, you can use it to restrict access to the "admin" 
// role for certain routes.

// EXAMPLE USAGE:
// const requireRole = require('./middleware/requireRole');

// app.get('/admin', auth, requireRole('admin'), (req, res) => {
//     // This route is only accessible to users with the 'admin' role
//   });

// In this example, the /admin route is protected by both the auth and requireRole('admin') middleware. 
// Only authenticated users with the 'admin' role will be able to access this route.