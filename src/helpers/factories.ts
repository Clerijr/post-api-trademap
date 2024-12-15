import { HttpRequest, Post } from "../types";
import { PostRepository } from "../protocols";

export const makePostRequest = (): HttpRequest => ({
  body: {
    title: "any_title",
    description: "any_description",
    body: "any_body",
  },
});

export const makePost = (): Post => ({
  title: "any_title",
  description: "any_description",
  body: "any_body",
});

export const makePostRepositoryStub = (): PostRepository => {
  class PostRepositoryStub implements PostRepository {
    async insert(post: Post): Promise<Post> {
      return new Promise((resolve) =>
        resolve(makePost())
      );
    }
    async getAll(): Promise<Array<Post>> {
      return new Array(1).fill(makePost())
    }
  }

  return new PostRepositoryStub()
}