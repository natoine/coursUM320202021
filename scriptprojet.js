console.log("c'est ici qu'il faut coder votre javascript")

var myHeaders = new Headers({"Access-Control-Allow-Origin" : "*"})

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'no-cors',
               cache: 'default' };

fetch("https://data.montpellier3m.fr/sites/default/files/ressources/OSM_Castelnau_equipement_sportif_point.json",myInit).then(data=>{data.text().then(data=>{result=data.records})})