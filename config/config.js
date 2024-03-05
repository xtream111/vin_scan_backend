//configurar conexion a db
const promise = require('bluebird');
const { parse } = require('pg-connection-string');

//const databaseUrl = 'postgres://vin_check_5iou_user:i2DnWeQeA6mT2exggmNqje0P9tg2gIWa@dpg-cnj3l4en7f5s73b2b8qg-a.frankfurt-postgres.render.com/vin_check_5iou';
//internal url
const databaseUrl = process.env.databaseUrl;
const dbConfigFromUrl = parse(databaseUrl);
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;

types.setTypeParser(1114, function(stringValue){
    return stringValue;

});

const databaseConfig = {
    host: dbConfigFromUrl.host,
    port: dbConfigFromUrl.port,
    database: dbConfigFromUrl.database,
    user: dbConfigFromUrl.user,
    password: dbConfigFromUrl.password,
    //ssl: true
};

/*const databaseConfig = {
    'host':'127.0.0.1',
    'port':5432,
    'database':'vin_check_db',
    'user': 'postgres',
    'password': 'Torrejon96!'
};
*/ //local connection
const db=pgp(databaseConfig);

module.exports = db;