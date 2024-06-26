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
const categoryRouteUser = require("./routes/v1/user/categoryRoute");
const countryRouteUser = require("./routes/v1/user/countryRoute");
const contactRoute = require("./routes/v1/user/contactRoute");
const authRouteUser = require("./routes/v1/user/authRoute");
const shopRoute = require("./routes/v1/user/shopRoute");
const labelRouteUser = require("./routes/v1/user/labelRoute");
const epicerieRouteUser = require("./routes/v1/user/epicerieRoute");
const cartRouteUser = require("./routes/v1/user/cartRoute");

// Epicerie
const authRouteEpicerie = require("./routes/v1/epicerie/authRoute");
const profileRouteEpicerie = require("./routes/v1/epicerie/profileRoute");
const productRouteEpicerie = require("./routes/v1/epicerie/productRoute");
const productEpicerieRouteEpicerie = require("./routes/v1/epicerie/productEpicerieRoute");
const labelRouteEpicerie = require("./routes/v1/epicerie/labelRoute");

// Admin
const authRouteAdmin = require("./routes/v1/admin/authRoute");
const categoryRouteAdmin = require("./routes/v1/admin/categoryRoute");
const countryRouteAdmin = require("./routes/v1/admin/countryRoute");
const labelRouteAdmin = require("./routes/v1/admin/labelRoute");
const productRouteAdmin = require("./routes/v1/admin/productRoute");
const productEpicerieRouteAdmin = require("./routes/v1/admin/productEpicerieRoute");
const epicerieRouteAdmin = require("./routes/v1/admin/epicerieRoute");
const kpiRouteAdmin = require("./routes/v1/admin/kpiRoute");

// Marque
const authRouteMarque = require("./routes/v1/marque/authRoute");

console.log("You are on:", colors.blue(process.env.NODE_ENV));

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

// Routes for RayonAfrique

// UserRoute
app.use("/api/v1/user/category", categoryRouteUser);
app.use("/api/v1/user/country", countryRouteUser);
app.use("/api/v1/user/shop", shopRoute);
app.use("/api/v1/user/contact", contactRoute);
app.use("/api/v1/user/auth", authRouteUser);
app.use("/api/v1/user/label", labelRouteUser);
app.use("/api/v1/user/epicerie", epicerieRouteUser);
app.use("/api/v1/user/cart", cartRouteUser);

// EpicerieRoute
app.use("/api/v1/epicerie/auth", authRouteEpicerie);
app.use("/api/v1/epicerie/profile", profileRouteEpicerie);
app.use("/api/v1/epicerie/product", productRouteEpicerie);
app.use("/api/v1/epicerie/label", labelRouteEpicerie);
app.use("/api/v1/epicerie/productEpicerie", productEpicerieRouteEpicerie);

// AdminRoute
app.use("/api/v1/admin/auth", authRouteAdmin);
app.use("/api/v1/admin/category", categoryRouteAdmin);
app.use("/api/v1/admin/country", countryRouteAdmin);
app.use("/api/v1/admin/label", labelRouteAdmin);
app.use("/api/v1/admin/product", productRouteAdmin);
app.use("/api/v1/admin/productEpicerie", productEpicerieRouteAdmin);
app.use("/api/v1/admin/epicerie", epicerieRouteAdmin);
app.use("/api/v1/admin/kpi", kpiRouteAdmin);

// MarqueRoute
app.use("/api/v1/marque/auth", authRouteMarque);

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
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});


const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;

  try {
    await Images.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});