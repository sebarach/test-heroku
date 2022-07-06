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
    res.header("Access-Control-Allow-Origin","*");
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

      //Cheerio

async function scrapearRipleyPS5() {
    try {
        let { data } = await axios.get(variables.urlRipleyExport);
        let $ = cheerio.load(data);
        let precio = $('#row > div.col-xs-12.col-sm-12.col-md-5 > section.product-info > dl > div.product-price-container.product-internet-price-not-best > dt').first().text();
        datos.push({ url: variables.urlRipleyExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Ripley" });
    }catch (error) {
        console.log(error);
    }
}



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

async function scrapearHitesPS5() {
    try {
        let { data } = await axios.get(variables.urlHitesExport);
        let $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
        let precio = $('#zoom-837800001 > div.row.d-none.d-lg-flex > div > div > div > div > span.price-item.sales > span').first().text();
        datos.push({ url: variables.urlHitesExport, precio: precio.trim(), precioParse: formatearPrecio(precio),tienda:"Hites" });
    } catch (error) {
        console.log(error);
    }

}

async function scrapearParisPS5() {
    try {
        let { data } = await axios.get(variables.urlParisExport);
        let $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
        let precio = $('#pdpMain > div > div.col-xs-12.col-sm-12.col-md-6.col-lg-5.info-product-detail > div > div.col-xs-12.product-price-2 > div > div.price__inner > div.price__text-wrap.price__text-wrap--primary > div.price__text').first().text();
       datos.push({ url: variables.urlParisExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Paris" });
    } catch (error) {
        console.error(error);
    }

}

async function scrapearWeplayPS5() {
    try {
        let { data } = await axios.get(variables.urlWePlayExport);
        let $ = cheerio.load(data, { normalizeWhitespace: false, xmlMode: true });
        let precio = $('#product-price-35943 > span').first().text();
        datos.push({ url: variables.urlWePlayExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"Weplay" });  
    } catch (error) {
        console.error(error);
    }


}

async function scrapearLaPolarPS5() {
    try {
        let { data } = await axios.get(variables.urlLaPolarExport);
        let $ = cheerio.load(data);
        let precio = $('body > div.page > div > div.ms-contain-desktoplarge.pdp-wrapper.product-wrapper.product-detail > div.ms-row.pdp-image-and-detail.ms-margin-hp.collapsed.product-detail > div.pdp-right-content.details-container.col-xs-12.col-sm.ms-no-padding.js-details-container > div > div.col-xs-12.ms-flex.ms-no-padding.prices-actions > div > p.la-polar.price.js-tlp-price.lp-font--barlow-bold.ms-flex > span.price-value').text();
        datos.push({ url: variables.urlLaPolarExport, precio: precio, precioParse: formatearPrecio(precio),tienda:"La Polar" });
    } catch (error) {
        console.log(error);
    }

}

const puerto = 3000;
let allPromise = Promise.all([scrapearGoldenGamerPS5(),scrapearHitesPS5(),scrapearParisPS5(),scrapearWeplayPS5(),scrapearLaPolarPS5()]);
app.listen(process.env.PORT || 3000, function() {console.log(`App Corriendo en el puerto ${puerto}`);});


