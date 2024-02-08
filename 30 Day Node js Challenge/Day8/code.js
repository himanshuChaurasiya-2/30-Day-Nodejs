const express = require("express");

function positiveIntegerHandler(req, res) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    res.status(200).send("Success: The number is a positive integer.");
  } else {
    throw new Error("Invalid parameter: 'number' must be a positive integer.");
  }
}

function errorHandlerMiddleware(err, req, res, next) {
  if (err.message.startsWith("Invalid parameter: 'number'")) {
    res.status(400).send("Bad Request: " + err.message);
  } else {
    next(err);
  }
}

const app = express();

app.get("/positive", positiveIntegerHandler);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
