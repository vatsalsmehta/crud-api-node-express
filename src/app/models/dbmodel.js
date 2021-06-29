const mongoose = require('mongoose');
url="mongodb://localhost:27017/passdb";

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    }).then(() => {console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const passwordSchema = mongoose.Schema({

    website:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('passcollection', passwordSchema);
