menu_deroulant();

function affiche_table_hopital(){
    fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
            function(response){
                response.json().then(function(data){
                    menu_deroulant(data);

                    //Créer un tableau avec le nom des colonnes, et met des bonnes valeurs dans les bonnes colonnes
                    // + récupère le département en le mettant dans une colonne
                    let tab1=document.createElement("table");
                    document.getElementById("maincontent1").appendChild(tab1);
                    let newLigne = document.createElement("tr");
                    tab1.appendChild(newLigne);

                    let headers = ["Code Postal", "Nom","Date","Hospitalisations","Réanimation","Nouvelles Hospitalisations","Nouvelles Réanimations", 
                    "Décès", "Guéris"];

                    for (let i = 0; i < headers.length; i++) {
                        let newColonne = document.createElement("td");
                        newColonne.innerHTML = headers[i];
                        tab1.appendChild(newColonne);
                    }

                    var cp= [] ;
                    for (let l=0;l<101;l++){
                        cp.push(String(data["allLiveFranceData"][l]["code"].replace(/[^\d]/g, "")));
                    }

                    var result_filter = [];
                    for(let y =0; y<101; y++){
                        if(cp[y]===document.getElementById("dep-select").value){
                            result_filter.push(data["allLiveFranceData"][y]);
                        }
                    }

                    for (let j = 0; j <result_filter.length; j++) {
                        let array_ligne = [result_filter[j]["nom"],result_filter[j]["date"],
                        result_filter[j]["hospitalises"],result_filter[j]["reanimation"],result_filter[j]["nouvellesHospitalisations"],
                        result_filter[j]["nouvellesReanimations"],result_filter[j]["deces"],result_filter[j]["gueris"]];
                        let newLigne = document.createElement("tr");

                        for (let k=0; k < array_ligne.length; k++){
                            let newColonne = document.createElement("td");

                            if(array_ligne[k]!=null){
                                newColonne.innerHTML =array_ligne[k];
                            }      
                        newLigne.appendChild(newColonne);
                        }
                        tab1.appendChild(newLigne);
                    }
            })
    })

}

function menu_deroulant(){
    fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
            function(response){
                response.json().then(function(data){
                //Récupère les noms des départements et les affiche dans le menu déroulant
                    var cp= [] ;
                    for (let l=0;l<101;l++){
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

//Fonction générale qui va transformer et afficher les données des test covid
function affiche_table_test(){
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
                //appelle une autre fonction
                affiche_table_avec_donnees(result_mod);
            }
        )
    })
}


//Fonction qui affiche les éléments dans le html du test covid

function affiche_table_avec_donnees(result_mod) {
    let tab = document.createElement("table");
    document.getElementById("maincontent").appendChild(tab);
    let newLigne = document.createElement("tr");
    tab.appendChild(newLigne);
    let headers = ["Hopital", "Adresse", "Code Postal", "Prélévement", "Public",
                    "Horaire", "Horaire prioritaire", "Rendez_vous", "Téléphone", "Site Web"];

    for (let i = 0; i < headers.length; i++) {
        let newColonne = document.createElement("td");
        newColonne.innerHTML = headers[i];
        tab.appendChild(newColonne);
    }
    console.log(result_mod.length);

    var result_filter = [];
    for(let y =0; y<result_mod.length-1; y++){
        if(result_mod[y].codePostal===document.getElementById("dep-select").value){
            result_filter.push(result_mod[y]);
        }
    }
    console.log(result_filter);
    for (let j = 0; j < result_filter.length; j++){
        let array_ligne = [result_filter[j].hopital,result_filter[j].adresse, result_filter[j].codePostal,
        result_filter[j].prelevement, result_filter[j].public, result_filter[j].horaire, result_filter[j].horaire_prioritaire,
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
    //+ ajoute une colonne pour le dep du test covid
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
            tel: element.tel_rdv, site_web: element.web_rdv 
        };

    }   
    return null;
}
