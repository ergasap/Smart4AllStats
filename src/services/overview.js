import xlsx from 'xlsx'
import countries from '../data/countries.json' assert {type: 'json'};

function countriesDelete(){
    let jsonCountriesDelete = []
    countries.countries.forEach(country => {
        if(country.continent_en != "Europe"){
            jsonCountriesDelete.push(country.code_2)
        }
    });

    return jsonCountriesDelete
}


export default function datosMapa(){   
    
    var jsonMap = {
        "countries":{},
        "countriesDelete":[]
    }

    jsonMap.countriesDelete = countriesDelete()

    let jsonCountries = countries.countries

    var workbook2 = xlsx.readFile("src/data/overview.xlsx")
    let worksheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

    let filas2 = 1
    //calculo número de filas
    for(let k=2; k<100; k++){
        if(worksheet2[`A${k}`] == undefined){
            break;
        }else{
        filas2++
        }
    }
    
    for(let i=2; i<filas2; i++){
        
        let country1 = ""
        let country2 = ""
        let country3 = ""
        let partner1Share = ""
        let partner2Share = ""
        let partner3Share = ""

        country1 = worksheet2[`I${i}`].v
        partner1Share =  worksheet2[`L${i}`].v
        
        country2 = worksheet2[`N${i}`].v
        partner2Share = worksheet2[`Q${i}`].v

        try{
            country3 = worksheet2[`S${i}`].v
        }catch(e){country3 = undefined}
        
        partner3Share = worksheet2[`V${i}`].v
        
        if(jsonMap.countries[country1] == undefined){
            let jsonMapAux={
                "Nombre":"",
                "id":"",
                "TotalPartnerShare":"0"
            }
            jsonMapAux.TotalPartnerShare = partner1Share
            jsonMapAux.Nombre = country1
            jsonCountries.forEach(element => {
                if(element.name_en == country1){
                    jsonMapAux.id = element.code_2
                }
            });
            jsonMap.countries[country1] = jsonMapAux
        }else{
            jsonMap.countries[country1].TotalPartnerShare += partner1Share
        }

        if(jsonMap.countries[country2] == undefined){
            let jsonMapAux={
                "Nombre":"",
                "id":"",
                "TotalPartnerShare":"0"
            }
            jsonMapAux.TotalPartnerShare = partner2Share
            jsonMapAux.Nombre = country2
            jsonCountries.forEach(element => {
                if(element.name_en == country2){
                    jsonMapAux.id = element.code_2
                }
            });
            jsonMap.countries[country2] = jsonMapAux
        }else{
            jsonMap.countries[country2].TotalPartnerShare += partner2Share
        }

        if(jsonMap.countries[country3] == undefined && country3 != undefined){
            let jsonMapAux={
                "Nombre":"",
                "id":"",
                "TotalPartnerShare":"0"
            }
            jsonMapAux.TotalPartnerShare = partner3Share
            jsonMapAux.Nombre = country3
            jsonCountries.forEach(element => {
                if(element.name_en == country3){
                    jsonMapAux.id = element.code_2
                }
            });
            jsonMap.countries[country3] = jsonMapAux
        }else{
            if(country3 != undefined){
                jsonMap.countries[country3].TotalPartnerShare += partner3Share
            }
            
        }
    }

    return jsonMap
} 
