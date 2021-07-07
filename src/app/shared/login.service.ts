import { Injectable } from '@angular/core';
@Injectable()

export class LogInService {
    static isLogedIn = true;

    logedIn(v : boolean){
        LogInService.isLogedIn = v;
    }

    LoginStatus(){
        return LogInService.isLogedIn;
    }
}