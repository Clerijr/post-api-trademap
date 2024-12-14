import { PostController } from "./post";
import { PostRepository } from "../protocols/repository";
import { makePostRequest } from "../helpers/factories";
import { Post } from "../types/post";
import { ObjectId } from "mongodb";

type SutTypes = {
  sut: PostController;
  postRepositoryStub: PostRepository;
};

const makeSut = (): SutTypes => {
  class PostRepositoryStub implements PostRepository {
    async insert(post: Post): Promise<Post> {
      return new Promise((resolve) =>
        resolve({
          title: "any_title",
          description: "any_description",
          body: "any_body",
        })
      );
    }
  }
  const postRepositoryStub = new PostRepositoryStub();
  const sut = new PostController(postRepositoryStub);
  return {
    sut,
    postRepositoryStub,
  };
};

describe("Post Controller", () => {
  test("Should throw if postRepository throws", async () => {
    const { sut, postRepositoryStub } = makeSut();
    jest.spyOn(postRepositoryStub, "insert").mockRejectedValueOnce(new Error());
    await expect(sut.create(makePostRequest())).rejects.toThrow();
  });

  test("Should call create method with correct values", async () => {
    const { sut, postRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(postRepositoryStub, "insert");
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        body: "any_body",
      },
    };
    await sut.create(httpRequest);
    expect(createSpy).toHaveBeenCalledWith({
      title: "any_title",
      description: "any_description",
      body: "any_body",
    });
  });
});
