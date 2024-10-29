function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }
  
  var map = L.map('map').setView([39.8283, -98.5795], 4);
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  function createMarker(labelId, localityId) {
    var randomLatitude = getRandomInRange(30, 35, 3);
    var randomLongitude = getRandomInRange(-100, -90, 3);
    L.marker([randomLatitude, randomLongitude]).addTo(map);
    document.getElementById(labelId).textContent = `Latitude: ${randomLatitude}, Longitude: ${randomLongitude}`;
    locality(randomLatitude, randomLongitude, localityId);
  }
  
  createMarker('random1', 'locality1');
  createMarker('random2', 'locality2');
  createMarker('random3', 'locality3');
  
  function locality(latitude, longitude, localityId) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
      .then(response => response.json())
      .then(data => {
        document.getElementById(localityId).textContent = 'Locality: ' + data.locality;
      })
  }
  