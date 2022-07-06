const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require("cheerio");
//const puppeteer = require('puppeteer');
const app = express();
const {variables,chromeOptions,chromeOptions2} = require('./utils.js');
const { response } = require('express');
let datos= [];
const formatearPrecio = (precio)=> precio.replace(/[^0-9,.]+/g, "").replace(/[,.]+/g, "");

app.use(cors());
app.use(express.json());


// app.get('/test',(req,res)=>{
//     console.log("Buscando Precios desde test");
//     res.header("Access-Control-Allow-Origin", "*");
//     allPromise.then(values => {
//         console.log("Termino de Buscar Precios");
//         res.json(datos);
//       }).catch(error => {
//           console.log(error);
//       });
//     });


app.get('/',(req,res)=>{
    console.log("entra");
        res.send("funciona");
      });

    async function scrapearProMovilPS5() {
    // try {
    // let browser = await puppeteer.launch();
    // let page = await browser.newPage();
    // await page.goto(variables.urlProMovilExport,{chromeOptions});
    // let text = await page.evaluate(() => {
    //     return document.querySelector('#main > div:nth-child(2) > div.col-md-7 > div.product-prices > div.product-price.h5.has-discount > div > span:nth-child(1)').innerText;
    // });
    // await page.close();
    // await browser.close();
    // datos.push({ url: variables.urlProMovilExport, precio: text, precioParse: formatearPrecio(text),tienda:"Pro Movil" });  
    // } catch(error) {
    //     datos.push({ url: variables.urlProMovilExport, precio: 0, precioParse: 0,tienda:"Pro Movil" }); 
    //     console.log(error); 
    //     await page.close();
    //     await browser.close();
    // }
}


async function scrapearRipleyPS5() {
    try {
        let data = await fetch(variables.urlRipleyExport);
        let response = await data.text()
        let $ = cheerio.load(response);
        let precio = $('#row > div.col-xs-12.col-sm-12.col-md-5 > section.product-info > dl > div.product-price-container.product-internet-price-not-best > dt').first().text();
        datos.push({ url:variables.urlRipleyExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Ripley" });
       }catch (error) {
        console.log(error);
    }
}

let allPromise = Promise.all([scrapearRipleyPS5()]);
app.listen(4000, function() {console.log("App Corriendo en el puerto 4000");});


