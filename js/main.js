$(document).ready(function(){
// init the map
//var markerRadius = 8;
var mymap = L.map('map').setView([36.144, -86.80],14).setMaxBounds([[36.1, -87.1],[36.3, -86.1]]);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    minZoom: 13,
    id: 'mikealbonetti.nff8pmf2' ,
    accessToken: 'pk.eyJ1IjoibWlrZWFsYm9uZXR0aSIsImEiOiI5MzMwMmM4NGU5ZTc4NGRhZTMwNmUwODdhNjYwOGU1ZCJ9.7vD1iXBsAswoe5LsI10vRg'
}).addTo(mymap);

// add marker icons \\

var greenIcon = // academic
    {
    radius: updateRadius(),
    fillColor: "rgba(50,220,50,1)",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8  
     };

var blueIcon = //  research
     {
       radius: 8,
    fillColor: "rgba(50,100,250,1)",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8  
     };

var redIcon = // hospital
    {
       radius: 8,
    fillColor: "rgba(250,50,50,1)",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8  
     };

var yellowIcon = //athletic
    {
    radius: 10,
    fillColor: "rgba(250,200,50,1)",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8  
     };
var purpleIcon = //admin
    {
       radius: 8,
    fillColor: "rgba(200,150,220,1)",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8  
     };

function chooseIcon(x) {
    switch(x.properties.type){
        case "athletic" : return yellowIcon;
        case "hospital" : return redIcon;
        case "research" : return blueIcon;
        case "academic" : return greenIcon;
        case "admin"    : return purpleIcon;    
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
    //layer.setIcon(chooseIcon(feature));
    
};

 L.geoJson(data, {
     onEachFeature: vandyBuildings,
     pointToLayer: function(feature, latling){
        return L.circleMarker(latling, chooseIcon(feature))      
    }
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
      var adminOut = '';
      
      for(i = 0; i < data.features.length; i++){
    var object = data.features[i];
    var button  = '<button class="list-group-item building-button">'+object.properties.name+'</button>';
          switch(object.properties.type){
              case "medical" : medOut += button; break;
              case "research" : researchOut += button; break;
              case "athletic" : athleticOut += button; break;
              case "academic" : academicOut += button; break;
              case "admin" : adminOut += button; break;      
              default: medOut += button;
          }
          
  }
      
    $("#medical-list").html(medOut);
    $("#research-list").html(researchOut);
    $("#academic-list").html(academicOut);
    $("#athletic-list").html(athleticOut); 
    $("#admin-list").html(adminOut);  
      
}
    
    buildList();
    
    $(".building-button").on('click', function(){
       var buildingName = $(this).html();
        //alert(buildingName);
        locateBuilding(data, buildingName);
        updateBrand(buildingName);
       // alert(output);
    });
    
    function locateBuilding(x, buildingName){
        //alert(buildingName);
        var output;
        for(i = 0; i < x.features.length; i++){
            var object = x.features[i];
            if (buildingName == object.properties.name){
               // alert(object.geometry.coordinates + "and  the building name is " + object.properties.name);
             output = object.geometry.coordinates;    
            }
            
        }
        //alert(output);
        mymap.setView(new L.LatLng(output[1],output[0]), 18);
          
    };
    //console.log(data);
    ///////////////////// add search ///////////////////////
    
    $("#search").keyup(function(){
        $('#search-results-div').popover('show');
        var searchField = $('#search').val();
        // alert(searchField);
        var regex = new RegExp(searchField, "i");
        var output = '<li class="list-group-item">';
        var count = 1;
        for(i = 0; i < data.features.length; i++){
            var object = data.features[i];
            if((object.properties.name.search(regex) != -1 || object.properties.type.search(regex) != -1)){
                output += '<button class="list-group-item btn btn-default building-button animated fadeIn">'+object.properties.name+'</button>';
               
                count ++;
                
            }
            
        }
        output += '</li>';
        if(searchField == ''){
            $('#search-output').html('');
        } else {
            $('#search-output').html(output);
            };
        
        $("button").on('click', function(){
       var buildingName = $(this).html();
        locateBuilding(data, buildingName);    
        $('#search-output').html('');
        updateBrand(buildingName);    
    });
        
    
    }); // end keyup
    
    
    /// navar brand title
    
    function updateBrand(x){
        $("#navbar-building-title").html('<p>'+ x +'</p>');
    }

    
    // reset button 
    
    $("#reset-button").on('click', function(){
        mymap.setView(new L.LatLng(36.144, -86.80), 14);
    });
    
    //get zoom and resize the markers
 
    function updateRadius(){
        var zoom  = mymap.getZoom();
       
        switch(zoom) {
            case 13 : return 8;
            case 14 : return 10;
            case 15 : return 12;
            case 16 : return 14;
            case 17 : return 16;
            case 18 : return 18;
            default : return 8;    
        }
    };
    
    mymap.on('zoomend', function(){ 
        //L.Marker.setRadius( new updateRadius());
        //greenIcon.radius = updateRadius();
        //L.setRadius(100);
    });
    
    
    }); // end document ready
