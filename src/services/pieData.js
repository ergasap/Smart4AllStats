import xlsx from 'xlsx'

 export default function datosPie(){
    var workbook = xlsx.readFile("src/data/kpis.xlsx")
    var datos = []

    let worksheet = workbook.Sheets[workbook.SheetNames[4]];
    var valores = ["N", "O", "P"];
    var categoria = "Q";
   
    valores.forEach(e => { 
        var array = []
        for(let j=25; j<29; j++){
            var json = {
                category: "",
                value: ""
            }
           json.category = worksheet[`${categoria}${j}`].v
           json.value = worksheet[`${e}${j}`].v
           array.push(json)
        }
        datos.push(array)
    })

    valores.forEach(e => { 
        var array = []
        for(let j=29; j<32; j++){
            var json = {
                category: "",
                value: ""
            }
           json.category = worksheet[`${categoria}${j}`].v
           json.value = worksheet[`${e}${j}`].v
           array.push(json)
        }
        datos.push(array)
    })
    
    return datos
}