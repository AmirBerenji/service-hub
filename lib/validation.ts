
import { isEmail } from 'validator';

export default class Validation {

    constructor() {

    }

    validateEmail = (email : string) => {
        if(isEmail(email))
        {
            return true;
        }else
        {
            return false;
        }
    }
}
