import { Post } from "../types/post";

export interface PostRepository {
  insert(post: Post): Promise<Object>;
  getAll(): Promise<Array<Post>>;
  getOneById(id: string): Promise<Post | null>;
  deleteOneById(id: string): Promise<void>
  updateOneById(id: string, post: Post): Promise<Post | null>
}
