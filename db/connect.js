const mongoose = require("mongoose");
const url = "mongodb+srv://daud_abdulrehman:rehman2002@daudcluster.rmxqs97.mongodb.net/test";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("Connected to DataBase");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;


