import { PostController } from "./post";
import { PostUsecase } from "../protocols/usecases";
import { makePostRequest } from "../helpers/factories";
import { Post } from "../types/post";

type SutTypes = {
  sut: PostController;
  postUsecaseStub: PostUsecase;
};

const makeSut = (): SutTypes => {
  class PostUsecaseStub implements PostUsecase {
    async create(post: Post): Promise<Post> {
      return new Promise((resolve) =>
        resolve({
          id: "any_id",
          title: "any_title",
          description: "any_description",
          body: "any_body",
        })
      );
    }
  }
  const postUsecaseStub = new PostUsecaseStub();
  const sut = new PostController(postUsecaseStub);
  return {
    sut,
    postUsecaseStub,
  };
};

describe("Post Controller", () => {
  test("Should throw if postUsecase throws", async () => {
    const { sut, postUsecaseStub } = makeSut();
    jest.spyOn(postUsecaseStub, "create").mockRejectedValueOnce(new Error());
    await expect(sut.create(makePostRequest())).rejects.toThrow();
  });

  test("Should call create method with correct values", async () => {
    const { sut, postUsecaseStub } = makeSut();
    const createSpy = jest.spyOn(postUsecaseStub, "create");
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
