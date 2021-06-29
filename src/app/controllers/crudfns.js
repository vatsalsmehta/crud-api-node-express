const passData = require('../models/dbmodel.js');


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }

    // Create a Note
    const password = new passData({
        website: req.body.website, 
        username: req.body.username,
        password: req.body.password,
        description: req.body.description
    });

    // Save Note in the database
    password.save()
    .then(data => {
        //res.send(data);
        res.send({message: "Data added successfully"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding the Password to the database."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
passData.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single Password with a passId
exports.findOne = (req, res) => {
passData.findById(req.params.passId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Password not found with id " + req.params.passId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Password not found with id vbb" + req.params.passId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Password with id " + req.params.passId
        });
    });
};

// Update a Password identified by the passId in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }
    // Find note and update it with the request body
    passData.findByIdAndUpdate(req.params.passId, {
        website: req.body.website, 
        username: req.body.username,
        password: req.body.password,
        description: req.body.description
    }, {new: true })
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Password not found with id " + req.params.passId
            });
        }
        res.send({message:"Password updated"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Password not found with id " + req.params.passId
            });                
        }
        return res.status(500).send({
            message: "Error updating Password with id " + req.params.passId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
passData.findByIdAndRemove(req.params.passId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Password not found with id " + req.params.noteId
            });
        }
        res.send({message: "Password deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Password not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete password with id " + req.params.noteId
        });
    });
};
