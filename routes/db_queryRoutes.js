const db_query = require('../controllers/db_queryController');

module.exports = (app) => {
    app.get('/api/Servicecampaigns/getAll', db_query.getAll);
    //app.get('/api/Servicecampaigns/getVIN', db_query.VINcampaigncheck);
    app.get('/api/Servicecampaigns/getVIN', (req, res, next) => db_query.VINcampaigncheck(req, res, next));
    app.put('/api/Servicecampaigns/update_completion', (req, res, next) => db_query.update_completion(req, res, next));
    app.put('/api/Servicecampaigns/update_warranty_completion', (req, res, next) => db_query.update_warranty_completion(req, res, next));
    app.get('/api/Servicecampaigns/getAffectedVehicles', (req, res, next) => db_query.getTotalAffectedVehicles(req, res, next));
    app.get('/api/Servicecampaigns/getCompletionNumber', (req, res, next) => db_query.getCompletionNumber(req, res, next));


    
}