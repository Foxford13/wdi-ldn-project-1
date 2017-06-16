//im keeping that too
const rp = require('request-promise');


function googleProxy(req, res) {

  rp({
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=50,40&key=${process.env.GOOGLE_MAPS_KEY}`,

    method: 'GET',
    json: true
  })
  .then((data) => {
    res.json(data);
  });
}



module.exports = {

  proxy: googleProxy

};
