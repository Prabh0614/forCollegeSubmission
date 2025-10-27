import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// Secret key
const JWT_SECRET = "mysecretkey";

// Hardcoded users with roles
const users = [
  { username: "adminUser", password: "pass123", role: "Admin" },
  { username: "modUser", password: "pass123", role: "Moderator" },
  { username: "regularUser", password: "pass123", role: "User" }
];

// Login route - issues token with role
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!foundUser) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { username: foundUser.username, role: foundUser.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// Middleware: Verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// Middleware: Check role
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

// Routes
app.get("/profile", verifyToken, authorizeRoles("User", "Moderator", "Admin"), (req, res) => {
  res.json({ message: `Welcome to your profile, ${req.user.username}!` });
});

app.get("/mod-panel", verifyToken, authorizeRoles("Moderator", "Admin"), (req, res) => {
  res.json({ message: `Moderator access granted, ${req.user.username}.` });
});

app.get("/admin-dashboard", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: `Admin dashboard access granted, ${req.user.username}.` });
});

// Start server
app.listen(5000, () => console.log("RBAC server running on port 5000"));
