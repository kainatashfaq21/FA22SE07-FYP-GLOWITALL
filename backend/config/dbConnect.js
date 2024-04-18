const mongoose = require("mongoose");
 const dbConnect = () => {
    try{
      mongoose.set('strictQuery', false);
    const conn = mongoose.connect("mongodb+srv://fa19bse039:pCK4nLZk98jDA9j4@cluster0.1ildwsj.mongodb.net/");
    console.log("Database connected Successfully");
 }
 catch(error){
    console.log("Database Error");
 }
}
module.exports = dbConnect;