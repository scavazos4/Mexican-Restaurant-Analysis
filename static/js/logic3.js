

// Creating map object
var myMap = L.map("map", {
    center: [39.50, -98.35],
    zoom: 5,
    layers: [restaurants]
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

var geojson;

// --------------------start of hispanic----------------------------------------------//
function getColor(d) {
  return d > 0.40  ? '#7f0000' :
         d > 0.35  ? '#b30000' :
         d > 0.30  ? '#d7301f' :
         d > 0.25  ? '#ef6548' :
         d > 0.20  ? '#fc8d59' :
         d > 0.15  ? '#fdbb84' :
         d > 0.10  ? '#fdd49e' :
         d > 0.05  ? '#fee8c8' :
                     '#fff7ec';
}


function style(feature) {
  return {
      fillColor: getColor(feature.properties.hisp),
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
    this._div.innerHTML = '<h4>Hispanic Population Percentage</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + (parseFloat(props.hisp * 100).toFixed(2)) +"%" 
        : 'Hover over a state');
};

info.addTo(myMap);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.35, 0.40],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i]*100 + "%" + (grades[i + 1] ? '&ndash;' + grades[i + 1]*100 + "%" + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
// --------------------end of hispanic----------------------------------------------//



//-----------------creating layers--------------///

var overlayMaps = {
    Restaurants: restaurants
};



d3.json("data/restaurants,json", function(data) {
    
    var restaurants = l.geoJSON(data)
    
})
L.control.layers(overlayMaps, {
    collapsed: false
}).addTo(myMap);
