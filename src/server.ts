import { PostController } from "./controllers/post";
import { PostMongoRepository } from "./db/mongodb/repositories/post";
import { MongoHelper } from "./db/mongodb/helper";
import { initApp } from "./config/app";

const initServer = async () => {
  const db = await MongoHelper.connect();
  const postRepository = new PostMongoRepository(db);
  const postController = new PostController(postRepository);

  initApp(postController);
};

initServer();
