var acestok = "pk.eyJ1IjoiZHJueW1idXMiLCJhIjoiY2tna3ZjcXk4MDU2cDJwbnZrNWJneThxdiJ9.zuA6-WiEleDFDN3PCYw1Fw"
var main_content = document.getElementById("maincontent");
var mapdiv = main_content.appendChild(document.createElement("div")).setAttribute("id","map");
var infodiv = main_content.appendChild(document.createElement("div")).setAttribute("id","info");
var mymap = L.map('map').setView([43.610324, 3.876420], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHJueW1idXMiLCJhIjoiY2tna3ZjcXk4MDU2cDJwbnZrNWJneThxdiJ9.zuA6-WiEleDFDN3PCYw1Fw'
}).addTo(mymap);
function placeToilet (gps) {
    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
    return circle;
}

