const mongoose = require('mongoose')
 

const teamSchema = new mongoose.Schema({
    compID: {
        type: String,
        required: true,
        trim: true,
    },
    team_lead: {
        type: String,
        required: true,
    }
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;