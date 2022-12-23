require("dotenv").config();
const mongoose = require("mongoose");
const conn = require("./app");
const { PORT, USER, password, dbName } = process.env;
const uri = `mongodb+srv://${USER}:${password}@cluster0.1sswsn6.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

conn.listen(PORT || 3000, () => console.log("SERVER OPEN IN PORT" + PORT));
