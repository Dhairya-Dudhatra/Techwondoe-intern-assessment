 const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
const cors = require(`cors`);
const auth = require('../middleware/auth')
const Company = require('../models/Company')
 
//config file
const dotenv = require(`dotenv`)
dotenv.config();
 

 
const compRouter = express.Router()
 

  compRouter.post('/company',auth, (req,res) => {
    

      let newCompany = new Company({
       compID : req.body.compID ,
       ceo : req.body.ceo ,
       name: req.body.name ,
       address : req.body.address ,
       inceptionDate : req.body.inceptionDate
     });
   
     newCompany.save(error => { 
         if(error)
         {
             return  console.log("Error",error)
         }
         return res.status(200).json({
            title: "Company successfully added",
            company: newCompany
        })
     });
  })

 // get company by ID
 compRouter.get('/company/:id',auth , (req, res) => {
    // now we know token is valid
    Company.find({
        _id: req.params.id 
    }, (err, company) => {
        if (err) 
        {
            return console.log(err);
        }
        else
        {
          if(company.length===0)
          return res.status(200).json({
            title: 'success',
            message: "No companies with such ID"
            });
        else{
          return res.status(200).json({
            title: 'success',
            company: company
            
          });
        }
       }
    })

}) 

// search company by name
compRouter.get('/company',auth , (req, res) => {
  // now we know token is valid
    Company.find({
        name: req.body.name
    }, (err, company) => {
        if (err) return console.log(err);
        else{
           if(company.length===0)
             return res.status(200).json({
                title: 'success',
                message: "No companies with such Name"
                 });
           else{
             return res.status(200).json({
                title: 'success',
                company: company
              });
           }
        }
        
    })

}) 

module.exports = compRouter;