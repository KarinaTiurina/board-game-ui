import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CatalogComponent } from './catalog/catalog.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LoginComponent } from './login/login.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { LogoutComponent } from './logout/logout.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '',   redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
