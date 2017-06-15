//starting up the google maps
/*global google:true*/

$(() => {

  const $map = $('#map');

  let map, marker;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: $map.data('lat'), lng: $map.data('lng') },
      zoom: 6
    });


    const customMarkerLocation = $('h2').data('location');

    marker = new google.maps.Marker({ map,
      position: customMarkerLocation
    });



  }

  initMap();

  if($('[data-location]').length > 0) {
    const location = $('[data-location]').data('location');
    marker.setPosition(location);
    map.setCenter(location);
  }

  if($map.hasClass('marker')) {
    map.addListener('click', (e) => marker.setPosition(e.latLng));

    $('.editForm').on('submit', (e) => {
      e.preventDefault();

      const location = marker.getPosition().toJSON();
      console.log('location of new marker', location);
      $('[name=lat]').val(location.lat);
      $('[name=lng]').val(location.lng);

    
      e.target.submit();
    });



  }


});
