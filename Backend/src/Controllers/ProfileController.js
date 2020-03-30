const connections = require('../database/connections');

module.exports = {
    async index(request, response){
        const ongs_id = request.headers.authorization;
        
        const incidents = await connections ('incidents')
        .where('ongs_id', ongs_id)
        .select('*');

        return response.json(incidents);
    }
}