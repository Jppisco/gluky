import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstanciaService } from 'src/app/services/instancia.service';

@Component({
  selector: 'app-create-instancia',
  templateUrl: './create-instancia.component.html',
  styleUrls: ['./create-instancia.component.css']
})
export class CreateInstanciaComponent implements OnInit {
  createInstancia: FormGroup;
  ngOnInit(): void {

  }
  constructor(
    private _instanciaService: InstanciaService,
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.createInstancia = this.fb.group({
      id_instancia: ['', Validators.required],
      nombre: ['', Validators.required],
      doc_id: ['', Validators.required],
      pais: ['', Validators.required],
    })
  }

  agregarIntancias() {
    //definimos un objeto con todos los atributos del formulario
    const instancia: any = {
      id_instancia: this.createInstancia.value.id_instancia,
      nombre: this.createInstancia.value.nombre,
      doc_id: this.createInstancia.value.doc_id,
      pais: this.createInstancia.value.pais,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    //hacemos llamado a la funcion que hay en el servicio y almacenamos un firebase
    this._instanciaService.agregarInstancia(instancia).then(() => {
      console.log('empleado registrado con exito');
      this.router.navigate(['/list-I'])
    }).catch(error => {
      console.log(error)
    })


  }

}
