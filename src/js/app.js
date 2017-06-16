$(() => {

  const title = $('h2').data('title');
  const $results = $('.book-results');


  $results.on('click', 'button', function() {

    $('#image').val($(this).data('image'));
    $('#title').val($(this).data('title'));
    $('#author').val($(this).data('authors'));
    $('#google-id').val($(this).data('id'));
    $('#description').val($(this).data('description'));
  });

  $.ajax({

    url: `/booksproxy`,
    method: 'GET',
    data: title,
    json: true
  });


//// Im keeping that code  (╯°□°）╯︵ ┻━┻

  //
  // $.ajax({
  //
  //   url: `/books/show`,
  //   method: 'GET',
  //   data: title
  //
  // })
  // .done((response)  => {
  //   console.log(response.results[0].formatted_address);
  // });



  // const $googleCor = $('.google-cor').text();

  // console.log($googleCor);

  // function workYouFuck() {
  //   const arrayO = $googleCor.split(';');
  //
  //   // console.log(arrayO[2]);
  //   for (var i = 0; i< arrayO.length; i++) {
  //     console.log($.get((`https://maps.googleapis.com/maps/api/geocode/json?latlng=${arrayO[i]}&key=AIzaSyD_4S64vxXlmpR2d47IEgHCj0HYPbT6p9c`)));
  //     // $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${arrayO[i]}&key=AIzaSyD_4S64vxXlmpR2d47IEgHCj0HYPbT6p9c`)
  //     // .done((adress) => $.each(console.log(adress.responseJSON)));
  //   }
  //
  // }
  // workYouFuck();
















  $('.new-form').on('submit', getBooks);
  $('.button-search-book').on('click', getBooks);


  function addBook(i, book) {

    $results.append(`
      <table><tr><td><a href="${book.volumeInfo.infoLink}">${book.volumeInfo.title}</a>
      <p class="author-name">${book.volumeInfo.authors}</p></td></tr><tr><button class="populate-button" data-image="${book.volumeInfo.imageLinks.smallThumbnail}" data-title="${book.volumeInfo.title}" data-authors="${book.volumeInfo.authors}" data-description="${book.volumeInfo.description}"
      data-id="${book.id}">Populate</button></tr></table>

      `);
    }

    function getBooks(e) {
      e.preventDefault();
      const searchInput = $('input[name="q"]').val();

      if(!$(this).is('.book-results')) {
        emptyBooks();

      }
      // $.get(`/booksproxy${+}?q=${searchInput}`)
      $.get(`/booksproxy?q=${searchInput}`)
      .done((books) => $.each(books.items, addBook));
    }

    function emptyBooks() {
      $results.empty();
    }


  });
