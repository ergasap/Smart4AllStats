loadDatosTablas()

function loadDatosTablas(){
    fetch('/datos-table', {method: 'GET'})
    .then(res =>  res.json())
    .then(data =>{
        const tabla = document.querySelector('#table0')
        console.log(data)
        let html = ''
        let header = ''
        data.filas.forEach(filanueva, index => {
            if(index == 1){
                html+= `<thead><tr>`
                filanueva.forEach(clave => {
                    html+=`<th>${clave.clave}</th>`
                })
                html+= `</thead></tr>`
            }
        });
    })
}