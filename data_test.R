remove(list = ls())
library(jsonlite)

recup<-fromJSON(txt="https://data.montpellier3m.fr/sites/default/files/ressources/MMM_MTP_WC_Publics.json")
data<-recup[["features"]]
data
head(data)


recup2<-read.csv("https://www.data.gouv.fr/fr/datasets/r/4ae11861-508f-4827-9e96-2ca457225b64")
