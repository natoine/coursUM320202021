function formater(txt)
{
    /*
    Methode : On prend un csv sous forme de txt. quand on reprère un espace alors on ajoute le mot dans une liste quand on voit deux espace on creer une nouvelle liste
    */
    // console.log(txt);
    //Mise en forme : txt => tableau
    mot = "";
    var liste = [];
    var listeFinal = [];

    for (var i = 0 ; i <= txt.length; i++) 
    {
        if (txt[i] == '\n')
        {
            listeFinal.push(liste);
            liste= [];
        }

        else if(txt[i] == ',')
        {
            liste.push(mot);
            mot = "";
        }

        else
        {
            mot += txt[i];
        }
    }
    
    //Supression caractere indésirable 
    for(var i = 0 ; i <= listeFinal.length - 1 ; i++ )
    {
        for(var j = 0 ; j <= listeFinal[i].length - 1; j++)
        {
            listeFinal[i][j] = listeFinal[i][j].split('"').join("");
            listeFinal[i][j] = listeFinal[i][j].split('Flag Codes').join("");
        }
    }


    //Supression attributs indésirable
    listeFinal.splice(0,1);

    for(var i = 0 ; i < listeFinal.length ; i++)
    {
        listeFinal[i].splice(1,5);
    }

    return listeFinal;
}

function concat(l1,l2,l3)
{
    //l1 = dette ; l2 = salaire
    var pays = [];

    //On check la liste la plus courte
    if(l3.length < l2.length && l3.length < l1.length)
    {
        liste1 = l3;
        liste2 = l1;
        liste3 = l2;
    }
    else if(l2.length < l1.length && l2.length < l3.length)
    {
        liste1 = l2;
        liste2 = l1;
        liste3 = l3;
    }
    else if(l1.length < l2.length && l1.length < l3.length)
    {
        liste1 = l1;
        liste2 = l2;
        liste3 = l3;
    }


    //On assemble les données quand les pays sont les memes.
    for(var i = 0 ; i < liste1.length; i++)
    {
        for(var j = 0 ; j < liste2.length ; j++)
        {
            for(var n = 0 ; n < liste3.length ; n++)
            {
                if(liste1[i][0] == liste2[j][0] && liste1[i][0] == liste3[n][0])
                {
                    pays.push({ "country" : liste1[i][0], "debt" : liste1[i][1], "wage" : liste2[j][1], "pib" : liste3[n][1] });
                }  
            }
            
        }
    }

    return pays;
}