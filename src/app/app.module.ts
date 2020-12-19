import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from 'src/pages/auth/auth.component';
import { ContactsComponent } from 'src/pages/contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsListComponent } from 'src/components/contacts-list/contacts-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { HttpService } from 'src/services/http.services';
import { ContactsListItemComponent } from 'src/components/contacts-list-item/contacts-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { ContactsListItemCreateComponent } from 'src/components/contacts-list-item-create/contacts-list-item-create.component';
import { AuthService } from 'src/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from 'src/guards/auth';
import { JwtInterceptor } from 'src/services/interceptor.service';



const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'contacts' },
  { path: 'auth', component: AuthComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]} ,
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactsListItemComponent,
    ContactsListItemCreateComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule, 
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    HttpService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
