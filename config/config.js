//configurar conexion a db
const promise = require('bluebird');
const { parse } = require('pg-connection-string');


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