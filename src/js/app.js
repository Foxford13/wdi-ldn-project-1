$(() => {
  console.log('working');

  const title = $('h2').data('title');
  // console.log(title);

  $.ajax({

    url: `/booksproxy`,
    method: 'GET',
    data: title,
    json: true
  })

  .done((response)  => {
    // console.log(response);
  });

  ///////////QUESTIONABLE DONT BE AFRAID TO Delete

  $('.new-form').on('submit', getBooks);
  $('.button-search-book').on('click', getBooks);

  function addBook(book) {
    $('.book-results').append(`<p>${book.volumeInfo.title}</p>`);


  }


  function getBooks(e) {
    e.preventDefault();
    const searchInput = $('input[name="q"]').val();

    if(!$(this).is('.book-results')) {
      emptyBooks();
      console.log(searchInput);
    }
  $.get(`/booksproxy${+}q=${searchInput}`)
    // $.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
    .done((books) => {
      // console.log(books);
      $.each(books.items, (i, book) => {



        addBook(book);

      });

    });
  }

  function emptyBooks() {
    $('.book-results').empty();
  }












});
