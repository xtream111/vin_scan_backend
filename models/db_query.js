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
	vehiclecampaigns.completed,
    vehiclecampaigns.warranty_completion
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

db_query.update_warranty_completion = (vin, campaignid) => {
    const sql = `UPDATE vehiclecampaigns
    SET warranty_completion = NOT warranty_completion,
    completed_at = CURRENT_DATE
    WHERE VIN = $1 AND CampaignID = $2`;
    return db.manyOrNone(sql,[vin,campaignid]);
}

db_query.getTotalAffectedVehicles = (campaignid) => {
    const sql = `SELECT campaignid, campaignname, totalaffectedvehicles 
    FROM servicecampaigns
    WHERE CampaignID = $1`;
    return db.manyOrNone(sql,[campaignid]);
}



db_query.getCompletionData = () => {
    const sql = `
    SELECT
    sc.campaignid,
    sc.campaignname,
    sc.totalaffectedvehicles,
    COALESCE(vc.total_completed_vehicles, 0) AS total_completed,
    CASE
        WHEN sc.totalaffectedvehicles > 0 THEN ROUND((COALESCE(vc.total_completed_vehicles, 0) * 100.0) / sc.totalaffectedvehicles, 2)
        ELSE 0.00
    END AS completion_rate
FROM
    servicecampaigns AS sc
LEFT JOIN
    (
        SELECT
            campaignid,
            COUNT(*) AS total_completed_vehicles
        FROM
            vehiclecampaigns
        WHERE
            completed = TRUE
        GROUP BY
            campaignid
    ) AS vc ON sc.campaignid = vc.campaignid;`;

    return db.manyOrNone(sql);
}



module.exports = db_query;