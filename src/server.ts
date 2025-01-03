import { PostController } from "./controllers/post";
import { PostMongoRepository } from "./db/mongodb/repositories/post";
import { MongoHelper } from "./db/mongodb/helper";
import { initApp } from "./config/app";
import dotenv from "dotenv";

const initServer = async () => {
  dotenv.config();
  const db = await MongoHelper.connect(process.env.MONGO_URL);
  const postRepository = new PostMongoRepository(db);
  const postController = new PostController(postRepository);

  initApp(postController);
};

initServer();
