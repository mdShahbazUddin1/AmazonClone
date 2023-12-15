const express = require("express");
const { connections } = require("./config/db");
const cors = require("cors");
const { userRoute } = require("./routes/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.listen(8080, async () => {
  try {
    await connections;
    console.log("Db is Connetced");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running");
});
