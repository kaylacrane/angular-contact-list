import { Component, OnInit } from '@angular/core';
import { Person } from "../interfaces/person";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  contactList: Person[];

  //recogemos la lista de contactos del servicio
  constructor(private _dataService: DataService) {
    this.contactList = this._dataService.getContactList();
   }

  ngOnInit(): void {
  }
  //al hacer clic en botón de Edit, guardamos el index de ese contacto y 
  //cambiamos la acción del formulario a "edit"
  editContact(index: number) {
    this._dataService.setEditIndex(index);
    this._dataService.setIsNewContact(false);
  }
  //al hacer clic en el botón de Delete, borramos el contacto usando su index (contactList local)
  //y usamos esa lista modificada para actualizar la lista de contactos en el servicio (variable global)
  deleteContact(index: number) {
    this.contactList.splice(index, 1);
    this._dataService.updateContactList(this.contactList);
  }
}
