const express = require('express');
const router = express.Router();
const db = require('../db');

// Create User
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User added!', id: result.insertId });
  });
});

// Read All Users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Read One User
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Update User
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: 'User updated!' });
  });
});

// Delete User
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: 'User deleted!' });
  });
});

module.exports = router;
