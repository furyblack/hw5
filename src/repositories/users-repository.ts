import {usersCollection} from "../db/db";
import {UserMongoDbType} from "../types/users/inputUsersType";
import {ObjectId, WithId} from "mongodb";

export class UsersRepository{
    static async getAllUsers():Promise<UserMongoDbType[]>{
        return usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    }

    static async createUser(user: UserMongoDbType): Promise<ObjectId>{

        const result  = await usersCollection.insertOne(user)
        return result.insertedId
    }


    static async findById(id:ObjectId):Promise<WithId<UserMongoDbType>| null>  {
        let findedUser = await usersCollection.findOne({_id:id})
        if (findedUser){
            return findedUser
        }else{
            return null
        }
    }

    static  async findByLoginOrEmail(loginOrEmail: string){
        const user  = await usersCollection.findOne({$or: [{email: loginOrEmail}, {userName:loginOrEmail}]})
        return user
    }

    static async deleteUser(id:string): Promise<boolean>{
        try{
            const result = await usersCollection.deleteOne({_id:new ObjectId(id)})
            return result.deletedCount ===1;
        }catch (error){
            console.error("Error deleting user", error)
            return false
        }
    }

}
