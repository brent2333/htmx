const Pool = require("pg").Pool;
const pool = new Pool({
  user: "brent",
  host: "localhost",
  database: "api",
  password: "Y211f9twR!!!",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    // const firstUser = `<div>${results.rows[0].name}</div>`;
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  console.log("CREATE USER", request.fields);
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
};

module.exports = {
  getUsers,
  createUser,
};
