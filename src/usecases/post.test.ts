import { PostUsecase } from "../protocols/usecases";
import { PostRepository } from "../protocols/repository";
import { PostUsecaseImpl } from "./post";
import { Post } from "../types/post";

type SutTypes = {
    sut: PostUsecase
    postRepositoryStub: PostRepository
}

const makePost = (): Post => {
    return {
        title: "any_title",
        description: "any_description",
        body: "any_body",
      }
}

const makeSut = (): SutTypes => {
    class PostRepositoryStub implements PostRepository {
        async insert(post: Post): Promise<Post> {
            return new Promise(resolve => resolve(makePost()))
        }
    }

    const postRepositoryStub = new PostRepositoryStub
    const sut = new PostUsecaseImpl(postRepositoryStub)
    
    return {
        sut,
        postRepositoryStub
    }
}

describe("Post Usecase", () => {
  test("Should call create method with correct values", async () => {
    const { sut, postRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(postRepositoryStub, 'insert')
    const post = makePost()
    await sut.create(post)
    expect(createSpy).toHaveBeenCalledWith(post)
  });
});
