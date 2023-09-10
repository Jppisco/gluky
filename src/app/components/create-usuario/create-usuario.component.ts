import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {
  createUsuario: FormGroup;
  id_instancia: string | null;
  titulo = 'Agregar Usuario';
  ngOnInit(): void {

  }
  constructor(private router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) {

    this.createUsuario = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    })
    this.id_instancia = this.aRoute.snapshot.paramMap.get('id_instancia');
    console.log(this.id_instancia)
  }




  //funcion para agregar usuarios
  agregarUsuarios() {
    //definimos un objeto con todos los atributos del formulario
    const usuarios: any = {
      id_instancia: this.id_instancia,
      usuario: this.createUsuario.value.usuario,
      clave: this.createUsuario.value.clave,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    //hacemos llamado a la funcion que hay en el servicio y almacenamos un firebase
    this._usuarioService.agregarUsuarios(usuarios).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario registrado con exito',
        showConfirmButton: false,
        timer: 1500
      })
      console.log('Usuario registrado con exito');
      this.router.navigate(['/list-U'])
    }).catch(error => {
      console.log(error)
    })
  }

}
