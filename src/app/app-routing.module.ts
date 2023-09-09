import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInstanciaComponent } from './components/list-instancia/list-instancia.component';
import { CreateInstanciaComponent } from './components/create-instancia/create-instancia.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-I', pathMatch: 'full' },
  { path: 'list-I', component: ListInstanciaComponent },
  { path: 'create-I', component: CreateInstanciaComponent },
  { path: 'edit/:id', component: CreateInstanciaComponent },
  { path: 'list-U/:id_instancia', component: ListUsuarioComponent },
  { path: 'create-U/:id_instancia', component: CreateUsuarioComponent },
  { path: '**', redirectTo: 'list-I', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
