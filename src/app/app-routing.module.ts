import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    data: {
      fullPage: true,
    },
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
    data: {
      fullPage: false,
    },
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./features/products/products.module').then(
        (m) => m.ProductsModule
      ),
    data: {
      fullPage: false,
    },
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./features/clients/clients.module').then((m) => m.ClientsModule),
    data: {
      fullPage: false,
    },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./core/pages/core-pages.module').then((m) => m.CorePagesModule),
    data: {
      fullPage: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
