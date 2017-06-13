const Book = require('../models/book');



function booksIndex(req, res, next) {
  Book
  .find()
  .then((books) => res.render('books/index', {books}))
  .catch(next);

}
function booksCreate(req, res) {
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
    if(!book) return res.status(404).end('Not found');
    res.render('books/edit', {book});
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








module.exports = {
  index: booksIndex,
  new: booksNew,
  create: booksCreate,
  show: booksShow,
  update: booksUpdate,
  edit: booksEdit,
  delete: booksDelete


};
