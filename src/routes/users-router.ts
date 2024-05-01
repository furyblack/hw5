import {Router, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {RequestWithBody, RequestWithQuery} from "../types/common";
import {CreateNewUserType, userQuerySortData} from "../types/users/inputUsersType";
import {UserOutputType, UserViewType} from "../types/users/outputUserType";
import {PaginationOutputType} from "../types/blogs/output";
import {paginator, userPaginator} from "../types/paginator/pagination";
import {UserQueryRepository} from "../repositories/query-user-repository";

export const usersRouter = Router({})
usersRouter.post('/', async (req: RequestWithBody<CreateNewUserType>, res: Response)=> {
    const newCreatedUser: UserOutputType = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(201).send(newCreatedUser)
})

usersRouter.get('/',  async (req: RequestWithQuery<userQuerySortData>, res: Response<PaginationOutputType<UserOutputType[]>>) =>{
    const paginationData = userPaginator(req.query)

    const userPromise = await UserQueryRepository.getAll(paginationData)
    res.send(userPromise)
})

