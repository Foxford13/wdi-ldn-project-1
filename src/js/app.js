$(() => {
  console.log('working');

  const title = $('h2').data('title');
  const $results = $('.book-results');
  // console.log(title);

  $results.on('click', 'button', function() {
    console.log($(this).data('description'));

    $('#image').val($(this).data('image'));
    $('#title').val($(this).data('title'));
    $('#author').val($(this).data('authors'));

    $('#description').append($(this).data('description'));
  });

  $.ajax({

    url: `/booksproxy`,
    method: 'GET',
    data: title,
    json: true
  })

  .done((response)  => {
    console.log(response);
  });

  ///////////QUESTIONABLE DONT BE AFRAID TO Delete

  $('.new-form').on('submit', getBooks);
  $('.button-search-book').on('click', getBooks);

// <button id="result-button">Click</button>

  function addBook(i, book) {
    $results.append(`

    <a href="${book.volumeInfo.infoLink}">${book.volumeInfo.title}</a>
    <p>${book.volumeInfo.authors}</p>
    <button data-image="${book.volumeInfo.imageLinks.smallThumbnail}" data-title="${book.volumeInfo.title}" data-authors="${book.volumeInfo.authors}" data-description="${book.volumeInfo.description}">Populate Form</button>

    </div>`);

  }







  function getBooks(e) {
    e.preventDefault();
    const searchInput = $('input[name="q"]').val();

    if(!$(this).is('.book-results')) {
      emptyBooks();
      console.log(searchInput);
    }
    // $.get(`/booksproxy${+}?q=${searchInput}`)
    $.get(`/booksproxy?q=${searchInput}`)
    .done((books) => $.each(books.items, addBook));
  }

  function emptyBooks() {
    $results.empty();
  }



  // function workNow() {
  //   return console.log('nooo');
  // }
  //
  // $('button').on('click', workNow);










});
