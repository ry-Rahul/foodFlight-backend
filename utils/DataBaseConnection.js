import mongoose from "mongoose";

const DbConnection = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://ryrahul12345:Eds4wwzUQAT5lUQm@cluster0.38hmvpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      dbName: "AlloHealth",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default DbConnection;
