const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');

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
  
      // Send a success response back to the frontend
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Define the GET /api/data route (example from the previous response)
app.get('/api/data', async (req, res) => {
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
