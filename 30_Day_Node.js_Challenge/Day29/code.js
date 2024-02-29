const express = require("express");
const app = express();

app.use(express.json());

app.get("/divide", (req, res, next) => {
  const { dividend, divisor } = req.query;

  if (divisor == 0) {
    const err = new Error("Division by zero");
    err.statusCode = 400;
    next(err);
  } else {
    const result = dividend / divisor;
    res.json({ result });
  }
});

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode;

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
