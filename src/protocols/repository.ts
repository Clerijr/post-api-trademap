import { Db } from "mongodb";
import { Post } from "../types/post";

export interface Repository {
  insert(post: Post): Promise<Object>;
  getAll(size?: number, page?: number, initial_date?: string, final_date?: string): Promise<Array<Post>>;
  getOneById(id: string): Promise<Post | null>;
  deleteOneById(id: string): Promise<void>
  updateOneById(id: string, post: Post): Promise<Post | null>
}

export interface MongoRepository {
  initCollection(db: Db): Promise<void>  
}