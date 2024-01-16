import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(express.json()); //this will allow us to send data in json format
app.use(cors()); //this will allow us to send data from frontend to backend

//routes
app.use("/auth", UserRouter);

app.listen(5000, () => {
  console.log("SERVER STARTED");
});
