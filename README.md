# COVID NEWS

ANDRAUD Amélia, PORTE Tiphaine, PODEROSO Aurore.

Ce site permet de suivre quotidiennement l'évolution de la COVID-19. En fonction du département que vous sélectionnez, retrouvez toutes les informations relatives à l'épidémie (hospitalisations, réanimations, décès, guéris...) ainsi que l'ensemble des lieux de dépistage présents dans le département.

Lien vers le site : https://aurorepdrs.github.io/coursUM320202021/


Afin de réaliser ce projet, nous avons utilisé 2 sources de données : 

- 1ère source : https://coronavirusapi-france.now.sh/AllLiveData : informations mises à jour quotidiennement sur l'épidémie de la COVID-19 en fonction des départements et des régions (fichier JSON)
- 2ème source : https://www.data.gouv.fr/fr/datasets/r/7c0f7980-1804-4382-a2a8-1b4af2e10d32 : sites de prélèvements des tests COVID-19 en France (fichier CSV)

Le lien entre les deux sources de données est le département. Notre objectif est d'afficher, pour un département choisi par l'utilisateur, les chiffres quotidiens de l'épidémie, ainsi que les lieux et informations où il peut aller se faire dépister en cas de doute. 

Les principales difficultés : 

- Trouver des sources de données cohérentes entre elles et où l'on pouvait effectuer des fetchs.

- Exploiter le fichier CSV: utilisation de la librairie `papaperse` qui a permis de transformer le fichier CSV en array et de créer des clefs et des valeurs pour chaque champ.

- Lier les deux bases de données avec le département. Les départements n'ont pas la même structure dans les deux sources de données : dans la première, les codes postaux sont de la forme "DEP-01" et, dans la seconde, il n'y a pas de colonne pour le département mais seulement l'adresse complète.

Les fonctions implémentées:

- menu_deroulant(): Implémentation d'un menu déroulant, où les options sont les départements (récupérés de la première source de données) et dont la value est le numéro du département. 

- affichage(): Fonction générale appelée lorsque l'utilisateur clique sur le bouton "Afficher les informations relatives à la COVID-19". Elle contient les deux sources de données et appelle les autres fonctions. 

- affiche_phrase(data): Cette fonction prend en paramètre le fichier JSON relatif à l'épidémie. Elle permet de récupérer le code postal et de filtrer les données en fonction du département choisi. Elle affiche, dans le HTML, une phrase contenant les informations sur l'épidémie et un GIF.

- transf_donnee_web_a_table(element): Cette fonction prend en argument chaque ligne du tableau CSV originale. Elle récupère le code postal et crée des clefs et des valeurs pour chaque champ.

- affiche_tableau(result_mod): Cette fonction prend en paramètre les données du fichier CSV modifiées grâce à la librairie `papaperse`. Elle va filtrer les résultats et les ranger dans un tableau. Elle utilise la librarie boostrap pour améliorer le visuel. 

#Ressources intéressantes 

* CORS : https://javascript.info/fetch-crossorigin
* web sémantique : https://www.youtube.com/watch?v=2C1Y2bD5ZSE