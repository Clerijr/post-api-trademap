import { Post } from "../../types/post";

export interface PostUsecase {
    create(post: Post): Promise<Post>
}