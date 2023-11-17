import { Hospital } from "../models/hospital.mode";
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

export interface IGetHospitalsResponse extends IGenericResponse {
    hospitals: Hospital[],
    total: number
}

export interface IAllCollectionResponse extends IGenericResponse {
    result: User[],
}