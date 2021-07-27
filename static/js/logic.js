// Creating map object
var myMap = L.map("map", {
    center: [39.50, -98.35],
    zoom: 5
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: APILeaflet,
  }).addTo(myMap);
  
  // Store API query variables
  var baseURL = "https://api.census.gov/data";
  var year = "/2019";
  var datasetName = "/pep/charagegroups";
  var get = "?get=";
  var variables = "NAME,POP";
  var total = "&HISP=0";
  var nonHispanic = "&HISP=1";
  var hispanic = "&HISP=2";
  var state = "&for=state:*";
  var county = "&for=county:*";
  var key = "&key=" + APICensus;
  
  // Assemble API query URL
  var url = baseURL + year + datasetName + get + variables + total + county + key;
  console.log(url);

  // Grab the data with d3
  d3.json(url, function(response) {
    console.log(response);
    
  })




  
  //   // Create a new marker cluster group
  //   var markers = L.markerClusterGroup();
  
  //   // Loop through data
  //   for (var i = 0; i < response.length; i++) {
  
  //     // Set the data location property to a variable
  //     var location = response[i].NAME;
  
  //     // Check for location property
  //     if (location) {
  
  //       // Add a new marker to the cluster group and bind a pop-up
  //       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
  //         .bindPopup(response[i].descriptor));
  //     }
  
  //   }
  
  //   // Add our marker cluster layer to the map
  //   myMap.addLayer(markers);
  
  // });
  