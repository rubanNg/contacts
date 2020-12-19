import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/models/Contact';
import { HttpService } from 'src/services/http.services';

@Component({
  selector: 'app-contacts-list-item',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.css']
})
export class ContactsListItemComponent implements OnInit {

  contactForm: FormGroup;
  editMode: boolean = false;


  @Input() contact: Contact = null;
  @Output() delete = new EventEmitter<Contact>();
  @Output() update = new EventEmitter<Contact>();

  constructor(private formBuilder: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      _id: new FormControl(this.contact._id),
      name: new FormControl(this.contact.name, [Validators.required]),
      phone: new FormControl(this.contact.phone),
      adress: this.formBuilder.group({
        street: new FormControl(this.contact.adress.street),
        suite: new FormControl(this.contact.adress.suite),
        city: new FormControl(this.contact.adress.city),
      }),
      age: new FormControl(this.contact.age),
    });
    this.contactForm.disable();
  }

  deleteContact(contact: Contact) {
    this.http.deleteContacts(contact._id).subscribe(response => {
      this.delete.emit(contact);
    }, error => {
      console.log(error);
    })
  }

  editContact() {
    if (this.contactForm.enabled) {
      this.contactForm.disable();
      this.http.editContacts(this.contactForm.value).subscribe(resposne => {
        this.update.emit(this.contactForm.value);
      }, error => {
        console.log(error);
      });
    } else this.contactForm.enable();

  }

}
