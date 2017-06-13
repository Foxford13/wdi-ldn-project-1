function secureRoute(req, res, next) {
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'you are not on the list mate');
      res.redirect('/login');
    });
  }
  next();
}


module.exports = secureRoute;
