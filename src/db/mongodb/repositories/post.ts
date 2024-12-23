import { MongoRepository, Repository } from "../../../protocols/repository";
import { Post } from "../../../types/post";
import { Collection, Db, ObjectId } from "mongodb";

export class PostMongoRepository implements Repository {
  private postCollection: Collection<Post>;
  constructor(db: Db) {
    this.postCollection = db.collection<Post>("posts");
  }

  async insert(post: Post): Promise<Post> {
    post["created_at"] = new Date().toISOString();
    post["updated_at"] = new Date().toISOString();
    const doc = await this.postCollection.insertOne(post);
    const result = await this.postCollection.findOne<Post>({
      _id: doc.insertedId,
    });
    if (result === null) throw new Error("Error fetching new post");
    return result;
  }

  async getAll(): Promise<Array<Post>> {
    const payload: Array<Post> = await this.postCollection
      .find<Post>({})
      .toArray();
    return payload;
  }

  async getOneById(id: string): Promise<Post | null> {
    const payload: Post | null = await this.postCollection.findOne<Post>({
      _id: new ObjectId(id),
    });
    return payload;
  }

  async deleteOneById(id: string): Promise<void> {
    await this.postCollection.deleteOne({
      _id: new ObjectId(id),
    });
  }

  async updateOneById(id: string, post: Post): Promise<Post | null> {
    const updated_at = new Date().toISOString();
    const fields: { [key: string]: any } = {
      title: post.title,
      body: post.body,
      updated_at,
    };
    if (post.description) fields.description = post.description;

    const payload: Post | null = (await this.postCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: fields },
      { returnDocument: "after" }
    )) as Post;
    return payload;
  }
}
