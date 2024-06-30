const express = require("express");
const bodyParser = require("body-parser");
const formidable = require("express-formidable");
const path = require("path");
const usersRouter = require("./public/routes/users");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view options", { layout: false });
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formidable());

// apis
app.use("/users", usersRouter);

// layout
app.get("/", (req, res) => {
  res.render("index");
});

const options = {
  root: path.join(__dirname),
};
const fourOhFour = "/public/fourohfour.html";

const sendHome = (res) => {
  const fileName = "/public/index.html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.sendFile(fourOhFour, options);
      console.error("Error sending file:", err);
    }
  });
};

const sendFourOhFour = (res) => {
  res.sendFile(fourOhFour, options);
};

const returnHTML = (req, res, name) => {
  if (req.headers["hx-request"]) {
    const fileName = `/public/${name}.html`;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        sendFourOhFour();
        console.error("Error sending file:", err);
      }
    });
  } else {
    sendHome(res);
  }
};

// catchall HTML and assets
app.get("/*", function (req, res) {
  if (!req.originalUrl.includes("assets")) {
    returnHTML(req, res, req.originalUrl.replace("/", ""));
  } else {
    res.sendFile(req.originalUrl, options, function (err) {
      if (err) {
        console.error("Error sending IMAGE:", err);
      }
    });
  }
});

app.listen(PORT);
console.log("root app listening on port: 3000");
