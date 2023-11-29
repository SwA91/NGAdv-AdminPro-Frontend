/**
 * Enum for type table
 * @readonly
 * @enum
 */
export enum TypeTable {
    USERS = 'users',
    DOCTORS = 'doctors',
    HOSPITALS = 'hospitals'
}

/**
 * Enum for type APIs
 * @readonly
 * @enum
 */
export enum TypeAPI {
    ALL = 'all',
    API = 'api',
    COLLECTION = 'collection',
    DOCTORS = 'doctors',
    GOOGLE = 'google',
    HOSPITALS = 'hospitals',
    LOGIN = 'login',
    RENEW = 'renew',
    UPLOADS = 'uploads',
    USERS = 'users',
}

/**
 * Enum for type headers
 * @readonly
 * @enum
 */
export enum TypeHeader {
    TOKEN = 'x-token'
}

/**
 * Enum for type params query string
 * @readonly
 * @enum
 */
export enum TypeParamsQS {
    SEARCH = 'search',
    TABLE = 'table',
    TYPE = 'type',
    ID = 'id',
    PHOTO = 'photo',
    FROM = 'from',
}

/**
 * Enum for type role in the app
 * @readonly
 * @enum
 */
export enum TypeRole {
    USER_ROLE = 'USER_ROLE',
    ADMIN_ROLE = 'ADMIN_ROLE'
}