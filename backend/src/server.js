import boot from "./services/boot.js";
import config from "./config/config.js";
import mongoose from "mongoose";

if (config.db.connectToString) {
  mongoose
    .connect(config.db.connectToString)
    .then(() => boot())
    .catch((err) => console.log(err))
} else {
  console.log("No connection string provided!")
}
