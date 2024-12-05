describe('Posts Controller', () => { 
    test('Should return 400 if no title is provided', () => { 
        class PostController {
            handle(req: HttpRequest): HttpResponse {
                return {
                    statusCode: 400,
                    body: {
                        message: "Missing param: title"
                    }
                }
            }
        }

        const sut = new PostController()
        const httpRequest = {
            "description": "any_description",
            "body": "any_body"
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toEqual(400)
        expect(httpResponse.body.message).toEqual("Missing param: title")
     })
 })

 type HttpRequest = {
    body?: any
}


type HttpResponse = {
    body?: any
    statusCode: number
}