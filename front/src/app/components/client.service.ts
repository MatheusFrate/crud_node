import { IClient } from '../interfaces/iClient';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  public addClient(client: IClient): Observable<any> {
    return this.client.post(`${environment.apiurl}/addclient`, client);
  }

  public updateClient(client: any): Observable<any> {
    return this.client.post(`${environment.apiurl}/updateClient/`, client);
  }

  public deleteClient(id: number): Observable<any> {
    return this.client.post(`${environment.apiurl}/updateClient/`, id);
  }
}
