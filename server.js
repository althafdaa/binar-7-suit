const app = require("./app");

const port = 3000;

app.listen(port, () =>
  console.log(
    `Connected to http://localhost:${port}/\ntry get to '/' to check if its connected\n`
  )
);
