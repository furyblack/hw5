import * as dotenv from "dotenv";
import { BlogMongoDbType} from "../types/blogs/output";


import { PostMongoDbType} from "../types/posts/output";
import {Collection, MongoClient} from "mongodb";
import {UserMongoDbType} from "../types/users/inputUsersType";

//пытаюсь подключить бд

dotenv.config()
const mongoUri = process.env.MONGO_URL as string || "mongodb://0.0.0.0:27017" // вытащили из енви строку  подключения

export const client = new MongoClient(mongoUri);
const mongoDb = client.db()

export const blogCollection: Collection<BlogMongoDbType> = mongoDb.collection<BlogMongoDbType>('blog')
export const postCollection: Collection<PostMongoDbType> = mongoDb.collection<PostMongoDbType>('post')

export const usersCollection: Collection<UserMongoDbType> = mongoDb.collection<UserMongoDbType>("user")
export async  function connectMongo (){
    try{
        await client.connect()
        return true
    }catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}
