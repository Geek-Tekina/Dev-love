const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI || "";
const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tpbc1717_db_user:Wq3nNfRomQSQsJnw@cluster0.r3qxnf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to Database.");
  } catch (err) {
    console.error("Error Connecting to database : ", err);
  }
};

module.exports = {
  dbConnect,
};
