const { typeSourceSpan } = require("@angular/compiler");

class User {
    constructor(email, password, pwConfirm = password, adress = '', city = '', postalCode = '') {
        if (!this.setEmail(email)) return { invalid: true };
        if (!this.setPassword(password)) return { invalid: true };
        if (!this.setPassword(pwConfirm)) return { invalid: true };
        if (!this.setPasswordConfirm(pwConfirm)) return { invalid: true };
        if (!this.setAdress(adress)) return { invalid: true };
        if (!this.setCity(city)) return { invalid: true };
        if (!this.setPostalCode(postalCode)) return { invalid: true };
    }

    setEmail(email) {
        if (!email) return false;

        const regEx = /^[A-Za-z0-9ÄäÖöÜüß@.]*$/;

        if (!email.match(regEx)) return false;

        if (email.length > 100) return false;

        this.email = email;
        return true;
    }

    setPassword(password) {
        if (!password) return false;

        const regEx = /^[A-Za-z0-9ÄäÖöÜüß]*$/;

        if (!password.match(regEx)) return false;

        if (password.length > 100) return false;

        this.password = password;
        return true;
    }

    setPasswordConfirm(pwConfirm) {
        if (pwConfirm != this.password) {
            return false;
        }
        return true;
    }

    setAdress(adress) {
        if (!adress) return true;

        if (adress.length > 100) return false;

        this.adress = adress;
        return true;
    }

    setCity(city) {
        if (!city) return true;

        const regEx = /^[A-Za-z0-9ÄäÖöÜüß ]*$/;

        if (!city.match(regEx)) return false;

        if (city.length > 100) return false;

        this.city = city;
        return true;
    }

    setPostalCode(postalCode) {
        if (!postalCode) return true;
        if (isNaN(postalCode)) return false;

        if (postalCode.length > 100) return false;

        this.postalCode = postalCode;
        return true;
    }
}

module.exports = User;