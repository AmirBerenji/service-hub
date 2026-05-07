
import { isEmail } from 'validator';

export default class Validation {

    constructor() {

    }

     validateEmail = (email?: string | null): boolean => {

        if (!email || typeof email !== 'string') {
            return false;
        }

        return isEmail(email);
    }
}
