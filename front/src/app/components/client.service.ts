import { ILogin } from './../interfaces/iLogin';
import { IClient } from '../interfaces/iClient';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private client: HttpClient) {}

  public getCurrentSession(): any {
    const session = localStorage.getItem('session');

    if (session === null) {
      throw new Error('Falha ao Pegar Sessão');
    }

    return JSON.parse(session);
  }


  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      id: String(this.getCurrentSession().id)
    });
  }

  public getClients(): Observable<IClient[]> {
    return this.client.get<IClient[]>(`${environment.apiurl}/client`, {
      headers: this.authHeaders()
    });
  }
  public get(id: any): Observable<IClient> {
    return this.client.get<IClient>(`${environment.apiurl}/client/${id}`, {
      headers: this.authHeaders()
    });
  }

  public addClient(cliente: IClient): Observable<any> {
    return this.client.post(`${environment.apiurl}/addClient`, cliente, {
      headers: this.authHeaders()
    });
  }

  public updateClient(cliente: any): Observable<any> {
    return this.client.post(`${environment.apiurl}/updateClient/`, cliente, {
      headers: this.authHeaders()
    });
  }

  public deleteClient(client: any): Observable<any> {
    return this.client.post(`${environment.apiurl}/deleteClient/`, client, {
      headers: this.authHeaders()
    });
  }

  public login(login: ILogin): Observable<any> {
    return this.client.post<any>(`${environment.apiurl}/login`, login).pipe(
      map((res) => {
        localStorage.setItem('session', JSON.stringify(res[0]));
        return res;
      })
    );
  }
  public logout(id: number): Observable<any> {
    return this.client.post<any>(`${environment.apiurl}/logout`, {
      id
    }, {
      headers: this.authHeaders()
    });
  }
}
