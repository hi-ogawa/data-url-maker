import { app } from "./app";

function main() {
  const port = process.env.PORT || "8080";
  app.listen(port, () => {
    console.error(`[main.js] Server listening at ${port}`);
  });
}

if (require.main === module) {
  main();
}
