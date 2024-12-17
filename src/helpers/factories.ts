import { HttpRequest, Post } from "../types";
import { PostRepository } from "../protocols";
import { ObjectId } from "mongodb";

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

export const makeMongoPostDoc = (objId: ObjectId = new ObjectId()): Post => ({
  _id: objId,
  title: "any_title",
  description: "any_description",
  body: "any_body",
  created_at: "2024-12-05T18:38:05.775401Z",
  updated_at: "2024-12-05T18:45:05.219877287Z",
});

export const makePostRepositoryStub = (): PostRepository => {
  class PostRepositoryStub implements PostRepository {
    async insert(post: Post): Promise<Post> {
      return new Promise((resolve) => resolve(makePost()));
    }
    async getAll(): Promise<Array<Post>> {
      return new Array(1).fill(makePost());
    }

    async getOne(id: string): Promise<Post | null> {
      return new Promise((resolve) => resolve(makePost()));
    }

    async deleteOneById(id: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }

    async updateOneById(id: string, post: Post): Promise<Post> {
      return new Promise((resolve) => resolve(makePost()));
    }
  }

  return new PostRepositoryStub();
};
