import { Router, Request, Response } from "express";
import { Controller } from "../protocols";

export const initRoutes = (controller: Controller): Router => {
  const router: Router = Router();

  router.get("/post", async (req: Request, res: Response): Promise<void> => {
    const response = await controller.getAll();
    res.status(response.statusCode).json(response.body);
  });

  router.get(
    "/post/:post_id",
    async (req: Request, res: Response): Promise<void> => {
      const response = await controller.get(req);
      res.status(response.statusCode).json(response.body);
    }
  );

  router.put(
    "/post/:post_id",
    async (req: Request, res: Response): Promise<void> => {
      const response = await controller.update(req);
      res.status(response.statusCode).json(response.body);
    }
  );

  router.delete(
    "/post/:post_id",
    async (req: Request, res: Response): Promise<void> => {
      const response = await controller.delete(req);
      res.status(response.statusCode).json(response.body);
    }
  );

  router.post("/post", async (req: Request, res: Response): Promise<void> => {
    const response = await controller.create(req);
    res.status(response.statusCode).json(response.body);
  });

  return router;
};
