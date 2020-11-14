menu_deroulant();

// Fonction générale pour afficher les informations du covid-19 + la table des lieux de dépistage
function affichage(){
    // Créer une alerte si aucun département n'est sélectionné
    if (document.getElementById("dep-select").value == "--Veuillez choisir un département--"){
        alert("Veuillez choisir un département");
        return;
    }
    //Appel du jeu de données contenant les informations sur le Covid-19.
    fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
            function(response){
                response.json().then(function(data){
                    //Affichage des données du covid-19 dans une phrase + éléments HTML
                    affiche_phrase(data);
            })
    })
    //Appel du jeu de données avec les lieux de dépistage du département
    fetch('https://www.data.gouv.fr/fr/datasets/r/7c0f7980-1804-4382-a2a8-1b4af2e10d32', { 
        method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(function(response){
            response.text().then(function(data){
                //library papaperse qui permet de transformer un csv en array 
                    //et créer des clefs et des valeurs pour chaque champ
                result = Papa.parse(data,{header: true});
                //map: transforme un tableau en un autre tableau
                //transf_donnee_web_a_table: prend un élément du tableau original 
                    //et retourne un élément dans un nouveau tableau
                result_mod = result.data.map(transf_donnee_web_a_table);
                //appelle une autre fonction pour filtrer les données et afficher le tableau
                affiche_tableau(result_mod);
            }
        )
    })
}

function affiche_phrase(data){
        //Recupère le code postal 
        var cp= [] ;
        let L = data["allLiveFranceData"].length;
        for (let l=0;l<L;l++){
            cp.push(String(data["allLiveFranceData"][l]["code"].replace(/[^\d]/g, "")));
        }

        //Filtre les données en fonction du dep selec
        var result_filter = [];
        for(let y =0; y<L; y++){
            if(cp[y]==document.getElementById("dep-select").value){
                result_filter.push(data["allLiveFranceData"][y]);
                cp1=cp[y];
            }
        }

        // Affiche les informations récupérées de la première API + un gif
        div3=document.getElementById('div3');
        document.getElementById('div4').innerHTML = "";
        var img = document.createElement('img');
        img.src = 'doute.gif';
        document.getElementById('div4').appendChild(img);

        div5=document.getElementById('div5');

        div3.innerHTML = "<br> La France affronte une deuxième vague d'épidémie de coronavirus extrêmement forte. <br> En "+
        result_filter[0]["nom"]+" ("+cp1+")"+", le "+ result_filter[0]["date"]+
        ", nous dénombrons "+ result_filter[0]["deces"]+" décès, "+result_filter[0]["hospitalises"]+" patients hopsitalisés dont " +
        result_filter[0]["reanimation"]+" en réanimation." +
        "<br> Dans les hopitaux du département, il y a "+result_filter[0]["nouvellesHospitalisations"]+
        " nouvelle(s) hospitalisation(s). Parmis elles, "+result_filter[0]["nouvellesReanimations"]+" nouvelles réanimation(s)."
        "<br>"+result_filter[0]["gueris"]+" personnes ont été guéries."

        div5.innerHTML="Un doute ? Pas de panique ! Voici les lieux où vous pouvez vous faire dépister dans votre département :"
}

// Fonction qui permet de créer un menu déroulant avec les départements
function menu_deroulant(){
    fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
            function(response){
                response.json().then(function(data){
                //Récupère les noms des départements et les affiche dans le menu déroulant
                    var cp= [] ;
                    let L = data["allLiveFranceData"].length;

                    for (let l=0;l<L;l++){
                        cp.push(String(data["allLiveFranceData"][l]["code"].replace(/[^\d]/g, "")));
                    }
                    const depselect= document.getElementById("dep-select");
                    let option;
                    for (let i = 0; i < 101; i++) {
                        option= document.createElement("option");
                        option.text=data["allLiveFranceData"][i]["nom"];
                        option.value=cp[i];
                        depselect.add(option);
                    }
            })
    })    
}

//Fonction qui filtre les données par dép et affiche les lieux de test covid dans le html 
function affiche_tableau(result_mod) {
    let tab = document.createElement("table");
    tab.className = 'table table-striped table-dark';
    let tead = document.createElement("thead");
    tab.appendChild(tead);
    tab.style.textAlign="center";
    document.getElementById('maincontent').innerHTML = "";
    document.getElementById("maincontent").appendChild(tab);
    let newLigne = document.createElement("tr");
    tab.appendChild(newLigne);
    let headers = ["Hopital", "Adresse", "Code Postal", "Prélèvement", "Public",
                    "Horaire", "Rendez_vous", "Téléphone", "Site Web"];

    for (let i = 0; i < headers.length; i++) {
        let newColonne = document.createElement("th");
        newColonne.innerHTML = headers[i];
        tab.appendChild(newColonne);
        tab.setAttribute("scope", "col");

    }
    console.log(result_mod.length);

    //Permet de filtrer en fonction du département selectionné
    var result_filter = [];
    for(let y =0; y<result_mod.length-1; y++){
        if(result_mod[y].codePostal===document.getElementById("dep-select").value){
            result_filter.push(result_mod[y]);
        }
    }
    console.log(result_filter);
    for (let j = 0; j < result_filter.length; j++){
        let array_ligne = [result_filter[j].hopital,result_filter[j].adresse, result_filter[j].codePostal,
        result_filter[j].prelevement, result_filter[j].public, result_filter[j].horaire,
        result_filter[j].rdv, result_filter[j].tel, result_filter[j].site_web];
        let newLigne = document.createElement("tr");


        for (let k=0; k < array_ligne.length; k++){

            let newColonne = document.createElement("td");
            if(array_ligne[k]!=null){
                newColonne.innerHTML =array_ligne[k];
            }
            newLigne.appendChild(newColonne);
        }
        tab.appendChild(newLigne);
    }

}

//Fonction qui créer des clefs et des valeurs pour chaque champ
    //+ ajoute une colonne pour le dep des lieux de test covid
function transf_donnee_web_a_table(element) {
    if(element.adresse!=null){
        let cp= String(element.adresse.replace(/[^\d]/g, "")) ;
        let der = cp.substring(cp.length-5, cp.length);
        let dep= der.substring(0, 2);
        return {
            hopital: element.rs, adresse: element.adresse, codePostal: dep,
            prelevement: element.mod_prel,
            public: element.public, horaire: element.horaire, 
            horaire_prioritaire: element.horaire_prio, rdv: element.check_rdv, 
            tel: element.tel_rdv, site_web: element.web_rdv, latitude: element.latitude,
            longitude: element.longitude
        };

    }   
    return null;
}