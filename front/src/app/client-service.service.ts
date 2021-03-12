import { IClient } from './interfaces';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private client: HttpClient) {}

  public getClients(): Observable<IClient[]> {
      return this.client.get<IClient[]>(`${environment.apiurl}/client`);
  }
}
