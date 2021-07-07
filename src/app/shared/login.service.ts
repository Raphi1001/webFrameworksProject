import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class LogInService {
    private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
    public logedIn = this.loginStatus.asObservable();

    public setMessage(value: boolean) {
        this.loginStatus.next(value);
    }

    public getStatus(){
        return this.loginStatus.value;
    }
}