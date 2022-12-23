require("dotenv").config();
const mongoose = require("mongoose");
const conn = require("./app");
const { PORT, MONGO_URL } = process.env;
// const uri = `mongodb+srv://${USER}:${password}@cluster0.1sswsn6.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const uri = MONGO_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

conn.listen(PORT || 3000, () => console.log("SERVER OPEN IN PORT" + PORT));
