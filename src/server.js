const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig');

const pool = new Pool(dbConfig);
app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' }); // user does not exist
      }
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' }); // passwords do not match
      }
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rowCount > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    await pool.query(insertQuery, [username, hashedPassword]);

    const insertData = 'INSERT INTO data (id) SELECT id FROM users WHERE username = $1';
    await pool.query(insertData, [username]);

    res.status(200).json({ message: 'Sign up successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/updateUserStatus', async (req, res) => {
  try {
    const { completionStatus, username, signupUsername } = req.body;
    const user = username !== '' ? username : signupUsername;
    const getUserIdQuery = `SELECT id FROM users WHERE username = $1`;
    const getUserIdResult = await pool.query(getUserIdQuery, [user]);
    const userId = getUserIdResult.rows[0].id;

    const query = `UPDATE data SET data = $2 WHERE id = $1`;
    await pool.query(query, [userId, completionStatus]);
    
    res.status(200).json({ message: 'Completion status saved successfully' });
  } catch (error) {
    console.error('Error saving completion status:', error);
    res.status(500).json({ error: 'Failed to save completion status' });
  }
});

app.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM users'; 
        const result = await pool.query(query);
    
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

app.post('/api/getCompletionStatus', async (req, res) => {
  try {
    const { username } = req.body;
    const getUserIdQuery = `SELECT id FROM users WHERE username = $1`;
    const getUserIdResult = await pool.query(getUserIdQuery, [username]);

    if (getUserIdResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = getUserIdResult.rows[0].id;

    const query = `SELECT data FROM data WHERE id = $1`;
    const dataResult = await pool.query(query, [userId]);

    if (dataResult.rows.length === 0) {
      return res.status(404).json({ error: 'Data not found for this user' });
    }

    const jsonData = dataResult.rows[0].data;

    res.status(200).json({ message: 'Completion status retrieved successfully', data: jsonData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
