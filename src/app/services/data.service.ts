import { Injectable } from '@angular/core';
import { Person } from "../interfaces/person";

@Injectable({
  providedIn: 'root'
})
  
  //este servicio maneja los datos que se comparten entre los componentes de formulario y lista de contactos
export class DataService {
  
  private _contactList: Person[] = [];
  private _isNewContact: boolean = true;
  private _editIndex: number = -1;

  constructor() {
  }
  
  //funciones para manejar la acción del formulario
  getFormAction(): boolean {
    return this._isNewContact;
  }
  setFormAction(action: boolean) {
    this._isNewContact = action;
  }
  //funciones para manejar el index del contacto a modificar
  setEditIndex(index: number) {
    this._editIndex = index;
  }
  getEditIndex() {
    return this._editIndex;
  }
  //actualizar la lista de contactos con datos de otra lista
  updateContactList(newList: Person[]) {
    this._contactList = { ...newList };
  }
  //devolver lista de contactos 
  getContactList(): Person[] {
    return this._contactList;
  }

}
