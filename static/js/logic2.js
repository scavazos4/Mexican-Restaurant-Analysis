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
    id: "mapbox/light-v9",
    accessToken: APILeaflet,
  }).addTo(myMap);
  
  
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     id: 'mapbox/light-v9',
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(myMap);




L.geoJson(statesData).addTo(myMap);

var geojson;

// --------------------start of hispanic----------------------------------------------//
function getColor(d) {
  return d > 44  ? '#67000d' :
         d > 42  ? '#a50f15' :
         d > 40  ? '#cb181d' :
         d > 38  ? '#ef3b2c' :
         d > 36  ? '#fb6a4a' :
         d > 34  ? '#fc9272' :
         d > 32  ? '#fcbba1' :
         d > 30  ? '#fee0d2' :
                   '#fff5f0';
}


function style(feature) {
  return {
      fillColor: getColor(feature.properties.medianAge),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(statesData, {style: style}).addTo(myMap);


function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}



function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
  });
}


geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(myMap);



var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Median Age</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.medianAge
        : 'Hover over a state');
};

info.addTo(myMap);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [30, 32, 34, 36, 38, 40, 42, 44],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i]  + (grades[i + 1] ? '&ndash;' + grades[i + 1]  + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);