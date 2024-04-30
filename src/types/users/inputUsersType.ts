export type CreateNewUserType= {
    "login": string,
    "password": string,
    "email": string
}

export type UserMongoDbType =  {
    userName: string,
    email: string,
    passwordHash: string,
    passwordSalt:string,
    createdAt: Date
}

