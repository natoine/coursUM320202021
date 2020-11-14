var place = $('#bubble');
var dataset;
var char;
var arrEthni = ["white people", "hispanic people", "asian people", "black people"];
var chooseEthni = [0, 0]; // [x, y]


function activationEventForDoGraphic(){
    place.hide();
    char = bubbleChart();
    maPromise(chooseEthni);

    $("#doGraph").click(function(){
        chooseEthni = [$("#ethni1").val(), $("#ethni2").val()];
        maPromise(chooseEthni);
    })
}


function maPromise(chooseEthni){
    Promise.all([fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&rows=10000"),
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&rows=308"),
    fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json")])
    .then(data => {return Promise.all([data[0].json(), data[1].json(), data[2].json()])})
    .then(data => {
        // ### Remove data chart
        let taille = char.data.datasets.length;
        for(let i=0; i<taille; i++){ 
            char.data.datasets.pop();
        }
        char.update();
        
        let voteData = cleanDataVote(data[0]);
        let seggregData = cleanDataSeggreg(data[1]);
        let linkState = data[2];
        dataFetch = formDataSet(seggregData, voteData, linkState, chooseEthni);
        
        // ### Add data chart
        char.data.datasets = dataFetch;
        char.options.title.text = "Compare pourcentage vote (Demo, Rep, other) according pourcentage of "+ arrEthni[chooseEthni[0]] + " and "+ arrEthni[chooseEthni[1]]
        char.options.scales.xAxes[0].scaleLabel.labelString = 'Pourcentage of '+ arrEthni[chooseEthni[0]]
        char.options.scales.yAxes[0].scaleLabel.labelString = 'Pourcentage of '+ arrEthni[chooseEthni[1]]
        char.update();
        place.show();        
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
        dictStat[i] = dictStat[i].map(x => (x/totalPopState*10).toFixed(2));
    }
    return dictStat;
}

function  cleanDataSeggreg(data){
    dictStat = {};
    let regex = RegExp('-');
    for (var i in data['records']) {
        if (!dictStat.hasOwnProperty(data['records'][i]["fields"]["state_code"])) {
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
    let whoX = arrCompareEthni[0]
    let whoY = arrCompareEthni[1]
    let dataset = []
    let color = [
        {backgroundColor:"#6C9AFF", hoverBackgroundColor: "#0050FF" },
        {backgroundColor:"#FF6060", hoverBackgroundColor: "#FB0303"},
        {backgroundColor:"#FAFD55", hoverBackgroundColor: "#FAFF00"}
    ]
    let party = ["Republican", "Democrate", "Other"]
    for(state in seggregData){
        
        if (voteData.hasOwnProperty(state) && linkState.hasOwnProperty(state)) {
            let idxMax = 0;
            for(let i in voteData[state]){
                if(voteData[state][i]>voteData[state][idxMax]){
                    idxMax=i
                }
            }
            let winner = {
                label: (party[idxMax]+" vote for "+linkState[state]),
                data: [
                    {
                        x: seggregData[state][whoX],
                        y: seggregData[state][whoY],
                        r: voteData[state][idxMax]
                    }
                ],
                backgroundColor: color[idxMax]["backgroundColor"],
                hoverBackgroundColor: color[idxMax]["hoverBackgroundColor"]
            }
            dataset.push(winner);
        }
    }
    return dataset;
}

// ##################### Fonction de mise en place le graphique

function bubbleChart(){
    return new Chart(place, {
        type: 'bubble',
        data: {
            datasets: []
        },
        options: {
            title: {
                display: true, 
                text: null
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: null,
                    },
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: null,
                    }
                }],
                
            }
        }
    });
}