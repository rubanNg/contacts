import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/models/Contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  @Input() contacts: Contact[] = [];
  @Output() delete = new EventEmitter<Contact>();
  @Output() update = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {}

  emitDelete(event: Contact) {
    this.delete.emit(event);
  }

  emitUpdate(event: Contact) {
    this.update.emit(event);
  }

}
