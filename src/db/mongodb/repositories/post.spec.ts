import { connectDB, disconnectDB, getCollection } from "../helper";
import { PostMongoRepository } from "./post";
import { makePost } from "../../../helpers/factories";
import { ObjectId } from "mongodb";

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

  test("Should return an Post with same provided Id", async () => {
    const sut = new PostMongoRepository();
    const payload = await sut.insert(makePost());
    const postId: string = payload._id!.toString()
    const post = await sut.getOne(postId)
    expect(post).toBeTruthy()
    expect(typeof post).toBe('object')
    expect(post!._id).toBeTruthy()
  });

  test("Should return null if no Post is located", async () => {
    const sut = new PostMongoRepository();
    await sut.insert(makePost());
    const postId: string = new ObjectId().toString()
    const post = await sut.getOne(postId)
    expect(post).toBeFalsy()
  });
});
