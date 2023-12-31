import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { InstanciaService } from 'src/app/services/instancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-instancia',
  templateUrl: './list-instancia.component.html',
  styleUrls: ['./list-instancia.component.css']
})
export class ListInstanciaComponent implements OnInit {
  instancias: any[] = [];
  ngOnInit(): void {
    //al iniciar el componente va a ejecutar la funcion
    this.getInstancias();
  }
  constructor(
    private _instanciaService: InstanciaService,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  //hacemos una funcion que no trae una la consulta de todas las intancias
  getInstancias() {
    this._instanciaService.getInstancias().subscribe(data => {
      this.instancias = [];
      data.forEach((element: any) => {

        this.instancias.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      console.log(this.instancias)
    })
  }

  eliminarInstancia(id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Esta Accion es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._instanciaService.eliminarInstancia(id).then(() => {
          console.log(id);
          console.log('instancia eliminada correctamente')
        }).catch(error => {
          console.log(error)
        })
        Swal.fire(
          'Eliminado!',
          'La instancia ha sido borrada correctamente.',
          'success'
        )
      }
    })


  }

}
