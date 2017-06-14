const Book = require('../models/book');



function booksIndex(req, res, next) {

  Book
  .find()
  .populate('createdBy')
  .then((books) => res.render('books/index', {books}))
  .catch(next);

}
function booksCreate(req, res) {
  req.body.createdBy = req.user;
  Book
  .create(req.body)
  .then(() => {
    res.redirect('/books');
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}


function booksNew(req, res) {
  res.render('books/new');
}

function booksShow(req, res) {
  Book
  .findById(req.params.id)
  .populate('createdBy comments.createdBy')
  .exec()
  .then((book) => {
    if(!book) return res.status(404).end('Not Found');
    res.render('books/show', {book});
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
  console.log(`${req.query.title}`);

}

function booksEdit(req, res) {
  Book
  .findById(req.params.id)
  .exec()
  .then((book) => {
    if(!book) return res.redirect();
    if(!book.belongsTo(req.user)) return res.unauthorized(`/books/${book.id}`, 'You do not have permission to edit that resource');
    return res.render('books/edit', { book });
  })
  .catch((err) => {
    res.status(500).render('error', {err});
  });
}



function booksUpdate(req, res) {
  Book
  .findById(req.params.id)
  .exec()
  .then((book) => {
    if(!book) return res.status(404).end('Not Found');
    for (const field in req.body) {
      book[field] = req.body[field];
    }
    return book.save();
  })
  .then((book) => {
    res.redirect(`/books/${book.id}`);
  })
  .catch((err) => {
    res.status(500).render('error', { err } );
  });
}
function booksDelete(req, res) {
  Book
  .findById(req.params.id)
  .exec()
  .then((book) => {
    if(!book) return res.status(404).end('Not Found');
    return book.remove();
  })
  .then(() => {
    res.redirect('/books');
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });

}
function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Book
  .findById(req.params.id)
  .exec()
  .then((book) => {
    if(!book) return res.notFound();

    book.comments.push(req.body); // create an embedded record
    return book.save();
  })
  .then((book) => res.redirect(`/books/${book.id}`))
  .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Book
  .findById(req.params.id)
  .exec()
  .then((book) => {
    if(!book) return res.notFound();
    // get the embedded record by it's id
    const comment = book.comments.id(req.params.commentId);
    comment.remove();

    return book.save();
  })
  .then((book) => res.redirect(`/books/${book.id}`))
  .catch(next);
}







module.exports = {
  index: booksIndex,
  new: booksNew,
  create: booksCreate,
  show: booksShow,
  update: booksUpdate,
  edit: booksEdit,
  delete: booksDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute


};
