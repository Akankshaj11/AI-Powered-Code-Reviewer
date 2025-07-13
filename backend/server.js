// require('dotenv').config()

// const app = require('./src/app')

// app.listen(3000, () => { 
//     console.log("server is running on http://localhost:3000")
// })



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const aiRoutes = require("./src/routes/ai.routes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/ai", aiRoutes);

// app.listen(3000, () => {
//   console.log("server is running on http://localhost:3000");
// });


// server.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import aiRoutes from "./src/routes/ai.routes.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/ai", aiRoutes);

// app.listen(3000, () => {
//   console.log("server is running on http://localhost:3000");
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import aiRoutes from "./src/routes/ai.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
