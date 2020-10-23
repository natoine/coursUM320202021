fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
               headers: {},
               mode: 'cors',
               cache: 'default'}).then(
    function(response){
        response.json().then(function(data){
        	
        	document.getElementById("maincontent").innerHTML=data["allLiveFranceData"][0]["nouvellesReanimations"];
        })
            }
)
