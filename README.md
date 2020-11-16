

Présentation du projet "City Compare"

Projet de Emmanuelle Theron, Mélodie Cassan, Moulikatou Alaka, Jonathan Moreno

L'objectif de ce projet est de proposer un outil simple pour comparer certains paramètres liés à la vie quotidienne et au marché immobilier pour l'ensemble des villes françaises (métropolitaines).

Les paramètres sont :

Le nom des gares présentes dans la communes
Le taux de la taxe d'habitation en pourcentage
Le prix de vente des logements au mètre carré en euros
Le nombres de centre de dépistage Covid

Ces informations viennet de 4 sources différentes + une source nous permettant de passer du code postal au code INSEE. On a fait le choix d'utiliser le code INSEE quand il était disponible dans le jeu de données. Pour les données relatives aux centres de dépistage COVID, le code INSEE n'était pas disponible et on a donc récupéré le code postal présent dans la chaîne de caratères de l'adresse en utilisant des expressions régulières.
