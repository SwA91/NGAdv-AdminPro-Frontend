import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";

export interface IGenericResponse {
    ok: boolean;
    msg: string;
}

export interface IUploadsUserResponse extends IGenericResponse {
    nameFile: string;
}

// especial interface only for Users
export interface IGetUsersResponse extends IGenericResponse {
    users: User[],
    total: number
}

// especial interfaces for User, Hospital and Doctor
export interface IResultResponse extends IGenericResponse {
    result: User[] | Hospital[] | Doctor[],
}