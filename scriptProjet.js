let numberOfCovidCenter1=0;
let numberOfCovidCenter2=0;
let covidPostCode;
let regex = /\d+/g;
let code_insee;
let code_insee2;
let postcode  = window.prompt("Entrez un code postal : ");
let postcode2 = window.prompt("Entrez un deuxième code postal à comparer avec le premier : ");
let adresse = 'https://api-adresse.data.gouv.fr/search/?q=a&postcode='.concat(postcode);
let adresse2 = 'https://api-adresse.data.gouv.fr/search/?q=a&postcode='.concat(postcode2);
let ville;
let ville2;
console.log(adresse)
fetch(adresse, {method: 'GET',
    headers: {},
    cache: 'default'})
    .then(function(response){
            response.json()
                .then(function(data){
                    //document.getElementById("maincontent").innerHTML=data["features"][0]["properties"]["citycode"];
                    code_insee = data["features"][0]["properties"]["citycode"];
                    ville = data["features"][0]["properties"]["city"];
                    console.log(code_insee);
                })
        }
    )
    console.log(adresse2)
    fetch(adresse2, {method: 'GET',
        headers: {},
        cache: 'default'})
        .then(function(response){
                response.json()
                    .then(function(data){
                        //document.getElementById("maincontent").innerHTML=data["features"][0]["properties"]["citycode"];
                        code_insee2 = data["features"][0]["properties"]["citycode"];
                        ville2 = data["features"][0]["properties"]["city"];
                        console.log(code_insee2);
                    })
            }
        )

fetch('https://www.data.gouv.fr/fr/datasets/r/a87c7261-a9df-46b2-89fd-74449a04e4bf', { method: 'GET',
    headers: {},
    mode: 'cors',
    cache: 'default'}).then(
    function(response){
        response.json().then(function(data){
            let tab = [];
            let tab2 = [];
            for (let i = 0; i < data["features"].length; i++) {
                // console.log(data["features"][i]["properties"]["citycode"]);

                if (data["features"][i]["properties"]["insee"] == code_insee && !tab.includes(data["features"][i]["properties"]["libel"])) {
                  tab.push(data["features"][i]["properties"]["libel"]);
                  document.getElementById("table").innerHTML+="<tr><th> " + code_insee + "</th><th>" + data["features"][i]["properties"]["libel"] + "</th></tr>";
                  //document.getElementById("maincontent").innerHTML+=data["features"][i]["properties"]["libel"];
                }
                if (data["features"][i]["properties"]["insee"] == code_insee2 && !tab2.includes(data["features"][i]["properties"]["libel"])) {
                  tab2.push(data["features"][i]["properties"]["libel"]);
                  document.getElementById("table2").innerHTML+="<tr><th> " + code_insee2 + "</th><th>" + data["features"][i]["properties"]["libel"] + "</th></tr>";
                  //document.getElementById("maincontent").innerHTML+=data["features"][i]["properties"]["libel"];
                }


            }

        })
    }
)
fetch('https://www.data.gouv.fr/fr/datasets/r/ad2e7f7d-ef02-41ab-bb24-b883b2d66c75', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
        function(response){
            response.text().then(function(data){
                impotLocaux = CSVToArray(data, ",");
                console.log(impotLocaux[0]);
                let impotObj =[];
                let indexInsee = impotLocaux[0].indexOf("insee");
                let indexTaxeHab = impotLocaux[0].indexOf("taxe_habitation_taux");
                let indexYear = impotLocaux[0].indexOf("year");
                console.log(indexTaxeHab);
                console.log(indexInsee);
                for (let i = 0; i < impotLocaux.length; i++) {
                    if (impotLocaux[i][indexInsee] == code_insee) {
                        value1 = impotLocaux[i][indexYear];
                        console.log(value1);
                        value2 = impotLocaux[i][indexTaxeHab];
                        console.log(value2);
                        // impotObj.push([{ "year": value1} , {"taxe" : value2}])
                        $("#tab").append(
                            "<tr><th>"+ value1 +  "</th> <th>" + value2+ "</th></tr>");
                        }
                        // document.getElementById("maincontent").innerHTML+=impotLocaux[i][indexTaxeHab];
                        if (impotLocaux[i][indexInsee] == code_insee2) {
                            value1 = impotLocaux[i][indexYear];
                            console.log(value1);
                            value2 = impotLocaux[i][indexTaxeHab];
                            console.log(value2);
                            // impotObj.push([{ "year": value1} , {"taxe" : value2}])
                            $("#tab2").append(
                                "<tr><th>"+ value1 +  "</th> <th>" + value2+ "</th></tr>");


                    }
                }
                $("#taux").append(
                  " a "+ville
                );
                $("#taux2").append(
                  " a "+ville2
                );

})} )

fetch('https://www.data.gouv.fr/fr/datasets/r/58b6b75e-4f15-4efb-adb5-3f7b939fb2d1', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
        function(response) {
            response.text().then(function (data) {
                prix = CSVToArray(data, ",");
                console.log(prix[0]);
                let indexInseeprix = prix[0].indexOf("INSEE_COM");
                let indexPrix = prix[0].indexOf(`Prixm2`);
                  for (let i = 0; i < prix.length; i++) {
                     if (prix[i][indexInseeprix] == code_insee) {
                       console.log(prix[i][indexPrix])
                       $("#tabp").append(
                           "<tr><th>"+ prix[i][indexPrix]+"</th></tr>");
                      }
                      if (prix[i][indexInseeprix] == code_insee2) {
                        console.log(prix[i][indexPrix])
                        $("#tabp2").append(
                            "<tr><th>"+ prix[i][indexPrix]+"</th></tr>");
                       }
                     }
                     $("#prix").append(
                       " a "+ville
                     );
                     $("#prix2").append(
                       " a "+ville2
                     );
                   })} );


                   fetch("https://www.data.gouv.fr/fr/datasets/r/7c0f7980-1804-4382-a2a8-1b4af2e10d32", {method: 'GET',
                         headers: {},
                         cache: 'default'})
                         .then(function(response){
                                 response.text()
                                     .then(function(data){
                                         sitesCovid = CSVToArray(data, ",");


                                         for (let i = 0; i < sitesCovid.length; i++) {
                                             if (!sitesCovid[i][4]) continue;
                                             stringAdressNumbers = sitesCovid[i][4].match(regex)
                                             if (!stringAdressNumbers || stringAdressNumbers.length < 2) continue;
                                             covidPostCode = stringAdressNumbers[stringAdressNumbers.length-1];

                                             if (covidPostCode == postcode) {
                                                 numberOfCovidCenter1++


                                             }
                                             if (covidPostCode == postcode2) {
                                               numberOfCovidCenter2++
                                             }

                                         }
                                         $("#tabc").append(
                                             "<tr><th>"+numberOfCovidCenter1+"</th></tr>");

                                        $("#tabc2").append(
                                            "<tr><th>"+numberOfCovidCenter2+"</th></tr>");
                                            $("#centre").append(
                                              " a "+ville
                                            );
                                            $("#centre2").append(
                                              " a "+ville2
                                            );
                                     })
                             }
                         )
