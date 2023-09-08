import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanciaService {

  constructor(private firestore: AngularFirestore) {

  }
  //hacemos una funcion para almacenar los datos en la collecion
  agregarInstancia(instancia: any): Promise<any> {
    return this.firestore.collection('instancias').add(instancia);
  }
  //hacemos una consulta a la base de datos y ordenamos por fecha de creacion
  getInstancias(): Observable<any> {
    return this.firestore.collection('instancias', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  //hacemos una funcion recibe el id lo valida y lo elimina
  eliminarInstancia(id: string): Promise<any> {
    return this.firestore.collection('instancias').doc(id).delete();
  }

}
