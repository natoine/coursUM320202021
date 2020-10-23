# coursUM320202021
le support de cours de 2020 - 2021
 
#les questions de culture générale - introduction
 
* Date et nom de l'inventeur du web : 
    Tim Berners-Lee en 1989

* La différence entre le Web et internet ?
Internet est la structure sur lequelles l'application web existe.
Internet c'est le réseau globale. Et le web est un des services de internet.

* Les 3 technologies fondatrices du Web et à quoi elles servent ?
- Le HTTP : qui est le protocole de transfert réseaux au dessus d'IP. Il permet l'envoie de données.
- Le HTML : est un système de balisage ( lagage de description ) normé par le W3C pour permettre de décrire la structure d'une page web.
- Les URI : système de nommage des Ressources.

* Qu’est-ce que l’interopérabilité ? 
    Possibilité de communication entre deux ou plusieurs systèmes, appareils ou éléments informatiques.

* Qu'est ce que le web de données ? 
Ca permet de relier les données entre elles sur le web par des URI.
    Publication de données structurées et reliés entres elles sur le Web --> réseau global d'informations.
le web des données est la demarche d'integrer ensemble des données disparates et de les organiser 

* Qu'est-ce que ça veut dire pour vous "intégration de données connectées" ?
L'intégration de données connectée est l'aggregation de données. Idéalement de données identifiées par des URI.

* En quoi cela peut vous servir dans un parcours Data Science ?
Cela permet d'aller chercher des données et de constituer un corpus de données.

* Client Serveur ?
Un client émet des requêtes, un serveur répond à des requétes.

#le sujet support d'exercice 
Sur un github partagé, une branche par groupe, nous allons développer un moissoneur de données sur les EHPAD en France.

#le sujet du projet en groupe

Identifier des sources de données sur le Web.
Récupérer des données à partir de ces sources.
Les aggréger et les restituer.
Identifier les difficultés de la démarche.

Par groupe de 4 ou 3.

Le livrable c'est un code client html javascript uniquement hébergé en githubpage.

#Ressources intéressantes 

* CORS : https://javascript.info/fetch-crossorigin
* web sémantique : https://www.youtube.com/watch?v=2C1Y2bD5ZSE
* le WHATWG : https://whatwg.org/

#sources de données CORS laxistes

* openstreetmap : https://wiki.openstreetmap.org/wiki/API_v0.6
* openfoodfacts : https://fr.openfoodfacts.org/data
* liste des personnages de Harry Potter : https://api.mlab.com/api/1/databases/mongodab_test/collections/hp_test?apiKey=tBP9gjIqtyrt9TcTKdW79ESkdYrfjc_r
* récupérer des informations sur un pays dont le taux de change vers l'euro https://countryproj.herokuapp.com/country/france ici pour la france
* récupérer des cartes postales ( une citation et une image ) à partir d'un thème ( ici rabbit ) : https://postcardgenerator.herokuapp.com/postal_card/tags/rabbit
* récupérer la météo de la capitale d'un pays et d'autres infos sur le pays : https://weatherworldavailable.herokuapp.com/villes/Afghanistan
* récupérer tous les médecins d'ile de france : https://projetodmiashs.herokuapp.com/medecin


#le javascript dont vous avez besoin :

* fetch api : https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
* comprendre l'asynchrone et les Promise : https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577651-comprenez-comment-fonctionne-lasynchrone-en-js et https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577676-gerez-du-code-asynchrone et https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5866911-parallelisez-plusieurs-requetes-http
* manipulation du DOM