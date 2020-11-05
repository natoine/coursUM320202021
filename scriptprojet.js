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
        $("#"+i).attr("onmouseover", "drawInfobulle('"+data[i]+"', '#"+i+"')");
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
    })
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?rows=40&start=40&dataset=residential-segregation-data-for-us-metro-areas&timezone=Europe%2FBerlin&lang=en")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // Work with JSON data here
        res=JSON.stringify(data)
        console.log(data['records'][1]['fields']);
      })
}
function removeInfobulle(){
  $("#liste").append('');
  var donnees =$('#donnees');
  donnees.html('')
  console.log('quitter');
}
