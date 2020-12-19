import { Injectable } from "@angular/core";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthService {


  get isLoggedIn() {
    return !!this.token;
  }

  auth(token: string) {
    Cookie.set('token_contact', token, 30);
  }

  get token() {
    return Cookie.get('token_contact');
  }

  logout() {
    Cookie.delete('token_contact');
  }

  parseJwt() {
    var base64Url = this.token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map((value) => {
        return '%' + ('00' + value.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
  
}