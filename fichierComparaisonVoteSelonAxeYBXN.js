fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        
    })

var d;
var data1;
var data2;
// #################### Attention danger chimque mon code va vous rendre allergique

Promise.all([fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&rows=10"),
fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&rows=3")])
.then(data => {return Promise.all([data[0].json(), data[1].json()]) })
.then(data => { 
    let dict1 = cleanDataVote(data[0]);
    let dict2 = cleanDataSeggreg(data[1]);
    console.log(dict2, dict1); 
})


// #################### Zone de lab



function cleanDataVote(data) {
    dictStat = {};
    for (var i in data['records']) {
        if (!dictStat.hasOwnProperty(data['records'][i]["fields"]["state_abbreviation"])) {
            dictStat[data['records'][i]["fields"]["state_abbreviation"]] = [0, 0, 0]
        }
        if (data['records'][i]['fields']['party']=="Republican"){
            dictStat[data['records'][i]["fields"]["state_abbreviation"]][0] += data['records'][i]['fields']['votes'];
        }
        else if (data['records'][i]['fields']['party']=="Democrat"){
            dictStat[data['records'][i]["fields"]["state_abbreviation"]][1] += data['records'][i]['fields']['votes'];
        }
        else {
            dictStat[data['records'][i]["fields"]["state_abbreviation"]][2] += data['records'][i]['fields']['votes'];
        }
    }
    return dictStat;
}

function  cleanDataSeggreg(data){
    
    dictStat = {};
    for (var i in data['records']) {
        if (!dictStat.hasOwnProperty(data['records'][i]["fields"]["state_code"])) {
            dictStat[data['records'][i]["fields"]["state_code"]] = [0, 0, 0, 0]
        }
        dictStat[data['records'][i]["fields"]["state_code"]][0] += data['records'][i]['fields']['white_population_non_hispanic'];
        dictStat[data['records'][i]["fields"]["state_code"]][1] += data['records'][i]['fields']['hispanic_population'];
        dictStat[data['records'][i]["fields"]["state_code"]][2] += data['records'][i]['fields']['asian_population'];
        dictStat[data['records'][i]["fields"]["state_code"]][3] += data['records'][i]['fields']['black_population'];
    }
    return dictStat;
}