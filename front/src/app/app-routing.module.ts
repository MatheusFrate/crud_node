import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { GetClientsComponent } from './components/get-clients/get-clients.component';
import { GetAllClientsComponent } from './components/get-all-clients/get-all-clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: '', redirectTo: 'client', pathMatch: 'full'},
    { path: 'client', component: GetAllClientsComponent},
    { path: 'client/:id', component: GetClientsComponent},
    { path: 'addClient', component: AddClientComponent},
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
