import express, { Application, Router, Request, Response } from "express";
import { PostController } from "./controllers/post";
import { PostMongoRepository } from "./db/mongodb/repositories/post";

const app: Application = express() 
const router: Router = Router() 

const postRepository = new PostMongoRepository()
const postController = new PostController(postRepository)

router.get("/post", async (req: Request, res: Response): Promise<void> => {
    const response = await postController.getAll()
    res.status(response.statusCode).json(response.body)
})

router.post("/post", async (req: Request, res: Response): Promise<void> => {
    const response = await postController.create(req)
    res.status(response.statusCode).json(response.body)
})


app.use(express.json())
app.use(router)
app.listen(8080, () => "App running on Port 8080")