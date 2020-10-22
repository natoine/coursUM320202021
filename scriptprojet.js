console.log("c'est ici qu'il faut coder votre javascript")
var main_content = document.getElementById("maincontent");
var mapdiv = main_content.appendChild(document.createElement("div")).setAttribute("id","map");
var infodiv = main_content.appendChild(document.createElement("div")).setAttribute("id","info");
var mymap = L.map('map').setView([51.505, -0.09], 13);