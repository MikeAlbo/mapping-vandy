$(document).ready(function(){
    

// init the map

var mymap = L.map('map').setView([36.144, -86.80],14).setMaxBounds([[36.1, -87.1],[36.3, -86.1]]);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    minZoom: 13,
    id: 'mikealbonetti.nff8pmf2' ,
    accessToken: 'pk.eyJ1IjoibWlrZWFsYm9uZXR0aSIsImEiOiI5MzMwMmM4NGU5ZTc4NGRhZTMwNmUwODdhNjYwOGU1ZCJ9.7vD1iXBsAswoe5LsI10vRg'
}).addTo(mymap);

// add marker icons \\

var greenIcon = L.icon({
    iconUrl: '../images/custom_markers/green_marker.png',
    shadowUrl: '../images/custom_markers/shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [60,60], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [-5, 5],  // the same for the shadow
    popupAnchor:  [10,-6] // point from which the popup should open relative to the iconAnchor
});  // academic

var blueIcon = L.icon({
    iconUrl: '../images/custom_markers/blue_marker.png',
    shadowUrl: '../images/custom_markers/shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [60,60], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [-5, 5],  // the same for the shadow
    popupAnchor:  [10,-6] // point from which the popup should open relative to the iconAnchor
}); //  research

var redIcon = L.icon({
    iconUrl: '../images/custom_markers/red_marker.png',
    shadowUrl: '../images/custom_markers/shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [60,60], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [-5, 5],  // the same for the shadow
    popupAnchor:  [10, -6] // point from which the popup should open relative to the iconAnchor
}); // hospital

var yellowIcon = L.icon({
    iconUrl: '../images/custom_markers/yellow_marker.png',
    shadowUrl: '../images/custom_markers/shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [60,60], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [-5, 5],  // the same for the shadow
    popupAnchor:  [10, -6] // point from which the popup should open relative to the iconAnchor
}); //athletic

function chooseIcon(x) {
    switch(x.properties.type){
        case "athletic" : return yellowIcon;
        case "hospital" : return redIcon;
        case "research" : return blueIcon;
        case "academic" : return greenIcon;
        default: return blueIcon;    
    }
};

// build popup \\

function buildPopup(x){
  var popup = '<div class="popup">';
    popup += '<h1>'+x.properties.name +'<br>';
    popup += '<small>'+ x.properties.type +'</small></h1>';
    popup += '<p>'+x.properties.address+'</p>';
    popup += '<p>'+x.properties.notes+'</p>';
    return popup;
};

////////////////
// add geoJSON

var teardrop = new L.Icon({iconUrl: '../images/marker-icon.png'});

function vandyBuildings(feature, layer){
    layer.bindPopup(buildPopup(feature));
    layer.setIcon(chooseIcon(feature));
};


 L.geoJson(data, {
     onEachFeature: vandyBuildings
    }
).addTo(mymap);

//console.log(data.geometry);



//var marker = L.marker([36.144, -86.80]).addTo(mymap);
    
    
    /// list view section \\\
    
    
    
  function buildList(){
      var medOut = '';
      var researchOut = '';
      var academicOut = '';
      var athleticOut = '';
      
      for(i = 0; i < data.features.length; i++){
    var object = data.features[i];
    var button  = '<button class="list-group-item building-button">'+object.properties.name+'</button>';
          switch(object.properties.type){
              case "medical" : medOut += button; break;
              case "research" : researchOut += button; break;
              case "athletic" : athleticOut += button; break;
              case "academic" : academicOut += button; break;
              default: medOut += button;
          }
          
  }
      
    $("#medical-list").html(medOut);
    $("#research-list").html(researchOut);
    $("#academic-list").html(academicOut);
    $("#athletic-list").html(athleticOut);  
      
}
    
    buildList();
    
    
    
    }); // end document ready
