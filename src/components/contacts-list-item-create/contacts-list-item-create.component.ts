import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Contact } from 'src/models/Contact';
import { HttpService } from 'src/services/http.services';

@Component({
  selector: 'app-contacts-list-item-create',
  templateUrl: './contacts-list-item-create.component.html',
  styleUrls: ['./contacts-list-item-create.component.css']
})
export class ContactsListItemCreateComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private dialog: MatDialogRef<ContactsListItemCreateComponent>,
    private formBuilder: FormBuilder,
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      adress: this.formBuilder.group({
        street: new FormControl(null),
        suite: new FormControl(null),
        city: new FormControl(null),
      }),
      age: new FormControl(null),
    });
  }

  close(data: any) {
    this.dialog.close(data);
  }

  save() {
    const contact = this.contactForm.value as Contact;
    this.http.createContacts(contact).subscribe(response => {
      contact._id = response.result.insertedId;
      this.close(contact);
    }, error => {
      console.log(error);
    })
  }
}
