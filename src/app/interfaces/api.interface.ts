export interface IGenericResponse {
    ok: boolean;
    msg: string;
}
export interface IUploadsUserResponse extends IGenericResponse {
    nameFile: string;
}
