    // server.js
    const express = require('express');
    const db = require('./db'); // Adjust path as needed

    const app = express();
    const port = 3000;

    app.use(express.json()); // Middleware to parse JSON request bodies

    // Example route to fetch data
    app.get('/users', async(req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        }
    });

    // Example route to insert data
    app.post('/users', async(req, res) => {
        const { name, email } = req.body;
        try {
            const [result] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ id: result.insertId, name, email });
        } catch (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Error inserting user');
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });