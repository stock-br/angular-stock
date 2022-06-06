import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './list/clients.component';
import { ManageClientComponent } from './manage-client/manage-client.component';

const routes: Routes = [
  { path: '', component: ClientsComponent, data: { title: 'Clientes' } },
  {
    path: 'cadastrar-cliente',
    component: ManageClientComponent,
    data: { title: 'Cadastrar Cliente' },
  },
  {
    path: 'editar-cliente/:id',
    component: ManageClientComponent,
    data: { title: 'Editar Cliente' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
