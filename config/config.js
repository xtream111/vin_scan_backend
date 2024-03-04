//configurar conexion a db
const promise = require('bluebird');
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
    'host':'127.0.0.1',
    'port':5432,
    'database':'vin_check_db',
    'user': 'postgres',
    'password': 'Torrejon96!'
};

const db=pgp(databaseConfig);

module.exports = db;