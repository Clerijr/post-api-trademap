import { Post } from "../types/post";

export interface PostRepository {
  insert(post: Post): Promise<Object>;
  getAll(): Promise<Array<Post>>;
  getOne(id: string): Promise<Post | null>;
}
