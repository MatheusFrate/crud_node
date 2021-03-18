import { ILogin } from './../interfaces/iLogin';
import { IClient } from '../interfaces/iClient';
import { environment } from '../../environments/environment';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private client: HttpClient) {}

  public getClients(): Observable<IClient[]> {
      return this.client.get<IClient[]>(`${environment.apiurl}/client`);
  }
  public get(id: any): Observable<IClient> {
    return this.client.get<IClient>(`${environment.apiurl}/client/${id}`);
  }

  public addClient(cliente: IClient): Observable<any> {
    return this.client.post(`${environment.apiurl}/addClient`, cliente);
  }

  public updateClient(cliente: any): Observable<any> {
    return this.client.post(`${environment.apiurl}/updateClient/`, cliente);
  }

  public deleteClient(client: any): Observable<any> {
    return this.client.post(`${environment.apiurl}/deleteClient/`, client);
  }

  public login(login: ILogin): Observable<any> {
    return this.client.post(`${environment.apiurl}/login`, login);
  }
  public logout(): Observable<any> {
    return this.client.post<any>(`${environment.apiurl}/logout`);
  }
}
