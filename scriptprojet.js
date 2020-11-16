let postCode1  = window.prompt("Entrez un code postal : ");
let postCode2 = window.prompt("Entrez un deuxième code postal à comparer avec le premier : ");

let inseeCode1;
let inseeCode2;

// On créé des urls afin de fetch le code INSEE qui nous servira d'ID pour certaines associations de données
let url1 = 'https://api-adresse.data.gouv.fr/search/?q=a&postcode='.concat(postCode1);
let url2 = 'https://api-adresse.data.gouv.fr/search/?q=a&postcode='.concat(postCode2);

let cityName1;
let cityName2;

// Ce premier fetch nous permet de récupérer le code INSEE et le nom de la ville du premier code postal renseigné depuis un json
fetch(url1, {method: 'GET',
    headers: {},
    cache: 'default'})
    .then(function(response){
            response.json()
                .then(function(data){
                        inseeCode1 = data["features"][0]["properties"]["citycode"];
                        cityName1  = data["features"][0]["properties"]["city"];
                        console.log(cityName1);
                    }
                )
        }
    )

// Ce deuxième fetch nous permet de récupérer le code INSEE et le nom de la ville du deuxième code postal à comparer depuis un json
fetch(url2, {method: 'GET',
    headers: {},
    cache: 'default'})
    .then(function(response){
            response.json()
                .then(function(data){
                        inseeCode2 = data["features"][0]["properties"]["citycode"];
                        cityName2  = data["features"][0]["properties"]["city"];
                    }
                )
        }
    )

// Ce fetch nous permet de récupérer le nom des gares présent dans les villes renseignées depuis un json
fetch('https://www.data.gouv.fr/fr/datasets/r/a87c7261-a9df-46b2-89fd-74449a04e4bf', { method: 'GET',
    headers: {},
    mode: 'cors',
    cache: 'default'}).then(
    function(response){
        response.json().then(function(data){
                let tab = [];
                let tab2 = [];
                for (let i = 0; i < data["features"].length; i++) {
                    //Si le code INSEE est le même dans la requête et si la donnée n'a pas déjà été affiché
                    if (data["features"][i]["properties"]["insee"] == inseeCode1 && !tab.includes(data["features"][i]["properties"]["libel"])) {
                        document.getElementById("table").innerHTML += "<tr><th> " + inseeCode1 + "</th><th>" + data["features"][i]["properties"]["libel"] + "</th></tr>";
                        //On remplit un tableau des données affichés afin de ne pas avoir de doublons (ce qui est arrivé dans nos tests)
                        tab.push(data["features"][i]["properties"]["libel"]);
                    }
                    if (data["features"][i]["properties"]["insee"] == inseeCode2 && !tab2.includes(data["features"][i]["properties"]["libel"])) {
                        document.getElementById("table2").innerHTML += "<tr><th> " + inseeCode2 + "</th><th>" + data["features"][i]["properties"]["libel"] + "</th></tr>";
                        //On remplit un tableau des données affichés afin de ne pas avoir de doublons (ce qui est arrivé dans nos tests)
                        tab2.push(data["features"][i]["properties"]["libel"]);
                    }
                }
            }
        )
    }
)

// Ce fetch nous permet de récupérer les taxes d'habitation depuis un CSV (utilisation d'une bibliothèque pour le parse efficacement)
fetch('https://www.data.gouv.fr/fr/datasets/r/ad2e7f7d-ef02-41ab-bb24-b883b2d66c75', { method: 'GET',
    headers: {},
    mode: 'cors',
    cache: 'default'}).then(
    function(response){
        response.text().then(function(data){
                let dataJson = CSVToArray(data, ",");
                let indexInsee = dataJson[0].indexOf("insee");
                let indexTaxeHab = dataJson[0].indexOf("taxe_habitation_taux");
                let indexYear = dataJson[0].indexOf("year");
                let year;
                let rate
                for (let i = 0; i < dataJson.length; i++) {
                    if (dataJson[i][indexInsee] == inseeCode1) {
                        year = dataJson[i][indexYear];
                        rate = dataJson[i][indexTaxeHab];
                        $("#tab").append(
                            "<tr><th>" + year + "</th><th>" + rate + "</th></tr>"
                        );
                    }
                    if (dataJson[i][indexInsee] == inseeCode2) {
                        year = dataJson[i][indexYear];
                        rate = dataJson[i][indexTaxeHab];
                        $("#tab2").append(
                            "<tr><th>"+ year +  "</th> <th>" + rate+ "</th></tr>"
                        );
                    }
                }
                $("#taux").append(
                    " - " + cityName1
                );
                $("#taux2").append(
                    " - " + cityName2
                );

            }
        )
    }
)

