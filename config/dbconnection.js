const mongoose = require("mongoose")
const color = require("colors")

const dbconnection = ()=>{
    try {
        mongoose.connect(`mongodb://127.0.0.1:27017/envougethread`)
        console.log(`Db connected`.bgBlue)
    } catch (error) {
        console.log("error in connection")
    }
}
module.exports = dbconnection