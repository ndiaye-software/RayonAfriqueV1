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
const categoryRoute = require("./routes/v1/categoryProductRoutes");
const countryRoute = require("./routes/v1/countryRoutes");
const brandRoute = require("./routes/v1/brandRoute");
const marketRoute = require("./routes/v1/marketRoute");
const epicerieRoute = require("./routes/v1/epicerieRoute");
const productRoute = require("./routes/v1/productRoute");
const productUserRoute = require("./routes/v1/productUserRoute");
const userRoute = require("./routes/v1/userRoute");
const shopRoute = require("./routes/v1/shopRoute");
const shopDetailRoute = require("./routes/v1/shopDetailRoute");
const fournisseurRoute = require("./routes/v1/fournisseurRoute");
const inscriptionRoute = require("./routes/v1/inscriptionRoute");
const contactRoute = require("./routes/v1/contactRoute");
const authRoute = require("./routes/v1/authRoute");
const fournisseurProductRoute = require("./routes/v1/fournisseurProductRoute");

console.log("You are on:", colors.blue(process.env.NODE_ENV));

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

// Routes for RayonAfrique

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/country", countryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/market", marketRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/productuser", productUserRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/shopDetail", shopDetailRoute);
app.use("/api/v1/epicerie", epicerieRoute);
app.use("/api/v1/fournisseur", fournisseurRoute);
app.use("/api/v1/inscription", inscriptionRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/fournisseurProduct", fournisseurProductRoute);

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
