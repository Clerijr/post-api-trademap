import { Post } from "../types/post";

export interface PostRepository {
  insert(post: Post): Promise<Object | null>;
}
