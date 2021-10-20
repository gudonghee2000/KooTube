import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection;

db.on("error", () => {
    console.log("DB happen an error!!");
})
db.once("open", () => {
    console.log("DB open for use!!");
})