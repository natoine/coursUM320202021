/*function affiche_table_test(){
    fetch('https://coronavirusapi-france.now.sh/AllLiveData', { 
        method: 'GET',
        headers: {},
        mode: 'cors',
        cache: 'default'}).then(function(response){
            response.text().then(function(data){

                let cpt=0;

                var result = data;
                console.log(result);
               
                affiche_table_avec_donnees(result);

            }
        )
    })
}





function affiche_table_avec_donnees(result) {
    let tab = document.createElement("table");
    document.getElementById("maincontent").appendChild(tab);
    let newLigne = document.createElement("tr");
    tab.appendChild(newLigne);
    let headers = ["Code", "Date", "Décès", "Guéris", "Hospitalisés",
                    "Nom", "Nouvelles Hospitalisations", "Nouvelles Réanimations", "Réanimations"];

    for (let i = 0; i < headers.length; i++) {
        let newColonne = document.createElement("td");
        newColonne.innerHTML = headers[i];
        tab.appendChild(newColonne);
    }
    for (let j = 0; j < result.length; j++){
        let array_ligne = [result[j].code,result[j].date, result[j].deces, result[j].gueris, result[j].hospitalises, result[j].nom, result[j].nouvellesHospitalisations, result[j].nouvellesReanimations, result[j].reanimation];
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
affiche_table_test();*/


               fetch('https://coronavirusapi-france.now.sh/AllLiveData', { method: 'GET',
               headers: {},
               mode: 'cors',
               cache: 'default'}).then(
    function(response){
        response.json().then(function(data){
            let cpt=0;
            //let taille=result.rows();
            var result1=data;
            console.log(result1);

        //Récupère les noms des départements et les affiche dans le menu déroulant
        const depselect= document.getElementById("dep-select");
        let option;
        for (let i = 0; i < 101; i++) {
        option= document.createElement("option");
        option.text=data["allLiveFranceData"][i]["nom"];
        option.value=data["allLiveFranceData"][i]["code"];
        depselect.add(option);
    }

            for (cpt; cpt < 13 ; cpt++) {
               // console.log(data["allLiveFranceData"][cpt]); 

            }
        
            //document.getElementById("maincontent").innerHTML=data["allLiveFranceData"][0]["nouvellesReanimations"];
        })
            }
)

       


//Fonction générale qui va transformer et afficher les données 
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
            })
        })
    


//Fonction qui affiche les éléments dans le html
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
    for (let j = 0; j < result_mod.length; j++){
        let array_ligne = [result_mod[j].hopital,result_mod[j].adresse, result_mod[j].codePostal, result_mod[j].prelevement, result_mod[j].public, result_mod[j].horaire, result_mod[j].horaire_prioritaire, result_mod[j].rdv, result_mod[j].tel, result_mod[j].site_web];
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
    //+ ajoute une colonne pour le dep
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

affiche_table_test();
