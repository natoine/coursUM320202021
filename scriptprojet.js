console.log("c'est ici qu'il faut coder votre javascript")

function etats(){
  fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // Work with JSON data here
      res=JSON.stringify(data)
      for (var i  in data){
        $("#"+i).attr("onmouseover", "drawInfobulle('"+data[i]+"', '"+i+"')");
        $("#"+i).attr("onmouseleave", "removeInfobulle()");
      }
    })
}

function drawInfobulle(element,index){
  var infobulle = $("#infobulle");
  var donnees =$('#donnees');
  infobulle.html(element);
  fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3D'"+element+"'")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      // Work with JSON data here
      res=JSON.stringify(data)
      for (var i  in data['records']){
        var str="<li>";
        str+=data['records'][i]['fields']['candidate'];
        str+=' : ';
        // //str+=data['records'][i]['fields']['votes'];
        // str+='Proportion de votes : '+data['records'][i]['fields']['fraction_votes'];
        // //str+='Comté : '+data['records'][i]['fields']['county'];
        str+=data['records'][i]['fields']['party']+'</li>';
        // str+='\n';
        $("#liste").append(str);
      }
      //donnees.html(str);
    });
    console.log(index);
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&q=state_code%3D%"+index+"&facet=cbsa&facet=msa&facet=state_code")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // Work with JSON data here
        res=JSON.stringify(data)
        var hispanic = 0;
        var black = 0;
        var white = 0;
        var asian = 0;
        for(var i in data['records']){
          white+=data['records'][i]['fields']['white_population_non_hispanic'];
          hispanic+=data['records'][i]['fields']['hispanic_population'];
          asian+=data['records'][i]['fields']['asian_population'];
          black+=data['records'][i]['fields']['black_population'];
        }
        var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['White Population', 'Hispanic Population', 'Asian Population', 'Black Population'],
        datasets: [{
            label: 'Distribution of population',
            data: [white, hispanic, asian, black],
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
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
      })
}
function removeInfobulle(){
  $("#liste").append('');
  var donnees =$('#donnees');
  donnees.html('')
  console.log('quitter');
}
