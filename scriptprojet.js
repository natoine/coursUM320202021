console.log("c'est ici qu'il faut coder votre javascript")

fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    res=JSON.stringify(data)
    for (var i  in data){
      $("#"+i).attr("onmouseover", "drawInfobulle("+data[i]+")");
      $("#"+i).attr("onmouseleave", "removeInfobulle()");
    }
  })
function drawInfobulle(element){
  console.log(element);
}
function removeInfobulle(){
  console.log('quitter');
}
