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

// special interface only for Users
export interface IGetUsersResponse extends IGenericResponse {
    users: User[],
    total: number
}

// special interfaces for list User, Hospital and Doctor
export interface ISearchGlobalResponse extends IGenericResponse {
    users: User[],
    hospitals: Hospital[],
    doctors: Doctor[],
}

// special interfaces for list User, Hospital and Doctor
export interface IListResultResponse extends IGenericResponse {
    result: User[] | Hospital[] | Doctor[],
}

export interface IOneResultResponse extends IGenericResponse {
    result: Doctor,
}

export interface INewDoctorResponse extends IGenericResponse {
    doctor: Doctor
}