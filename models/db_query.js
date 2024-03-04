const db = require('../config/config');

const db_query = {};

db_query.getAll = () => {
    const sql = `
    SELECT * FROM servicecampaigns`;

    return db.manyOrNone(sql);
}

db_query.VINcampaigncheck = (vin) => {
    const sql = `	SELECT
	vehiclecampaigns.VIN,
    ServiceCampaigns.CampaignID,
    ServiceCampaigns.CampaignName,
	vehiclecampaigns.completed
FROM
    vehiclecampaigns
JOIN
    ServiceCampaigns ON VehicleCampaigns.CampaignID = ServiceCampaigns.CampaignID
WHERE
    VehicleCampaigns.VIN = $1`;
    return db.manyOrNone(sql,[vin]);
}

db_query.update_completion = (vin, campaignid) => {
    const sql = `UPDATE vehiclecampaigns
    SET completed = NOT completed,
    updated_at = CURRENT_DATE
    WHERE VIN = $1 AND CampaignID = $2`;
    return db.manyOrNone(sql,[vin,campaignid]);
}



module.exports = db_query;