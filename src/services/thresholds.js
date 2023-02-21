import xlsx from 'xlsx'

var workbook = xlsx.readFile("src/data/kpis.xlsx")



export default async function getThresholds(req,res){
    var result = []
    for(let i=0; i<6; i++){

        let worksheet = workbook.Sheets[workbook.SheetNames[i]];
        let filas = await calculaFilas(worksheet)
        let valor
        let json = []

        for(let j=3; j<filas; j++){
            if(worksheet[`C${j}`] == undefined){
                valor = "-"
            }else{
                valor = worksheet[`C${j}`].v
            }
            json.push(valor)
        }
        result.push(json)
    }

    res.setHeader('Content-type', 'text/json')
    res.send(result)
}

function calculaFilas(worksheet){
    let filas = 2
    for(let k=2; k<100; k++){
        if(worksheet[`A${k}`] == undefined){
            break;
        }else{
            filas++
        }
    }
    return filas
}
