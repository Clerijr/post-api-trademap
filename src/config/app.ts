import express, { Application } from "express";
import { Controller } from "../protocols";
import { initRoutes } from "./routes";

export const initApp = (controller: Controller): Application => {
  const app: Application = express();
  const route = initRoutes(controller);

  app.use(express.json());
  app.use(route);
  app.listen(8080, () => "Server is running on port 8080");

  return app;
};
