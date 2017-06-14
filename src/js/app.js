$(() => {
  console.log('working');



  const title = $('h2').data('title');
  const $results = $('.book-results');
  // console.log(title);

  $results.on('click', 'button', function() {


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

  // 
  // const $googleLng = $('#google-lng').text();
  // const $googleLat = $('#google-lat').text();







  $.ajax({

    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=51.5074,0.1278&key=AIzaSyD_4S64vxXlmpR2d47IEgHCj0HYPbT6p9c`,
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
      <button data-image="${book.volumeInfo.imageLinks.smallThumbnail}" data-title="${book.volumeInfo.title}" data-authors="${book.volumeInfo.authors}" data-description="${book.volumeInfo.description}"
      data-id="${book.id}">Populate Form</button>

      </div>`);

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





    $('.coordinates').each((e) => {
      console.log(e.$googleLng);
    });





  });
