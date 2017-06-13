const User = require('../models/user');

function registrationsNew(req, res) {
  return res.render('registrations/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

function registrationsShow(req, res) {
  return res.render('registrations/show');
}
function registrationsDelete(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate,
  show: registrationsShow,
  delete: registrationsDelete
};
