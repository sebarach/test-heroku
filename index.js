const express = require('express')
const cors = require('cors');
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
const {variables,chromeOptions,chromeOptions2} = require('./utils.js');
let datos= [];
const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");

app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/test',(req,res)=>{
    console.log("Buscando Precios desde test");
    res.header("Access-Control-Allow-Origin", "*");
    allPromise.then(values => {
        console.log("Termino de Buscar Precios");
        res.json(datos);
      }).catch(error => {
          console.log(error);
      });
    });


app.get('/',(req,res)=>{
    console.log("entra");
        res.send("funciona");
      });

      async function scrapearGoldenGamerPS5() {
        try {
            let { data } = await axios.get(variables.urlGoldenGamerExport);
            let $ = cheerio.load(data);
            let precio = $('#ProductPrice-product-template > span').first().text();
            datos.push({ url: variables.urlGoldenGamerExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Golden Gamer" });
        } catch (error) {
            console.log(error);
        }
    
    }

const puerto = 3000;
let allPromise = Promise.all([scrapearGoldenGamerPS5()]);
app.listen(process.env.PORT || 3000, function() {console.log(`App Corriendo en el puerto ${puerto}`);});


