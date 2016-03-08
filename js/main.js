// init the map

var mymap = L.map('map').setView([36.144, -86.80],14).setMaxBounds([[36.1, -87.1],[36.3, -86.1]]);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    minZoom: 13,
    id: 'mikealbonetti.nff8pmf2' ,
    accessToken: 'pk.eyJ1IjoibWlrZWFsYm9uZXR0aSIsImEiOiI5MzMwMmM4NGU5ZTc4NGRhZTMwNmUwODdhNjYwOGU1ZCJ9.7vD1iXBsAswoe5LsI10vRg'
}).addTo(mymap);

