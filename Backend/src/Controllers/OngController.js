const crypto = require('crypto');
const connections = require('../database/connections');


module.exports = {
    async index (request, response) {
         const ongs = await connections('ongs').select('*');
           
            return response.json(ongs);
        },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
         await connections('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
       
        return response.json({ id });
    }
}