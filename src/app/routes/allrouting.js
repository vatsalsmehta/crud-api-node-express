module.exports = (app) => {
    const password = require('../controllers/crudfns.js');

    // Create a new Note
    app.post('/passwords', password.create);

    // Retrieve all Notes
    app.get('/allpasswords', password.findAll);

    // Retrieve a single Password with passId
    app.get('/passwords/:passId', password.findOne);

    // Update a Password with passId
    app.put('/passwords/:passId', password.update);

    // Delete a Password with passId
    app.delete('/passwords/:passId', password.delete);
}
