# Projet 

Ce projet est une interface dynamique qui permet de comparer les votes aux USA avec la ségregation sociale par etat en 2017.

## URL du projet 
https://melodyrous.github.io/coursUM320202021/

### Liens vers les données
#### Elections présidentielles USA
https://public.opendatasoft.com/explore/dataset/usa-2016-presidential-election-by-county/table/?flg=fr&disjunctive.state%22

 #### Segregation sociale 
  https://public.opendatasoft.com/explore/dataset/residential-segregation-data-for-us-metro-areas/table/?location=3,46.23229,-124.59801&basemap=jawg.streets

#### Code Etats 
  "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json"

### Critère d'intersection des données
Le critère d'intersection des données est un fichier format json qui relie les codes des Etats d'Amériques à leurs noms.

### Problèmes rencontrés
Impossibilité de récupérer certaines données lors du fetch :
-  Lorsque le site n'est pas sécurisé
-  Lorsque le domaine d'origine de la requête est spécifié dans les CORS
-  Lorsque les données proviennent d'une API dont l'accès est protégé par des clés  
  


Alexandre Chaillou, Lucas Fioletti, Romain Meuter, Mélody Rous

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
L'intégration de données connectée est l'aggregation de données.

* En quoi cela peut vous servir dans un parcours Data Science ?
Cela permet d'aller chercher des données et de constituer un corpus de données.

#le sujet support d'exercice 
Sur un github partagé, une branche par groupe, nous allons développer un moissoneur de données sur les EHPAD en France.

#le sujet du projet en groupe

Identifier des sources de données sur le Web.
Récupérer des données à partir de ces sources.
Les aggréger et les restituer.
Identifier les difficultés de la démarche.

Par groupe de 4 ou 3.

Le livrable c'est un code client html javascript uniquement hébergé en githubpage.

