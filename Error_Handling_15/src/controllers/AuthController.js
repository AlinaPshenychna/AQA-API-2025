import BaseController from "./BaseController.js";


export default class AuthController extends BaseController {
    signUp(userData) {
        return this.client.post("auth/signup", userData);
    }

    signIn(credentials) {
        return this.client.post("auth/signin", credentials);
    }
}