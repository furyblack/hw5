import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {RequestWithBody} from "../types/common";
import {CreateNewUserType} from "../types/users/inputUsersType";
import {UserViewType} from "../types/users/outputUserType";

export const usersRouter = Router({})
usersRouter.post('/', async (req: RequestWithBody<CreateNewUserType>, res: Response)=> {
    const newCreatedUser: UserViewType = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(201).send(newCreatedUser)
})