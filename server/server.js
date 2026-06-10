const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const path = require("path");
const noteRoutes = require("./routes/noteRoutes")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

//Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// connect database
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/api/notes",noteRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

//Route
app.get("/api",(req,res)=>{
    res.send("CipherNotes API is running");
});

app.get("/",(req,res)=>{
    res.send("CipherNotes API is running");
});

// start server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})