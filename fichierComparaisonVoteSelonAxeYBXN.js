fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        
    })

var d;
var data1;
var data2;

doGraph().then(data => {
    d = data;
    console.log(data)
})

async function doGraph(){
    return await Promise.all([await get_Data_Vote_Per_State(), await get_Data_Seggre_Per_State()]);
}


async function get_Data_Vote_Per_State() {
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&rows=10")//000")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
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
        data2 = dictStat;
        });
}

async function get_Data_Seggre_Per_State(){
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&rows=3")//08")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
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
        data1 = dictStat;
    })
}