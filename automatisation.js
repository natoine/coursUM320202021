function csvTojs(csv) 
    {
        var lines=csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");

        for(var i=1; i<lines.length; i++) 
        {
            var obj = {};
            var row = lines[i],
            queryIdx = 0,
            startValueIdx = 0,
            idx = 0;

            if (row.trim() === '') { continue; }

            while (idx < row.length) 
            {
                /* if we meet a double quote we skip until the next one */
                var c = row[idx];

                if (c === '"') 
                {
                    do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
                }

                if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) 
                {
                    /* we've got a value */
                    var value = row.substr(startValueIdx, idx - startValueIdx).trim();

                    /* skip first double quote */
                    if (value[0] === '"') { value = value.substr(1); }
                    /* skip last comma */
                    if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
                    /* skip last double quote */
                    if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

                    var key = headers[queryIdx++];
                    obj[key] = value;
                    startValueIdx = idx + 1;
                }

                ++idx;
            }

        result.push(obj);
        }
        return result;
    }

function attrib (url,nom) {
    

    if (window.fetch) 
    {
        fetch(url, { method: 'GET', headers: {}, mode: 'cors', cache: 'default' })
            .then(response => response.text())
            .then(data => localStorage.setItem(nom,data));


        var res = localStorage.getItem(nom);
        res = csvTojs(res)
        console.log(res[0]["\"LOCATION\""]);
    } 

    else 
    {
        console.log("prout");
    }
}

attrib(url="https://stats.oecd.org/sdmx-json/data/DP_LIVE/AUT+BEL+CHE+CYP+CZE+DEU+DNK+ESP+EST+FIN+FRA+GBR+GRC+IRL+ITA+LTU+LUX+LVA+MLT+NLD+NOR+POL+PRT+SVK+SVN+SWE+TUR.GGDEBT.TOT.PC_GDP.A/OECD?contentType=csv&detail=code&separator=comma&csv-lang=fr&startPeriod=2015&endPeriod=2019", attr='dette')

