import { PostRepository } from "../../../protocols/repository";
import { Post } from "../../../types/post";
import { getCollection } from "../helper";
import { ObjectId } from "mongodb";

export class PostMongoRepository implements PostRepository {
  async insert(post: Post): Promise<Post> {
    const collection = getCollection("posts");
    post["created_at"] = new Date();
    post["updated_at"] = new Date();
    const doc = await collection.insertOne(post);
    const result = await collection.findOne<Post>({ _id: doc.insertedId });
    if (result === null) throw new Error("Error fetching new post");
    return result;
  }

  async getAll(): Promise<Array<Post>> {
    const collection = getCollection("posts");
    const payload: Array<Post> = await collection.find<Post>({}).toArray();
    return payload;
  }

  async getOne(id: string): Promise<Post | null> {
    const collection = getCollection("posts");
    const payload: Post | null = await collection.findOne<Post>({
      _id: new ObjectId(id),
    });
    return payload;
  }

  async deleteOne(id: string): Promise<null> {
    const collection = getCollection("posts");
    await collection.deleteOne({
      _id: new ObjectId(id),
    });
    return null;
  }
}
