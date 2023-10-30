require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const colors = require("colors");
const PORT = process.env.PORT || 3500;

/*  Define Routes */

// UserRoute
const categoryRoute = require("./routes/v1/user/categoryRoute");
const countryRoute = require("./routes/v1/user/countryRoute");
const contactRoute = require("./routes/v1/user/contactRoute");
const authRouteUser = require("./routes/v1/user/authRoute");
const shopRoute = require("./routes/v1/user/shopRoute");

// Epicerie
const authRouteEpicerie = require("./routes/v1/epicerie/authRoute");

console.log("You are on:", colors.blue(process.env.NODE_ENV));

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

// Routes for RayonAfrique

// UserRoute
app.use("/api/v1/user/category", categoryRoute);
app.use("/api/v1/user/country", countryRoute);
app.use("/api/v1/user/shop", shopRoute);
app.use("/api/v1/user/contact", contactRoute);
app.use("/api/v1/user/auth", authRouteUser);

// UserRoute
app.use("/api/v1/epicerie/auth", authRouteEpicerie);

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, "localhost", () =>
    console.log(colors.cyan(`Server running on http://localhost:${PORT}`))
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
