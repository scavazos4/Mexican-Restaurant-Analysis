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
  
  
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     id: 'mapbox/light-v9',
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(myMap);

L.geoJson(statesData).addTo(myMap);


function getColor(d) {
  return d > 0.50  ? '#800026' :
         d > 0.45  ? '#BD0026' :
         d > 0.40  ? '#E31A1C' :
         d > 0.35  ? '#FC4E2A' :
         d > 0.30  ? '#FD8D3C' :
         d > 0.25  ? '#FEB24C' :
         d > 0.20  ? '#FED976' :
                   '#FFEDA0';
}

d3.csv("/data/hispanicData.csv")
  .row(function style(data) {
    return {
      Percent_Hispanic: data.Percent_Hispanic
  };
})
.get(function(data) {
  console.log(data);
});


function style(d) {
  return {
      fillColor: getColor(d.Percent_Hispanic),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(statesData, {style: style}).addTo(myMap);

