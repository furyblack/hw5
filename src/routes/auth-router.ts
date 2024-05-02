import {Request, Response, Router} from "express";
import {UsersService} from "../domain/users-service";

export const authRouter = Router({})

authRouter.post('auth/login',  async (req: Request, res: Response) =>{
    const checkResult = await UsersService.checkCredentials(req.body.loginOrEmail, req.body.password)
})