const fetch = require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch)

getTracks('https://open.spotify.com/track/3msQJEmoSGNJGvyDCMMafB?si=da5e25114b654afa')
  .then(data => console.log((data)))