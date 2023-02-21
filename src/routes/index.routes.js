import express from "express"
const router = express.Router()

import datosMapa from '../services/overview.js'
import datosTabla from '../services/kpi.js'
import datosPie from '../services/pieData.js'
import datosCountry from '../services/mapData.js'
import getThresholds from '../services/thresholds.js'


router.get('/', function (req, res) {
    res.render('home')
})

router.get('/table', function (req, res) {
    res.render('table')
})

router.get('/datos-table', function (req, res) {
    res.setHeader('Content-type', 'text/json')
    var jsonTabla = datosTabla()
	res.send(jsonTabla);
})

router.get('/map', function (req, res) {
     res.render('map')
})

router.get('/datos-map', function (req, res) {
    res.setHeader('Content-type', 'text/json')
    var jsonMapa = datosMapa()
	res.send(jsonMapa)
})

router.get('/datos-pie', function (req, res) {
    res.setHeader('Content-type', 'text/json')
    var jsonPie = datosPie() 
	res.send(jsonPie)
})

router.get('/datos-country/:name', datosCountry)

router.get('/thresholds', getThresholds)

export default router;