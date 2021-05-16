import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Person } from "../interfaces/person";
import { DataService } from "../services/data.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
  
export class FormComponent implements OnInit, DoCheck {
  //variables de contacto
  contactForm = new FormGroup({});
  person: Person = {
    firstName: "",
    lastName: "",
    age: "",
    dni: "",
    birthday: "",
    favColor: "",
    gender: ""
  };
  contactList: Person[] = [];

  //variables que se usan en el formulario
  genderChoices: string[] = ["female", "male", "other", "no answer"];
  colorChoices: string[] = ["red", "green", "blue", "purple", "orange", "yellow", "black"];
  isNewContact: boolean = true;
  index: number = -1;
  formError: boolean = false;
  dniRegex: string = "([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])"

  //para acceder al servicio (lista de contactos y contacto a modificar) y 
  //para usar el FormBuilder (validación del formulario/control de datos introducidos)
  constructor(private _formBuilder: FormBuilder, private _dataService: DataService) {
  }
  //para limpiar el formulario y tener todo listo para añadir otro contacto
  resetFormValues(): void {
    this.contactForm = this._formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      age: ["", Validators.required],
      dni: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.dniRegex)]],
      birthday: ["", Validators.required],
      favColor: ["", Validators.required],
      gender: ["no answer", Validators.required]
    });
    this.formError = false;
    this.index = -1;
    this._dataService.setIsNewContact(true)
  }
  ngOnInit(): void {
    //incializar el formulario al arrancar
    this.resetFormValues();
    //coger lista de contactos que ya existen si es el caso
    this.contactList = this._dataService.getContactList();
  }

  ngDoCheck() {
    this.isNewContact = this._dataService.getIsNewContact();
    //para cuando hay cambios en el componente de listado (botones de borrar/modificar contacto)
    if (this._dataService.getEditIndex() > -1) {
      //recoger el index del servicio y guardarlo en una variable local
      this.index = this._dataService.getEditIndex();
      //rellenar el formulario con los datos del contacto a modificar
      this.contactForm.setValue(this.contactList[this.index]);
      //si no reinicializamos el index en el servicio no podremos modificar nada en el formulario
      this._dataService.setEditIndex(-1);
    } 
  }
//función que se dispara cuando guardamos un contacto
  saveContact(): void {
    //confirmar si es acción de añadir o modificar
    this.isNewContact = this._dataService.getIsNewContact();
    //recoger datos del formulario
    this.person = this.contactForm.value;
    this.person.birthday = new Date(this.person.birthday);
    //si el formulario no es válido o si no se ha modificado nada,
    //aparece un mensaje de error
    if (!this.contactForm.valid) {
      this.formError = true;
      //si el formulario es válido, miramos si es acción de añadir o modificar
    } else {
      if (this.isNewContact === true && this.index === -1) {
        //añadir el contacto a la lista (variable local)
      this.contactList.push(this.person);
      } else if (this.isNewContact === false && this.index > -1) {
        //actualizar datos del contacto con datos actuales del formulario
        this.contactList[this.index] = this.person;
      }
      //actualizar lista de contactos en servicio (variable global)
      this._dataService.updateContactList(this.contactList);
      //limpiar el formulario para poder añadir más contactos
      this.resetFormValues();
    }
  }
}