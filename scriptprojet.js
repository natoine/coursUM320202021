
function myfetch(url, headers, cors){
    let fetchresp = await fetch(url,{method:'GET', headers:headers, mode:cors, cache:'default'}).then(function(response){response.text().then(function(data){console.log("data", data)})})
    return fetchresp ;
} 