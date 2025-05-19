const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { employeeNumber, grossSalary, totalDeduction, netSalary, month } = req.body;

  db.query(
    `INSERT INTO salary (employeeNumber, grossSalary, totalDeduction, netSalary, month) VALUES (?, ?, ?, ?, ?)`,
    [employeeNumber, grossSalary, totalDeduction, netSalary, month],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "✅ Salary record added successfully" });
    }
  );
});

router.get("/", (req, res) => {
  db.query(
    `SELECT e.firstName, e.lastName, e.position, d.departmentName, s.netSalary, s.month
     FROM salary s
     JOIN employee e ON s.employeeNumber = e.employeeNumber
     JOIN department d ON e.departmentCode = d.departmentCode`,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
});

router.put("/:id", (req, res) => {
  const { grossSalary, totalDeduction, netSalary, month } = req.body;

  db.query(
    `UPDATE salary SET grossSalary=?, totalDeduction=?, netSalary=?, month=? WHERE id=?`,
    [grossSalary, totalDeduction, netSalary, month, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Salary updated successfully" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM salary WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Salary deleted successfully" });
  });
});

module.exports = router;
