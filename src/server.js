const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Replace these database configuration values with your own
const dbConfig = {
  user: 'ciphdhty',
  host: 'hansken.db.elephantsql.com',
  database: 'ciphdhty',
  password: 'skkBqLbyMJ1dP5U-Rs2XbHJ8dI47zBv_',
  port: 5432, // Default PostgreSQL port is 5432
};

const pool = new Pool(dbConfig);

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
  
      if (result.rowCount === 0) {
        // User does not exist
        return res.status(404).json({ message: 'User not found' });
      }
  
      // User exists, you can do further checks here, like comparing passwords
      // For simplicity, let's assume the password is correct for any existing user
      // In a real application, you should hash and compare passwords securely

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Passwords do not match
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      // Send a success response back to the frontend
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

  try {
    // Check if the user already exists in the database
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rowCount > 0) {
      // User already exists
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database with the hashed password
    const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    await pool.query(insertQuery, [username, hashedPassword]);

    const insertData = 'INSERT INTO data (id) SELECT id FROM users WHERE username = $1';
    await pool.query(insertData, [username]);

    // Send a success response back to the frontend
    res.status(200).json({ message: 'Sign up successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/saveCompletionStatus', async (req, res) => {
  try {
    const { userId, completionStatus } = req.body;
    const query = `
      INSERT INTO data (id, data)
      VALUES ($1, $2)`;
    await pool.query(query, [userId, nodeId, completionStatus]);
    res.status(200).json({ message: 'Completion status saved successfully' });
  } catch (error) {
    console.error('Error saving completion status:', error);
    res.status(500).json({ error: 'Failed to save completion status' });
  }
});

// Define a simple route for the root URL
app.get('/', async (req, res) => {
    try {
        // Fetch data from the database
        const query = 'SELECT * FROM users'; // Replace your_table_name with the actual table name
        const result = await pool.query(query);
    
        // Send the data back as a response
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

// Start the server
const port = 3001; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
