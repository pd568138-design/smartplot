
const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(require("./routes/plotRoutes"));
app.use(require("./routes/authRoutes"));
app.listen(5000,()=>{
  console.log("Server Running On Port 5000");
});
