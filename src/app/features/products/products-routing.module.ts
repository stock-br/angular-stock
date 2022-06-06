import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductsComponent } from './list/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, data: { title: 'Produtos' } },
  {
    path: 'cadastrar-produto',
    component: ManageProductComponent,
    data: { title: 'Cadastrar Produto' },
  },
  {
    path: 'editar-produto/:id',
    component: ManageProductComponent,
    data: { title: 'Editar Produto' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
