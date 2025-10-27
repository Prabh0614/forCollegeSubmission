import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// Secret key for signing tokens
const JWT_SECRET = "mysecretkey";

// Hardcoded user for login
const user = {
  username: "admin",
  password: "password123"
};

// Login route to issue JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  }

  res.status(401).json({ message: "Invalid username or password" });
});

// Middleware to verify JWTunction verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded;
    next();
  });
}

// Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! You have access.` });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
