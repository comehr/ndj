const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.send("✅ Employees route is working!");
});

router.post("/", (req, res) => {
  const {
    employeeNumber,
    firstName,
    lastName,
    position,
    address,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  } = req.body;

  const sql = `
    INSERT INTO employee 
    (employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    employeeNumber,
    firstName,
    lastName,
    position,
    address,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "✅ Employee added successfully" });
  });
});

router.get("/all", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM employee WHERE employeeNumber = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

router.put("/:id", (req, res) => {
  const {
    firstName,
    lastName,
    position,
    address,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  } = req.body;

  db.query(
    `UPDATE employee SET firstName=?, lastName=?, position=?, address=?, telephone=?, gender=?, hiredDate=?, departmentCode=?
     WHERE employeeNumber=?`,
    [firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Employee updated successfully" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employee WHERE employeeNumber = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Employee deleted successfully" });
  });
});

module.exports = router;
