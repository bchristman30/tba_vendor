import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import 'rxjs/add/operator/do';
import { throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UIService } from '../shared/snackbar/Ui.service';
import { authobj } from '../shared/interfaces/authobj.interface';

@Injectable()
export class AuthService {
    authToken:any;
    user:any;
    authChange = new Subject<authobj>();
    
    constructor(private http: HttpClient,private router:Router, private uiservice:UIService) {
        if(localStorage.getItem('user'))
        {
            this.user= localStorage.getItem('user'); 
            this.authToken =localStorage.getItem('id_token');
        }
    }

    login(email: string, password: string) {
        this.uiservice.isloadingstatus.next(true);
        let header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
        let login_data = 'email=' + email + '&password=' + password;
        return this.http.post<any>('/api/brew_owner/login', login_data, { observe: 'response', responseType: 'json', headers: header }).pipe(map((res) => { this.uiservice.isloadingstatus.next(false); return res.body; }));
    }
    
    forgetpassword(user) {
        let header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
        let login_data = 'email=' +user.email;

        return this.http.post<any>('/api/user/forgetpassword', login_data, { observe: 'response', responseType: 'json', headers: header }).pipe(map((res) => { console.log(res.body); return res.body; }));
    }

    confirm_account(key:any,id:any)
    {
        let header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
        return this.http.get<any>('/api/user/confirm_account?key='+key+"&id="+id, { observe: 'response', responseType: 'json', headers: header }).pipe(map((res) => { console.log(res.body); return res.body; }));
    }

    changepassword(user) {
        let header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
        let login_data = 'userid=' +user.userid+'&currentpassword='+user.password+'&newpassword='+user.newpassword+'&forgettoken='+user.token;
        return this.http.post<any>('/api/user/changepassword', login_data, { observe: 'response', responseType: 'json', headers: header }).pipe(map((res) => { console.log(res.body); return res.body; }));
    }

    updatepassword(user) {
        let header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
        let login_data = 'userid=' +user.userid+'&newpassword='+user.newpassword+'&forgettoken='+user.token;
        return this.http.post<any>('/api/user/updatepassword', login_data, { observe: 'response', responseType: 'json', headers: header }).pipe(map((res) => { console.log(res.body); return res.body; }));
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }

    signup(user:any) {
        this.uiservice.isloadingstatus.next(true);
        let header = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*');
        let login_data = 'username=' + user.name + '&email=' + user.email + '&dob=' + user.birthdate + '&password=' + user.password;  
        return this.http.post<any>('/api/user/register', login_data, {observe: 'response', responseType: 'json', headers: header }).pipe(map(res=>{  this.uiservice.isloadingstatus.next(false); return res.body;}),catchError(this.handleError));
    }

    setSession(authResult) {
        // const expiresAt = moment().add(5000 , 'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('user', JSON.stringify(authResult.result));
        // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
       
        this.authSuccessfully();
    }
    
    update_user_info(authResult){
        localStorage.setItem('user', JSON.stringify(authResult.result));
        this.authSuccessfully();
    }

    authSuccessfully(){
        this.authToken = localStorage.getItem('id_token');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.authChange.next({isauth:true,issubscription_expired:this.user.subscription_expired,issubscription:this.user.issubscription});
    }

    Is_subscriprition_expired(){
        if(this.isLoggedIn)
        {
            this.authSuccessfully();
        }
        else
        {
            return null;
        }
    }

    fetch_stamped_brewery(user_id:number){
        return this.http.get<any>('/api/user/id/'+user_id, { observe: 'response', responseType: 'json' }).pipe(map((res) => { console.log(res.body); return res.body; }));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires_at');
        this.authToken = null;
        this.user = null;
        this.authChange.next({isauth:false,issubscription_expired:true,issubscription:false});
        this.router.navigate(['/']);
    }

    public isLoggedIn() {
        let expireinfo= moment().isBefore(this.getExpiration());
        let isauth=this.user!=null;
        if((expireinfo==true) && (isauth==true))
        {
             return true;
        }
        else
        {
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
