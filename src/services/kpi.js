import xlsx from 'xlsx'

export default function datosTabla(){
    
    var json = {
        "sheets":[]
    }

    var workbook = xlsx.readFile("src/data/kpis.xlsx")
    var letras = ["A", "B", "C", "D", "E", "F"];

    //lectura de datos
    for (let i = 0; i < 6; i++) {
        let worksheet = workbook.Sheets[workbook.SheetNames[i]];
        var jsonSheet = {
            "sheet" : []
        }
        var filas=2

        //calcula número de filas de la tabla
        for(let k=2; k<100; k++){
            if(worksheet[`A${k}`] == undefined){
                break;
            }else{
                filas++
            }
        }
        
        //recorre las filas y columnas de la tabla y va insertando los datos en un json
        for(let j=2; j<filas; j++){
            var jsonAux = {
            "filanueva":[]
            }
            //recorre cada columna
            for (let index = 0; index < letras.length; index++) {
                let valor = ""
                if(worksheet[`${letras[index]}${j}`] == undefined){
                    valor = "-"
                }else{
                    valor = worksheet[`${letras[index]}${j}`].v
                }
                
                jsonAux.filanueva.push({"clave": valor})
            }
            jsonSheet.sheet.push(jsonAux)
        }
        
        json.sheets.push(jsonSheet)
    }

    return json
}

export function datosPie(){
    
    var workbook = xlsx.readFile("src/data/kpis.xlsx")
    var datos = {
        "1OCV":[],
        "2OCV":[],
        "3OCV":[],
        "1OCP":[],
        "2OCP":[],
        "3OCP":[],
    } //json de arrays (un array por cada grafica)
    
    //lectura de datos
    let worksheet = workbook.Sheets[workbook.SheetNames[4]];
    var valores = ["M", "N", "O"];
    var categorias = "P";
    var array = []

          
    //recorre las filas y columnas de la tabla y va insertando los datos en un json
    valores.forEach(e => {
        for(let j=25; j<32; j++){
            var json = {
                category: "",
                value: ""
            }
            var category = worksheet[`${e}${j}`].v
            var value = worksheet[`${e}${j}`].v
            console.log(category)
            //jsonSheet.sheet.push(jsonAux)
        }
    })

    
    //return json
}