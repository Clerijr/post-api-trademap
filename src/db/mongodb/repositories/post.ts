import { ObjectId } from "mongodb";
import { PostRepository } from "../../../protocols/repository";
import { Post } from "../../../types/post";
import { getCollection } from "../helper";

export class PostMongoRepository implements PostRepository {
  async insert(post: Post): Promise<Post> {
    const collection = getCollection("posts");
    const doc = await collection.insertOne(post);
    const result = await collection.findOne<Post>({ _id: doc.insertedId });
    if(result === null) throw new Error('Error fetching new post')
    return result;
  }
}
