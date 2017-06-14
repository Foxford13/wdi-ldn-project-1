const User = require('../models/user');

function authenticateUser(req, res, next) {
  if(!req.session.userId) return next();

  
  User
  .findById(req.session.userId)
  .then((user) => {
    if(!user) {
      return req.session.regenarate(() => res.redirect('/'));
    }
    req.user = user;
    res.locals.user = user;
    res.locals.isAuthenticated = true;
    req.session.userId = user.id;



    next();

  });
}
module.exports = authenticateUser;
