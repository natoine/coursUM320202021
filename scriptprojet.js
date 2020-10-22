
function myfetch(url, headers, cors){
    let fetchresp = await fetch(url,{method:'GET', headers:headers, mode:cors, cache:'default'})
    return fetchresp ;
} 