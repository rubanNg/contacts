import { Component, OnInit } from '@angular/core';
import { ContactsListItemCreateComponent } from 'src/components/contacts-list-item-create/contacts-list-item-create.component';
import { Contact } from 'src/models/Contact';
import { HttpService } from 'src/services/http.services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactsList: Contact[] = [];
  contactsListCopy: Contact[] = [];
  searchForm: FormGroup;
  loading: boolean = false;
  userInfo: any = null;
  expandForm: boolean = false;

  constructor(
    private http: HttpService,
     public modalDialog: MatDialog, 
     private authService: AuthService,
     private router: Router,
    ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.parseJwt();
    this.createForm();
    this.loadData();
  }

  createForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
    this.searchForm.get('search').valueChanges.subscribe(value => {
      if (!value) {
        this.contactsList = this.contactsListCopy;
        return;
      }
      this.search(value);
    });
  }

  loadData() {
    this.loading = true;
    this.http.getContacts().subscribe(resposne => {
      this.contactsList = resposne.response;
      this.contactsListCopy = [...this.contactsList];
      this.loading = false;
    });
  }

  openPanel() {
    const modal = this.modalDialog.open(ContactsListItemCreateComponent);
    modal.afterClosed().subscribe(result => {
      if (result) {
        // что бы не делать лишний запрос
        this.contactsList.push(result);
      }
    });
  }

  delete(event: Contact) {
    this.contactsList = this.contactsList.filter(item => item._id !== event._id)
  }

  update(event: Contact) {
  }

  search(value: string) {
    this.contactsList = this.contactsListCopy.filter(item => {
      return (item?.name?.toLowerCase().includes(value.toLowerCase()) || 
        item?.phone?.toLowerCase().includes(value.toLowerCase()) || 
        item?.age?.toString().toLowerCase().includes(value.toLowerCase()) || 
        item?.adress?.city?.toLowerCase().includes(value.toLowerCase()) || 
        item?.adress.street?.toLowerCase().includes(value.toLowerCase()) || 
        item?.adress?.suite?.toLowerCase().includes(value.toLowerCase()))
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
