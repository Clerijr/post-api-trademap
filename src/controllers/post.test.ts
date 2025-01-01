import { PostController } from "./post";
import { Repository } from "../protocols/repository";
import { makePostRequest, makePostRepositoryStub } from "../helpers";

type SutTypes = {
  sut: PostController;
  postRepositoryStub: Repository;
};

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

describe("Posts Read Controller", () => {
  test("Should call getAll repository method", async () => {
    const { sut, postRepositoryStub } = makeSut();
    const getAllSpy = jest.spyOn(postRepositoryStub, 'getAll')
    const httpRequest = {
      query: {
        page: 1,
        limit: 10
      }
    };
    await sut.getAll(httpRequest);
    expect(getAllSpy).toHaveBeenCalled()
  });

});