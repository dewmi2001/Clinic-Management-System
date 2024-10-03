const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;


const usersRoute = require("./routes/usersRoute");
const patientsRoute = require("./routes/patientsRoute");
const inquiriesRoute = require("./routes/inquiriesRoute");
const repliesRoute = require("./routes/repliesRoute");
const reportsRoute = require("./routes/reportsRoute");




app.use("/api/users", usersRoute);
app.use("/api/patients", patientsRoute);
app.use("/api/inquiries", inquiriesRoute);
app.use("/api/replies", repliesRoute);
app.use("/api/reports", reportsRoute);





app.listen(port, ()=> console.log('server is running on port ${port}'));