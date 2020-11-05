menu_deroulant();

function affiche_table_hopital(){
    if (document.getElementById("dep-select").value == "--Veuillez choisir un département--"){
        alert("Veuillez choisir un département");
    }
    fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(
            function(response){
                response.json().then(function(data){
                    //Reccup le code postal 
                    var cp= [] ;
                    let L = data["allLiveFranceData"].length;
                    for (let l=0;l<L;l++){
                        cp.push(String(data["allLiveFranceData"][l]["code"].replace(/[^\d]/g, "")));
                    }

                    //Filtre les donnees en fonction du dep selec
                    var result_filter = [];
                    for(let y =0; y<L; y++){
                        if(cp[y]==document.getElementById("dep-select").value){
                            result_filter.push(data["allLiveFranceData"][y]);
                            cp1=cp[y];
                        }
                    }



                    console.log(result_filter);

                     div3=document.getElementById('div3');
                     div3.className = "card text-white bg-dark mb-3";
                     div3.style = "max-width: 18rem;";
                     div4=document.getElementById('div4');
                     div4.className = "card-header";
                     div4.appendChild(result_filter[0]["nom"]+" ("+cp1+")");
                     


                     div.innerHTML = "En "+result_filter[0]["nom"]+" ("+cp1+")"+", le "+
                     result_filter[0]["date"]+", il y a "+result_filter[0]["hospitalises"]+
                     " patients hospitalisés, "+result_filter[0]["reanimation"]+" reanimations soit"+
                     result_filter[0]["nouvellesReanimations"]+" de plus qu'hier. Le nombre de deces a augmenté de"+
                     result_filter[0]["deces"]+". "+result_filter[0]["gueris"]+" personnes ont été guéris."

                    /*var tab1 = document.createElement

                    //Remplir le tableau
                    for (let j = 0; j <result_filter.length; j++) {
                        console.log(j);
                        let array_ligne = [cp1,result_filter[j]["nom"],result_filter[j]["date"],
                        result_filter[j]["hospitalises"],result_filter[j]["reanimation"],result_filter[j]["nouvellesHospitalisations"],
                        result_filter[j]["nouvellesReanimations"],result_filter[j]["deces"],result_filter[j]["gueris"]];
                        let newColonne = document.createElement("td");

                        for (let k=0; k < array_ligne.length; k++){
                            let newLigne = document.createElement("tr");
                            if(array_ligne[k]!=null){
                                newLigne.innerHTML =array_ligne[k];
                            }      
                            newColonne.appendChild(newLigne);
                        }
                        tab1.appendChild(newColonne);
                    }*/
            })
    })
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

carte()
//Ici tu peux utiliser la long et la lat. Met ton code pour afficher la carte 
function carte(){
    fetch('https://www.data.gouv.fr/fr/datasets/r/7c0f7980-1804-4382-a2a8-1b4af2e10d32', { 
        method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(function(response){
            response.text().then(function(data){
                result = Papa.parse(data,{header: true});
                result_mod = result.data.map(transf_donnee_web_a_table);
                console.log(result_mod[1].latitude)
            })
        })
}

//Fonction qui affiche les éléments dans le html du test covid
function affiche_table_avec_donnees(result_mod) {
    let tab = document.createElement("table");
    tab.className = 'table table-striped table-dark';
    let tead = document.createElement("thead");
    tab.appendChild(tead);
    tab.style.textAlign="center";
    document.getElementById("maincontent").appendChild(tab);
    let newLigne = document.createElement("tr");
    tab.appendChild(newLigne);
    let headers = ["Hopital", "Adresse", "Code Postal", "Prélévement", "Public",
                    "Horaire", "Rendez_vous", "Téléphone", "Site Web"];

    for (let i = 0; i < headers.length; i++) {
        let newColonne = document.createElement("th");
        newColonne.innerHTML = headers[i];
        tab.appendChild(newColonne);
        tab.setAttribute("scope", "col");

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
            tel: element.tel_rdv, site_web: element.web_rdv, latitude: element.latitude,
            longitude: element.longitude
        };

    }   
    return null;
}

