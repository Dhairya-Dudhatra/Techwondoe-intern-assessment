const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
//const json = require(`json`)

const auth = require('../middleware/auth')
const Team = require('../models/Team')
const Company = require('../models/Company')
//config file
const dotenv = require(`dotenv`)
dotenv.config();

 
 const teamRouter = express.Router()

 teamRouter.post('/team/:compid',auth, (req,res) => {
    
     Company.find({
        _id: req.params.compid
       }, (err, company) => {
        if (err) 
        {
            return  console.log("Please Provide Company Id in the path")
        }
        else
        {
          if(company.length===0)
          return res.status(200).json({
            title: 'success',
            message: "No companies with such ID"
            });
        }
       });
     
    let newTeam = new Team({
     compID : req.params.compid ,
     team_lead : req.body.team_lead ,
    });
 
   newTeam.save(error => { 
       if(error)
       {
           return  console.log("Error",error)
       }
       return res.status(200).json({
          title: "Team successfully added",
          team: newTeam
      })
   });
})

 // get all teams
   teamRouter.get('/team',auth , (req, res) => {
    
    Team.find({}
    , (err, team) => {
        if (err) 
        {
            return console.log(err);
        }
        else
        {
          if(team.length===0)
          return res.status(200).json({
            title: 'success',
            message: "No teams exist"
            });
         }
        });

    Team.aggregate([{  $group: {_id: "$compID"}  }], async (err,companies) => {
        if (err) 
        {
            return console.log(err);
        }
        else
        {
             
            for(let i=0;i<companies.length;i++)
            {
                var team = await Team.find({"compID": companies[i]._id})
                companies[i].teams = team ;
            } 
            
            return res.status(200).json({
            title: 'success',
            companies: companies
            });
           }
         })
        })
module.exports = teamRouter;