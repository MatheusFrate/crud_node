import { IClient } from './interfaces';
import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from './client-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'front';
  clientes: IClient[] = [];

  constructor(private client: ClientServiceService) {}

  ngOnInit(): void {
    this.client.getClients().subscribe((res) => {
      this.clientes = res;
    }, (err) => {
      console.log(err);
    });
  }
}


