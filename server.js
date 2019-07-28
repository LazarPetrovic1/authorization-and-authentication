const express = require("express"),
  jwt = require("express-jwt"),
  jwks = require("jwks-rsa"),
  checkScope = require("express-jwt-authz");
require("dotenv").config();
const app = express();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

function checkRole(role) {
  return (req, res, next) => {
    const assignedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Unauthorized access");
    }
  };
}

app.use(jwtCheck);

app.get("/public", (req, res) => {
  res.json({
    message: "Hello from a public API"
  });
});

app.get("/private", jwtCheck, (req, res) => {
  res.json({
    message: "Hello from a private API"
  });
});

app.get("/courses", jwtCheck, checkScope(["read:courses"]), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating reusable React components" }
    ]
  });
});

app.get("/admin", jwtCheck, checkRole("admin"), (req, res) => {
  res.json({
    message: "Hello from an admin API"
  });
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}.`);
// });

app.listen(3001);
console.log(`Listening on ${process.env.REACT_APP_API_URL}`);
