
async function myfetch(url, headers, cors){
    let fetchresp = await fetch(url,{method:'GET', headers:headers, mode:cors, cache:'default'});
    return fetchresp ;
} 

function logdata(fetchresp) {
    fetchresp.then(function(response){response.text().then(function(data){console.log("data", data)})}) ;
}
