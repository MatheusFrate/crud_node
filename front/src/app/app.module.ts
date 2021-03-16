import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { AddClientComponent } from './components/add-client/add-client.component';
import { GetClientsComponent } from './components/get-clients/get-clients.component';
import { GetAllClientsComponent } from './components/get-all-clients/get-all-clients.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    GetClientsComponent,
    GetAllClientsComponent,
  ],
  imports: [
    MatSliderModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
