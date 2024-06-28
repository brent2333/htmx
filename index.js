const express = require("express");
const bodyParser = require("body-parser");
const formidable = require("express-formidable");
const db = require("./queries");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view options", { layout: false });
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formidable());

app.get("/users", db.getUsers);
app.post("/users", db.createUser);

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

app.get("/home", (req, res) => {
  if (req.headers["hx-request"]) {
    const fileName = "/public/home.html";
    res.sendFile(fileName, options, function (err) {
      if (err) {
        sendFourOhFour();
        console.error("Error sending file:", err);
      }
    });
  } else {
    sendHome(res);
  }
});

app.get("/form", (req, res) => {
  if (req.headers["hx-request"]) {
    const fileName = "/public/form.html";
    res.sendFile(fileName, options, function (err) {
      if (err) {
        sendFourOhFour();
        console.error("Error sending file:", err);
      }
    });
  } else {
    sendHome(res);
  }
});

app.get("/about", (req, res) => {
  if (req.headers["hx-request"]) {
    const fileName = "/public/about.html";
    res.sendFile(fileName, options, function (err) {
      if (err) {
        sendFourOhFour();
        console.error("Error sending file:", err);
      }
    });
  } else {
    sendHome(res);
  }
});

app.listen(PORT);
console.log("root app listening on port: 3000");
