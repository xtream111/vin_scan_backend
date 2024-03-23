const db_query = require('../models/db_query');

module.exports = {
    async getAll(req,res,next){
        try {
            const data = await db_query.getAll();
            console.log(`Service Campaigns: ${data}`);
            return res.status(201).json(data);

        }
         catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json(
                {
                    success: false,
                    message: "Error al obtener los resultados"
                }
            )
        }
    },

    /*async VINcampaigncheck(req,res,next){
        try {
            const data = await db_query.VINcampaigncheck();
            console.log(`vehicles: ${data}`);
            return res.status(201).json(data);

        }
         catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json(
                {
                    success: false,
                    message: "Error al obtener los resultados"
                }
            )
        }
    }

*/
async VINcampaigncheck(req, res, next) {
    try {
      const { vin } = req.query;
      console.log(`VIN= ${vin}`)
  
      if (!vin) {
        return res.status(400).json({ error: 'VIN is required' });
      }
  
      const data = await db_query.VINcampaigncheck(vin);
      console.log(`vehicles: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Error al obtener los resultados',
      });
    }
  },

  async update_completion (req, res, next) {
    try {
      const { vin, campaignid } = req.query;
      console.log(`VIN= ${vin}`)
  
      if (!vin) {
        return res.status(400).json({ error: 'VIN is required' });
      }
  
      const data = await db_query.update_completion(vin,campaignid);
      console.log(`aa: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Error al obtener los resultados de completion',
      });
    }
  },

  async update_warranty_completion (req, res, next) {
    try {
      const { vin, campaignid } = req.query;
      console.log(`VIN= ${vin}`)
  
      if (!vin) {
        return res.status(400).json({ error: 'VIN is required' });
      }
  
      const data = await db_query.update_warranty_completion(vin,campaignid);
      console.log(`aa: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.error(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: 'Error al obtener los resultados de completion',
      });
    }
  }



};