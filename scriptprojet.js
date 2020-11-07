//################ Source donnée disponible ################

// key for link us_code and name state
var linkState = "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json";

// Data americaine presidentielle
var president = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3DTexas&facet=state&facet=county&facet=party&facet=candidate"

// Segregation sociale au USA  : https://public.opendatasoft.com/explore/dataset/residential-segregation-data-for-us-metro-areas/table/?location=3,46.23229,-124.59801&basemap=jawg.streets
var seggregation = "https://public.opendatasoft.com/api/records/1.0/search/?rows=40&start=40&dataset=residential-segregation-data-for-us-metro-areas&timezone=Europe%2FBerlin&lang=fr"

// ############################ En suspense ! (It's your turn !) ############################

// 
// url2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&q=msa%3D"+ li +"&rows=4&facet=cbsa&facet=msa&facet=state_code";



var link;
fetch(linkState)
    .then(data => {data.json()
        .then(data => {
            link = data; 
            //CrossData();
        })
    });


// ################################################## Cross Data ##################################################

async function CrossData(){
    promiseDict = {}
    for(li in link){
        promiseDict[li]= [await takeFastFoodVarForOneState(li)]//, await 
    }
    return promiseList;
}


// ################################################## Us presidential request ##################################################

async function takePresidentialVoteVarForOneState(stateFullName){
    let url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-presidential-election-by-states&q=state%3D"+ stateFullName +"&facet=state&facet=winner";
    return await fetch(url)
    .then(
        data => {
            return data.json().then(res => {
                return res;
            })
        }
    )
}

takePresidentialVoteVarForOneState("Texas")
.then(data=>{
    console.log(data["records"][0]["fields"]["winner"]);
})

// ################################################## Us food data request ##################################################

// Issue du site : https://www.ers.usda.gov/data-products/food-environment-atlas/go-to-the-atlas.aspx
// Partie requete : https://gis.ers.usda.gov/arcgis/rest/services/fa_restaurants/MapServer/6/query
async function takeFastFoodVarForOneState(state){
    let url = "https://gis.ers.usda.gov/arcgis/rest/services/fa_restaurants/MapServer/2/query?where=State+%3D+%27" + state + "%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4269&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
    let field = "FFRPTH16";
    return await fetch(url)
    .then(
        data => {
            return data.json().then(res => {
                //console.log("var "+field + " "+ res["fieldAliases"]["FFRPTH16"])
                var result = 0;
                let n = 0;
                for(i in res["features"]){
                    result = result + res["features"][i]["attributes"][field];
                    n++;
                }
                result /= n;
                return result;
            })
        }
    )
}

var state = "WI"
var val = takeFastFoodVarForOneState(state)
val.then(data => {console.log(data)})