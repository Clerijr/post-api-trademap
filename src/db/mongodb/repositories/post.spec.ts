import { connectDB, disconnectDB, getCollection } from "../helper";
import { PostMongoRepository } from "./post";
import { makePost } from "../../../helpers/factories";

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
    const payload = await sut.insert(makePost());
    expect(typeof payload).toBe('object')
    expect(payload._id).toBeTruthy()
    expect(payload.title).toBeTruthy()
  });

  test("Should return an array with two Post objects", async () => {
    const sut = new PostMongoRepository();
    await sut.insert(makePost());
    await sut.insert(makePost());
    const payload = await sut.getAll()
    expect(Array.isArray(payload)).toBe(true)
    expect(payload.length).toEqual(2)
    expect(payload[0]._id).toBeTruthy()
    expect(payload[0].title).toBeTruthy()
  });
});
