// L'emplacement HTML des graphiques
var ctx1 = $('#votes');
var ctx2 = $('#myChart');

// Les variables graphiques
var char1;
var char2;

function etats(){
  fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      ctx1.hide();
      ctx2.hide();

      char1 = buildChar1();
      char2 = buildChar2();
      
      for (var i  in data){
        $("#"+i).attr("onclick", "drawInfobulle('"+data[i]+"', '"+i+"')");
      }
    })
}

function drawInfobulle(element,index){
  ctx2.hide();
  ctx1.hide();

  // ################### Mise à jours du graphique 2 ###################
  var infobulle = $("#nom_etat");
  infobulle.html(element);
  let taille = char1.data.datasets[0].data.length;
  for(let i=0; i<taille;i++){ 
    char1.data.datasets[0].data.pop();
  }
  char1.update();
  fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3D'"+element+"'")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var democrats = 0;
      var republican = 0;
      var other = 0;
      for (var i  in data['records']){
        if (data['records'][i]['fields']['party']=="Republican"){
          republican+=data['records'][i]['fields']['votes'];
        }
        else if (data['records'][i]['fields']['party']=="Democrat"){
          democrats+=data['records'][i]['fields']['votes'];
        }
        else {
          other+=data['records'][i]['fields']['votes'];
        }
      }
      // Ajoute les données dynamiquement au graphique
      d1 = [republican, democrats, other];
      char1.data.datasets.forEach((dataset) => {
        for(i in d1) dataset.data.push(d1[i]);
      });
      char1.update();
      ctx1.show();
    });

    // ################### Mise à jours du graphique 2 ###################
    // Retire toute les données contenus dans le graphique !    
    taille = char2.data.datasets[0].data.length;
    for(let i=0; i<taille;i++){
      char2.data.datasets[0].data.pop();
    }
    char2.update();

    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&q=state_code%3D%"+index+"&facet=cbsa&facet=msa&facet=state_code")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        var hispanic = 0;
        var black = 0;
        var white = 0;
        var asian = 0;
        for(var i in data['records']){
          white += data['records'][i]['fields']['white_population_non_hispanic'];
          hispanic += data['records'][i]['fields']['hispanic_population'];
          asian += data['records'][i]['fields']['asian_population'];
          black += data['records'][i]['fields']['black_population'];
        }
        if(white != 0 || hispanic != 0 || asian != 0 || black != 0){
          // Ajoute les données dynamiquement au graphique
          d = [white, hispanic, asian, black];
          char2.data.datasets.forEach((dataset) => {
            for(i in d){
              dataset.data.push(d[i]);
            }
          });
          char2.update(); 
          ctx2.show();
        }
      })
}


// ######################################## Consctruction des graphiques char1 et char2 ################################################

function buildChar2(){
  return new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['White Population', 'Hispanic Population', 'Asian Population', 'Black Population'],
        datasets: [{
            label: 'Distribution of population',
            data: null,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                     display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                     display: false
              }
            }]
        }
    }
  });
}


function buildChar1(){
  return new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
        labels: ['Republicans', 'Democrats','Others'],
        datasets: [{
            label: 'Repartition of votes',
            data: null,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
              gridLines: {
                display: true
              },
              type: 'linear',
            }],
            yAxes: [{
              gridLines: {
                display: false
              },
            }]
        }
    }
  });
}