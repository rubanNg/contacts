import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact } from 'src/models/Contact';
import { User } from 'src/models/user';
  
@Injectable()
export class HttpService {

  constructor(private http: HttpClient){ }

  getContacts() {
    return this.http.get<{ response: Contact[] }>('https://contact-api-app11.herokuapp.com/api/contacts');
  }

  deleteContacts(id: string) {
    return this.http.delete<any>(`https://contact-api-app11.herokuapp.com/api/contacts?id=${id}`);
  }

  createContacts(body: Contact) {
    return this.http.post<any>('https://contact-api-app11.herokuapp.com/api/contacts', body);
  }

  editContacts(body: Contact) {
    return this.http.put<any>('https://contact-api-app11.herokuapp.com/api/contacts', body);
  }

  authUser(user: User) {
    return this.http.post<any>('https://contact-api-app11.herokuapp.com/auth', user);
  }

}