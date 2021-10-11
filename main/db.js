import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/k")

const db = mongoose.connection;

db.on("error", () => {
    console.log("DB happen an error!!");
})
db.once("open", () => {
    console.log("DB open for use!!");
})