// Ici on récupère les prix au m2 des villes renseignés, depuis un CSV
fetch('https://www.data.gouv.fr/fr/datasets/r/58b6b75e-4f15-4efb-adb5-3f7b939fb2d1', { method: 'GET',
    headers: {},
    mode: 'cors',
    cache: 'default'}).then(
    function(response) {
        response.text().then(function (data) {
                let dataJson = CSVToArray(data, ",");
                let indexInsee = dataJson[0].indexOf("INSEE_COM");
                let indexPrix = dataJson[0].indexOf(`Prixm2`);

                for (let i = 0; i < dataJson.length; i++) {
                    if (dataJson[i][indexInsee] == inseeCode1) {
                        $("#tabp").append(
                            "<tr><th>" + dataJson[i][indexPrix]+"</th></tr>"
                        );
                    }
                    if (dataJson[i][indexInsee] == inseeCode2) {
                        console.log(dataJson[i]);
                        $("#tabp2").append(
                            "<tr><th>" + dataJson[i][indexPrix]+"</th></tr>"
                        );
                    }
                }
                $("#prix").append(
                    " - " + cityName1
                );
                $("#prix2").append(
                    " - " + cityName2
                );
            }
        )
    }
);

//Ici on récupère le nombre de centre covid dans les villes renseignées, depuis un CSV
//Le code postal n'étant disponible que dans le champ adresse, il nous a fallu récupérer
// les digits présent dans ce champ grâce à une expression régulière
fetch("https://www.data.gouv.fr/fr/datasets/r/7c0f7980-1804-4382-a2a8-1b4af2e10d32", {method: 'GET',
    headers: {},
    cache: 'default'})
    .then(function(response){
            response.text()
                .then(function(data){
                    let numberOfCovidCenter1 = 0;
                    let numberOfCovidCenter2 = 0;
                    let covidPostCode;
                    let regex = /\d+/g;

                    let dataJson = CSVToArray(data, ",");
                    for (let i = 0; i < dataJson.length; i++) {
                        //Si l'index 4 (correspodant à adresse) est undefined (à cause de lentete du CSV récupéré), on passe
                        if (!dataJson[i][4]) continue;
                        //On récupère un tableau avec les jeux de digits du champs address
                        stringAdressDigits = dataJson[i][4].match(regex)
                        //On passe les données inutilisables et on récupère le dernier élément du tableau correspondant au code postal
                        if (!stringAdressDigits || stringAdressDigits.length < 2) continue;
                        covidPostCode = stringAdressDigits[stringAdressDigits.length-1];

                        //On incrémente le nombre de centre COVID si le code postal match
                        if (covidPostCode == postCode1) {
                            numberOfCovidCenter1++
                        }
                        if (covidPostCode == postCode2) {
                            numberOfCovidCenter2++
                        }

                    }
                    $("#tabc").append(
                        "<tr><th>"+numberOfCovidCenter1+"</th></tr>"
                    );

                    $("#tabc2").append(
                        "<tr><th>"+numberOfCovidCenter2+"</th></tr>"
                    );
                    $("#centre").append(
                        " - " + cityName1
                    );
                    $("#centre2").append(
                        " - " + cityName2
                    );
                })
        }
    )