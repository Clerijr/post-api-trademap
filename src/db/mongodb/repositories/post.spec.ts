import { MongoHelper } from "../helper";
import { PostMongoRepository } from "./post";
import { makePost } from "../../../helpers/factories";
import { Db, ObjectId } from "mongodb";


describe("Post Repository", () => {
  let db: Db

  beforeAll(async () => {
    db = await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const postCollection = await MongoHelper.getCollection('posts')
    await postCollection.deleteMany({})
  })
  
  test("Should return a post on success", async () => {
    const sut = new PostMongoRepository(db) 
    const payload = await sut.insert(makePost())
    expect(typeof payload).toBe('object')
    expect(payload._id).toBeTruthy()
    expect(payload.title).toBeTruthy()
    expect(payload.description).toBeTruthy()
    expect(payload.body).toBeTruthy()
    expect(payload.created_at).toBeTruthy()
    expect(payload.updated_at).toBeTruthy()
  });

  test("Should return an Post with same provided Id", async () => {
    const sut = new PostMongoRepository(db);
    const postDocument = await sut.insert(makePost());
    const postId: string = postDocument._id!.toString()
    const post = await sut.getOneById(postId)
    expect(post).toBeTruthy()
    expect(typeof post).toBe('object')
    expect(post!._id).toBeTruthy()
  });

  test("Should return null if no Post is located", async () => {
    const sut = new PostMongoRepository(db);
    await sut.insert(makePost());
    const postId: string = new ObjectId().toString()
    const post = await sut.getOneById(postId)
    expect(post).toBeFalsy()
  });

  test("Should return null if Post is deleted successfully", async () => {
    const sut = new PostMongoRepository(db);
    const postDocument = await sut.insert(makePost());
    const postId: string = postDocument._id!.toString()
    const result = await sut.deleteOneById(postId)
    expect(result).toBeFalsy()
  });

  test("Should return updated Post when correct data is provided", async () => {
    const sut = new PostMongoRepository(db);
    const postDocument = await sut.insert(makePost());
    const postId: string = postDocument._id!.toString()
    const result = await sut.updateOneById(postId, {
      title: 'updated_title',
      description: 'updated_description',
      body: 'updated_body'
    })
    expect(typeof result).toBe('object')
    expect(result!.title).toBe('updated_title')
    expect(result!.description).toBe('updated_description')
    expect(result!.body).toBe('updated_body')
  });
});
