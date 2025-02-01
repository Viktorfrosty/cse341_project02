// Dependencies:

const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const githubStrategy = require("passport-github2").Strategy;

// const defaultRouter = require("./routes/");
const storesRouter = require("./routes/stores");
const vehiclesRouter = require("./routes/vehicles");
const swaggerRouter = require("./routes/swagger");

const app = express();

// Middleware:

app
  .use(bodyParser.json())
  .use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization",
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  })
  .use(cors({ methods: ["GET", "POST", "PUT", "DELETE"] }))
  .use(cors({ origin: "*" }));

passport.use(
  new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  }),
  async function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  },
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes:

app.use("/stores", storesRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/api-docs", swaggerRouter);

app.get("/", (req, res) => {
  res.send(req.sesssion.user !== undefined ? `Connected as: ${req.sesssion.user.displayName}` : "Not connected");
});

app.get(
  "github/callback",
  passport.authenticate("github", passport.authenticate("github", { failureRedirect: "/api-docs", session: false })),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  },
);

// Miscellaneous:

// Server host and port.
const port = process.env.PORT;
const host = process.env.HOST;

// Log statement to confirm server operation.
app.listen(port, () => {
  console.log(`trial listening on ${host}:${port}`);
});
