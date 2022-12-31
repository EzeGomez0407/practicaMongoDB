const mongoose = require("mongoose");
const conn = require("./app");
// const { PORT, MONGO_URL } = process.env;
// const uri = MONGO_URL;

//VARIABLES DE ENTORNO SOLO PARA DESARROLLO//////

const { PORT, MONGOPASSWORD, MONGOHOST, MONGOPORT, MONGOUSER } = process.env;
const uri = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`;

// ////////////////////////////////////////////////////////
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

conn.listen(PORT || 3000, () => console.log("SERVER OPEN IN PORT" + PORT));
