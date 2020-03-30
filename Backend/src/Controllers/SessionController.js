const connections = require('../database/connections');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ongs = await connections('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ongs) {
            return response.status(400).json({error: 'Nenhuma ONG encontrada com esta ID'});
    }
        return response.json(ongs);
}
}