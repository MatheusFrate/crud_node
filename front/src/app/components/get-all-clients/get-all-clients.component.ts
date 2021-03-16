import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/interfaces';

@Component({
  selector: 'app-get-all-clients',
  templateUrl: './get-all-clients.component.html',
  styleUrls: ['./get-all-clients.component.css']
})
export class GetAllClientsComponent implements OnInit {

  clients: IClient[] = [];
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
    }, (err) => {
      console.log(err);
    });
  }

}
