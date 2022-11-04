const mongoose = require("mongoose");



const connectDatabase = () => {
  mongoose.connect((process.env.DB_URI),() => {
    console.log("connected to mongo successfully");
})}

     

module.exports = connectDatabase;
