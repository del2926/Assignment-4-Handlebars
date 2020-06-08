const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const expressHbs = require("express-handlebars");

const app = express();

const users = [];

app.engine("hbs", expressHbs({ defaultLayout: "main-layout", extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index", {
    pageTitle: "Add New User",
    path: "/",
    userCSS: true,
    activeAddUser: true,
  });
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
    path: "/users",
    activeUsers: true,
  });
});

app.post("/add-user", (req, res, next) => {
  users.push({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
  });
  res.redirect("/users");
});

app.use((req, res, next) => {
  res.status(404).render("error", { pageTitle: "Error Page" });
});

app.listen(3000);
