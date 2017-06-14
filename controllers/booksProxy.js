const rp = require('request-promise');


function booksProxy(req, res) {

  rp({
    url: `https://www.googleapis.com/books/v1/volumes?q=${req.query.q}`,
    method: 'GET',
    json: true
  })
  .then((books) => {
    res.json(books);
  });
}



module.exports = {

  proxy: booksProxy

};
