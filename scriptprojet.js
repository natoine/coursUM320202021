console.log("C'est Romain !")


// Data americaine presidentielle
var president = "https://public.opendatasoft.com/api/records/1.0/search/?rows=40&flg=fr&disjunctive.state=true&start=0&fields=state,county,rep16_frac,dem16_frac,libert16_frac,green16_frac,votes,dem08,dem12,rep08,rep12,rep12_frac,rep08_frac,dem12_frac,dem08_frac,total_population,less_than_high_school,at_least_high_school_diploma,at_least_bachelor_s_degree,graduate_degree,school_enrollment,median_earnings_2010_dollars,white_not_latino_population,african_american_population,native_american_population,asian_american_population,population_some_other_race_or_races,latino_population,children_under_6_living_in_poverty,adults_65_and_older_living_in_poverty,preschool_enrollment_ratio_enrolled_ages_3_and_4,poverty_rate_below_federal_poverty_threshold,gini_coefficient,child_poverty_living_in_families_below_the_poverty_line,management_professional_and_related_occupations,service_occupations,sales_and_office_occupations,farming_fishing_and_forestry_occupations,construction_extraction_maintenance_and_repair_occupations,production_transportation_and_material_moving_occupations,precincts,white,black,hispanic,amerindian,asian,other,white_asian,sire_homogeneity,median_age,poor_physical_health_days,poor_mental_health_days,low_birthweight,teen_births,children_in_single_parent_households,adult_smoking,adult_obesity,diabetes,sexually_transmitted_infections,hiv_prevalence_rate,uninsured,unemployment,violent_crime,homicide_rate,injury_deaths,infant_mortality,meanalc,maxalc,mixedness,annual_prcp,winter_prcp,summer_prcp,spring_prcp,autumn_prcp,annual_tavg,annual_tmax,annual_tmin,winter_tavg,winter_tmax,winter_tmin,summer_tavg,summer_tmax,summer_tmin,spring_tavg,spring_tmax,spring_tmin,autumn_tavg,autumn_tmax,autumn_tmin,temp,precip&dataset=usa-2016-presidential-election-by-county&timezone=Europe%2FBerlin&lang=fr"

// Data parole de GoT
var GoT = "https://storage.googleapis.com/kagglesdsdata/datasets/13668/18443/season1.json?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20201021%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20201021T215545Z&X-Goog-Expires=259199&X-Goog-SignedHeaders=host&X-Goog-Signature=6ad96cbd5b7d6bfcea7c8bdc6179b13ed3852d1e09b6d567e8cde65e6039a30c2304bbc0038e1a0b8194de7f6151ad5c017523c810f22587003d0dc5036fa9c76d524b96ec6bdb72a4f4b5236969e5a1af8c6ad7c3884b162643951b09cd23a7a610f894c10b2b6c7cfdda5a514f4b854ced58c8e8e55c94b76f67c29ee66f56330510536d6d4486cd450cbe90a0d127303d0f988581237e1e6bf85aad8deb54a558cf54bea4f3de26c008daee03de4847bfdde62887c907c76506f310b1c96827bc7407522c34552d53d5a968a26aa73746f3f1ba709e38a159fd3af871f524aab133df0fc10867335903f71ab0df66fecb86a53918b28d8db14f083eaa98b8"

// Data Ehpad à Paris
var ehpad = "https://www.data.gouv.fr/fr/datasets/r/bedfeb4b-5f83-4912-b589-35fa2f72914b"

// Segregation sociale au USA 
// Source : https://public.opendatasoft.com/explore/dataset/residential-segregation-data-for-us-metro-areas/table/?location=3,46.23229,-124.59801&basemap=jawg.streets
var seggregation = "https://public.opendatasoft.com/api/records/1.0/search/?rows=40&start=40&dataset=residential-segregation-data-for-us-metro-areas&timezone=Europe%2FBerlin&lang=fr"

// FastFood in USA
var fastFoodPBF = "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Fast_Food_Restaurants/FeatureServer/2/query?f=pbf&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-14101102.97804862%2C%22ymin%22%3A5310233.229029364%2C%22xmax%22%3A-13763557.061141372%2C%22ymax%22%3A5647779.145936615%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&returnCentroid=false&returnExceededLimitFeatures=false&maxRecordCountFactor=3&outSR=102100&resultType=tile&quantizationParameters=%7B%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A611.4962262812505%2C%22extent%22%3A%7B%22xmin%22%3A-14088873.053522997%2C%22ymin%22%3A5322463.153554989%2C%22xmax%22%3A-13775786.985666996%2C%22ymax%22%3A5635549.22141099%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D%7D"

// fetch(url1).then(function(data){result = data})
// fetch(seggregation).then(data => {data.json().then(data =>{result = data.records})})



for (i in [0, 40, 80, 120, 160, 200, 240, 280]){
    var result;
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?rows="+(i+40)+"&flg=fr&disjunctive.state=true&start="+i+"&fields=state,county,rep16_frac,dem16_frac,libert16_frac,green16_frac,votes,dem08,dem12,rep08,rep12,rep12_frac,rep08_frac,dem12_frac,dem08_frac,total_population,less_than_high_school,at_least_high_school_diploma,at_least_bachelor_s_degree,graduate_degree,school_enrollment,median_earnings_2010_dollars,white_not_latino_population,african_american_population,native_american_population,asian_american_population,population_some_other_race_or_races,latino_population,children_under_6_living_in_poverty,adults_65_and_older_living_in_poverty,preschool_enrollment_ratio_enrolled_ages_3_and_4,poverty_rate_below_federal_poverty_threshold,gini_coefficient,child_poverty_living_in_families_below_the_poverty_line,management_professional_and_related_occupations,service_occupations,sales_and_office_occupations,farming_fishing_and_forestry_occupations,construction_extraction_maintenance_and_repair_occupations,production_transportation_and_material_moving_occupations,precincts,white,black,hispanic,amerindian,asian,other,white_asian,sire_homogeneity,median_age,poor_physical_health_days,poor_mental_health_days,low_birthweight,teen_births,children_in_single_parent_households,adult_smoking,adult_obesity,diabetes,sexually_transmitted_infections,hiv_prevalence_rate,uninsured,unemployment,violent_crime,homicide_rate,injury_deaths,infant_mortality,meanalc,maxalc,mixedness,annual_prcp,winter_prcp,summer_prcp,spring_prcp,autumn_prcp,annual_tavg,annual_tmax,annual_tmin,winter_tavg,winter_tmax,winter_tmin,summer_tavg,summer_tmax,summer_tmin,spring_tavg,spring_tmax,spring_tmin,autumn_tavg,autumn_tmax,autumn_tmin,temp,precip&dataset=usa-2016-presidential-election-by-county&timezone=Europe%2FBerlin&lang=fr")
        .then(data => {data.json()
            .then(result => {
                for(var j; j < result.records.length; j++){
                    $("#tablePres").append('<div class="col">'+ result.records[j].fields.adult_obesity +'</div>');
                }
            } 
        )}
    );
}