const express = require("express");

const pool = require("../../db");

const usersRouter = express.Router();

usersRouter.get("/", (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

usersRouter.post("/createuser", (request, response) => {
  const { name, email } = request.fields;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
});

module.exports = usersRouter;
