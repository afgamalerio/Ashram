require('dotenv').config()

const config = {
  email: process.env.EMAIL ,
  pass: process.env.PASS 
}

module.exports = { config }