import request from 'supertest'
import {app} from "../../src/settings";

const incorrectUserData = {
    login: "",
    password: "",
    email: ""
}

const userCreateData = {
    login: "test",
    password: "test",
    email: "miha25646@gmail.com"
}


let user;

describe('users', ()=>{
    it('should create user with correct input data', async ()=>{
        const createResponse=  await request(app)
            .post('/users')
            .auth("admin", "qwerty")
            .send(userCreateData)
            .expect(201)
        expect(createResponse.body.login).toEqual(userCreateData.login)
        expect(createResponse.body.password).toEqual(userCreateData.password)
        expect(createResponse.body.email).toEqual(userCreateData.email)
        expect(createResponse.body.id).toEqual(expect.any(String))



        //записываем данные полученного блога
        user = createResponse.body
    })

    it("shouldn't create user with incorrect input data", async ()=>{
        const createResponse=  await request(app)
            .post('/users')
            .auth("admin", "qwerty")
            .send(incorrectUserData)
            .expect(400)
        expect(createResponse.body.errorsMessages.length).toBe(3)
        expect(createResponse.body.errorsMessages[0].field).toEqual('login')
        expect(createResponse.body.errorsMessages[1].field).toEqual('password')
        expect(createResponse.body.errorsMessages[2].field).toEqual('email')

    })

    it("shouldn't create user without authorization", async ()=>{
        await request(app)
            .post('/users/' )
            .auth("adminnn", "qwerty")
            .send(userCreateData)
            .expect(401)


    })
    it('should get user by id', async ()=>{
        const createResponse=  await request(app)
            .get('/users/' + user!.id)
            .expect(200)
        expect(createResponse.body).toEqual(user!)

    })
    it('shouldn"t  get user by id', async ()=>{
        await request(app)
            .get('/users/' + '54554')
            .expect(404)


    })

    it('shouldn"t delete user by id wihtout auth ', async ()=>{
        await request(app)
            .delete('/users/' + user!.id)
            .auth("admddin", "qwerfty")
            .expect(401)
    })

    it('should delete user', async ()=>{
        await request(app)
            .delete('/users/' + user!.id)
            .auth("admin", "qwerty")
            .expect(204)
    })

    it('shouldn"t delete user', async ()=>{
        await request(app)
            .delete('/users/' + user!.id)
            .auth("admin", "qwerty")
            .expect(404)
    })
})
