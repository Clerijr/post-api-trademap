import { ObjectId } from "mongodb"

export type Post = {
    _id?: ObjectId
    title: string
    description: string
    body: string
    created_at?: string
    updated_at?: string
}
