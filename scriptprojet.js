//################ Source donnée disponible ################

// key for link us_code and name state
var linkState = "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json";

// Data americaine presidentielle
var president = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3DTexas&facet=state&facet=county&facet=party&facet=candidate"

// Segregation sociale au USA  : https://public.opendatasoft.com/explore/dataset/residential-segregation-data-for-us-metro-areas/table/?location=3,46.23229,-124.59801&basemap=jawg.streets
var seggregation = "https://public.opendatasoft.com/api/records/1.0/search/?rows=40&start=40&dataset=residential-segregation-data-for-us-metro-areas&timezone=Europe%2FBerlin&lang=fr"

// FastFood in USA
// Api des fastfoods au Etat Unie
var fastFoodJson = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Fast_Food_Restaurants/FeatureServer/2/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-14101102.97804862%2C%22ymin%22%3A5310233.229029364%2C%22xmax%22%3A-13763557.061141372%2C%22ymax%22%3A5647779.145936615%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&maxRecordCountFactor=3&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A611.4962262812505%2C%22extent%22%3A%7B%22xmin%22%3A-14088873.053522997%2C%22ymin%22%3A5322463.153554989%2C%22xmax%22%3A-13775786.985666996%2C%22ymax%22%3A5635549.22141099%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D"



var link;
fetch(linkState)
    .then(data => {data.json()
        .then(data => {
            link = data; 
            CrossData();
        })
    });


async function CrossData(){
    for(li in link){
        url1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3D"+link[li]+"&facet=state&facet=county&facet=party&facet=candidate";
        url2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=residential-segregation-data-for-us-metro-areas&q=msa%3D"+ li +"&rows=4&facet=cbsa&facet=msa&facet=state_code";
        // concatenData(url1, url2);
    }
}


// ################################################## Request fastfood ##################################################


var xmin = -14101102.97804862;
var xmax = -13763557.061141372;
var ymin = 5310233.229029364
var ymax = 5647779.145936615;


// https://services1.arcgis.com/4yjifSiIG17X0gW4/ArcGIS/rest/services/Fast_Food_Restaurants/FeatureServer/1/query?where=&objectIds=&time=&geometry=%7B%22xmin%22%3A-14101102.97804862%2C+%22xmax%22%3A-13763557.061141372%2C+%22ymax%22%3A5647779.145936615%2C+%22ymin%22%3A5310233.229029364%7D&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=
var fastFood2Request = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Fast_Food_Restaurants/FeatureServer/2/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A"+ xmin + "%2C%22ymin%22%3A" + ymin + "%2C%22xmax%22%3A"+ xmax +"%2C%22ymax%22%3A"+ ymax +"%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&maxRecordCountFactor=3&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A611.4962262812505%2C%22extent%22%3A%7B%22xmin%22%3A-14088873.053522997%2C%22ymin%22%3A5322463.153554989%2C%22xmax%22%3A-13775786.985666996%2C%22ymax%22%3A5635549.22141099%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D"

console.log(fastFood2Request)
// Transformation en coordonnée GPS et non WebMercator
var fastFood0RequestCount = "https://services1.arcgis.com/4yjifSiIG17X0gW4/ArcGIS/rest/services/Fast_Food_Restaurants/FeatureServer/0/query?where=&objectIds=&time=&geometry=%7B%22xmin%22%3A-169.9146%2C+%22xmax%22%3A-129.993%2C+%22ymax%22%3A71.5232%2C+%22ymin%22%3A52.5964%7D&geometryType=esriGeometryEnvelope&inSR=%7B%22wkid%22%3A4326%7D&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token="


var StateBounderie = "https://gist.githubusercontent.com/jakebathman/719e8416191ba14bb6e700fc2d5fccc5/raw/8c851d4b081a1d9370c25fcb25a502c8692b11fe/state_boundaries.json"

var res;

fetch(fastFood2Request)
    .then(data => { data.json()
        .then(
            data => { 
                res = data;
        })
    });

console.log(res);

// ################################################## Us data request ##################################################

// Issue du site : https://www.ers.usda.gov/data-products/food-environment-atlas/go-to-the-atlas.aspx
// Partie requete : https://gis.ers.usda.gov/arcgis/rest/services/fa_restaurants/MapServer/6/query
var state = "WI"
var url = "https://gis.ers.usda.gov/arcgis/rest/services/fa_restaurants/MapServer/2/query?where=State+%3D+%27"+state+"%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4269&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
fetch(url)
.then(
    data => {
        data.json().then(res => {
            console.log(res)
        })
    }
)