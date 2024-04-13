const mongoose = require('mongoose')
// schema creating

const EmployeeSchema = new mongoose.Schema({


    name: String,
    email: String,
    password: String,
    mobile: String,
    img: String,
    role: {
        type: String,
        default: "user"
    },
    issuess:{
        type:String
    }
    
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)
module.exports = EmployeeModel