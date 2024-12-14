import { connectDB, disconnectDB, getCollection } from "../helper";
import { PostMongoRepository } from "./post";

describe("Post Repository", () => {
  beforeAll(async () => {
    await connectDB()
  })

  afterAll(async () => {
    await disconnectDB()
  })

  beforeEach(async () => {
    const postCollection = getCollection('posts')
    await postCollection.deleteMany({})
  })
  
  test("Should return a post on success", async () => {
    const sut = new PostMongoRepository();
    const payload = await sut.insert({
      title: "any_title",
      description: "any_description",
      body: "any_body",
    });
    expect(typeof payload).toBe('object')
    expect(payload._id).toBeTruthy()
    expect(payload.title).toBeTruthy()
  });
});
