const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { departmentCode, departmentName, grossSalary } = req.body;

  db.query(
    `INSERT INTO department (departmentCode, departmentName, grossSalary) VALUES (?, ?, ?)`,
    [departmentCode, departmentName, grossSalary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Department added successfully" });
    }
  );
});

module.exports = router;
