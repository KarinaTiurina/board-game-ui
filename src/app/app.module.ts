import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Material Components
import { MatToolbarModule}  from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';

// Material Carousel
import { MatCarouselModule } from '@ngmodule/material-carousel';

// Custom components
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginDialogComponent } from './login/login-dialog/login-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ItemsComponent } from './catalog/items/items.component';
import { FilterComponent } from './catalog/items/filter/filter.component';
import { GameComponent } from './catalog/items/game/game.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RegistrationDialogComponent } from './registration-page/registration-dialog/registration-dialog.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { LogoutComponent } from './logout/logout.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EditUserDialogComponent } from './users-page/edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginDialogComponent,
    FooterComponent,
    PageNotFoundComponent,
    CatalogComponent,
    CarouselComponent,
    ItemsComponent,
    FilterComponent,
    GameComponent,
    GamePageComponent,
    CartPageComponent,
    RegistrationPageComponent,
    RegistrationDialogComponent,
    OrdersPageComponent,
    LogoutComponent,
    UsersPageComponent,
    EditUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MatCarouselModule.forRoot(),
    MatChipsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
