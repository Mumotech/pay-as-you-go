/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
// express server
const express = require("express");
require("dotenv").config();
const app = express();

require("./startup/db")(); // connect to database
require("./startup/routes")(app); // middleware routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Phone rental system running on port ${PORT}`)
);
