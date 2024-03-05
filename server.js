const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

console.log(process.env);

/*
*Rutas
*/

const servicecampaigns = require('./routes/db_queryRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');


app.set('port',port);
//llamando a las rutas
servicecampaigns(app);

server.listen(port, function(){
    console.log('Aplicacion de NodeJS ' + port + ' iniciada')

});

//API: this will give results when we query ip+port 
// check routes


//error handler
app.use((err,req,res,next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}