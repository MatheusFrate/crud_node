import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { AddClientComponent } from './components/add-client/add-client.component';
import { GetClientsComponent } from './components/get-clients/get-clients.component';
import { GetAllClientsComponent } from './components/get-all-clients/get-all-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalMaterialModule } from 'modal-material';


@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    GetClientsComponent,
    GetAllClientsComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    MatSliderModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    ModalMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
