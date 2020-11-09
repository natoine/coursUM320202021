# COVID NEWS

ANDRAUD Amélia, PORTE Tiphaine, PODEROSO Aurore.

Ce site permet de suivre quotidiennement l'évolution de l'épidémie du COVID-19. En fonction du département que vous sélectionnez, retrouvez toutes les informations quotidiennes relatives à l'épidémie (hospitalisations, réanimations, décès, guéris...) ainsi que les lieux de dépistage présent dans le département et toutes les informations à leurs sujet.

Lien vers le site : https://aurorepdrs.github.io/coursUM320202021/


Afin de réaliser ce site, nous avons utilisé 2 sources de données : 

- 1ère source : https://coronavirusapi-france.now.sh/AllLiveData : informations quotidiennes sur l'épidémie du COVID-19 en fonction des départements et des régions (fichier JSON)
- 2ème source : https://www.data.gouv.fr/fr/datasets/r/7c0f7980-1804-4382-a2a8-1b4af2e10d32 : sites de prélèvements pour les tests COVID-19 en France (fichier CSV)

Nous avons fait le lien entre les deux sources de données avec le département, notre objectif étant de permettre à l'utilisateur d'afficher, pour un département choisi, les chiffres quotidiens de l'épidémie, ainsi que les lieux et leurs informations où il peut aller se faire dépister en cas de doute. Au début, nous avions eu l'idée d'utiliser une troisième API afin d'afficher les lieux de dépistage avec un marqueur sur une carte, mais comme il y avait trop de lieux, la carte était ilisible et nous avons éloigné cette idée et nous nous sommes concentrées sur les deux premières sources de données.

Les principales difficultés : 

- Trouver les sources de données cohérentes les unes avec les autres et où l'on pouvait effectuer des fetchs.

- Exploiter le fichier CSV (utilisation de la librairie `papaperse` qui permet de transformer un fichier csv en array)

- Dans le cas des deux sources de données que nous avons utilisé, les lier avec le département, celui-ci n'étant pas sous la même forme dans les deux sources : dans la première source les codes postaux étaient de la forme suivante "DEP-01" et dans la deuxième il n'y avait pas de colonne département mais seulement l'adresse complète. Nous avons donc fait un code qui pour la première source de données (fichier JSON) on récupère seulement les chiffres présent dans le code postal (pour "DEP-01" nous récupérons "01") et pour la deuxième source (fichier CSV) on récupère seulement les chiffres présent dans l'adresse ( pour "10 rue Molière 34000 Montpellier" nous récupérons "1034000"), de ce que nous récupérons, nous gardons que les 5 derniers chiffres (ici de "1034000" nous passsons à "34000"), ce qui nous permet de récupérer le code postal, dont nous gardons après que les deux premiers chiffres ("34000" à "34") afin de pouvoir le lier à l'autre source de données.

Après toutes les manipulations pour pouvoir lier les deux sources de données avec le département, nous avons fait un menu déroulant, où les options sont les départements (récupérés de la première source de données) et dont la value et le numéro du département. On a aussi fait un `input` de stype `submit` qui, `onclick()` déclenche la fonction `affiche_table_hopital()"`. Cette fonction va afficher, en fonction de la value de l'option choisie, les informations de la première source de données (affiche les informations de la ligne où le code postal = à la value de l'option) et le tableau des lieux où se faire dépister (en ne mettant dans le tableau que les lignes où dans l'adresse, le code postal = à la value de l'option).



