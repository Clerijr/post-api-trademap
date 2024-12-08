import { PostRepository } from "../protocols/repository";
import { PostUsecase } from "../protocols/usecases";
import { Post } from "../types/post";

export class PostUsecaseImpl implements PostUsecase {
  constructor(private readonly postRepository: PostRepository) {}

  async create(post: Post): Promise<Post> {
    const payload = await this.postRepository.insert(post);
    return new Promise((resolve) => resolve(payload));
  }
}
