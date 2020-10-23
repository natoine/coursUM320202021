//################ Source donnée disponible ################

// key for link us_code and name state
var linkState = "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json";
// Data americaine presidentielle
var president = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3DTexas&facet=state&facet=county&facet=party&facet=candidate"
// Segregation sociale au USA  : https://public.opendatasoft.com/explore/dataset/residential-segregation-data-for-us-metro-areas/table/?location=3,46.23229,-124.59801&basemap=jawg.streets
var seggregation = "https://public.opendatasoft.com/api/records/1.0/search/?rows=40&start=40&dataset=residential-segregation-data-for-us-metro-areas&timezone=Europe%2FBerlin&lang=fr"
// FastFood in USA
var fastFoodPBF = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Fast_Food_Restaurants/FeatureServer/2/query?f=pbf&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-14101102.97804862%2C%22ymin%22%3A5310233.229029364%2C%22xmax%22%3A-13763557.061141372%2C%22ymax%22%3A5647779.145936615%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&maxRecordCountFactor=3&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A611.4962262812505%2C%22extent%22%3A%7B%22xmin%22%3A-14088873.053522997%2C%22ymin%22%3A5322463.153554989%2C%22xmax%22%3A-13775786.985666996%2C%22ymax%22%3A5635549.22141099%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D"

var link;
fetch(linkState)
    .then(data => {data.json()
        .then(data => {
            link = data; 
            CrossData();
        })
    });


function CrossData(){
    for(li in link){
        takeVoteData("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3D"+link[li]+"&facet=state&facet=county&facet=party&facet=candidate");
        takeSeggreg("https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&q=msa%3D"+ li +"&rows=4&facet=cbsa&facet=msa&facet=state_code")
    }
}

function takeVoteData(url){
    /**
     * Code qui recupère les données issue du vote au État unie en 2016, ce code les partage dans un tableau html de données
     *
     */
}

function takeSeggreg(){
    
}
        
