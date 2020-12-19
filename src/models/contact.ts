export interface Contact {
  _id: string;
  name: string;
  phone: string;
  adress: Adress;
  age: number;
}

export interface Adress {
  street: string;
  suite: string;
  city: string;
}