const mongoose = require('mongoose')
 
const companySchema = new mongoose.Schema({
  name: {
       type: String,
       required: true,
  },
  ceo: {
      type: String,
      required: true,
  },
  address: {
      type: String,
      required: true,
  },
  inceptionDate: {
      type: String,
      required: true,
  },
})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;