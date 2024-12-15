import { PostController } from "./post";
import { PostRepository } from "../protocols/repository";
import { makePostRequest, makePost } from "../helpers";
import { Post } from "../types/post";

type SutTypes = {
  sut: PostController;
  postRepositoryStub: PostRepository;
};

const makePostRepositoryStub = (): PostRepository => {
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

const makeSut = (): SutTypes => {
  const postRepositoryStub = makePostRepositoryStub();
  const sut = new PostController(postRepositoryStub);
  return {
    sut,
    postRepositoryStub,
  };
};

describe("Post Create Controller", () => {
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

describe("Posts GetAll Controller", () => {
  test("Should call getAll repository method", async () => {
    const { sut, postRepositoryStub } = makeSut();
    const getAllSpy = jest.spyOn(postRepositoryStub, 'getAll')
    await sut.getAll();
    expect(getAllSpy).toHaveBeenCalled()
  });

});