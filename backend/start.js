const path = require("path");
const express = require("express");
const { Medusa } = require("@medusajs/medusa");
const { migrate, run } = require("medusa-core-utils");

const start = async () => {
  const app = express();
  const projectPath = path.resolve(".");

  try {
    console.log("--- Running database migrations ---");
    await migrate({ directory: projectPath });
    console.log("--- Migrations complete ---");

    console.log("--- Starting Medusa server ---");
    const { app: medusaApp } = await new Medusa(projectPath, {
      express: app,
    }).load();

    const port = process.env.PORT || 9000;
    medusaApp.listen(port, () => {
      console.log(`Medusa server started on port: ${port}`);
    });
  } catch (err) {
    console.error("Error starting Medusa:", err);
    process.exit(1);
  }
};

start();