const express = require('express');
const cors = require('cors');
const app = express();
const { pool } = require('./db');

app.use(cors());
app.use(express.json());

// Create a new profile
app.post('/employees', async (req, res) => {
  const { name, email, phone_number, job_title, birthday, address } = req.body;
  try {
    const query = 
      `INSERT INTO employees (name, email, phone_number, job_title, birthday, address) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;

    const values = [name, email, phone_number, job_title, birthday, address];

    const db = await pool.query(query, values);

    res.json(db.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all profiles
app.get('/employees', async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees");
    res.json(allEmployees.rows)
  } catch (error) {
    console.error(error.message);
  }
});

// Get a profile
app.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);

    res.json(employee.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a profile
app.put('/employees/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const { name, email, phone_number, job_title, birthday, address } = req.body;

    const query = `
      UPDATE employees
      SET name = $1, email = $2, phone_number = $3, job_title = $4, birthday = $5, address = $6
      WHERE id = $7
      RETURNING *;
      `;

    const values = [name, email, phone_number, job_title, birthday, address, id];

    const updateEmployee = await pool.query(query, values);

    res.json("Profile was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a profile
app.delete('/employees/:id', async (req, res) => {
  try {
    const {id} = req.params;
  
    const deleteEmployee = await pool.query("DELETE FROM employees WHERE id = $1", [id]);

    res.json("Profile was deleted!");

  } catch (error) {
    console.error(error.message);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

