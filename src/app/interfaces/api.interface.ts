import { User } from "../models/user.model";

export interface IGenericResponse {
    ok: boolean;
    msg: string;
}
export interface IUploadsUserResponse extends IGenericResponse {
    nameFile: string;
}
export interface IGetUsersResponse extends IGenericResponse {
    users: User[],
    total: number
}

export interface IAllCollectionResponse extends IGenericResponse {
    result: User[],
}