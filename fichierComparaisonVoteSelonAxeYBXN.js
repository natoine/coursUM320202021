var place = document.getElementById('bubble').getContext('2d');
var dataset;
var graph;
var arrEthni = ["white people", "hispanic people", "asian people", "black people"];

function maPromise(){
    Promise.all([fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&rows=10000"),
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&rows=308"),
    fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")])
    .then(data => {return Promise.all([data[0].json(), data[1].json(), data[2].json()]) })
    .then(data => { 
        let voteData = cleanDataVote(data[0]);
        let seggregData = cleanDataSeggreg(data[1]);
        let linkState = data[2];

        let chooseEthni = [1, 2]; // [x, y]

        dataset = formDataSet(seggregData, voteData, linkState, chooseEthni);

        graph = new Chart(place, {
            type: 'bubble',
            data: {
                datasets: dataset
            },
            options: {
                title: {
                    display: true, 
                    text: "Compare pourcentage vote (Demo, Rep, other) according pourcentage of "+ arrEthni[chooseEthni[0]] + " and "+ arrEthni[chooseEthni[1]]
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Pourcentage of '+ arrEthni[chooseEthni[1]]
                        }
                      }],
                      xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Pourcentage of '+ arrEthni[chooseEthni[0]]
                        }
                      }],
                }
            }
        });
    })
    
}


// ##################### Fonction de traitement des datasets

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
    // transformation en pourcetage de vote
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    for(var i in dictStat){
        let totalPopState = dictStat[i].reduce(reducer);
        dictStat[i] = dictStat[i].map(x => (x/totalPopState).toFixed(2));
    }
    return dictStat;
}

function  cleanDataSeggreg(data){
    dictStat = {};
    let regex = RegExp('-');
    for (var i in data['records']) {
        if (!dictStat.hasOwnProperty(data['records'][i]["fields"]["state_code"])) {
            // Je verifie la key n'est pas de cette forme là : AX-KY...
            if(regex.test(data['records'][i]["fields"]["state_code"])){
                let arr = data['records'][i]["fields"]["state_code"].split("-");
                for(i in arr){
                    if (!dictStat.hasOwnProperty(arr[i])) {
                        dictStat[arr[i]] = [0, 0, 0, 0]
                    }
                }
            } else {
                dictStat[data['records'][i]["fields"]["state_code"]] = [0, 0, 0, 0]
            }
        }
        dictStat[data['records'][i]["fields"]["state_code"]][0] += data['records'][i]['fields']['white_population_non_hispanic'];
        dictStat[data['records'][i]["fields"]["state_code"]][1] += data['records'][i]['fields']['hispanic_population'];
        dictStat[data['records'][i]["fields"]["state_code"]][2] += data['records'][i]['fields']['asian_population'];
        dictStat[data['records'][i]["fields"]["state_code"]][3] += data['records'][i]['fields']['black_population'];
    }
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    for(var i in dictStat){
        let totalPopState = dictStat[i].reduce(reducer);
        dictStat[i] = dictStat[i].map(x => (x/totalPopState*100).toFixed(2));
    }
    return dictStat;
}

function formDataSet(seggregData, voteData, linkState, arrCompareEthni){
    whoX = arrCompareEthni[0]
    whoY = arrCompareEthni[1]
    dataset = []
    coeffR = 10
    for(state in seggregData){
        if (voteData.hasOwnProperty(state) && linkState.hasOwnProperty(state)) {
            let republicain = {
                label: ("Republican vote for "+linkState[state]),
                data: [
                    {
                        x: seggregData[state][whoX],
                        y: seggregData[state][whoY],
                        r: voteData[state][1]*coeffR
                    }
                ],
                backgroundColor:"#FF6060",
                hoverBackgroundColor: "#FB0303"
            }
            let democrate = {
                label: ("Democrate vote for "+linkState[state]),
                data: [
                    {
                        x: seggregData[state][whoX],
                        y: seggregData[state][whoY],
                        r: voteData[state][0]*coeffR
                    }
                ],
                backgroundColor:"#6C9AFF",
                hoverBackgroundColor: "#0050FF"
            }
            let other = {
                label: ("Other vote for "+linkState[state]),
                data: [
                    {
                        x: seggregData[state][whoX],
                        y: seggregData[state][whoY],
                        r: voteData[state][2]*coeffR
                    }
                ],
                backgroundColor:"#FAFD55",
                hoverBackgroundColor: "#FAFF00"
            }
            dataset.push(democrate);
            dataset.push(republicain);
            dataset.push(other);
        }
    }
    return dataset;
}


// ##################### Fonction de mise en place des graphiques

function bubbleChart(place, data){
    var options = {
        aspectRatio: 1,
        legend: false,
        tooltips: false,

        
    };
    return 
}