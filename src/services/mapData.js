import xlsx from 'xlsx'

var workbook = xlsx.readFile("src/data/overview.xlsx")
let worksheet = workbook.Sheets[workbook.SheetNames[0]];

export default function datosCountry(req, res){
    const countryName= req.params.name
    const numFilas = calculaFilas()
    
    var jsonProjects = {
        "projects":[]
    }

    for(let i = 2; i < numFilas; i++){
        
        let projName = worksheet[`A${i}`].v

        let country1 = worksheet[`I${i}`].v
        let share1 = worksheet[`L${i}`].v
        let entity1 = worksheet[`H${i}`].v

        let country2 = worksheet[`N${i}`].v
        let share2 = worksheet[`Q${i}`].v
        let entity2 = worksheet[`M${i}`].v

        let country3 = ""
        let share3 = ""
        let entity3 = ""

        try{
         country3 = worksheet[`S${i}`].v
        }catch(e){country3 = undefined}

        try{
        share3 = worksheet[`V${i}`].v
        }catch(e){share3 = undefined}

        try{
        entity3 = worksheet[`R${i}`].v
        }catch(e){entity3 = undefined}

        if(countryName == country1){
            
            let jsonAux = {
                "NombreProyecto":"",
                "Pais":"",
                "Dinero":"",
                "Entidad":""
            }

            jsonAux.NombreProyecto = projName
            jsonAux.Pais = country1
            jsonAux.Dinero = share1
            jsonAux.Entidad = entity1
            
            jsonProjects.projects.push(jsonAux)

        }
        
        if(countryName == country2){

            let jsonAux = {
                "NombreProyecto":"",
                "Pais":"",
                "Dinero":"",
                "Entidad":""
            }

            jsonAux.NombreProyecto = projName
            jsonAux.Pais = country2
            jsonAux.Dinero = share2
            jsonAux.Entidad = entity2
            
            jsonProjects.projects.push(jsonAux)

        } 
        
        if(country3 != undefined && countryName == country3 ){
            
            let jsonAux = {
                "NombreProyecto":"",
                "Pais":"",
                "Dinero":"",
                "Entidad":""
            }

            jsonAux.NombreProyecto = projName
            jsonAux.Pais = country3
            jsonAux.Dinero = share3
            jsonAux.Entidad = entity3
            
            jsonProjects.projects.push(jsonAux)

        }  
    }

    res.setHeader('Content-type', 'text/json')
    res.send(jsonProjects)
}

function calculaFilas(){

    let filas = 1

    for(let k=2; k<100; k++){
        if(worksheet[`A${k}`] == undefined){
            break;
        }else{
        filas++
        }
    }

    return filas
}