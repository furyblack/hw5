

export type UserViewType = {
    "id": string,
    "login": string,
    "email": string,
    "createdAt": string
}


export type userSortData = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: string,
    searchNameTerm: string | null,
}


