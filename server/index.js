// MODULES
const express = require("express");
const mongoose = require("mongoose");

const logger = require("./utils/logging/logger");

const app = express();

// ENV FILE CONFIGURATION
require("dotenv").config();

PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL).then(() => {
  logger.log({
    level: "info",
    message: "Connected to DB",
  });
  app.listen(process.env.PORT, () =>
    logger.log({
      level: "info",
      message: `server running on port ${PORT}`,
    })
  );
});
//Ziad branch initial commit
