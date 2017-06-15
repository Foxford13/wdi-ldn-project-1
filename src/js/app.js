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
    $('#google-id').val($(this).data('id'));
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



  $('.new-form').on('submit', getBooks);
  $('.button-search-book').on('click', getBooks);


  function addBook(i, book) {
    $results.append(`
      <div class="populate-for col-lg-10"><a href="${book.volumeInfo.infoLink}">${book.volumeInfo.title}</a>
      <p>${book.volumeInfo.authors}</p></div>
      <button class="populate-button" data-image="${book.volumeInfo.imageLinks.smallThumbnail}" data-title="${book.volumeInfo.title}" data-authors="${book.volumeInfo.authors}" data-description="${book.volumeInfo.description}"
      data-id="${book.id}">Populate</button>
      `);

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


  });
