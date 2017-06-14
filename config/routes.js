
const router =  require('express').Router();
const bookController = require('../controllers/books');
const bookControllerProxy = require('../controllers/booksProxy');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const secureRoute   = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('index'));

// router.route('/')
// .get(bookController.index);

router.route('/books')
.get(bookController.index)
.post(bookController.create);

router.route('/books/new')
.get(secureRoute, bookController.new);

router.route('/books/:id')

.get(bookController.show)
.put(secureRoute, bookController.update)
.delete(secureRoute, bookController.delete)
.get(bookControllerProxy.proxy);

router.get('/booksproxy', bookControllerProxy.proxy);


router.route('/books/:id/edit')
.get(secureRoute, bookController.edit);


router.route('/profile')
.get(secureRoute, registrations.show);

router.route('/profile')
.delete(secureRoute, registrations.delete);


router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/logout')
.get(sessions.delete);

router.route('/books/:id/comments')
.post(secureRoute, bookController.createComment);

router.route('/books/:id/comments/:commentId')
.delete(secureRoute, bookController.deleteComment);





module.exports = router;
