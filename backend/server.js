const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("admin123", 8), role: "admin" }
];

// Endpoint Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "secret-key", { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.listen(5000, () => console.log("Server running on port 5000"));
