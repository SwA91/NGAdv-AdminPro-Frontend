import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) { }

    get imageUrl() {

        let url = `${base_url}/uploads/users/no-image`;

        switch (true) {
            case this.img?.includes('https'):
                url = this.img;
                break;

            case !!this.img:
                url = `${base_url}/uploads/users/${this.img}`
                break;
            default:
                break;
        }

        return url;
    }
}